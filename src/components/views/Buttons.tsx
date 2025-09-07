import { MouseEventHandler } from "react";
import Icon from "./Icon";
import Link from "next/link";

export const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => (
  <button
    className={`w-full bg-[#3A589B] hover:opacity-90 text-center text-white rounded-lg py-2 mt-2 cursor-pointer ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export const LinkButton = ({
  text,
  href,
  className,
}: {
  text: string;
  href: string;
  className?: string;
}) => (
  <Link
    href={href}
    className={`w-full block bg-[#3A589B] hover:opacity-90 text-center text-white rounded-lg py-2 mt-2 cursor-pointer ${className}`}
  >
    {text}
  </Link>
);

export const ButtonIcon = ({
  icon,
  text,
  onClick,
  className,
}: {
  icon: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => (
  <button
    className={`flex items-center text-white rounded-lg bg-[#3A589B] hover:opacity-90 cursor-pointer w-auto ${
      className || ""
    }`}
    onClick={onClick}
  >
    <div className="flex justify-center p-2 bg-[#344e88] rounded-bl-lg rounded-tl-lg">
      <Icon name={icon} />
    </div>
    <div className="p-2 w-full text-center">
      <p>{text}</p>
    </div>
  </button>
);


export const LinkButtonIcon = ({
  icon,
  text,
  href,
  className,
}: {
  icon: string;
  text: string;
  href?: string | undefined;
  className?: string;
}) => (
  <button>
    <Link
      className={`flex justify-center items-center text-white mr-2 rounded-lg bg-[#3A589B] hover:opacity-90 cursor-pointer w-auto ${
        className || ""
      }`}
      href={href || "#"}
    >
      <div className="flex justify-center p-2 bg-[#344e88] rounded-bl-lg rounded-tl-lg">
        <Icon name={icon} />
      </div>
      <div className="p-2">
        <p>{text}</p>
      </div>
    </Link>
  </button>
);
