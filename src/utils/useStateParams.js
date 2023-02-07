import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// adpted to use useSearchParams from https://pierrehedkvist.com/posts/react-state-url
export default function useStateParams(initialState, paramsName, serialize, deserialize) {
    const [searchParams, setSearchParams] = useSearchParams();

    const existingValue = searchParams.get(paramsName);
    const _a = useState(existingValue ? deserialize(existingValue) : initialState), state = _a[0], setState = _a[1];

    useEffect(function () {
        // Updates state when user navigates backwards or forwards in browser history
        if (existingValue && deserialize(existingValue) !== state) {
            setState(deserialize(existingValue));
        }
    }, [existingValue]);

    const onChange = function (s) {
        setState(s);
        searchParams.set(paramsName, serialize(s));
        setSearchParams(searchParams);
    };

    return [state, onChange];
}

// example usage
// const [bool, setBool] = useStateParams(
//     false,
//     'boolean',
//     (s) => (s ? 'true' : 'false'),
//     (s) => s === 'true'
// );

// const [slider, setSlider] = useStateParams(
//     10,
//     'slider',
//     (s) => s.toString(),
//     (s) => (Number(s) !== Number.NaN ? Number(s) : 10)
// );