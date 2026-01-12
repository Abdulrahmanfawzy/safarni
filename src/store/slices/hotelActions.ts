// src/store/actions/hotelActions.ts
import type { AppDispatch } from "../index";
import {
  addHotelPhoto,
  addReview,
  setHelpful,
  setError,
  addBooking,
  setBookingLoading,
  setBookingError,
} from "../slices/hotelSlice";
import { hotelApi } from "../../services/hotelApi";
import type { ReviewInput, BookingRequest } from "../../types/hotel.types";
import axios from "axios";

export const addHotelReview = (reviewData: ReviewInput) => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const { currentHotel } = getState().hotel;
      if (!currentHotel?.id) return;

      await hotelApi.addHotelReview(currentHotel.id, reviewData);
      dispatch(addReview(reviewData));
    } catch (error) {
      dispatch(setError("Failed to add review"));
      throw error;
    }
  };
};

export const markReviewAsHelpful = (
  reviewId: number,
  currentHelpful: number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await hotelApi.markHelpful(reviewId);
      dispatch(setHelpful({ reviewId, helpful: currentHelpful + 1 }));
    } catch {
      dispatch(setError("Failed to mark review as helpful"));
    }
  };
};

export const uploadHotelPhoto = (photo: File) => {
  return async (dispatch: AppDispatch) => {
    try {
      const photoUrl = URL.createObjectURL(photo);
      dispatch(addHotelPhoto(photoUrl));
      return photoUrl;
    } catch {
      dispatch(setError("Failed to upload photo"));
      throw new Error();
    }
  };
};

// ✅ Booking Action (صح)
export const createHotelBooking = (bookingData: BookingRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setBookingLoading(true));
    dispatch(setBookingError(null));

    try {
      console.log("BOOKING PAYLOAD:", bookingData);

      const response = await hotelApi.createBooking(bookingData);

      dispatch(
        addBooking({
          ...bookingData,
          id: response.data.id,
          status: response.data.booking_status || "pending",
          createdAt: response.data.created_at || new Date().toISOString(),
        })
      );

      return response.data;
    } catch (error: any) {
      // 🔥 هاندلينج Laravel Validation Errors
      if (axios.isAxiosError(error)) {
        const backendError = error.response?.data;

        dispatch(
          setBookingError(
            backendError?.message ||
              backendError?.errors?.room_id?.[0] ||
              backendError?.errors?.check_in?.[0] ||
              backendError?.errors?.check_out?.[0] ||
              backendError?.errors?.adults?.[0] ||
              "Booking failed"
          )
        );
      } else {
        dispatch(setBookingError("Booking failed"));
      }

      throw error;
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};
