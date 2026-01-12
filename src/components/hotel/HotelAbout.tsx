// src/components/hotel/HotelAbout.tsx
import React from "react";
import { FaBed } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { CiCamera } from "react-icons/ci";
import { BiShapeSquare } from "react-icons/bi";
import { useAppSelector } from "../../hooks/useAppSelector";

interface HotelAboutProps {
  onAddPhoto?: (photo: File) => void;
}

const HotelAbout: React.FC<HotelAboutProps> = ({ onAddPhoto }) => {
  const { currentHotel: hotel } = useAppSelector((state) => state.hotel);

  if (!hotel) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    );
  }

  const handleAddPhoto = () => {
    if (!onAddPhoto) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAddPhoto) {
        onAddPhoto(file);
      }
    };
    
    input.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <FaBed className="w-5 h-5 text-yellow-500" />
          <span className="text-gray-700">
            {hotel.rooms?.length ? `${hotel.rooms.length} beds` : "3 beds"}
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <GiBathtub className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700">
            {"2 baths"}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <BiShapeSquare className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700">
            {"1,848 Sqrt"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Gallery ({hotel.gallery?.length || 0})
        </h2>
        <button
          onClick={handleAddPhoto}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <CiCamera className="h-5 w-5" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          About {hotel.name}
        </h3>
        <p className="text-gray-700 mb-4">{hotel.about || hotel.description || hotel.content_info || "No description available."}</p>
        
        {hotel.amenities && hotel.amenities.length > 0 ? (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full">
                Free WiFi
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full">
                Swimming Pool
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full">
                Restaurant
              </span>
            </div>
          </div>
        )}
        
        {hotel.rooms && hotel.rooms.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Rooms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hotel.rooms.map((room) => (
                <div key={room.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 font-medium">{room.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelAbout;