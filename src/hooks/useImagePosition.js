import { useEffect, useRef, useState } from "react";

export const IMAGE_POSITION_STORAGE_KEY = "professional-image-position";

export const DEFAULT_IMAGE_POSITION = {
    x: 50,
    y: 35,
};

export const getStoredImagePosition = () => {
    try {
        const storedPosition = localStorage.getItem(
            IMAGE_POSITION_STORAGE_KEY,
        );

        return storedPosition
            ? { ...DEFAULT_IMAGE_POSITION, ...JSON.parse(storedPosition) }
            : DEFAULT_IMAGE_POSITION;
    } catch {
        return DEFAULT_IMAGE_POSITION;
    }
};

const useImagePosition = (selectedImage) => {
    const [imagePosition, setImagePosition] = useState(
        getStoredImagePosition,
    );

    const imageFrameRef = useRef(null);
    const dragStateRef = useRef(null);
    const previousImageRef = useRef(selectedImage);

    useEffect(() => {
        if (previousImageRef.current === selectedImage) return;

        setImagePosition({
            ...DEFAULT_IMAGE_POSITION,
        });

        previousImageRef.current = selectedImage;
    }, [selectedImage]);

    useEffect(() => {
        localStorage.setItem(
            IMAGE_POSITION_STORAGE_KEY,
            JSON.stringify(imagePosition),
        );
    }, [imagePosition]);

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