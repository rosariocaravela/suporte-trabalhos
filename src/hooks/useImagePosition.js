import { useEffect, useRef, useState } from "react";

const useImagePosition = (selectedImage) => {
    const [imagePosition, setImagePosition] = useState({
        x: 50,
        y: 50,
    });

    const imageFrameRef = useRef(null);
    const dragStateRef = useRef(null);

    useEffect(() => {
        setImagePosition({
            x: 50,
            y: 50,
        });
    }, [selectedImage]);

    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };

    const handlePointerDown = (event) => {
        if (!imageFrameRef.current) return;

        const rect =
            imageFrameRef.current.getBoundingClientRect();

        dragStateRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            startPosX: imagePosition.x,
            startPosY: imagePosition.y,
            rect,
        };

        event.preventDefault();
    };

    const handlePointerMove = (event) => {
        if (!dragStateRef.current) return;

        const {
            startX,
            startY,
            startPosX,
            startPosY,
            rect,
        } = dragStateRef.current;

        const deltaX =
            ((event.clientX - startX) / rect.width) * 100;

        const deltaY =
            ((event.clientY - startY) / rect.height) * 100;

        setImagePosition({
            x: clamp(startPosX + deltaX * 1.2, 10, 90),
            y: clamp(startPosY + deltaY * 1.2, 10, 90),
        });
    };

    const handlePointerUp = () => {
        dragStateRef.current = null;
    };

    return {
        imagePosition,
        imageFrameRef,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    };
};

export default useImagePosition;