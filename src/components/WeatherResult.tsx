import { Card } from "@/components/ui/card";
import sunnyImg from "@/assets/sunny.jpg";
import rainyImg from "@/assets/rainy.jpg";
import cloudyImg from "@/assets/cloudy.jpg";
import stormyImg from "@/assets/stormy.jpg";
import verySunnyImg from "@/assets/very-sunny.jpg";

interface WeatherResultProps {
  condition: string;
  confidence: number;
  score: number;
}

const weatherImages: Record<string, string> = {
  "very_sunny": verySunnyImg,
  "sunny": sunnyImg,
  "cloudy": cloudyImg,
  "rainy": rainyImg,
  "stormy": stormyImg,
};

const weatherEmojis: Record<string, string> = {
  "very_sunny": "☀️",
  "sunny": "🌤️",
  "cloudy": "☁️",
  "rainy": "🌧️",
  "stormy": "⛈️",
};

const weatherLabels: Record<string, string> = {
  "very_sunny": "Very Sunny",
  "sunny": "Sunny",
  "cloudy": "Cloudy",
  "rainy": "Rainy",
  "stormy": "Stormy",
};

const weatherGradients: Record<string, string> = {
  "very_sunny": "bg-gradient-sunny",
  "sunny": "bg-gradient-sunny",
  "cloudy": "bg-gradient-cloudy",
  "rainy": "bg-gradient-rainy",
  "stormy": "bg-gradient-stormy",
};

export const WeatherResult = ({ condition, confidence, score }: WeatherResultProps) => {
  const weatherKey = condition.toLowerCase().replace(" ", "_");
  const image = weatherImages[weatherKey];
  const emoji = weatherEmojis[weatherKey];
  const label = weatherLabels[weatherKey];
  const gradient = weatherGradients[weatherKey];

  return (
    <Card className="overflow-hidden border-2 shadow-lg animate-slide-in">
      <div className={`${gradient} p-6 text-white`}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-5xl animate-float">{emoji}</span>
          <h2 className="text-4xl font-bold">{label}</h2>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">Confidence: {confidence.toFixed(1)}%</p>
          <p className="text-sm opacity-90 mt-1">Weather Score: {score.toFixed(1)}</p>
        </div>
      </div>
      
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 bg-card">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <p className="font-semibold text-muted-foreground">Prediction</p>
            <p className="text-lg font-bold text-foreground mt-1">{label}</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <p className="font-semibold text-muted-foreground">Accuracy</p>
            <p className="text-lg font-bold text-primary mt-1">{confidence.toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
