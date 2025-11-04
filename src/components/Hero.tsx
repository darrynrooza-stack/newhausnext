import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/Hero.webm";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStartTyping(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, startTyping]);

  return <>{displayText}</>;
};

const wordSets = {
  line1: ["Solutions", "Technology", "Systems", "Processing", "Platforms", "Services", "Networks", "Gateways", "Innovation", "Infrastructure"],
  line2: ["Advance", "Grow", "Secure", "Empower", "Optimize", "Simplify", "Scale", "Elevate", "Modernize", "Transform"],
  line3: ["Business", "Enterprise", "Storefront", "Operations", "Revenue", "Brand", "Organization", "Portfolio", "Ecosystem", "Success"]
};

const colors = [
  "text-crimson", 
  "text-cyber-teal", 
  "text-orange-400",
  "text-blue-400",
  "text-purple-400",
  "text-pink-400",
  "text-yellow-400",
  "text-green-400"
];

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWords, setCurrentWords] = useState({ line1: 0, line2: 0, line3: 0 });
  const [previousWords, setPreviousWords] = useState({ line1: -1, line2: -1, line3: -1 });
  const [colorIndices, setColorIndices] = useState({ line1: 0, line2: 1, line3: 2 });
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomIndex = (max: number, previous: number) => {
    let newIndex = Math.floor(Math.random() * max);
    while (newIndex === previous && max > 1) {
      newIndex = Math.floor(Math.random() * max);
    }
    return newIndex;
  };

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setIsLoaded(true), 100);

    // Word cycling every 5 seconds with staggered timing
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Line 2 (That) changes first
      setTimeout(() => {
        setPreviousWords(prev => ({ ...prev, line2: currentWords.line2 }));
        setCurrentWords(prev => ({
          ...prev,
          line2: getRandomIndex(wordSets.line2.length, prev.line2)
        }));
        setColorIndices(prev => ({
          ...prev,
          line2: (prev.line2 + 1) % colors.length
        }));
      }, 300);

      // Line 1 (Payment) changes 1 second after Line 2
      setTimeout(() => {
        setPreviousWords(prev => ({ ...prev, line1: currentWords.line1 }));
        setCurrentWords(prev => ({
          ...prev,
          line1: getRandomIndex(wordSets.line1.length, prev.line1)
        }));
        setColorIndices(prev => ({
          ...prev,
          line1: (prev.line1 + 1) % colors.length
        }));
      }, 1300);

      // Line 3 (Your) changes 0.5s after Line 1
      setTimeout(() => {
        setPreviousWords(prev => ({ ...prev, line3: currentWords.line3 }));
        setCurrentWords(prev => ({
          ...prev,
          line3: getRandomIndex(wordSets.line3.length, prev.line3)
        }));
        setColorIndices(prev => ({
          ...prev,
          line3: (prev.line3 + 1) % colors.length
        }));
        setIsAnimating(false);
      }, 1800);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentWords]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-replacement.png"
        >
          <source src={heroVideo} type="video/webm" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-neutral-dark/30" />
        {/* Gradient overlay for brand effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-transparent to-cyber-teal/20" />
      </div>

      {/* Desktop: Left hemisphere layout, Mobile: Full width */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:grid md:grid-cols-2 md:gap-12 items-center">
        {/* Desktop: Left hemisphere layout, Mobile: Full width */}
        <div className="text-left space-y-6 md:space-y-8 max-w-3xl md:max-w-xl">

        {/* Animated Headline */}
        <div 
          className={`font-ubuntu font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight transition-all duration-700 delay-300 drop-shadow-2xl ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ letterSpacing: '0.05em' }}
        >
          <div className="flex flex-col">
            {/* Payment stacked vertically with its word */}
            <div className="overflow-hidden flex flex-col mb-2">
              <span className="text-white">Payment</span>
              <span 
                className={`inline-block transition-all duration-300 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                } ${colors[colorIndices.line1]}`}
              >
                {wordSets.line1[currentWords.line1]}
              </span>
            </div>
            
            {/* That and Your inline with their words */}
            <div className="overflow-hidden mb-2">
              <span className="text-white">That </span>
              <span 
                className={`inline-block transition-all duration-300 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                } ${colors[colorIndices.line2]}`}
              >
                {wordSets.line2[currentWords.line2]}
              </span>
            </div>
            
            <div className="overflow-hidden">
              <span className="text-white">Your </span>
              <span 
                className={`inline-block transition-all duration-300 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                } ${colors[colorIndices.line3]}`}
              >
                {wordSets.line3[currentWords.line3]}
              </span>
            </div>
          </div>
        </div>

        {/* Subheadline with Typewriter Effect */}
        <p 
          className={`font-montserrat text-lg sm:text-xl md:text-2xl text-neutral-light max-w-2xl transition-all duration-700 delay-500 drop-shadow-lg ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <TypewriterText text="Plug in, play and process." delay={1500} />
        </p>

        {/* Hero Body Text */}
        <p 
          className={`font-montserrat text-sm sm:text-base md:text-lg text-neutral-light/90 max-w-3xl md:max-w-2xl transition-all duration-700 delay-[2200ms] drop-shadow-lg ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Create your business profile in minutes and start accepting cards, ACH, and secure pay links — online, in-store, or on the go. Reduce costs, onboard quickly, and safeguard every transaction with advanced fraud protection and chargeback defense.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`pt-4 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-[2400ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button 
            asChild
            size="lg"
            className="bg-crimson hover:opacity-90 text-white font-montserrat font-semibold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
          >
            <a href="/apply">Apply Now</a>
          </Button>
          <a href="#solutions">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-montserrat font-semibold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Explore Solutions
            </Button>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`md:hidden absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-[2600ms] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronDown className="w-8 h-8 text-cyber-teal animate-bounce" />
        </div>
        </div>
        
        {/* Right side - empty on desktop for hemisphere effect */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
};
