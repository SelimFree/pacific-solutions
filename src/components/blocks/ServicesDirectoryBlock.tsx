import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";
import { Dropdown } from "../ui/Dropdown";
import { cn } from "../../lib/utils";

import ConstructionImg from "../../assets/services/construction.png";
import ProcurementImg from "../../assets/services/procurement.png";
import MaintenanceImg from "../../assets/services/maintenance.png";
import MachineShopImg from "../../assets/services/machine_shop.png";
import PressureManagementImg from "../../assets/services/pressure_management.png";
import NdtImg from "../../assets/services/ndt.png";
import LiftingImg from "../../assets/services/lifting.png";
import DrillingToolsImg from "../../assets/services/drilling_tools.png";
import RentalImg from "../../assets/services/rental.png";

const SERVICES_LIST = [
    { id: "construction" },
    { id: "procurement" },
    { id: "maintenance" },
    { id: "machineShop" },
    { id: "pressureManagement" },
    { id: "ndt" },
    { id: "lifting" },
    { id: "drillingTools" },
    { id: "rental" }
];

export function ServicesDirectoryBlock() {
    const { t } = useTranslation("services");
    const location = useLocation();
    const navigate = useNavigate();

    const contentRef = useRef<HTMLElement>(null);

    const hash = location.hash.replace("#", "");
    const activeService = SERVICES_LIST.some(s => s.id === hash)
        ? hash
        : SERVICES_LIST[0].id;

    const handleServiceClick = (id: string) => {
        navigate(`/services#${id}`, { replace: true });

        if (window.innerWidth < 1024 && contentRef.current) {
            setTimeout(() => {
                const headerOffset = 100;
                const elementPosition = contentRef.current?.getBoundingClientRect().top || 0;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }, 100);
        }
    };

    const dropdownOptions = SERVICES_LIST.map(service => ({
        value: service.id,
        label: t(`servicesDirectoryBlock.directory.${service.id}`)
    }));

    return (
        <section className="w-full py-12 md:py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    <div className="block lg:hidden w-full sticky top-24 z-30">
                        <Dropdown
                            options={dropdownOptions}
                            value={activeService}
                            onChange={handleServiceClick}
                            triggerClassName="bg-primary-950 border-0 border-l-4 border-secondary text-white text-sm font-black tracking-widest uppercase px-5 py-4 shadow-xl"
                            menuClassName="mt-2 shadow-2xl"
                            itemClassName="text-xs font-black tracking-widest uppercase text-gray-500 border-l-4 border-transparent hover:bg-gray-50"
                            activeItemClassName="text-xs font-black tracking-widest uppercase bg-gray-50 border-l-4 border-secondary text-primary-950"
                        />
                    </div>

                    <aside className="hidden lg:block w-full lg:w-1/3 lg:sticky lg:top-32 shrink-0">
                        <FadeIn direction="up" delay={0}>
                            <div className="flex flex-col gap-2 border-l-0">
                                {SERVICES_LIST.map((service) => {
                                    const isActive = activeService === service.id;
                                    return (
                                        <Button
                                            key={service.id}
                                            onClick={() => handleServiceClick(service.id)}
                                            className={cn(
                                                "h-auto group flex items-center justify-between text-left px-6 py-5 w-full transition-all duration-300 rounded-sm cursor-pointer whitespace-normal shadow-none border-y-0 border-r-0 border-l-4",
                                                isActive
                                                    ? "bg-primary-950 hover:bg-primary-950 border-secondary shadow-md"
                                                    : "bg-gray-50 hover:bg-gray-100 border-transparent hover:border-gray-300"
                                            )}
                                        >
                                            <span className={cn(
                                                "text-sm font-black tracking-widest uppercase transition-colors duration-300",
                                                isActive ? "text-white" : "text-primary-900 group-hover:text-primary-950"
                                            )}>
                                                {t(`servicesDirectoryBlock.directory.${service.id}`)}
                                            </span>
                                            <ChevronRight className={cn(
                                                "h-5 w-5 transition-transform duration-300 shrink-0",
                                                isActive ? "text-secondary" : "text-gray-400 group-hover:text-primary-900 group-hover:translate-x-1"
                                            )} />
                                        </Button>
                                    );
                                })}
                            </div>
                        </FadeIn>
                    </aside>

                    <main ref={contentRef} className="w-full lg:w-2/3 min-h-150 scroll-mt-24">
                        <FadeIn key={activeService} direction="left" delay={100}>
                            <DynamicServiceContent serviceId={activeService} />
                        </FadeIn>
                    </main>

                </div>
            </div>
        </section>
    );
}

interface DynamicServiceContentProps {
    serviceId: string;
}

