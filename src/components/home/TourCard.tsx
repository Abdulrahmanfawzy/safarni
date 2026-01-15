import type { RecommendationCardProps, TourCardProps } from "@/types/home.type";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

type TCardProps = RecommendationCardProps | TourCardProps;

const TourCard = (props: TCardProps) => {
    const { variant, image, location, rating, title, isFavorite } = props;
    return (
        <div className={`relative ${variant === "recommendation" ? "flex flex-col shadow-[0_0_26.37px_rgba(111,111,111,0.25)]" : "flex shadow-lg items-center"} p-4  rounded-3xl   gap-4`}>
            <img src={image} alt="tour image" className={`${variant === "recommendation" ? "w-full h-65.5 rounded-3xl" : "w-37.5 h-37.5 rounded-3xl"} object-cover `} />
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center ">
                    {variant === "tour" ? <h6 className="font-medium text-[#6B7280]">{props.tourType}</h6> : <h6 className="font-medium text-[#6B7280] text-[#111928]">{title}</h6>}
                    <h6 className="font-medium text-[#111928] flex items-center gap-1">
                        <span className="text-[#FCBA42]"><FaStar /></span>{rating}
                    </h6>
                </div>
                {variant === "recommendation" ? <p className="text-[18px] text-[#9CA3AF] flex items-center  gap-1"><span className="text-[25px] text-[#1C64F2]"><IoLocationOutline /></span> {location}</p> : <h6 className="text-[#111928] text-[25px] font-medium capitalize">{location}</h6>}
                {variant === "tour" && (
                    <p className="text-[20px] text-[#6B7280] font-semibold">
                        From <span className="text-[#1C64F2]">{props.price}$</span> Per Person
                    </p>
                )}
            </div>
            <button
                onClick={() => console.log('added to favorite successfully')}
                className={`absolute top-5 ${variant === "recommendation" ? "  right-5" : "left-5"} bg-white p-2 rounded-full  shadow cursor-pointer`}
            >
                <FaHeart
                    className={`text-lg transition ${isFavorite ? "text-red-500" : "text-gray-400"
                        }`}
                />
            </button>
        </div>
    )
}

export default TourCard
