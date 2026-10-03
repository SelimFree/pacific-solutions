import { useTranslation } from "react-i18next";
import { Compass } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { Image } from "../ui/Image";

import DirectionImage from "../../assets/company/directions.png";

const VISION_PILLARS = [
    { id: "sourcing", label: "SOURCING", tKey: "sourcing" },
    { id: "service", label: "SERVICE", tKey: "service" },
    { id: "technical", label: "TECHNICAL", tKey: "technical" },
    { id: "partners", label: "PARTNERS", tKey: "partners" },
];

export function CompanyDirectionBlock() {
    const { t } = useTranslation("company");

    return (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-gray-200 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">

                    <div className="lg:col-span-6">
                        <FadeIn direction="up" delay={0}>
                            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                <div className="h-1 w-8 bg-secondary" />
                                <Text className="text-xs font-bold tracking-[0.2em] text-primary-700 uppercase">
                                    {t("companyDirectionBlock.eyebrow")}
                                </Text>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={100}>
                            <Heading
                                level={2}
                                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-950 tracking-tight leading-[1.15]"
                            >
                                {t("companyDirectionBlock.title")}
                            </Heading>
                        </FadeIn>
                    </div>

                    <div className="lg:col-span-6 lg:mt-11">
                        <FadeIn direction="up" delay={200}>
                            <div className="space-y-5 lg:pl-6 lg:border-l border-gray-200">
                                <Text className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                                    {t("companyDirectionBlock.missionP1")}
                                </Text>
                                <Text className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                                    {t("companyDirectionBlock.missionP2")}
                                </Text>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    <FadeIn direction="up" delay={300} className="h-full">
                        <div className="relative p-2 bg-gray-50 border border-gray-200 rounded-sm h-full flex flex-col">
                            <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-primary-900 pointer-events-none z-10" />

                            <Image
                                src={DirectionImage}
                                alt={t("companyDirectionBlock.imageAlt")}
                                className="w-full h-full min-h-75 object-cover rounded-xs"
                                containerClassName="w-full h-full flex-1"
                            />

                            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 border border-gray-200 rounded-xs shadow-sm">
                                <span className="font-mono text-[10px] font-bold text-primary-950 uppercase tracking-widest">
                                    {t("companyDirectionBlock.imageCaption")}
                                </span>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={400} className="h-full">
                        <div className="flex flex-col h-full">
                            <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">
                                <div className="flex items-center gap-3">
                                    <Compass className="h-5 w-5 text-secondary" strokeWidth={2} />
                                    <Heading level={3} className="text-xs font-bold tracking-widest text-primary-950 uppercase">
                                        {t("companyDirectionBlock.gridTitle")}
                                    </Heading>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 flex-1">
                                {VISION_PILLARS.map((pillar) => (
                                    <div
                                        key={pillar.id}
                                        className="group relative bg-white p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-colors duration-300 hover:bg-primary-950 min-h-40 sm:min-h-45"
                                    >
                                        <span className="text-lg sm:text-2xl font-extrabold text-primary-950 tracking-tight group-hover:text-white transition-colors">
                                            {pillar.label}
                                        </span>
                                        <span className="mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-secondary transition-colors">
                                            {t(`companyDirectionBlock.pillars.${pillar.tKey}`)}
                                        </span>

                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
}