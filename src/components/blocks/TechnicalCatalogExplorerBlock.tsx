import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    Cpu,
    Zap,
    Bot,
    Scan,
    Wrench,
    Flame,
    ArrowUpRight,
    Sliders,
    FileText
} from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { Dropdown } from "../ui/Dropdown";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

import ManufacturingImg from "../../assets/services/manufacturing.png";
import FabricationImg from "../../assets/services/fabrication.png";
import WeldingImg from "../../assets/services/welding.png";
import InspectionImg from "../../assets/services/inspection.png";
import MaintenanceImg from "../../assets/services/maintenance.png";
import ThermalImg from "../../assets/services/thermal.png";

const CATEGORY_KEYS = [
    "manufacturing", 
    "fabrication", 
    "welding", 
    "inspection", 
    "maintenance", 
    "thermal"
] as const;

type CategoryKey = typeof CATEGORY_KEYS[number];

const CATEGORY_CONFIG: Record<CategoryKey, { icon: typeof Cpu; image: string }> = {
    manufacturing: { icon: Cpu, image: ManufacturingImg },
    fabrication: { icon: Zap, image: FabricationImg },
    welding: { icon: Bot, image: WeldingImg },
    inspection: { icon: Scan, image: InspectionImg },
    maintenance: { icon: Wrench, image: MaintenanceImg },
    thermal: { icon: Flame, image: ThermalImg },
};

interface EquipmentClass {
    name: string;
    specs: string;
}

interface StandardItem {
    label: string;
    value: string;
}

interface CategoryData {
    index: string;
    title: string;
    eyebrow: string;
    description: string;
    domains: string[];
    equipmentClasses: EquipmentClass[];
    brands: string[];
    standards: StandardItem[];
}

