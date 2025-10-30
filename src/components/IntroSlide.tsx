import { useEffect } from "react";
import { Cloud, Sparkles } from "lucide-react";

interface IntroSlideProps {
  onComplete: () => void;
}

export const IntroSlide = ({ onComplete }: IntroSlideProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary via-accent to-rainy flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-6 animate-scale-in">
        <div className="relative">
          <Cloud className="w-32 h-32 text-white mx-auto animate-float" />
          <Sparkles className="w-12 h-12 text-accent absolute top-0 right-1/4 animate-pulse" />
          <Sparkles className="w-8 h-8 text-very-sunny absolute bottom-4 left-1/4 animate-pulse delay-150" />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white animate-slide-in-bottom">
          Weather Prediction
        </h1>
        
        <div className="flex items-center justify-center gap-2 animate-fade-in delay-300">
          <div className="h-1 w-16 bg-white/50 rounded-full animate-pulse"></div>
          <p className="text-xl text-white/90 font-medium">Powered by Fuzzy Logic</p>
          <div className="h-1 w-16 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
