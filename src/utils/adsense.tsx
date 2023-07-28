"use client"

import { useEffect } from "react"

export default function Ads() {
    useEffect(() => {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error(err);
        }
    }, []);

    return (
        <div className="bg-background rounded-md">
            ADS
            <ins className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client="ca-pub-1380362797599640"
                data-ad-slot="9520100200"
                data-ad-format="auto"
                data-full-width-responsive="true"
            >
            </ins>
        </div>
        
    )
}