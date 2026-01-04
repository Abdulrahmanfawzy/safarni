import { CategoryCard } from "./CategoryCard";
import flightImage from "../../assets/flight.jpg";
import carsImage from "../../assets/cars.jpg";
import toursImage from "../../assets/tours.jpg";
import hotelImage from "../../assets/hotel.jpg";

export const CategoriesSection = () => {
  const categories = [
    { image: flightImage, label: "Flight", navigateTo: "Flight_Booking" },
    { image: carsImage, label: "Cars", navigateTo: "Cars_Booking" },
    { image: toursImage, label: "Tours", navigateTo: "Tours_Booking" },
    { image: hotelImage, label: "Hotel", navigateTo: "Hotel_Booking" },
  ];

  const handleCategoryClick = (navigateTo: string) => {
    // Handle navigation - you can implement routing here
    console.log(`Navigate to: ${navigateTo}`);
  };

  return (
    <section
      className="w-full max-w-[1240px] flex flex-col"
      style={{ minHeight: "407.94px", gap: "48px" }}
    >
      {/* Title */}
      <div className="w-full h-auto min-h-[38px]">
        <h2
          className="text-xl sm:text-2xl lg:text-[25px] leading-[100%] font-medium"
          style={{
            fontFamily: "Poppins",
            color: "#111928",
          }}
        >
          Categories
        </h2>
      </div>

      {/* Content */}
      <div
        className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:flex lg:justify-between"
        style={{ minHeight: "321.94073486328125px" }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            image={category.image}
            label={category.label}
            onClick={() => handleCategoryClick(category.navigateTo)}
          />
        ))}
      </div>
    </section>
  );
};
