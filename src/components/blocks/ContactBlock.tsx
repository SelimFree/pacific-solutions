import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    Mail, Phone, MapPin, ArrowRight,
    CheckCircle2, Loader2, AlertCircle, X
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
        <section className="w-full py-16 md:py-24 relative z-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    <div className="w-full lg:w-5/12 flex flex-col gap-10 lg:sticky lg:top-32">
                        <FadeIn direction="up">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px w-12 bg-secondary" />
                                <Heading level={3} className="text-sm font-black tracking-widest text-primary-900 uppercase">
                                    {t("contactPage.header.title")}
                                </Heading>
                            </div>

                            <Heading level={2} className="text-3xl md:text-5xl font-black text-primary-950 uppercase tracking-tight leading-tight border-l-4 border-secondary pl-6 mb-6">
                                {t("contactBlock.title")}
                            </Heading>

                            <Text className="text-gray-600 text-base md:text-lg leading-relaxed text-justify">
                                {t("contactBlock.description")}
                            </Text>
                        </FadeIn>

                        <FadeIn direction="up" delay={100}>
                            <div className="flex flex-col gap-6 mt-4 border-t border-gray-200 pt-8">

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gray-50 p-3 rounded-sm group-hover:bg-primary-950 transition-colors duration-300">
                                        <Mail className="h-6 w-6 text-primary-900 group-hover:text-secondary transition-colors duration-300" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black tracking-widest uppercase text-gray-500 mb-1">{t("contactBlock.info.emailLabel")}</span>
                                        <a href={`mailto:${t("contactBlock.info.email")}`} className="text-primary-950 font-bold hover:text-secondary transition-colors">
                                            {t("contactBlock.info.email")}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gray-50 p-3 rounded-sm group-hover:bg-primary-950 transition-colors duration-300">
                                        <Phone className="h-6 w-6 text-primary-900 group-hover:text-secondary transition-colors duration-300" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black tracking-widest uppercase text-gray-500 mb-1">{t("contactBlock.info.phoneLabel")}</span>
                                        <a href={`tel:${t("contactBlock.info.phone").replace(/[^0-9+]/g, "")}`} className="text-primary-950 font-bold hover:text-secondary transition-colors">
                                            {t("contactBlock.info.phone")}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-gray-50 p-3 rounded-sm group-hover:bg-primary-950 transition-colors duration-300">
                                        <MapPin className="h-6 w-6 text-primary-900 group-hover:text-secondary transition-colors duration-300" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black tracking-widest uppercase text-gray-500 mb-1">{t("contactBlock.info.addressLabel")}</span>
                                        <span className="text-primary-950 font-bold">
                                            {t("contactBlock.info.address")}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </FadeIn>
                    </div>

                    <div className="w-full lg:w-7/12">
                        <FadeIn direction="left" delay={200}>
                            <div className="bg-primary-950 p-8 md:p-12 rounded-sm shadow-2xl border-t-4 border-secondary relative overflow-hidden min-h-125 flex flex-col justify-center">

                                {!isSubmitted ? (
                                    <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="firstName" className="text-xs font-black tracking-widest text-white uppercase">
                                                    {t("contactBlock.form.firstNameLabel")}
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    placeholder={t("contactBlock.form.firstNamePlaceholder")}
                                                    className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-secondary focus:ring-secondary"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="lastName" className="text-xs font-black tracking-widest text-white uppercase">
                                                    {t("contactBlock.form.lastNameLabel")}
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    required
                                                    placeholder={t("contactBlock.form.lastNamePlaceholder")}
                                                    className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-secondary focus:ring-secondary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="company" className="text-xs font-black tracking-widest text-white uppercase">
                                                    {t("contactBlock.form.companyLabel")}
                                                </Label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    required
                                                    placeholder={t("contactBlock.form.companyPlaceholder")}
                                                    className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-secondary focus:ring-secondary"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="email" className="text-xs font-black tracking-widest text-white uppercase">
                                                    {t("contactBlock.form.emailLabel")}
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder={t("contactBlock.form.emailPlaceholder")}
                                                    className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-secondary focus:ring-secondary"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="message" className="text-xs font-black tracking-widest text-white uppercase">
                                                {t("contactBlock.form.messageLabel")}
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder={t("contactBlock.form.messagePlaceholder")}
                                                className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-secondary focus:ring-secondary resize-none"
                                            />
                                        </div>

                                        {error && (
                                            <div className="relative flex items-start gap-4 p-5 border-l-4 border-red-500 bg-red-500/10 rounded-sm">
                                                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                                <div className="flex-1 pr-6">
                                                    <Text className="text-xs font-black tracking-widest text-red-400 uppercase mb-1">
                                                        Error
                                                    </Text>
                                                    <Text className="text-xs text-red-200 leading-relaxed">
                                                        {t(error)}
                                                    </Text>
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => setError(null)}
                                                    className="absolute top-5 right-5 text-red-400 hover:text-red-300 hover:bg-transparent bg-transparent p-0 h-auto min-h-0 transition-colors border-0 shadow-none"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-4 group"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    {t("contactBlock.buttonSending")}
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    {t("contactBlock.buttonSubmit")}
                                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </Button>

                                    </form>
                                ) : (
                                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                                        <div className="h-20 w-20 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center mb-8">
                                            <CheckCircle2 className="h-10 w-10 text-secondary" strokeWidth={1.5} />
                                        </div>

                                        <Heading level={3} className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
                                            {t("contactBlock.successTitle")}
                                        </Heading>

                                        <Text className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-10">
                                            {t("contactBlock.successMessage")}
                                        </Text>

                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            {t("contactBlock.successButton")}
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