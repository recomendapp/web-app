//* Import tailwind-merge for combining Tailwind CSS classes.

import { cn } from "@/lib/utils";

//* Define the props interface for the Box component.
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `
        bg-background
        h-fit
        w-full
        lg:rounded-lg
        p-2
        `,
        className
      )}
    >
      {children}
    </div>
  );
};
