import { InputHTMLAttributes } from "react";
import Icon from "./Icon";

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
};

export function Input({
  className = "",
  ...props
}: BaseInputProps) {
  return (
    <input
      className={`bg-neutral-200 border-b-2 w-full rounded-sm p-2 focus:outline-none ${className}`}
      {...props}
    />
  );
}

export function InputIcon({
  icon,
  className = "",
  ...props
}: BaseInputProps) {
  return (
    <div className="relative w-full flex items-center">
      {icon && (
        <span className="absolute left-3 text-neutral-600">
          <Icon name={icon} />
        </span>
      )}

      <input
        className={`bg-neutral-200 border-b-2 w-full rounded-sm p-2 pl-10 focus:outline-none focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}
