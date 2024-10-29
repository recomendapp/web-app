import { cn } from '@/lib/utils';
import HeaderLeftSide from './HeaderLeftSide';
import HeaderCenterSide from './HeaderCenterSide';
import HeaderRightSide from './HeaderRightSide';

export const Header = ({
  isLogged,
  className,
  ...props
} : React.HTMLAttributes<HTMLDivElement> & { isLogged: boolean }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-[1] bg-background flex justify-between items-center border-b p-4 h-header',
        // 'sticky top-0 z-[1] bg-background grid grid-cols-3 place-content-center border-b p-4 h-header',
        className
      )}
      {...props}
    >
      <HeaderLeftSide />
      {/* <HeaderCenterSide className='justify-center'/> */}
      <HeaderRightSide isLogged={isLogged} />
    </header>
  );
}
