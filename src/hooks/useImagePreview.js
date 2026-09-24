import { useEffect, useRef, useState } from "react";

const useImagePreview = (defaultImage = null) => {
    const [selectedImage, setSelectedImage] = useState(defaultImage);
    const previewUrlRef = useRef(null);

    const releasePreviewUrl = () => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            releasePreviewUrl();
            setSelectedImage(defaultImage);
            return;
        }

        releasePreviewUrl();
        const previewUrl = URL.createObjectURL(file);
        previewUrlRef.current = previewUrl;

        setSelectedImage(previewUrl);

        event.target.value = "";
    };

    useEffect(() => () => releasePreviewUrl(), []);

    return {
        selectedImage,
        handleImageChange,
    };
};

export default useImagePreview;