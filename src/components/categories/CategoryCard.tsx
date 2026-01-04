interface CategoryCardProps {
  image: string;
  label: string;
  onClick?: () => void;
}

export const CategoryCard = ({ image, label, onClick }: CategoryCardProps) => {
  return (
    <div
      className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity w-full max-w-[243.9626922607422px] mx-auto"
      style={{ minHeight: "321.94073486328125px", gap: "13.94px" }}
      onClick={onClick}
    >
      <div className="w-full aspect-square max-w-[243.96px] max-h-[243.96px] rounded-full overflow-hidden mx-auto">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className="text-center w-full max-w-[250.9330596923828px] mx-auto"
        style={{
          minHeight: "60px",
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "clamp(24px, 4vw, 40px)",
          lineHeight: "100%",
          color: "#1A56DB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
};
