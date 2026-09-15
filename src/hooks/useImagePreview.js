import { useState } from "react";

const useImagePreview = (defaultImage = null) => {
    const [selectedImage, setSelectedImage] = useState(defaultImage);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            setSelectedImage(defaultImage);
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setSelectedImage(previewUrl);

        event.target.value = "";
    };

    return {
        selectedImage,
        handleImageChange,
    };
};

export default useImagePreview;