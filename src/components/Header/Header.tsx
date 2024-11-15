import { cn } from '@/lib/utils';
import HeaderLeftSide from './HeaderLeftSide';
import HeaderCenterSide from './HeaderCenterSide';
import HeaderRightSide from './HeaderRightSide';

export const Header = ({
  className,
  ...props
} : React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-[1] bg-background flex justify-between items-center border-b p-4 h-header',
        className
      )}
      {...props}
    >
      <HeaderLeftSide />
      <HeaderRightSide />
    </header>
  );
}
