"use client"

import { useEffect } from "react"

export default function Ads() {
    useEffect(() => {
        var ads = document.getElementsByClassName('adsbygoogle').length;
        for (var i = 0; i < ads; i++) {
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error(error);
          }
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