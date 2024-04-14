import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Cursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const updatePosition = (e: any) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updatePosition);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
        };
    }, []);

    return (
        <div
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            className="fixed w-7 h-7 transform -translate-x-1/2 -translate-y-1/2  rounded-full pointer-events-none z-50 duration-150"
        >
            <Image src="/image.png" alt="Cursor" width={25} height={25} />
        </div>
    );
}
