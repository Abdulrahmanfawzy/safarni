import type { RecommendationTourResponse, Tour } from "@/types/home.type";
import SectionHeader from "../ui/SectionHeader";
import TourCard from "./TourCard";
import { TourCardSkeleton } from "@/pages/favourite/TourCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { avilableTours } from "@/services/home";

const AvaliableTours = () => {

    const { data, isLoading } = useQuery<RecommendationTourResponse>({ queryKey: ["avilable-tours"], queryFn: avilableTours })
    console.log('data', data)
    const trips: Tour[] = data?.data ?? [];
    return (
        <section className=" flex flex-col gap-3 my-8">
            <SectionHeader title="Available Tours" path="/" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                {isLoading ? [1, 2].map((_, i) => {
                    return (
                        <TourCardSkeleton key={i} />
                    )
                }) :
                    trips.map((trip, index) => {
                        return <TourCard isFavorite={false} variant="tour" price={90} tourType={"full day tour"} key={index} image={trip.image} title={trip.title} rating={trip.rating_average} location={trip.location} />
                    })
                }
            </div>
        </section>
    )
}

export default AvaliableTours
