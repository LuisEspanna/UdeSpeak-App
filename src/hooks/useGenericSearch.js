import { useState } from "react";



export default function useGenericSearch() {
    const [results, setResults] = useState([]);
    const [localItems, setLocalItems] = useState([]);
    
    const setItems = (items) => {
        setLocalItems(items);
        setResults(items);
    }

    const search = (text) => {
        let aux = [];
        // TODO: Eliminar de la busqueda a IDs y URLs 
        if(text.length > 0){
            aux = localItems.map((item)=>{
                for (var clave in item){
                    if (item.hasOwnProperty(clave)) {
                        if(JSON.stringify(item[clave]).toLocaleLowerCase().includes(text.toLocaleLowerCase())){
                            return item;
                        }
                    }
                }
            }).filter(item => item !== null && item !== undefined);
            
            setResults(aux);
        } else {
            setResults(localItems);
        }
    }

    return {
        results,
        search,
        setItems
    }
}
