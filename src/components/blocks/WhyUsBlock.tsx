import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Layers, 
  Globe2, 
  SlidersHorizontal, 
  PackageCheck, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

const pillars = [
  {
    id: "expertise",
    number: "01",
    icon: Layers,
  },
  {
    id: "network",
    number: "02",
    icon: Globe2,
  },
  {
    id: "sourcing",
    number: "03",
    icon: SlidersHorizontal,
  },
  {
    id: "coordination",
    number: "04",
    icon: PackageCheck,
  },
];

export const WhyUsBlock = () => {
  const { t } = useTranslation("home");

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-28 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          <div className="lg:col-span-5 flex flex-col">
            <FadeIn direction="up" delay={0} className="h-full">
              <div className="h-full flex flex-col justify-between bg-primary-950 text-white p-7 sm:p-10 rounded-sm relative overflow-hidden">
                
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-xs font-bold tracking-widest text-secondary-300 uppercase">
                      {t("whyUsBlock.eyebrow")}
                    </span>
                  </div>

                  <Heading
                    level={2}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-tight"
                  >
                    {t("whyUsBlock.mainStatement")}
                  </Heading>

                  <Text className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                    {t("whyUsBlock.description")}
                  </Text>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
                    <span className="text-xs text-gray-300 font-medium">
                      {t("whyUsBlock.trustBadge")}
                    </span>
                  </div>

                  <Link to="/company">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-11 px-6 bg-white/5 hover:bg-white/10 border-white/20 text-white font-semibold text-xs tracking-wider uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2 transition-all group"
                    >
                      <span>{t("whyUsBlock.buttonLearnMore")}</span>
                      <ArrowRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <FadeIn key={pillar.id} direction="up" delay={100 * (index + 1)}>
                    <div className="h-full flex flex-col justify-between p-6 sm:p-7 bg-white border border-gray-200 hover:border-primary-500 rounded-sm shadow-xs hover:shadow-md transition-all duration-300 group">
                      
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-10 h-10 rounded-sm bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition-colors duration-200">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-xs font-bold text-gray-400">
                            [{pillar.number}]
                          </span>
                        </div>

                        <Heading
                          level={3}
                          className="text-base sm:text-lg font-bold text-primary-950 mb-2.5 group-hover:text-primary-700 transition-colors"
                        >
                          {t(`whyUsBlock.pillars.${pillar.id}.title`)}
                        </Heading>

                        <Text className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {t(`whyUsBlock.pillars.${pillar.id}.description`)}
                        </Text>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100">
                        <span className="text-[11px] font-mono text-gray-400 group-hover:text-primary-700 transition-colors">
                          {t(`whyUsBlock.pillars.${pillar.id}.tag`)}
                        </span>
                      </div>

                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};