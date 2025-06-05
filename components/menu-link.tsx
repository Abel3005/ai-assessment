import Link from "next/link";
import React, { useState } from "react";

export default function MenuLink({href, children, className}:{href:string, children: string, className: string}){
    const [flag, setFlag ] = useState(0);
    return (
        <>
            <Link href={href} className={className} onMouseEnter={()=>{setFlag(1)}}>{children}</Link>
            {flag == 1 && <div></div>}
        </>
            
    ) 
}