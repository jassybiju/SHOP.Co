import { useRef } from "react";

export const useDebounce = (cb, delay) => {
	const timeoutId = useRef(cb);

	return function (...args) {
		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}
        timeoutId.current = setTimeout(()=>cb(...args),delay)
	};

};
