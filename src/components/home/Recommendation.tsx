import type {  RecommendationTourResponse, Tour } from "@/types/home.type";
import SectionHeader from "../ui/SectionHeader"
import TourCard from "./TourCard"
import { useQuery } from "@tanstack/react-query";
import { recommendationTours } from "@/services/home";
import { TourCardSkeleton } from "@/pages/favourite/TourCardSkeleton";


const Recommendation = () => {
   
    const { data, isLoading } = useQuery<RecommendationTourResponse>({ queryKey: ["recommendation-tours"], queryFn: recommendationTours })
    console.log('data', data)
    const trips:Tour[]  = data?.data ?? [];

    return (
        <section className="flex flex-col gap-3">
            <SectionHeader title="Recommendation" path="/" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading ? [1, 2, 3, 4].map((_, i) => {
                    return (
                        <TourCardSkeleton key={i} />
                    )
                }) :
                    trips.map((trip, index) => {
                        return <TourCard isFavorite={trip.is_favourite} variant="recommendation" key={index} image={trip.image} title={trip.title} rating={trip.rating_average} location={trip.location} />
                    })
                }

            </div>
        </section>
    )
}

export default Recommendation
