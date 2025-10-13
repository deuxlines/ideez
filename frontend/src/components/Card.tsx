interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`infocard shadow-2xl p-12 min-w-[400px] min-h-[400px] max-h-[550px] max-w-[650px] flex flex-col gap-8 ${className || ""}`}>
            {children}
        </div>
    )
}