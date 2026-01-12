// src/components/hotel/HotelGallery.tsx
import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useAppSelector } from "../../hooks/useAppSelector";

interface HotelGalleryProps {
  onAddPhoto?: (photo: File) => void;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ onAddPhoto }) => {
  const { currentHotel: hotel } = useAppSelector((state) => state.hotel);
  const [selectedImage, setSelectedImage] = useState<string>(
    hotel?.gallery?.[0] || ""
  );

  const handleAddPhoto = () => {
    if (!onAddPhoto) return;
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAddPhoto) {
        onAddPhoto(file);
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
      }
    };

    input.click();
  };

  if (!hotel?.gallery?.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Gallery ({hotel.gallery.length})
        </h2>

        <button
          onClick={handleAddPhoto}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
        >
          <CiCamera className="h-5 w-5" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt="Hotel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {hotel.gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative h-20 rounded-lg overflow-hidden ${
                selectedImage === image
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;