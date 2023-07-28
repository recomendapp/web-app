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
            <ins className="adsbygoogle overflow-hidden rounded-md"
                data-ad-client="ca-pub-1380362797599640"
                data-ad-slot="9520100200"
                style={{ display: "block"}}
                data-ad-format="auto"
                data-full-width-responsive="true"
            >
            </ins>     
    )
}