import React from "react";

const CollectionIcon = ({
	children,
	from,
	to,
	canHover = true,
} : {
	children: React.ReactNode;
	from: string;
	to: string;
	canHover?: boolean;
}) => {
	return (
	  <div
		style={{
		  backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
		}}
		className={`relative w-full rounded-md flex items-center justify-center aspect-square`}
	  >
		{children}
		{canHover && <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />}
	  </div>
	);
}

export default CollectionIcon;