export function TechnicalCatalogExplorerBlock() {
    const { t } = useTranslation("services");
    const [activeKey, setActiveKey] = useState<CategoryKey>(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash.replace(/^#/, "") as CategoryKey;
            if (hash && CATEGORY_KEYS.includes(hash)) return hash;
        }
        return "manufacturing";
    });

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace(/^#/, "") as CategoryKey;
            if (hash && CATEGORY_KEYS.includes(hash)) setActiveKey(hash);
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const handleCategoryClick = (id: string) => {
        setActiveKey(id as CategoryKey);
        window.history.replaceState(null, '', `#${id}`);
    };

    const dropdownOptions = CATEGORY_KEYS.map(key => {
        const item = t(`technicalCatalogExplorerBlock.items.${key}`, { returnObjects: true }) as CategoryData;
        return {
            value: key,
            label: item.title
        };
    });

    return (
        <section className="w-full bg-primary-950 py-12 md:py-24 border-b border-white/10 text-white font-sans relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="max-w-3xl mb-12 md:mb-16">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-white/4 text-[10px] font-mono font-bold tracking-widest text-secondary uppercase rounded-sm border border-white/10">
                            <Sliders className="h-3 w-3 text-secondary" />
                            {t("technicalCatalogExplorerBlock.eyebrow")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={100}>
                        <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
                            {t("technicalCatalogExplorerBlock.title")}
                        </Heading>
                    </FadeIn>

                    <FadeIn direction="up" delay={200}>
                        <Text className="mt-5 text-gray-400 text-sm md:text-base leading-relaxed">
                            {t("technicalCatalogExplorerBlock.description")}
                        </Text>
                    </FadeIn>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start border border-white/10 bg-white/1">
                    
                    <div className="block lg:hidden w-full sticky top-24 z-30">
                        <Dropdown
                            options={dropdownOptions}
                            value={activeKey}
                            onChange={handleCategoryClick}
                            triggerClassName="bg-primary-950 border border-white/10 border-l-4 border-l-secondary text-white text-sm font-black tracking-widest uppercase px-5 py-4 shadow-xl w-full"
                            menuClassName="mt-2 shadow-2xl rounded-sm overflow-hidden border border-white/10 bg-primary-950"
                            itemClassName="text-xs font-black tracking-widest uppercase text-gray-400 border-l-4 border-transparent hover:bg-white/[0.04]"
                            activeItemClassName="text-xs font-black tracking-widest uppercase bg-white/[0.06] border-l-4 border-secondary text-white"
                        />
                    </div>

                    <aside className="hidden lg:block w-full lg:w-1/3 lg:max-w-85 lg:sticky lg:top-32 shrink-0 border-r border-white/10">
                        <FadeIn direction="up" delay={0}>
                            <div className="p-5 border-b border-white/10 bg-white/2">
                                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5 text-secondary" />
                                    {t("technicalCatalogExplorerBlock.ui.indexTitle")}
                                </span>
                            </div>
                            
                            <div className="flex flex-col divide-y divide-white/5">
                                {CATEGORY_KEYS.map((key) => {
                                    const item = t(`technicalCatalogExplorerBlock.items.${key}`, { returnObjects: true }) as CategoryData;
                                    const Icon = CATEGORY_CONFIG[key].icon;
                                    const isActive = activeKey === key;

                                    return (
                                        <Button
                                            key={key}
                                            onClick={() => handleCategoryClick(key)}
                                            className={cn(
                                                "h-auto group flex flex-col items-start justify-center text-left px-5 py-5 w-full transition-all duration-300 rounded-none cursor-pointer whitespace-normal shadow-none border-y-0 border-r-0 border-l-4",
                                                isActive
                                                    ? "bg-white/6 border-secondary"
                                                    : "bg-transparent hover:bg-white/2 border-transparent hover:border-white/20"
                                            )}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-3">
                                                    <span className={cn(
                                                        "font-mono text-xs font-bold transition-colors",
                                                        isActive ? "text-secondary" : "text-gray-500 group-hover:text-gray-400"
                                                    )}>
                                                        {item.index}
                                                    </span>
                                                    <span className={cn(
                                                        "text-sm font-semibold transition-colors duration-300",
                                                        isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                                                    )}>
                                                        {item.title}
                                                    </span>
                                                </div>
                                                <Icon className={cn(
                                                    "h-4 w-4 transition-colors shrink-0",
                                                    isActive ? "text-secondary" : "text-gray-500 group-hover:text-gray-400"
                                                )} />
                                            </div>
                                            <span className="block text-[10px] font-mono text-gray-500 mt-2 uppercase tracking-wider pl-7">
                                                {item.eyebrow}
                                            </span>
                                        </Button>
                                    );
                                })}
                            </div>
                        </FadeIn>
                    </aside>

                    <main className="w-full lg:flex-1 lg:w-2/3 min-h-150 pb-8 lg:p-8 lg:pl-0">
                        <FadeIn key={activeKey} direction="left" delay={50}>
                            <DynamicCatalogContent categoryId={activeKey} />
                        </FadeIn>
                    </main>

                </div>
            </div>
        </section>
    );
}

function DynamicCatalogContent({ categoryId }: { categoryId: CategoryKey }) {
    const { t } = useTranslation("services");
    const data = t(`technicalCatalogExplorerBlock.items.${categoryId}`, { returnObjects: true }) as CategoryData;
    const config = CATEGORY_CONFIG[categoryId];

    if (!data || !data.title) return null;

    return (
        <div className="flex flex-col gap-10">
            
            <div className="border-l-4 border-secondary pl-5 md:pl-6">
                <Heading level={3} className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    {data.title}
                </Heading>
                <Text className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl">
                    {data.description}
                </Text>
            </div>

            <div className="w-full aspect-video overflow-hidden rounded-sm bg-gray-900 border border-white/10">
                <img
                    src={config.image}
                    alt={data.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>

            <div className="pt-2">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                    {t("technicalCatalogExplorerBlock.ui.validatedApplications")}
                </span>
                <div className="flex flex-wrap gap-2">
                    {data.domains.map((dom, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1.5 border border-white/20 text-[11px] font-bold tracking-wider uppercase text-gray-300 rounded-sm bg-transparent"
                        >
                            {dom}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-8 border-t border-white/10">
                
                <div>
                    <Heading level={4} className="text-[13px] font-black uppercase tracking-widest text-white mb-6">
                        {t("technicalCatalogExplorerBlock.ui.sourcingScope")}
                    </Heading>

                    <div className="flex flex-col gap-5">
                        {data.equipmentClasses.map((eq, idx) => (
                            <div key={idx}>
                                <div className="text-sm font-bold text-gray-100 uppercase tracking-wide">
                                    {eq.name}
                                </div>
                                <div className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
                                    {eq.specs}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    
                    <Heading level={4} className="text-[13px] font-black uppercase tracking-widest text-white mb-6">
                        {t("technicalCatalogExplorerBlock.ui.makerNetwork")}
                    </Heading>
                    <div className="flex flex-wrap gap-2 mb-10">
                        {data.brands.map((brand, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-1.5 bg-white/4text-[11px] font-bold uppercase tracking-wider text-gray-300 rounded-sm border border-white/5"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>

                    <Heading level={4} className="text-[13px] font-black uppercase tracking-widest text-white mb-5">
                        {t("technicalCatalogExplorerBlock.ui.conformanceParameters")}
                    </Heading>
                    <div className="flex flex-col border-t border-white/10">
                        {data.standards.map((std, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 py-3 border-b border-white/10">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                                    {std.label}
                                </span>
                                <span className="text-xs font-semibold text-gray-200">
                                    {std.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <a
                            href={`/contact?subject=${encodeURIComponent(data.title)}`}
                            className="inline-flex items-center justify-between w-full px-5 py-4 bg-white text-primary-950 hover:bg-gray-200 transition-colors text-xs font-black uppercase tracking-widest rounded-sm group"
                        >
                            <span>{t("technicalCatalogExplorerBlock.ui.rfqButton", { title: data.title })}</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
}