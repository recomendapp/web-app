import { cn } from "@/lib/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { siteConfig } from "@/config/site";
import { Button } from "../ui/button";
import Link from "next/link";

export const WidgetRecomendShowcase = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	if (!siteConfig.features.length) return null;
	return (
		<div className={cn('@container/widget-recomend-showcase space-y-4', className)}>
			<h2 className="text-xl font-semibold">
				Qu&apos;est-ce que c&apos;est ?
			</h2>
			<div
			className={`grid grid-cols-1 gap-4
				${siteConfig.features.length % 2 === 0 ? "@2xl/widget-recomend-showcase:grid-cols-2" : "@2xl/widget-recomend-showcase:grid-cols-1"}
				${siteConfig.features.length % 4 === 0 ? "@4xl/widget-recomend-showcase:grid-cols-4" : "@4xl/widget-recomend-showcase:grid-cols-3"}
			`}
			>
			{siteConfig.features.map((feature, index) => (
				<Card key={index}>
					<CardHeader>
						<CardTitle className="flex gap-2 items-center text-xl">
							<feature.icon className={cn("w-4 text-accent-1", feature.iconClass)} />
							{feature.label}
						</CardTitle>
						<CardDescription className="ml-6">{feature.description}</CardDescription>
					</CardHeader>
				</Card>
			))}
			</div>
			<div className="grid justify-items-center">
				<Button variant="accent-1" className="w-full max-w-lg" asChild>
					<Link href="/auth/login">C&apos;est parti !</Link>
				</Button>
			</div>
		</div>
	);
};