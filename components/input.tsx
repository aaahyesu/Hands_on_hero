import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price" | "password" | "textArea" | "time" | "birthdate";
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
        <div className="rounded-md relative flex  items-center shadow-sm">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">\</span>
          </div>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>

      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
      ) : null}
      {kind === "password" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 shadow-sm focus:border-black focus:outline-none">
          </span>
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
      {kind === "birthdate" ? (
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
