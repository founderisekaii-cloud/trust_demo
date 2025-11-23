
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => (
    <Image 
        src="/images/logo.png?v=2" 
        alt="Vikhyat Foundation Logo" 
        width={100} 
        height={100} 
        className={cn("", className)} 
    />
  );
