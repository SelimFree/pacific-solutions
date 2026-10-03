import { useTranslation } from "react-i18next";
import { Target, Compass } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

export const PurposeVisionBlock = () => {
  const { t } = useTranslation("company");

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 border-b border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <FadeIn direction="up" delay={0}>
            <span className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-primary-700 uppercase">
                {t("purposeVisionBlock.eyebrow")}
              </span>
              <span className="w-2 h-2 rounded-full bg-secondary" />
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <Heading
              level={2}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-950 tracking-tight leading-snug"
            >
              {t("purposeVisionBlock.statement")}
            </Heading>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          <FadeIn direction="up" delay={200} className="h-full">
            <div className="relative h-full bg-white border border-gray-200 p-8 sm:p-10 rounded-sm shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 group-hover:bg-primary-700 transition-colors duration-300" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xs bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700">
                  <Target className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <Heading level={3} className="text-xl font-bold text-primary-950 uppercase tracking-wide">
                  {t("purposeVisionBlock.missionTitle")}
                </Heading>
              </div>
              
              <Text className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                {t("purposeVisionBlock.missionBody")}
              </Text>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={300} className="h-full">
            <div className="relative h-full bg-white border border-gray-200 p-8 sm:p-10 rounded-sm shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 group-hover:bg-secondary transition-colors duration-300" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xs bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700">
                  <Compass className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <Heading level={3} className="text-xl font-bold text-primary-950 uppercase tracking-wide">
                  {t("purposeVisionBlock.visionTitle")}
                </Heading>
              </div>
              
              <Text className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                {t("purposeVisionBlock.visionBody")}
              </Text>
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
};