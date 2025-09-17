import { useEffect, useState } from 'react';

const getWindowSize = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
});

export default function useDimensions() {
    const [size, setSize] = useState(getWindowSize());

    useEffect(() => {
        const handleResize = () => setSize(getWindowSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { width, height } = size;
    const isXs = width < 600;
    const isSm = width >= 600 && width < 900;
    const isMd = width >= 900 && width < 1200;
    const isLg = width >= 1200;

    return { width, height, isXs, isSm, isMd, isLg };
}


