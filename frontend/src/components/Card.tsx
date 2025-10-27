interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`
      infocard
      shadow-2xl
      p-6 md:p-8
      w-full
      md:max-h-[525px] max-h-[900px]
      max-w-full md:max-w-[650px]
      min-h-[auto] md:min-h-[400px]
      flex flex-col gap-4 md:gap-8
      ${className || ""}
    `}>
      {children}
    </div>
  )
}