// components/flight/date-switch-header.tsx
import { Calendar } from "lucide-react";

interface DateSwitchHeaderProps {
  date: string;
}

export function DateSwitchHeader({ date }: DateSwitchHeaderProps) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-sm border shadow-ticket bg-white px-4 py-3">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium">{date}</span>
    </div>
  );
}
