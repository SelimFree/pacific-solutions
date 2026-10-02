import { useTranslation } from "react-i18next";
import { Target, TrendingUp, CheckSquare } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

const TENETS = [
  { id: "customers", icon: Target },
  { id: "profitability", icon: TrendingUp },
  { id: "integrity", icon: CheckSquare },
];

export function OperationalEthosBlock() {
  const { t } = useTranslation("company");

  return (
    <section className="w-full bg-primary-950 py-24 border-b-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center flex flex-col items-center">
          <FadeIn direction="up" delay={0}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-secondary" />
              <Text className="text-xs font-black tracking-[0.2em] text-secondary uppercase">
                {t("operationalEthosBlock.subtitle")}
              </Text>
              <div className="h-1 w-12 bg-secondary" />
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={150}>
            <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {t("operationalEthosBlock.title")}
            </Heading>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TENETS.map((tenet, index) => {
            const Icon = tenet.icon;
            return (
              <FadeIn key={tenet.id} direction="up" delay={200 + index * 100}>
                <div className="group relative bg-white/5 border border-white/10 p-8 md:p-10 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col items-center text-center">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 transition-colors duration-300 group-hover:bg-secondary" />
                  
                  <div className="h-16 w-16 bg-primary-900 border border-white/20 flex items-center justify-center mb-8 group-hover:border-secondary transition-colors">
                    <Icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
                  </div>
                  
                  <Heading level={3} className="text-xl font-black text-white uppercase tracking-wide mb-4">
                    {t(`operationalEthosBlock.tenets.${tenet.id}.title`)}
                  </Heading>
                  
                  <Text className="text-gray-400 font-medium leading-relaxed">
                    {t(`operationalEthosBlock.tenets.${tenet.id}.desc`)}
                  </Text>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}