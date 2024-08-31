import {  useEffect, useRef } from "react";



export function useOutSideClick(handler, listenInCapturing=true) {
    const ref = useRef();

    useEffect(()=>{
      function handleClick(e){
        if (ref.current && !ref.current.contains(e.target))
          return handler();
      }
    
    document.addEventListener("click", handleClick,listenInCapturing)
    return ()=> document.removeEventListener("click",handleClick,listenInCapturing)
    },[handler])
    
    return {ref}
}


