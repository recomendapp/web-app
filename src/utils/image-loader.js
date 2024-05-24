'use client'

export default function myImageLoader({ src, width, quality }) {
    const isLocal = !src.startsWith('http');
    const query = new URLSearchParams();

    const imageOptimizationApi = process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION_URL;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const fullSrc = `${baseUrl}${src}`;

    if (width) query.set('width', width);
    if (quality) query.set('quality', quality);

    if (isLocal && process.env.NODE_ENV === 'development') {
        return src;
    }
    if (isLocal) {
        return `${imageOptimizationApi}/${fullSrc}?${query.toString()}`;
    }
    return `${imageOptimizationApi}/${src}?${query.toString()}`;
}