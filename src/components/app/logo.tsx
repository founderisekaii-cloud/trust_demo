import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="hsl(var(--primary))"
        d="M50,0A50,50,0,1,0,50,100,50,50,0,0,0,50,0Z"
      />
      <path
        fill="#fff"
        d="M16.5,83.43a37,37,0,0,1,67,0,1,1,0,0,0,1.41-1.41,39,39,0,0,0-69.82,0,1,1,0,0,0,1.41,1.41Z"
      />
      <path
        fill="url(#logo-gradient)"
        d="M50,18a6.5,6.5,0,1,0,6.5,6.5A6.5,6.5,0,0,0,50,18Zm17.85,19.33a1,1,0,0,0-1.11.8,16.29,16.29,0,0,1-33.48,0,1,1,0,1,0-1.92,5.5,18.29,18.29,0,0,0,37.32,0,1,1,0,0,0-.81-6.3Z"
      />
      <path
        fill="hsl(var(--primary-foreground))"
        opacity="0.8"
        d="M26.46,62.88c-1-5.49,2-10.49,7.26-11.83,5.49-1.37,10.63,1.6,12.06,6.78.89,3.22,0,6.6-2.58,8.81s-6,3.69-9.36,4.12-6.52-.09-8.77-2.61C32.89,66.19,27.05,66,26.46,62.88Z"
      />
      <path
        fill="hsl(var(--primary-foreground))"
        opacity="0.8"
        d="M73.54,62.88c1-5.49-2-10.49-7.26-11.83-5.49-1.37-10.63,1.6-12.06,6.78-.89,3.22,0,6.6,2.58,8.81s6,3.69,9.36,4.12,6.52-.09,8.77-2.61C67.11,66.19,72.95,66,73.54,62.88Z"
      />
    </svg>
  );
  
