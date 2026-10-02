import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

const sectors = [
    {
        id: "manufacturing",
        index: "01",
        machinery: ["cncLathes", "millingCenters", "toolingSystems", "workholding", "routers"],
    },
    {
        id: "fabrication",
        index: "02",
        machinery: ["plasmaTables", "pipeCutting", "oxyFuel", "bandSaws", "edgePrep"],
    },
    {
        id: "welding",
        index: "03",
        machinery: ["weldingRobots", "roboticCells", "cobots", "positioners", "fumeExtraction"],
    },
    {
        id: "inspection",
        index: "04",
        machinery: ["laserScanners", "portable3D", "metrologySystems", "visionInspection", "surfaceMeasurement"],
    },
    {
        id: "maintenance",
        index: "05",
        machinery: ["horizontalBalancing", "verticalBalancing", "vibrationAnalyzers", "portableBalancing", "alignment"],
    },
    {
        id: "thermal",
        index: "06",
        machinery: ["heatTreatment", "annealingOvens", "conveyorOvens", "batchOvens", "customChambers"],
    },
];

export const ApplicationsPreviewBlock = () => {
    const { t } = useTranslation("home");
    const [activeSectorIndex, setActiveSectorIndex] = useState(0);

    const mobilePillRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleSectorSelect = (index: number) => {
        setActiveSectorIndex(index);

        mobilePillRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    };

    const activeSector = sectors[activeSectorIndex];

    return (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
                    <div className="max-w-2xl">
                        <FadeIn direction="up" delay={0}>
                            <span className="text-xs font-bold tracking-widest text-primary-700 uppercase block mb-2 sm:mb-3">
                                {t("applicationsBlock.eyebrow")}
                            </span>
                        </FadeIn>

                        <FadeIn direction="up" delay={100}>
                            <Heading
                                level={2}
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-950 tracking-tight"
                            >
                                {t("applicationsBlock.title")}
                            </Heading>
                        </FadeIn>

                        <FadeIn direction="up" delay={200}>
                            <Text className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
                                {t("applicationsBlock.description")}
                            </Text>
                        </FadeIn>
                    </div>

                    <FadeIn direction="up" delay={250}>
                        <Link to="/services" className="shrink-0 hidden lg:block">
                            <Button
                                variant="outline"
                                className="h-11 px-5 border-gray-300 hover:border-primary-950 hover:bg-primary-950 hover:text-white text-primary-950 font-semibold text-xs tracking-wider uppercase rounded-sm cursor-pointer flex items-center gap-2 group transition-all"
                            >
                                <span>{t("applicationsBlock.buttonViewAll")}</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </FadeIn>
                </div>

                <div className="flex lg:hidden overflow-x-auto no-scrollbar scroll-smooth gap-2 pb-4 mb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-gray-100">
                    {sectors.map((sector, index) => {
                        const isActive = index === activeSectorIndex;
                        return (
                            <button
                                key={sector.id}
                                ref={(el) => {
                                    mobilePillRefs.current[index] = el;
                                }}
                                onClick={() => handleSectorSelect(index)}
                                className={cn(
                                    "shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border",
                                    isActive
                                        ? "bg-primary-950 text-white border-primary-950 shadow-xs"
                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                )}
                            >
                                <span className="font-mono text-[10px] opacity-60 mr-1.5">{sector.index}</span>
                                {t(`applicationsBlock.sectors.${sector.id}.navTitle`)}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    <div className="hidden lg:flex lg:col-span-5 flex-col divide-y divide-gray-100 border border-gray-200 rounded-sm bg-gray-50/60 overflow-hidden">
                        {sectors.map((sector, index) => {
                            const isActive = index === activeSectorIndex;

                            return (
                                <button
                                    key={sector.id}
                                    onClick={() => setActiveSectorIndex(index)}
                                    onMouseEnter={() => setActiveSectorIndex(index)}
                                    className={cn(
                                        "group relative flex items-center justify-between p-4 sm:p-5 text-left transition-all duration-200 cursor-pointer",
                                        isActive
                                            ? "bg-white shadow-xs"
                                            : "hover:bg-white/80"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "absolute left-0 top-0 bottom-0 w-1 transition-colors duration-200",
                                            isActive ? "bg-primary-700" : "bg-transparent group-hover:bg-gray-300"
                                        )}
                                    />

                                    <div className="flex items-baseline gap-4 pl-2">
                                        <span
                                            className={cn(
                                                "font-mono text-xs font-semibold transition-colors",
                                                isActive ? "text-primary-700" : "text-gray-400 group-hover:text-gray-600"
                                            )}
                                        >
                                            {sector.index}
                                        </span>
                                        <div>
                                            <h3
                                                className={cn(
                                                    "text-base font-bold transition-colors",
                                                    isActive ? "text-primary-950" : "text-gray-700 group-hover:text-primary-900"
                                                )}
                                            >
                                                {t(`applicationsBlock.sectors.${sector.id}.title`)}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                                {t(`applicationsBlock.sectors.${sector.id}.subtitle`)}
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 shrink-0 transition-transform duration-200",
                                            isActive
                                                ? "text-primary-700 translate-x-1"
                                                : "text-gray-300 group-hover:text-gray-500"
                                        )}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-sm bg-gray-50 border border-gray-200">
                        <div>
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="font-mono text-xs font-bold text-primary-700 uppercase tracking-widest">
                                    APPLICATION SECTOR [{activeSector.index}]
                                </span>
                                <span className="text-xs font-medium text-gray-500">
                                    {t("applicationsBlock.stage.badge")}
                                </span>
                            </div>

                            <Heading
                                level={3}
                                className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-950 mb-3"
                            >
                                {t(`applicationsBlock.sectors.${activeSector.id}.title`)}
                            </Heading>

                            <Text className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                                {t(`applicationsBlock.sectors.${activeSector.id}.description`)}
                            </Text>

                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                                    {t("applicationsBlock.stage.machineryScopeLabel")}
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activeSector.machinery.map((machineKey) => (
                                        <div
                                            key={machineKey}
                                            className="flex items-center gap-2.5 p-2.5 bg-white border border-gray-200/80 rounded-xs text-xs sm:text-sm text-gray-700 font-medium"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-primary-600 shrink-0" />
                                            <span>{t(`applicationsBlock.machinery.${machineKey}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <Link to={`/services#${activeSector.id}`} className="w-full sm:w-auto">
                                <Button
                                    className="w-full sm:w-auto h-11 px-6 bg-primary-950 hover:bg-primary-900 text-white font-semibold text-xs tracking-wider uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2 transition-colors"
                                >
                                    <span>{t("applicationsBlock.stage.exploreSector")}</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>

                            <Link
                                to="/contact"
                                className="text-xs font-semibold text-primary-700 hover:text-primary-900 transition-colors text-center sm:text-right"
                            >
                                {t("applicationsBlock.stage.requestCustomSpec")} &rarr;
                            </Link>
                        </div>

                    </div>

                </div>

                <div className="mt-8 block lg:hidden">
                    <Link to="/services" className="w-full block">
                        <Button
                            variant="outline"
                            className="w-full h-11 border-gray-300 hover:bg-gray-100 text-primary-950 font-semibold text-xs tracking-wider uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>{t("applicationsBlock.buttonViewAll")}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
};