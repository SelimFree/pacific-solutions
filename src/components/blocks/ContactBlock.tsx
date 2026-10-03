import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    Mail, Phone, MapPin, ArrowRight,
    CheckCircle2, Loader2, AlertCircle, X,
    Terminal
} from "lucide-react";

import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

export function ContactBlock() {
    const { t, i18n } = useTranslation("contact");

    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const defaultSubject = typeof window !== "undefined" 
        ? new URLSearchParams(window.location.search).get("subject") || ""
        : "";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!formRef.current) return;

        setIsSubmitting(true);

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            user_lang: (i18n.language || "en").split('-')[0]
        };

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to send message");
            }

            setIsSubmitted(true);
            formRef.current.reset();
        } catch (err) {
            console.error(err);
            setError("contactBlock.errorMessage");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full py-16 md:py-24 relative z-10 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    <div className="w-full lg:w-5/12 flex flex-col gap-8 lg:sticky lg:top-32">
                        <FadeIn direction="up">
                            <div className="mb-6">
                                <span className="mb-5 inline-flex items-center gap-2 px-3 py-1 bg-gray-50 text-[10px] font-mono font-bold tracking-widest text-primary-900 uppercase rounded-sm border border-gray-200">
                                    <Terminal className="h-3 w-3 text-secondary" />
                                    {t("contactPage.header.title", "Communications Portal")}
                                </span>
                                <Heading level={2} className="text-3xl md:text-4xl font-black text-primary-950 uppercase tracking-tight leading-[1.1] mb-4">
                                    {t("contactBlock.title")}
                                </Heading>
                                <Text className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {t("contactBlock.description")}
                                </Text>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={100}>
                            <div className="flex flex-col border border-gray-200 rounded-sm bg-gray-50 overflow-hidden">
                                
                                <div className="flex items-start gap-4 p-5 md:p-6 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="bg-gray-100 p-2.5 border border-gray-200 rounded-sm shrink-0">
                                        <Mail className="h-5 w-5 text-primary-900" />
                                    </div>
                                    <div className="flex flex-col pt-0.5">
                                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-1">
                                            {t("contactBlock.info.emailLabel")}
                                        </span>
                                        <a href={`mailto:${t("contactBlock.info.email")}`} className="text-primary-950 text-sm font-bold hover:text-secondary transition-colors">
                                            {t("contactBlock.info.email")}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 md:p-6 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="bg-gray-100 p-2.5 border border-gray-200 rounded-sm shrink-0">
                                        <Phone className="h-5 w-5 text-primary-900" />
                                    </div>
                                    <div className="flex flex-col pt-0.5">
                                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-1">
                                            {t("contactBlock.info.phoneLabel")}
                                        </span>
                                        <a href={`tel:${t("contactBlock.info.phone").replace(/[^0-9+]/g, "")}`} className="text-primary-950 text-sm font-bold hover:text-secondary transition-colors">
                                            {t("contactBlock.info.phone")}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 md:p-6 bg-white hover:bg-gray-50 transition-colors">
                                    <div className="bg-gray-100 p-2.5 border border-gray-200 rounded-sm shrink-0">
                                        <MapPin className="h-5 w-5 text-primary-900" />
                                    </div>
                                    <div className="flex flex-col pt-0.5">
                                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-1">
                                            {t("contactBlock.info.addressLabel")}
                                        </span>
                                        <span className="text-primary-950 text-sm font-bold">
                                            {t("contactBlock.info.address")}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </FadeIn>
                    </div>

                    <div className="w-full lg:w-7/12">
                        <FadeIn direction="left" delay={200}>
                            <div className="bg-primary-950 p-6 md:p-10 rounded-sm border border-primary-900 shadow-xl relative min-h-125flex flex-col justify-center">

                                {!isSubmitted ? (
                                    <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="firstName" className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                                                    {t("contactBlock.form.firstNameLabel")}
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    placeholder={t("contactBlock.form.firstNamePlaceholder")}
                                                    className="h-11 bg-white/3 border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:bg-white/6 rounded-sm transition-colors text-sm shadow-none"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="lastName" className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                                                    {t("contactBlock.form.lastNameLabel")}
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    required
                                                    placeholder={t("contactBlock.form.lastNamePlaceholder")}
                                                    className="h-11 bg-white/3 border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:bg-white/6 rounded-sm transition-colors text-sm shadow-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="company" className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                                                    {t("contactBlock.form.companyLabel")}
                                                </Label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    required
                                                    placeholder={t("contactBlock.form.companyPlaceholder")}
                                                    className="h-11 bg-white/3 border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:bg-white/6rounded-sm transition-colors text-sm shadow-none"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="email" className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                                                    {t("contactBlock.form.emailLabel")}
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder={t("contactBlock.form.emailPlaceholder")}
                                                    className="h-11 bg-white/3 border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:bg-white/6 rounded-sm transition-colors text-sm shadow-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="subject" className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                                                {t("contactBlock.form.subjectLabel", "Subject / RFQ Reference")}
                                            </Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                required
                                                defaultValue={defaultSubject}
                                                placeholder={t("contactBlock.form.subjectPlaceholder", "Enter inquiry subject")}
                                                className="h-11 bg-white/3 border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:bg-white/6 rounded-sm transition-colors text-sm shadow-none"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="message" className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                                                {t("contactBlock.form.messageLabel")}
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={4}
                                                placeholder={t("contactBlock.form.messagePlaceholder")}
                                                className="min-h-25 p-4 bg-white/3 border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:bg-white/6 rounded-sm transition-colors text-sm resize-y shadow-none"
                                            />
                                        </div>

                                        {error && (
                                            <div className="relative flex items-start gap-4 p-4 border border-red-500/30 bg-red-500/10 rounded-sm">
                                                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                                                <div className="flex-1 pr-6">
                                                    <Text className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase mb-1">
                                                        System Error
                                                    </Text>
                                                    <Text className="text-xs text-red-200">
                                                        {t(error)}
                                                    </Text>
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => setError(null)}
                                                    className="absolute top-3.5 right-3 text-red-400 hover:text-red-300 hover:bg-transparent bg-transparent p-0 h-auto min-h-0 transition-colors border-0 shadow-none"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-2 h-12 bg-white text-primary-950 hover:bg-gray-200 rounded-sm transition-colors border-0 shadow-none group"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-3 text-xs font-black tracking-widest uppercase">
                                                    <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                                                    {t("contactBlock.buttonSending", "Transmitting...")}
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-3 text-xs font-black tracking-widest uppercase">
                                                    {t("contactBlock.buttonSubmit")}
                                                    <ArrowRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </Button>

                                    </form>
                                ) : (
                                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500 h-full min-h-100">
                                        <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-sm flex items-center justify-center mb-6">
                                            <CheckCircle2 className="h-8 w-8 text-emerald-400" strokeWidth={2} />
                                        </div>

                                        <Heading level={3} className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3">
                                            {t("contactBlock.successTitle", "Transmission Received")}
                                        </Heading>

                                        <Text className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-10">
                                            {t("contactBlock.successMessage", "Your inquiry has been logged. Our engineering and procurement team will review your specifications and contact you shortly.")}
                                        </Text>

                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                            className="bg-white/5 border border-white/10 text-white hover:bg-white/1 rounded-sm text-xs font-black uppercase tracking-widest px-8 shadow-none"
                                        >
                                            {t("contactBlock.successButton", "Submit Another Request")}
                                        </Button>
                                    </div>
                                )}

                            </div>
                        </FadeIn>
                    </div>

                </div>
            </div>
        </section>
    );
}