// src/pages/HotelPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentHotel } from '../../store/slices/hotelSlice';
import HotelCard from "@/components/hotel/HotelCard";
import { hotelApi } from '../../services/hotelApi'; 

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string | null;
  content_info?: string;
  pricePerNight?: number;
}

interface HotelResponse {
  data: Hotel[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  status: string;
  message: string;
}

const HotelPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const fetchHotels = async () => {
    setLoading(true);
    setIsSearching(false);
    try {
      const response = await hotelApi.getAllHotels(page);
      const hotelData: HotelResponse = response;
      
      if (hotelData.status === 'success' && hotelData.data) {
        const formattedHotels = hotelData.data.map(hotel => ({
          ...hotel,
          image: hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          pricePerNight: Math.floor(Math.random() * 200) + 100,
        }));
        
        setHotels(formattedHotels);
        setTotalPages(hotelData.meta.last_page);
        localStorage.setItem('hotelsList', JSON.stringify(formattedHotels));
      } else {
        throw new Error(hotelData.message || 'Failed to load hotels');
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching hotels:', err);
      setError(err.message || "Failed to load hotels");
      
      const savedHotels = localStorage.getItem('hotelsList');
      if (savedHotels) {
        const parsedHotels = JSON.parse(savedHotels);
        setHotels(parsedHotels);
        setTotalPages(Math.ceil(parsedHotels.length / 10));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearching(false);
      fetchHotels();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    
    try {
      const response = await hotelApi.searchHotels(searchQuery.trim());
      
      const hotelData: HotelResponse = response;
      
      if (hotelData.status === 'success' && hotelData.data) {
        const formattedHotels = hotelData.data.map(hotel => ({
          ...hotel,
          image: hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          pricePerNight: Math.floor(Math.random() * 200) + 100,
        }));
        
        setHotels(formattedHotels);
        setTotalPages(hotelData.meta?.last_page || 1);
        setPage(1);
      } else {
        throw new Error(hotelData.message || 'Search returned no results');
      }
      setError(null);
    } catch (err: any) {
      console.error('Error searching hotels:', err);
      setError(err.message || "Failed to search hotels");
      
      const savedHotels = localStorage.getItem('hotelsList');
      if (savedHotels) {
        const parsedHotels: Hotel[] = JSON.parse(savedHotels);
        const filteredHotels = parsedHotels.filter(hotel =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setHotels(filteredHotels);
        setTotalPages(1);
      } else {
        setHotels([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    fetchHotels();
  };

  const handleHotelClick = (hotel: Hotel) => {
    // حفظ الفندق في Redux قبل التنقل
    dispatch(setCurrentHotel({
      ...hotel,
      amenities: hotel.content_info ? [hotel.content_info] : ['Luxury'],
      gallery: hotel.image ? [hotel.image] : undefined
    }));
    
    navigate(`/hotel/${hotel.id}/about`);
  };

  if (loading && page === 1 && !isSearching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex gap-4 items-center">
          <button onClick={() => navigate('/')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            ←
          </button>
          
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotels by name or location..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            {isSearching && (
              <button 
                type="button"
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isSearching && searchQuery && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : hotels.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  rating={hotel.rating}
                  pricePerNight={hotel.pricePerNight || 150}
                  image={hotel.image || ''}
                  amenities={[hotel.content_info || 'Luxury']}
                  onClick={() => handleHotelClick(hotel)}
                />
              ))}
            </div>
            
            {!isSearching && totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="py-2 text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {isSearching ? 'No hotels found' : 'No hotels available'}
            </h3>
            <p className="mt-1 text-gray-500">
              {isSearching 
                ? 'Try searching with different keywords' 
                : 'Check back later for available hotels'}
            </p>
            {isSearching && (
              <button
                onClick={handleClearSearch}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View all hotels
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPage;