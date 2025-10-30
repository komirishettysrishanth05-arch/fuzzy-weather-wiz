import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeatherSlider } from "@/components/WeatherSlider";
import { WeatherResult } from "@/components/WeatherResult";
import { LocationSelector } from "@/components/LocationSelector";
import { toast } from "sonner";
import { Cloud, Calendar } from "lucide-react";
import weatherMap from "@/assets/weather-map.png";

const Index = () => {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [windSpeed, setWindSpeed] = useState(15);
  const [cloudCover, setCloudCover] = useState(30);
  const [pressure, setPressure] = useState(1013);
  const [result, setResult] = useState<{
    condition: string;
    confidence: number;
    score: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [location, setLocation] = useState("amaravati");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const predictWeather = async () => {
    setLoading(true);
    try {
      // TODO: Replace with your FastAPI endpoint
      const API_URL = "YOUR_FASTAPI_ENDPOINT_HERE";
      const API_KEY = "YOUR_API_KEY_HERE";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          temperature,
          humidity,
          wind_speed: windSpeed,
          cloud_cover: cloudCover,
          pressure,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      
      // Expected response format from your FastAPI backend:
      // { condition: "sunny", confidence: 85.5, score: 35.2 }
      setResult(data);
      toast.success("Weather prediction complete!");
    } catch (error) {
      console.error("Prediction error:", error);
      
      // Mock prediction for demonstration (remove when connecting to real API)
      const mockScore = 
        temperature * 0.5 + 
        humidity * 0.3 + 
        windSpeed * 0.2 + 
        (100 - cloudCover) * 0.4 +
        (pressure - 1000) * 0.1;
      
      let condition = "sunny";
      let confidence = 75;
      
      if (mockScore < 20) {
        condition = "very_sunny";
        confidence = 90;
      } else if (mockScore < 40) {
        condition = "sunny";
        confidence = 85;
      } else if (mockScore < 60) {
        condition = "cloudy";
        confidence = 80;
      } else if (mockScore < 80) {
        condition = "rainy";
        confidence = 85;
      } else {
        condition = "stormy";
        confidence = 90;
      }
      
      setResult({
        condition,
        confidence,
        score: mockScore,
      });
      
      toast.info("Using mock data. Connect your FastAPI backend to get real predictions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Header Section */}
      <header className="bg-primary/10 backdrop-blur-md border-b border-border/50 sticky top-0 z-10 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <LocationSelector value={location} onChange={setLocation} />
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary w-5 h-5" />
                <span className="text-sm text-muted-foreground">{formatDate(currentDate)}</span>
              </div>
              <div className="text-sm font-mono text-primary">
                {formatTime(currentDate)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 animate-fade-in delay-200">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 space-y-4 animate-slide-in-bottom">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="w-12 h-12 text-primary animate-float" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Welcome to Weather Prediction Page!
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Check your place prediction easily!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in delay-300">
            {/* Input Section */}
            <Card className="p-6 md:p-8 shadow-card hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="text-primary">⚙️</span>
                Input Parameters
              </h2>
              
              <div className="space-y-6">
                <WeatherSlider
                  label="Temperature"
                  value={temperature}
                  onChange={setTemperature}
                  min={0}
                  max={45}
                  unit="°C"
                  icon="🌡️"
                />
                
                <WeatherSlider
                  label="Humidity"
                  value={humidity}
                  onChange={setHumidity}
                  min={0}
                  max={100}
                  unit="%"
                  icon="💧"
                />
                
                <WeatherSlider
                  label="Wind Speed"
                  value={windSpeed}
                  onChange={setWindSpeed}
                  min={0}
                  max={100}
                  unit="km/h"
                  icon="🌬️"
                />
                
                <WeatherSlider
                  label="Cloud Coverage"
                  value={cloudCover}
                  onChange={setCloudCover}
                  min={0}
                  max={100}
                  unit="%"
                  icon="☁️"
                />
                
                <WeatherSlider
                  label="Pressure"
                  value={pressure}
                  onChange={setPressure}
                  min={950}
                  max={1050}
                  unit="hPa"
                  icon="📈"
                />
              </div>

              <Button
                onClick={predictWeather}
                disabled={loading}
                className="w-full mt-8 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                {loading ? (
                  <>
                    <Cloud className="mr-2 h-5 w-5 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Cloud className="mr-2 h-5 w-5" />
                    Predict Weather
                  </>
                )}
              </Button>
            </Card>

            {/* Result Section */}
            <div>
              {result ? (
                <WeatherResult
                  condition={result.condition}
                  confidence={result.confidence}
                  score={result.score}
                />
              ) : (
                <Card className="p-12 h-full flex items-center justify-center shadow-card">
                  <div className="text-center space-y-4">
                    <Cloud className="w-24 h-24 text-muted-foreground/30 mx-auto animate-pulse-glow" />
                    <h3 className="text-xl font-semibold text-muted-foreground">
                      Enter parameters and click predict
                    </h3>
                    <p className="text-sm text-muted-foreground/70">
                      Adjust the sliders and get instant weather predictions
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Weather Map Background Section */}
      <footer className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${weatherMap})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="w-full text-center">
            <p className="text-sm text-foreground/80 font-medium backdrop-blur-sm bg-background/30 inline-block px-6 py-2 rounded-full">
              Powered by Fuzzy Logic Weather Prediction System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
