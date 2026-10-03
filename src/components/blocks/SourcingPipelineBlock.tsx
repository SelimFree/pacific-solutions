import { useTranslation } from "react-i18next";
import { ClipboardList, Factory, ShieldCheck, Ship, Cog } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

const PIPELINE_STEPS = [
  {
    id: "scoping",
    stepNumber: "01",
    icon: ClipboardList,
  },
  {
    id: "sourcing",
    stepNumber: "02",
    icon: Factory,
  },
  {
    id: "qa",
    stepNumber: "03",
    icon: ShieldCheck,
  },
  {
    id: "logistics",
    stepNumber: "04",
    icon: Ship,
  },
];

export function SourcingPipelineBlock() {
  const { t } = useTranslation("company");

  return (
    <section className="w-full bg-white py-20 sm:py-24 lg:py-28 border-b border-gray-200 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center mx-auto max-w-3xl">
          <FadeIn direction="up" delay={0}>
            <span className="mb-5 inline-flex items-center gap-2 px-3 py-1 bg-gray-50 text-[10px] font-bold tracking-widest text-primary-700 uppercase border border-gray-200 rounded-xs">
              <Cog className="h-3.5 w-3.5 text-secondary animate-[spin_4s_linear_infinite]" />
              {t("sourcingPipelineBlock.eyebrow")}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-950 leading-[1.15]">
              {t("sourcingPipelineBlock.headingStart")} <br className="hidden sm:block" />
              <span className="text-primary-700">{t("sourcingPipelineBlock.headingAccent")}</span>
            </Heading>
          </FadeIn>
        </div>

        {/* 4-Step Process Track */}
        <div className="relative mx-auto max-w-6xl mb-20 md:mb-28">
          
          {/* Background Connecting Lines */}
          <div className="absolute left-7 lg:hidden top-8 bottom-8 w-px bg-gray-200 z-0" />
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {PIPELINE_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative group">
                  <FadeIn
                    direction="up"
                    delay={200 + index * 100}
                    className="w-full flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-6"
                  >
                    {/* Icon Node */}
                    <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-xs bg-white border border-gray-200 shadow-sm text-primary-700 group-hover:border-primary-400 group-hover:bg-primary-50 transition-all duration-300 z-10 relative">
                      <Icon className="h-6 w-6 transition-colors duration-300 group-hover:text-primary-900" strokeWidth={1.5} />
                      
                      {/* Active indicator dot */}
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Step Content */}
                    <div className="flex flex-col text-left lg:text-center mt-1 lg:mt-0">
                      <span className="block text-[10px] font-mono font-bold text-gray-400 tracking-[0.2em] mb-2 uppercase group-hover:text-secondary transition-colors">
                        STEP // {step.stepNumber}
                      </span>

                      <Heading level={3} className="text-lg font-bold text-primary-950 mb-2.5">
                        {t(`sourcingPipelineBlock.steps.${step.id}.title`)}
                      </Heading>

                      <Text className="text-xs sm:text-sm leading-relaxed text-gray-600 max-w-xs lg:mx-auto">
                        {t(`sourcingPipelineBlock.steps.${step.id}.description`)}
                      </Text>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}