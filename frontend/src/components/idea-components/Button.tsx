import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export default function Button({ onClick, text, disabled, type = "button" }: ButtonProps) {
  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className="flex bg-[rgb(40,73,114)] text-white align-bottom rounded-2xl py-3 px-6 text-base shadow-md hover:bg-[rgb(40,53,114)] transition"
      type={type}
    >
      {text}
    </button>
  );
}