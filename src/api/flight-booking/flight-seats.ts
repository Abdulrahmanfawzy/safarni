import api from "@/api/axios";

export const getFlightSeats = (flightId: number) => {
  return api.get(`flight-seats/${flightId}`);
};
