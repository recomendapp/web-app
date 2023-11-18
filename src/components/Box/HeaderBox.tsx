//* Import tailwind-merge for combining Tailwind CSS classes.

import { cn } from "@/lib/utils";

//* Define the props interface for the Box component.
interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}

export const HeaderBox: React.FC<BoxProps> = ({
    style,
    children,
    className,
}) => {
  return (
    <div
      style={style}
      className={cn(`
          @container
          bg-background bg-cover bg-no-repeat
          lg:h-[clamp(340px,30vh,400px)]
      `, className)}
      // style={{
      //   backgroundImage: `url('${backgroundImage}')`,
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      //   height: height ?? 'clamp(340px,30vh,400px)',
      // }}
    >
        <div className="w-full h-full flex p-4 bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75 relative">
            {children}
        </div>
    </div>
  );
};
