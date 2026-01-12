// src/services/hotelApi.ts
const BASE_URL = 'https://round8-safarni-team-three.huma-volve.com/api';

export const hotelApi = {
  // 1. جلب كل الفنادق
  getAllHotels: async (page: number = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/hotel?page=${page}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }
  },

  // 2. جلب فندق محدد بواسطة ID
  getHotelById: async (id: string | number) => {
    try {
      const response = await fetch(`${BASE_URL}/hotel/${id}`);
      if (!response.ok) throw new Error('Hotel not found');
      return await response.json();
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      throw error;
    }
  },

  // 3. البحث عن الفنادق
  searchHotels: async (query: string) => {
    try {
      const response = await fetch(`${BASE_URL}/hotel?search=${query}`);
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error("Error searching hotels:", error);
      throw error;
    }
  },

  // 4. إضافة تقييم جديد
  addHotelReview: async (hotelId: string | number, reviewData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/hotel/${hotelId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error('Failed to add review');
      return await response.json();
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },

  // 5. تمييز التقييم كمفيد
  markHelpful: async (reviewId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/${reviewId}/helpful`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to mark helpful');
      return await response.json();
    } catch (error) {
      console.error("Error marking review as helpful:", error);
      throw error;
    }
  },



   createBooking: async (bookingData: {
  room_id: number;
  check_in: string;
  check_out: string;
  adults: number;
  children?: number;
  infants?: number;
  comment?: string;
}) => {
  const response = await fetch(`${BASE_URL}/hotel-bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data; 
  }

  return data;
}
,
  checkBookingAPIs: async () => {
    const endpoints = [
      '/hotel-bookings',
      '/hotel/bookings', 
      '/bookings',
      '/booking',
      '/reservations'
    ];

    const results = [];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: 'OPTIONS',
        });
        
        results.push({
          endpoint,
          exists: response.ok,
          status: response.status,
          statusText: response.statusText
        });
      } catch (error) {
        results.push({
          endpoint,
          exists: false,
        });
      }
    }
    
    return results;
  }
};