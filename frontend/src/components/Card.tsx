import type { ReactNode } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`infocard shadow-2xl p-8 w-full mb-4 h-125 min-w-150 opacity-75 flex flex-col ${className || ""}`}>
            {children}
        </div>
    )
}