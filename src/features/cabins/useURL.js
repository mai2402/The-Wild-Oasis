import { useSearchParams } from "react-router-dom";


 export function useURL(filterField) {
    const [searchParams,setSearchParams] = useSearchParams()
   
    function handleChange(value){
         searchParams.set(filterField,value)
         if (searchParams.get("page")) searchParams.set("page",1) 
         setSearchParams(searchParams);
    }

    return {handleChange,searchParams}
}


