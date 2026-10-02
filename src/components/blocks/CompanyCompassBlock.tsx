import { useTranslation } from 'react-i18next';
import { Target, Lightbulb, ShieldCheck } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { FadeIn } from '../utils/FadeIn';

const compassPoints = [
  {
    icon: Target,
    id: "01",
    tKey: "aspiration"
  },
  {
    icon: Lightbulb,
    id: "02",
    tKey: "vision"
  },
  {
    icon: ShieldCheck,
    id: "03",
    tKey: "mission"
  }
];

export const CompanyCompassBlock = () => {
  const { t } = useTranslation("home");

  return (
    <section className="w-full py-24 bg-primary-950 text-white border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03] bg-[url('../../assets/patterns/grid.svg')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-1 w-12 bg-secondary" />
                    <Text className="text-xs font-black tracking-[0.2em] text-secondary uppercase">
                        {t("companyCompass.subtitle")}
                    </Text>
                </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={150}>
                <Heading level={2} className="text-white text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase">
                    {t("companyCompass.titleStart")} <br className="hidden sm:block" />
                    <span className="text-gray-500">{t("companyCompass.titleAccent")}</span>
                </Heading>
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
                <Text className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                    {t("companyCompass.description")}
                </Text>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-l-2 border-white/10 shadow-2xl">
          {compassPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <FadeIn key={point.id} direction="up" delay={150 * index}>
                  <div
                    className="group relative flex flex-col p-8 md:p-12 border-r-2 border-b-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 h-full"
                  >
                    <span className="absolute top-6 right-8 text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                      {point.id}
                    </span>

                    <div className="h-14 w-14 bg-primary-900 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:border-secondary transition-colors duration-500">
                        <Icon className="h-6 w-6 text-white group-hover:text-primary-950 transition-colors duration-500" strokeWidth={2} />
                    </div>

                    <Heading level={3} className="text-white text-2xl font-black uppercase tracking-wide mb-6 group-hover:text-secondary transition-colors duration-300">
                      {t(`companyCompass.points.${point.tKey}.title`)}
                    </Heading>

                    <Text className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors font-medium">
                      {t(`companyCompass.points.${point.tKey}.description`)}
                    </Text>

                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary transition-all duration-500 group-hover:w-full" />
                  </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};