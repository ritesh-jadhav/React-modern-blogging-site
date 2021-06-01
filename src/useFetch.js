import {useState,useEffect} from 'react';

const useFetch = (url) => {
const abortCon = new AbortController();

    const [data, setData] = useState(null);
    const[isPending,setIsPanding] = useState(true);
    const[error,setError]=useState(null);
    useEffect(() => {
        setTimeout(()=>{
            fetch(url,{ signal : abortCon.signal })
            .then(res =>{
                if (!res.ok)
                {
                    throw Error ('could not fetch the data for that resorces') ;
                }
                return res.json();
            }).then(data =>{
                setData(data);
                setIsPanding(false);
                setError(null);
            },1000)
            .catch(err => {
                if ( err.name==="AbortError")
                {
                    console.log('Background fetch aborted') ; 
                }
                else {
                setIsPanding(false);
                setError(err.message);
                }
            })
            })
            return () => abortCon.abort();
    }, [url] );
    return { data, isPending, error};
}

export default useFetch;