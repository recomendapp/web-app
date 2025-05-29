// import useImage from 'use-image';
// import { Image } from 'react-konva';
// import { forwardRef, useEffect, useMemo, useRef } from 'react';
// import Konva from 'konva';
// import getCrop from './crop';

// interface URLImageProps extends Omit<React.ComponentProps<typeof Image>, 'image'> {
//   src: string;
//   objectFit?: 'object-cover';
//   onLoad?: (image: Konva.Image) => void;
// }
// const URLImage = forwardRef<Konva.Image, URLImageProps>(({ src, height, objectFit = 'object-cover', onLoad, ...rest }, ref) => {
//   const localRef = useRef<Konva.Image>(null);
//   const [image] = useImage(src, 'anonymous');

//   const ratio = useMemo(() => {
//     if (!image || height !== undefined) return -1;
//     return image.height / image.width;
//   }, [image, height]);
  
//   const heightComputed = useMemo(() => {
//     if (ratio === -1) return height;
//     return rest.width * ratio;
//   }, [image, rest.width, height]);

//   const posterCrop = useMemo(() => {
//     if (!image || objectFit !== 'object-cover') return null;
//     return getCrop({
//       image: image,
//       size: {
//         width: rest.width ?? 0,
//         height: height ?? 0,
//       },
//       clipPosition: 'center-middle',
//     });
//   }, [image, rest.width, height, objectFit]);

//   // Combine refs : localRef + forwarded ref
//   useEffect(() => {
//     if (!ref) return;
//     if (typeof ref === 'function') {
//       ref(localRef.current);
//     } else {
//       (ref as React.RefObject<Konva.Image | null>).current = localRef.current;
//     }
//   }, [localRef.current, ref]);

//   useEffect(() => {
//     if (image && localRef.current) {
//       localRef.current.cache();
//       onLoad?.();
//     }
//   }, [image]);

//   return <Image ref={localRef} image={image} height={heightComputed} {...rest} {...posterCrop} />;
// });
// URLImage.displayName = 'URLImage';

// export default URLImage;