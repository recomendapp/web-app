const SidebarCollectionContainerIcon = ({
	children,
	from,
	to,
} : {
	children: React.ReactNode;
	from?: string;
	to?: string;
}) => {
	return (
	  <div
		style={{
		  backgroundImage: `${from && to && `linear-gradient(to top right, ${from}, ${to})`}`,
		}}
		className={`
		  w-12 relative overflow-hidden
		  group-[[data-collapsed=true]]:w-10
		  aspect-square rounded-md flex items-center justify-center shrink-0 text-white`}
	  >
		{children}
	  </div>
	);
}

export default SidebarCollectionContainerIcon;
  