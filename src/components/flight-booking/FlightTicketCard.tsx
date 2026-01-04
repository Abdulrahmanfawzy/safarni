import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Layover {
  airport: string;
  duration: string;
}

export interface FlightTicketCardProps {
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  duration: string;
  airline: string;
  price: number;
  currency?: string;
  layover?: Layover;
  className?: string;
  onClick?: () => void;
}

const notchLeft = "inset -4px 0 6px -4px hsl(220 20% 80% / 0.6)";
const notchRight = "inset 4px 0 6px -4px hsl(220 20% 80% / 0.6)";

const FlightTicketCard = ({
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  duration,
  airline,
  price,
  currency = "$",
  layover,
  className,
  onClick,
}: FlightTicketCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-between gap-4 rounded-2xl bg-card px-8 py-5 shadow-ticket transition-all hover:shadow-ticket-hover cursor-pointer border border-border/50",
        className,
      )}
    >
      {/* Left notch */}
      <div
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background "
        style={{ boxShadow: notchLeft }}
      />

      {/* Right notch */}
      <div
        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background "
        style={{ boxShadow: notchRight }}
      />

      {/* Departure */}
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-foreground">
          {departureTime}
        </span>
        <span className="text-lg font-medium text-muted-foreground">
          {departureAirport}
        </span>
        {layover && (
          <span className="mt-2 text-sm text-muted-foreground/70">
            {layover.airport} ({layover.duration})
          </span>
        )}
        <span className="mt-1 text-base font-medium text-foreground">
          {airline}
        </span>
      </div>

      {/* Flight Duration */}
      <div className="flex flex-col items-center gap-1">
        <Plane className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          {duration}
        </span>
      </div>

      {/* Arrival & Price */}
      <div className="flex flex-col items-end">
        <span className="text-2xl font-semibold text-foreground">
          {arrivalTime}
        </span>
        <span className="text-lg font-medium text-muted-foreground">
          {arrivalAirport}
        </span>
        <span className="mt-4 text-2xl font-semibold text-foreground">
          {currency} {price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default FlightTicketCard;
