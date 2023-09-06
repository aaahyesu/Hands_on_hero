import Input from "@/components/input";
import Layout from "@/components/navbar";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  email?: string;
  name?: string;
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
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user?.email);
    if (user?.name) setValue("name", user?.name);
  }, [user, setValue]);
  const [editProfile, { data }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = ({ email, name }: EditProfileForm) => {
    if (email === "" && name === "") {
      return setError("formErrors", { message: "수정할 내용을 입력해주세요." });
    }
    editProfile({ email, name });
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  return (
    <Layout canGoBack hasTabBar title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-4 py-10">
        <div className="flex flex-col items-center space-y-5">
          <div className="h-32 w-32 rounded-full bg-slate-500">
            <img
              src="/superman_bg_white.png"
              alt="Avatar"
              className="h-full w-full rounded-full shadow-md"
            />
          </div>
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:ring-2"
          >
            사진 변경하기
            <input
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
          수정하기
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
