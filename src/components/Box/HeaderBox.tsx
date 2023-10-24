//* Import tailwind-merge for combining Tailwind CSS classes.

import { cn } from "@/lib/utils/utils";

//* Define the props interface for the Box component.
interface BoxProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
  backgroundImage?: string;
}

export const HeaderBox: React.FC<BoxProps> = ({
    children,
    height,
    className,
    backgroundImage
}) => {
  return (
    <div
        className="bg-background"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: height ?? 'clamp(340px,30vh,400px)',
        }}
    >
        <div className={cn("w-full h-full flex p-4 bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75 relative", className)}>
            {children}
        </div>
    </div>
  );
};
