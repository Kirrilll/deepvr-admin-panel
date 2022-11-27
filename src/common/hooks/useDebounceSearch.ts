import { ValueType } from "rc-cascader/lib/Cascader";
import { useState, useRef, useMemo } from "react";
import { Client } from "../../entities/Order";
import { FetchingStatus } from "../../features/timeline/redux/slice";


const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

interface Args<T> {
    timeout: number,
    fetchCallback: (value: string) => Promise<T[]>
}


const useDebounceSearch = <ResponceType>(args: Args<ResponceType>) => {

    const {timeout, fetchCallback} = args;

    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponceType[]>([]);
    const [isEmpty, setEmpty] = useState<boolean>(false);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setLoading(true);

            fetchCallback(value).then(data => {
                if (fetchId !== fetchRef.current)  return;
                if(data.length === 0) setEmpty(true);
                else setEmpty(false)
                setData(data);
                setLoading(false);
            });
        };

        return debounce(loadOptions, timeout);
    }, [data, timeout]);

    return {data, isLoading, isEmpty, debounceFetcher};

}


export default useDebounceSearch;