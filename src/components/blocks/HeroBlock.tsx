import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Image } from "../ui/Image";
import { Button } from "../ui/Button";

import SliderImg1 from "../../assets/home/slider/slider_img_1.png";
import SliderImg2 from "../../assets/home/slider/slider_img_2.png";
import SliderImg3 from "../../assets/home/slider/slider_img_3.png";

const slides = [
  {
    id: 1,
    number: "01",
    tKey: "manufacturing",
    primaryLink: "/contact",
    secondaryLink: "/services#manufacturing",
    image: SliderImg1,
  },
  {
    id: 2,
    number: "02",
    tKey: "automation",
    primaryLink: "/contact",
    secondaryLink: "/services#welding",
    image: SliderImg2,
  },
  {
    id: 3,
    number: "03",
    tKey: "metrology",
    primaryLink: "/contact",
    secondaryLink: "/services#inspection",
    image: SliderImg3,
  },
];

const AUTOPLAY_DURATION = 8000;

export const HeroBlock = () => {
  const { t } = useTranslation("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax visibility observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax shift
  useEffect(() => {
    if (!isInView) return;
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const updateParallax = () => {
      const { top, height } = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = -top / (height + viewportHeight);
      const shift = progress * height * 0.25;

      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        img.style.transform =
          i === currentSlide ? `translate3d(0, ${shift}px, 0)` : "translate3d(0, 0, 0)";
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSlide, isInView]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const handleManualChange = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  const activeSlideData = slides[currentSlide];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[78vh] lg:min-h-[86vh] flex items-center overflow-hidden bg-primary-950 font-sans py-12 sm:py-16 lg:py-0"
    >
      <div
        className="absolute inset-0 flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full shrink-0">
            <Image
              ref={(el) => {
                imgRefs.current[index] = el;
              }}
              src={slide.image}
              alt={t(`heroBlock.slides.${slide.tKey}.title`)}
              containerClassName="absolute inset-0 z-0 bg-primary-950"
              className="w-full h-[125%] object-cover object-[75%_center] lg:object-center will-change-transform translate-y-[-12%]"
            />
            <div className="absolute inset-0 z-10 bg-primary-950/75 lg:bg-linear-to-r lg:from-primary-950/95 lg:via-primary-950/80 lg:to-primary-950/40" />
            <div className="absolute inset-0 z-10 bg-linear-to-t from-primary-950/80 via-transparent to-primary-950/40" />
          </div>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            <p
              className={cn(
                "text-secondary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 transition-all duration-700 ease-out",
                isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
            >
              {t("heroBlock.badge")}
            </p>

            <Heading
              level={1}
              className={cn(
                "text-white text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.15] transition-all duration-700 ease-out",
                isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {t(`heroBlock.slides.${activeSlideData.tKey}.title`)}
            </Heading>

            <Text
              className={cn(
                "text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl transition-all duration-700 ease-out",
                isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {t(`heroBlock.slides.${activeSlideData.tKey}.description`)}
            </Text>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-1">
              
              <div className="flex flex-wrap items-center gap-3">
                <Link to={activeSlideData.primaryLink} tabIndex={-1}>
                  <Button
                    size="lg"
                    className="h-11 sm:h-12 px-6 sm:px-8 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-xs sm:text-sm tracking-wide rounded-sm cursor-pointer border border-primary-500/40 shadow-md transition-all duration-200"
                  >
                    {t("heroBlock.common.requestQuote")}
                  </Button>
                </Link>

                <Link to={activeSlideData.secondaryLink} tabIndex={-1}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-11 sm:h-12 px-5 sm:px-6 bg-white/5 hover:bg-white/10 border-white/20 text-white font-medium text-xs sm:text-sm tracking-wide rounded-sm cursor-pointer flex items-center gap-2 group transition-all duration-200"
                  >
                    <span>{t("heroBlock.common.exploreSolutions")}</span>
                    <ArrowUpRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>

              <div className="flex lg:hidden items-center justify-between sm:justify-end gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => handleManualChange(index)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300 border-none cursor-pointer p-0",
                        index === currentSlide ? "w-8 bg-secondary" : "w-2.5 bg-white/25 hover:bg-white/40"
                      )}
                      aria-label={`Slide ${slide.number}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      prevSlide();
                    }}
                    className="h-9 w-9 p-0 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-sm"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      nextSlide();
                    }}
                    className="h-9 w-9 p-0 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-sm"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>

          </div>

          <div className="hidden lg:flex lg:col-span-4 flex-col gap-2">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <button
                  key={slide.id}
                  onClick={() => handleManualChange(index)}
                  className={cn(
                    "group relative flex items-start gap-4 p-4 text-left transition-all duration-300 rounded-sm cursor-pointer border",
                    isActive
                      ? "bg-white/[0.07] border-white/20 backdrop-blur-sm"
                      : "bg-transparent border-transparent hover:bg-white/3 hover:border-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "w-0.5 self-stretch transition-all duration-300 rounded-full",
                      isActive ? "bg-secondary" : "bg-white/20 group-hover:bg-white/40"
                    )}
                  />

                  <div>
                    <span className="font-mono text-xs text-gray-400 block mb-1">
                      {slide.number}
                    </span>
                    <h3
                      className={cn(
                        "text-sm font-semibold tracking-wide transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                      )}
                    >
                      {t(`heroBlock.slides.${slide.tKey}.navTitle`)}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {t(`heroBlock.slides.${slide.tKey}.navSubtitle`)}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="flex items-center justify-end gap-2 pt-3 px-2">
              <Button
                onClick={() => {
                  setIsAutoPlaying(false);
                  prevSlide();
                }}
                className="h-8 w-8 p-0 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-sm cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setIsAutoPlaying(false);
                  nextSlide();
                }}
                className="h-8 w-8 p-0 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-sm cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};