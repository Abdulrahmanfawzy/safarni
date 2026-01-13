import api from "@/api/axios";

export const recommendationTours  = async () => {
    const response = await api('tours/recommended');
    console.log(response.data)
    return response.data;
}

export const avilableTours  = async () => {
    const response = await api('tours/available');
    console.log(response.data)
    return response.data;
}
