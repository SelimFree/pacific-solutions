import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageHeaderBlock } from "../components/blocks/PageHeaderBlock";
import CompanyBgImage from "../assets/company/company_banner.png";
import { CompanyDirectionBlock } from "../components/blocks/CompanyDirectionBlock";
import { SourcingPipelineBlock } from "../components/blocks/SourcingPipelineBlock";
import { GlobalNetworkBlock } from "../components/blocks/GlobalNetworkBlock";

export default function CompanyPage() {
    const { t } = useTranslation("company");
    const { t: tCommon } = useTranslation("common");
    useDocumentTitle(tCommon("navbar.company"));

    return (
        <div className="flex flex-col">
            <PageHeaderBlock
                title={t("companyPage.header.title")}
                subtitle={t("companyPage.header.subtitle")}
                backgroundImage={CompanyBgImage}
            />
            <CompanyDirectionBlock />
            <SourcingPipelineBlock />
            <GlobalNetworkBlock />
        </div>
    );
}