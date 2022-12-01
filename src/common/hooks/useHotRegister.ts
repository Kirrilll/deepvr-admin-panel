import React, { useCallback } from 'react';
import api from '../../repositories/Api';

const { hotRegister } = api;

type HotRegCallbackParametrs = Parameters<typeof hotRegister>;
type HotRegReturnType = ReturnType<typeof hotRegister>
type ResponseType = Awaited<HotRegReturnType>['data']

interface HotRegArgs<T> {
    onSuccessfull: (value: T) => void,
    onError: (error: any) => void,
}

const useHotRegister = (args: HotRegArgs<ResponseType>) => {
    const { onSuccessfull, onError } = args;
    const onErrorMemorised = useCallback(onError, [onError]);
    const onSuccessfullMemorised = useCallback(onSuccessfull, [onSuccessfull]);
    return (params: HotRegCallbackParametrs) => hotRegister(params[0], params[1])
        .then((value) => onSuccessfullMemorised(value.data))
        .catch((reason) => onErrorMemorised(reason))
}

export default useHotRegister;