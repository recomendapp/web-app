import Link from "next/link"

export const WithLink = ({
	href,
	children,
	className,
	...props
  }: {
	href?: string;
	children: React.ReactNode;
	className?: string;
  }) => {
	if (href) {
	  return (
		<Link href={href} className={className} {...props}>
		  {children}
		</Link>
	  );
	}
	
	return <>{children}</>;
  };