import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?:
    | "text"
    | "phone"
    | "price"
    | "password"
    | "textArea"
    | "time"
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
}

export default function Input({
  label,
  name,
  kind,
  register,
  type,
  required,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" ? (
        <input
          id={name}
          required={required}
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
        />
      ) : null}
      {kind === "textArea" ? (
        <input
          id={name}
          required={required}
          {...register}
          type={type}
          className="h-24 w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
        />
      ) : null}
      {kind === "price" ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">\</span>
          </div>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
      {kind === "password" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"></span>
          <input
            id={name}
            required={required}
            placeholder={placeholder}
            {...register}
            minLength={8}
            maxLength={16}
            type={type}
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
      ) : null}
      {kind === "time" ? (
        <input
          id={name}
          required={required}
          {...register}
          type={type}
          className="w-full rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
        />
      ) : null}
    </div>
  );
}
