import {useState,useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const[isPending,setIsPanding] = useState(true);
    const[error,setError]=useState(null);
    useEffect(() => {
        setTimeout(()=>{
            fetch(url)
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
                setIsPanding(false);
                setError(err.message);
            })
            })
    }, [url] );
    return { data, isPending, error};
}

export default useFetch;