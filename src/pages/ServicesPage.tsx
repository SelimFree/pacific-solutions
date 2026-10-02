import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageHeaderBlock } from "../components/blocks/PageHeaderBlock";
import { ServicesDirectoryBlock } from "../components/blocks/ServicesDirectoryBlock";
import ServicesBgImage from "../assets/services/services_banner.png"
import { ServicesCtaBlock } from "../components/blocks/ServicesCtaBlock";

export default function ServicesPage() {
    const { t } = useTranslation("services");
    const { t: tCommon } = useTranslation("common");
    useDocumentTitle(tCommon("navbar.services"));

    return (
        <div className="flex flex-col">
            <PageHeaderBlock
                title={t("servicesPage.header.title")}
                subtitle={t("servicesPage.header.subtitle")}
                backgroundImage={ServicesBgImage}
            />

            <ServicesDirectoryBlock />
            <ServicesCtaBlock/>
        </div>
    );
}