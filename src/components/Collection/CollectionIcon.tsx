import React from "react";

const CollectionIcon = ({
	children,
	from,
	to,
} : {
	children: React.ReactNode;
	from: string;
	to: string;
}) => {
	return (
	  <div
		style={{
		  backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
		}}
		className={`w-full rounded-md flex items-center justify-center aspect-square`}
	  >
		{children}
	  </div>
	);
}

export default CollectionIcon;