import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", props.className)}
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z">
         <animate
          attributeName="d"
          dur="3s"
          repeatCount="indefinite"
          keyTimes="0; 0.4; 0.5; 0.6; 1"
          values="
            M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z;
            M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z;
            M2 12s3-1 10-1 10 1 10 1-3 1-10 1-10-1-10-1Z;
            M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z;
            M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z
          "
        />
      </path>
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