interface ServiceData {
    title?: string;
    tagline?: string;
    intro?: string;
    facilitiesTitle?: string;
    facilities?: Array<{ title: string; desc: string }>;
    workTitle?: string;
    work?: Array<{ title: string; desc: string; standards?: string[] }>;
}
const imageMap: Record<string, string> = {
  construction: ConstructionImg,
  procurement: ProcurementImg,
  maintenance: MaintenanceImg,
  machineShop: MachineShopImg,
  pressureManagement: PressureManagementImg,
  ndt: NdtImg,
  lifting: LiftingImg,
  drillingTools: DrillingToolsImg,
  rental: RentalImg,
};

export function DynamicServiceContent({ serviceId }: DynamicServiceContentProps) {
    const { t } = useTranslation("services");
    const data = t(`servicesContent.${serviceId}`, { returnObjects: true }) as ServiceData | string;
    const activeImage = imageMap[serviceId];

    if (!data || typeof data === "string" || !data.title) {
        return (
            <div className="bg-gray-50 border border-gray-200 p-12 md:p-16 h-full flex flex-col items-center justify-center border-t-4 border-t-primary-950 rounded-sm">
                <div className="text-center">
                    <div className="w-16 h-1 bg-secondary mx-auto mb-6" />
                    <Heading level={2} className="text-3xl font-black text-primary-950 uppercase">
                        {t(`servicesDirectoryBlock.directory.${serviceId}`)}
                    </Heading>
                    <Text className="mt-4 text-gray-500 font-medium tracking-wide uppercase text-sm">
                        Detailed content in development...
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-16">

            {activeImage && (
                <div className="relative w-full h-64 md:h-80 overflow-hidden bg-primary-950 rounded-sm">
                    <img
                        src={activeImage}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-950/20 to-transparent pointer-events-none" />
                </div>
            )}

            <div className="flex flex-col gap-6 border-l-4 border-secondary pl-6">
                <Heading level={2} className="text-3xl md:text-4xl font-black text-primary-950 uppercase tracking-tight">
                    {data.title}
                </Heading>
                {data.tagline && (
                    <Text className="text-sm font-black tracking-[0.2em] text-gray-500 uppercase">
                        {data.tagline}
                    </Text>
                )}
                {data.intro && (
                    <Text className="text-gray-600 text-base leading-relaxed text-justify mt-2 max-w-4xl">
                        {data.intro}
                    </Text>
                )}
            </div>

            {data.facilities && data.facilities.length > 0 && (
                <div>
                    {data.facilitiesTitle && (
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-12 bg-gray-300" />
                            <Heading level={3} className="text-sm font-black tracking-widest text-primary-900 uppercase">
                                {data.facilitiesTitle}
                            </Heading>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {data.facilities.map((facility, index) => {
                            const number = (index + 1).toString().padStart(2, "0");

                            return (
                                <FadeIn key={index} direction="up" delay={50 * index}>
                                    <div className="bg-primary-950 p-6 flex flex-col h-full group hover:bg-primary-900 transition-colors duration-300 rounded-sm relative overflow-hidden">
                                        <span className="absolute top-2 right-4 text-4xl font-black text-white/5 group-hover:text-secondary/20 transition-colors duration-300 pointer-events-none select-none">
                                            {number}
                                        </span>

                                        <Heading level={4} className="text-white text-lg font-bold tracking-wide uppercase mb-3 relative z-10 pt-2 border-t border-white/10 group-hover:border-secondary transition-colors">
                                            {facility.title}
                                        </Heading>
                                        <Text className="text-gray-400 text-sm leading-relaxed relative z-10">
                                            {facility.desc}
                                        </Text>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            )}

            {data.work && data.work.length > 0 && (
                <div>
                    {data.workTitle && (
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-12 bg-gray-300" />
                            <Heading level={3} className="text-sm font-black tracking-widest text-primary-900 uppercase">
                                {data.workTitle}
                            </Heading>
                        </div>
                    )}

                    <div className="flex flex-col gap-6">
                        {data.work.map((workItem, index) => {
                            const number = (index + 1).toString().padStart(2, "0");

                            return (
                                <FadeIn key={index} direction="up" delay={50 * index}>
                                    <div className="bg-white border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative group rounded-sm shadow-sm hover:shadow-md transition-shadow">

                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-secondary transition-colors duration-300" />

                                        <div className="bg-gray-50 border border-gray-100 p-4 shrink-0 rounded-sm min-w-17.5 flex items-center justify-center">
                                            <span className="text-xl font-black text-primary-900/40 group-hover:text-primary-900 transition-colors">
                                                {number}
                                            </span>
                                        </div>

                                        <div className="flex flex-col grow">
                                            <Heading level={4} className="text-xl font-black text-primary-950 uppercase tracking-wide mb-3">
                                                {workItem.title}
                                            </Heading>
                                            <Text className="text-gray-600 text-sm leading-relaxed text-justify mb-4">
                                                {workItem.desc}
                                            </Text>

                                            {workItem.standards && workItem.standards.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                                    {workItem.standards.map((std, idx) => (
                                                        <span key={idx} className="bg-gray-100 border border-gray-200 px-3 py-1 text-[10px] font-black tracking-widest text-primary-950 uppercase rounded-sm">
                                                            {std}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}