import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className="infocard shadow-2xl rounded-xl p-8 max-w-248 w-full mb-4 min-h-80 min-w-80 opacity-75">
            {children}
        </div>
    )
}