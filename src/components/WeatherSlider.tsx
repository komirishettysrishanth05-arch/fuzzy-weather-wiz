import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface WeatherSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  icon: string;
}

export const WeatherSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  icon,
}: WeatherSliderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-foreground flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {label}
        </Label>
        <span className="text-lg font-bold text-primary">
          {value} {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};
