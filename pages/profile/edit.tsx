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
  const {user} = useUser();
  const { register, setValue, handleSubmit, setError, formState: {errors} } = useForm<EditProfileForm>();
  useEffect(() => {
    if(user?.email) setValue("email", user?.email);
    if(user?.name) setValue("name", user?.name);
  }, [user, setValue]);
  const[editProfile, {data}] = useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = ({email, name}:EditProfileForm) => {
    if(email === "" && name === "") {
      return setError("formErrors", { message:"수정할 내용을 입력해주세요."});
    }
    editProfile({ email, name});
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  return (
    <Layout canGoBack hasTabBar title="프로필 수정">
    <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
      <div className="flex flex-col items-center space-y-5">
        <div className="w-32 h-32 rounded-full bg-slate-500" />
        <label
          htmlFor="picture"
          className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 text-gray-700"
        >
          사진 변경하기
          <input id="picture" type="file" className="hidden" accept="image/*" />
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
      {errors.formErrors ? (<span className="my-2 text-red-500 font-medium block">{errors.formErrors.message}</span>) : null}
      </div>
      <button className="mt-5 w-full bg-black hover:bg-gray-800 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ">
      수정하기
      </button>
    </form>
    </Layout>
  );
};

export default EditProfile;