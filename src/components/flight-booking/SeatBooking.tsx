import { useState } from "react";

/* ================== Types ================== */

type SeatStatus = "available" | "selected" | "booked";

type Seat = {
  number: number;
  row: number;
  status: SeatStatus;
};

type Row = {
  rowNumber: number;
  seats: Seat[];
};

/* ================== Mock Data ================== */

const initialRows: Row[] = [
  {
    rowNumber: 1,
    seats: [
      { number: 1, row: 1, status: "available" },
      { number: 2, row: 1, status: "booked" },
      { number: 3, row: 1, status: "available" },
      { number: 4, row: 1, status: "selected" },
      { number: 5, row: 1, status: "available" },
    ],
  },
  {
    rowNumber: 2,
    seats: [
      { number: 6, row: 2, status: "available" },
      { number: 7, row: 2, status: "available" },
      { number: 8, row: 2, status: "booked" },
      { number: 9, row: 2, status: "available" },
      { number: 10, row: 2, status: "available" },
    ],
  },
  {
    rowNumber: 2,
    seats: [
      { number: 6, row: 2, status: "available" },
      { number: 7, row: 2, status: "available" },
      { number: 8, row: 2, status: "booked" },
      { number: 9, row: 2, status: "available" },
      { number: 10, row: 2, status: "available" },
    ],
  },
  {
    rowNumber: 2,
    seats: [
      { number: 6, row: 2, status: "available" },
      { number: 7, row: 2, status: "available" },
      { number: 8, row: 2, status: "booked" },
      { number: 9, row: 2, status: "available" },
      { number: 10, row: 2, status: "available" },
    ],
  },
  {
    rowNumber: 2,
    seats: [
      { number: 6, row: 2, status: "available" },
      { number: 7, row: 2, status: "available" },
      { number: 8, row: 2, status: "booked" },
      { number: 9, row: 2, status: "available" },
      { number: 10, row: 2, status: "available" },
    ],
  },
  {
    rowNumber: 2,
    seats: [
      { number: 6, row: 2, status: "available" },
      { number: 7, row: 2, status: "available" },
      { number: 8, row: 2, status: "booked" },
      { number: 9, row: 2, status: "available" },
      { number: 10, row: 2, status: "available" },
    ],
  },
];

/* ================== Seat Component ================== */

interface SeatProps {
  seat: Seat;
  onSelect: (seat: Seat) => void;
}

const Seat = ({ seat, onSelect }: SeatProps) => {
  const isBooked = seat.status === "booked";
  const isSelected = seat.status === "selected";

  return (
    <button
      disabled={isBooked}
      onClick={() => onSelect(seat)}
      className={`
        h-10 w-10 rounded-md border
        flex items-center justify-center
        text-sm font-medium transition
        ${
          isBooked
            ? "bg-gray-200 text-black cursor-not-allowed"
            : isSelected
            ? "bg-green-500 text-black border-green-500"
            : "bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
        }
      `}
    >
      {seat.number}
    </button>
  );
};

/* ================== Main Component ================== */

export default function SeatBooking() {
  const [rows, setRows] = useState<Row[]>(initialRows);

  const handleSelectSeat = (selectedSeat: Seat) => {
    setRows(prev =>
      prev.map(row => ({
        ...row,
        seats: row.seats.map(seat => {
          if (seat.status === "booked") return seat;

          if (
            seat.number === selectedSeat.number &&
            seat.row === selectedSeat.row
          ) {
            return {
              ...seat,
              status: seat.status === "selected" ? "available" : "selected",
            };
          }

          return {
            ...seat,
            status: seat.status === "selected" ? "available" : seat.status,
          };
        }),
      })),
    );
  };

  return (
    <div className="space-y-6">
      {rows.map(row => (
        <div key={row.rowNumber}>
          <div className="mb-2 text-xs text-muted-foreground">
            Row {row.rowNumber}
          </div>

          <div className="grid grid-cols-7 gap-5">
            {/* Left seats */}
            {row.seats.slice(0, 2).map(seat => (
              <Seat
                key={seat.number}
                seat={seat}
                onSelect={handleSelectSeat}
              />
            ))}

            {/* Aisle */}
            <div className="col-span-2" />

            {/* Right seats */}
            {row.seats.slice(2).map(seat => (
              <Seat
                key={seat.number}
                seat={seat}
                onSelect={handleSelectSeat}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
