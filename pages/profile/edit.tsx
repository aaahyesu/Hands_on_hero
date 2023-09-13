import Input from "@/components/input";
import Layout from "@/components/navbar";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";

interface EditProfileForm {
  email?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user?.email);
    if (user?.name) setValue("name", user?.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${user?.avatar}/avatar`
      );
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = async ({ email, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && name === "") {
      return setError("formErrors", { message: "수정할 내용을 입력해주세요." });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfile({
        email,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        name,
      });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack hasTabBar title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-4 py-10">
        <div className="flex flex-col items-center space-y-5">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-32 w-32 rounded-full bg-slate-500"
            />
          ) : (
            <img
              src="/superman_bg_white.png"
              alt="Avatar"
              className="h-32 w-32 rounded-full shadow-md"
            />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:ring-2"
          >
            사진 변경하기
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            register={register("name")}
            name="name"
            kind="text"
            type="name"
            placeholder="이름을 입력해주세요"
            required={false}
            label="이름"
          />
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            kind="text"
            register={register("email")}
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            required={false}
            label="이메일 주소"
          />
          {errors.formErrors ? (
            <span className="my-2 block font-medium text-red-500">
              {errors.formErrors.message}
            </span>
          ) : null}
        </div>
        
        <button className="mt-5 w-full rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 ">
          <Button text={loading ? "Loading..." : "수정하기"} />
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
