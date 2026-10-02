import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, HardHat } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

export function ServicesCtaBlock() {
  const { t } = useTranslation("services");

  return (
    <section className="w-full bg-primary-950 py-16 md:py-24 relative overflow-hidden border-t-4 border-secondary">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <HardHat className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 pointer-events-none -rotate-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
            
            <div className="flex flex-col gap-4 border-l-4 border-secondary pl-6 max-w-3xl">
              <Heading level={2} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                {t("servicesCtaBlock.title")}
              </Heading>
              <Text className="text-gray-300 text-base md:text-lg leading-relaxed">
                {t("servicesCtaBlock.description")}
              </Text>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <Link to="/contact" className="block w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-secondary text-primary-900 hover:bg-secondary-500 transition-colors duration-300 h-14 px-10 text-sm font-black tracking-widest uppercase rounded-sm cursor-pointer shadow-lg"
                >
                  {t("servicesCtaBlock.button")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Button>
              </Link>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}