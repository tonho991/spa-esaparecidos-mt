import { DOMAttributes, MouseEventHandler } from "react";

export default function Icon({ name, className, onIconClick }: { name: string, className?: string, onIconClick?: MouseEventHandler<HTMLSpanElement> }) {
  return <span className={"material-symbols-outlined " + className } onClick={onIconClick}>{name}</span>;
}