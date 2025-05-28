import { useEffect, useRef, useState } from "react";
import { SHARE_CONSTANTS, ShareControllerProps } from "./ShareController";
import { Media } from "@/types/type.db";
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from "konva";
import URLImage from "@/lib/konva/URLImage";
import { siteConfig } from "@/config/site";

interface ShareControllerMediaProps extends ShareControllerProps {
	media: Media;
}

const CANVAS_WIDTH = 1206;
const CANVAS_HEIGHT = 2144;

export const ShareControllerMedia: React.FC<ShareControllerMediaProps> = ({ media, onFileReady }) => {
	const expectedLayers = [
		media.avatar_url,
		media.backdrop_url,
		SHARE_CONSTANTS.appLogo.src
	].filter(Boolean).length;
	const [loadedLayers, setLoadedLayers] = useState(0);
	const sceneWidth = CANVAS_WIDTH;
	const sceneHeight = CANVAS_HEIGHT;
	const [stageSize, setStageSize] = useState({
		width: sceneWidth,
		height: sceneHeight,
		scale: 1
	});
	// REFS
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<Konva.Stage>(null);
	const titleRef = useRef<Konva.Text>(null);
	const appLogoRef = useRef<Konva.Image>(null);

	// LAYERS
	const offsetFromTop = 150;
	const poster = {
		width: sceneWidth * 0.6,
		height: (sceneWidth * 0.6) * 1.5,
		x: sceneWidth / 2 - (sceneWidth * 0.6) / 2,
		y: (sceneHeight / 2 - ((sceneWidth * 0.6) * 1.5) / 2) - offsetFromTop,
	}
	const title = {
		fontSize: 45,
		fontFamily: 'Arial',
		fontStyle: 'bold',
		lineHeight: 1.2,
		lineClamp: 3,
	}
	const mainCredits = {
		fontSize: 30,
		fontFamily: 'Arial',
		fontStyle: 'normal',
		lineHeight: 1.2,
		lineClamp: 2,
	}
	const gapPoster = 50;
	const gapTitle = 25;

	const updateSize = () => {
		if (!containerRef.current) return;
		
		const containerWidth = containerRef.current.offsetWidth;
		const containerHeight = containerRef.current.offsetHeight;

		const scaleX = containerWidth / sceneWidth;
		const scaleY = containerHeight / sceneHeight;
		const scale = Math.min(scaleX, scaleY);

		setStageSize({
			width: sceneWidth * scale,
			height: sceneHeight * scale,
			scale,
		});
	};

	useEffect(() => {
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, []);

	useEffect(() => {
		if (loadedLayers === expectedLayers && stageRef.current) {
			console.log(`All layers loaded: ${loadedLayers}/${expectedLayers}`);
			const timeout = setTimeout(() => {
				const uri = stageRef.current?.toDataURL({
					pixelRatio: 1 / stageSize.scale,
					mimeType: 'image/jpeg',
				});
				if (!uri) return;
				fetch(uri)
					.then(res => res.blob())
					.then(blob => {
						const file = new File([blob], `${siteConfig.name}_share_media_${media.id}.jpg`, { type: 'image/jpeg' });
						onFileReady?.(file);
					});
				}, 100);
			return () => clearTimeout(timeout);
		} else {
			console.log(`Waiting for layers to load: ${loadedLayers}/${expectedLayers}`);
		}
	}, [loadedLayers, expectedLayers, stageRef.current, onFileReady]);
	return (
	<div 
      ref={containerRef} 
	  className="w-full max-h-80 flex items-center justify-center"
    >
		<Stage
		ref={stageRef}
		width={stageSize.width} 
		height={stageSize.height}
		scaleX={stageSize.scale}
		scaleY={stageSize.scale}
		className="rounded-lg overflow-hidden"
		>
			<Layer>
				<Rect x={0} y={0} width={sceneWidth} height={sceneHeight} fill="#1e1e1e" />
				{media.backdrop_url && (
					<URLImage
					src={media.backdrop_url}
					width={sceneWidth}
					height={sceneHeight}
					filters={[Konva.Filters.Brighten, Konva.Filters.Blur]}
					blurRadius={20}
					brightness={-0.6}
					objectFit="object-cover"
					onLoad={() => setLoadedLayers(prev => prev + 1)}
					/>
				)}
			</Layer>
			<Layer>
				{media.avatar_url && (
					<URLImage
					src={media.avatar_url}
					width={poster.width}
					// height={poster.height}
					x={poster.x}
					y={poster.y}
					cornerRadius={poster.width / 25}
					shadowBlur={poster.width / 5}
					onLoad={() => setLoadedLayers(prev => prev + 1)}
					/>
				)}
				{/* set under poster */}
				<Group
				x={SHARE_CONSTANTS.padding}
				y={sceneHeight / 2 + poster.height / 2 + gapPoster - offsetFromTop}
				>
					{media.title && (
						<Text
						ref={titleRef}
						text={media.title}
						// text={`${media.title}${media.title}${media.title}${media.title}${media.title}`}
						width={sceneWidth - SHARE_CONSTANTS.padding * 2}
						fontSize={title.fontSize}
						fontFamily={title.fontFamily}
						fontStyle={title.fontStyle}
						fill="white"
						align="center"
						verticalAlign="top"
						lineHeight={title.lineHeight}
						ellipsis
						// height={title.fontSize * title.lineClamp * title.lineHeight}
						/>
					)}
					{(media.main_credit && media.main_credit?.length > 0) && (
						<Text
						text={media.main_credit.map(credit => credit.title).join(', ')}
						width={sceneWidth - SHARE_CONSTANTS.padding * 2}
						x={0}
						y={titleRef.current ? titleRef.current.height() + gapTitle : 0}
						fontSize={mainCredits.fontSize}
						fontFamily={mainCredits.fontFamily}
						fontStyle={mainCredits.fontStyle}
						fill="white"
						align="center"
						verticalAlign="top"
						lineHeight={mainCredits.lineHeight}
						ellipsis
						height={mainCredits.fontSize * mainCredits.lineClamp * mainCredits.lineHeight}
						/>
					)}
				</Group>
			</Layer>
			<Layer>
				<URLImage
				ref={appLogoRef}
				src={SHARE_CONSTANTS.appLogo.src}
				width={SHARE_CONSTANTS.appLogo.width}
				x={(sceneWidth - SHARE_CONSTANTS.appLogo.width) / 2}
				y={sceneHeight - (appLogoRef.current?.height() ? appLogoRef.current.height() + SHARE_CONSTANTS.appLogo.gapFromBottom : SHARE_CONSTANTS.appLogo.gapFromBottom) - SHARE_CONSTANTS.padding}
				onLoad={() => setLoadedLayers(prev => prev + 1)}
				/>
			</Layer>
		</Stage>
	</div>
	)
};
