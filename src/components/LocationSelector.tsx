import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const locations = [
  { value: "amaravati", label: "Amaravati, AP" },
  { value: "hyderabad", label: "Hyderabad, TS" },
  { value: "bangalore", label: "Bangalore, KA" },
  { value: "mumbai", label: "Mumbai, MH" },
  { value: "delhi", label: "Delhi, NCR" },
  { value: "chennai", label: "Chennai, TN" },
  { value: "kolkata", label: "Kolkata, WB" },
  { value: "pune", label: "Pune, MH" },
  { value: "ahmedabad", label: "Ahmedabad, GJ" },
  { value: "jaipur", label: "Jaipur, RJ" },
];

export const LocationSelector = ({ value, onChange }: LocationSelectorProps) => {
  return (
    <div className="flex items-center gap-2 w-full max-w-xs">
      <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary transition-colors">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent className="bg-card/95 backdrop-blur-md border-border z-50">
          {locations.map((location) => (
            <SelectItem 
              key={location.value} 
              value={location.value}
              className="hover:bg-primary/10 cursor-pointer"
            >
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
