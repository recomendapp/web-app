"use client"
export default function HelloNerd() {
    function recomend() {
        const v = process.env.NEXT_PUBLIC_APP_VERSION ? `v${process.env.NEXT_PUBLIC_APP_VERSION}` : '';
        console.log(`\n%cRECOMEND ${v} 🎥`, 'color:#FFE974; background:#000; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #FFE974; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #948951;');
        
    }
    function tables() {
        console.table({
            'Time Stamp': new Date().getTime(),
            'OS': navigator['platform'],
            'Browser': navigator['appCodeName'],
            'Language': navigator['language'],
        });
    }

    function init() {
        recomend();
        tables();        
    }

    init();
    return (
        <></>
    )
}