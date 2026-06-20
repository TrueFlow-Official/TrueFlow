"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckSquare,
  Calendar,
  DollarSign,
  Layers,
  ShieldCheck,
  Key,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  Building,
  Activity,
  FileText,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/logo.png";
// FAQ Item structure
interface FAQItem {
  question: string;
  answer: string;
}

export default function LandingPage() {
  // Accordion State
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "آیا پلتفرم TrueFlow قابلیت اتصال به سامانه‌های دیگر را دارد؟",
      answer:
        "بله، TrueFlow بر اساس معماری API-First توسعه یافته است. در فازهای توسعه آتی، مستندات وب‌سرویس و API کامل پلتفرم جهت یکپارچه‌سازی با سامانه‌های داخلی سازمان‌ها (نظیر حضور و غیاب، حسابداری و حقوق و دستمزد) در اختیار مشترکین قرار خواهد گرفت.",
    },
    {
      question: "سیستم مدیریت دسترسی‌ها (RBAC) چگونه به امنیت سازمان کمک می‌کند؟",
      answer:
        "این سیستم به مدیران اجازه می‌دهد تا بر اساس نقش ساختاری هر کارمند در سازمان (نظیر مالک، مدیر دپارتمان، حسابدار یا عضو عادی)، دسترسی‌های دقیقی به بخش‌های مالی، گزارشات حساس و وظایف تعریف کنند. این امر از افشای اطلاعات غیرضروری جلوگیری می‌کند.",
    },
    {
      question: "آیا امکان استفاده آزمایشی وجود دارد؟",
      answer:
        "بله، پلن «شروع رایگان» پلتفرم TrueFlow به شما امکان می‌دهد تا سیستم را با حداکثر ۱۰ کارمند فعال و دسترسی به ویژگی‌های پایه‌ای نظیر مدیریت دپارتمان‌ها و تسک‌ها بدون نیاز به ثبت اطلاعات کارت بانکی تست و ارزیابی کنید.",
    },
    {
      question: "پشتیبانی پلتفرم به چه صورت ارائه می‌شود؟",
      answer:
        "پشتیبانی در پلن تجاری به صورت تیکت‌گذاری ۲۴ ساعته و در پلن سازمانی به صورت مدیر حساب اختصاصی همراه با خط تماس مستقیم و تضمین توافق‌نامه سطح خدمات (SLA) ارائه می‌گردد.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-600/20"
      dir="rtl"
    >
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <div>
                <Image src={Logo} alt="Logo" width={32} height={32} />
              </div>
              <span className="font-extrabold text-blue-600 dark:text-blue-500">تروفلو</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">
                ویژگی‌ها
              </a>
              <a href="#workflow" className="hover:text-foreground transition-colors">
                مراحل کاربری
              </a>
              <a href="#rbac" className="hover:text-foreground transition-colors">
                مدیریت دسترسی
              </a>
              <a href="#pricing" className="hover:text-foreground transition-colors">
                تعرفه‌ها
              </a>
              <a href="#faq" className="hover:text-foreground transition-colors">
                سوالات متداول
              </a>
            </nav>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-block">
              <Button variant="ghost" className="text-sm font-medium">
                ورود
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm">
                شروع رایگان
              </Button>
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                ویژگی‌ها
              </a>
              <a
                href="#workflow"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                مراحل کاربری
              </a>
              <a
                href="#rbac"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                مدیریت دسترسی
              </a>
              <a
                href="#pricing"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                تعرفه‌ها
              </a>
              <a
                href="#faq"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                سوالات متداول
              </a>
              <div className="pt-3 border-t border-border">
                <Link
                  href="/login"
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ورود
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <span>نسخه جدید پلتفرم تروفلو منتشر شد</span>
            <ArrowLeft className="h-3 w-3" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-[1.2] sm:leading-[1.2] mb-6">
            سامانه یکپارچه مدیریت منابع سازمانی و{" "}
            <span className="text-blue-600 dark:text-blue-500">توسعه هوشمند تیمی</span>
          </h1>

          {/* Value proposition */}
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-10">
            تروفلو بستر چابک و امنی برای مدیریت وظایف، تخصیص بهینه منابع مالی، نظارت بر حضور و مرخصی
            کارکنان و تعریف سطوح دقیق دسترسی سازمانی است.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base">
                ایجاد حساب کاربری رایگان
              </Button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 font-semibold text-base border-border"
              >
                بررسی امکانات پلتفرم
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED METRICS */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-2 md:grid-cols-4 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
                +۵۰۰
              </div>
              <p className="text-sm text-muted-foreground mt-1">سازمان و شرکت فعال</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
                +۵۰,۰۰۰
              </div>
              <p className="text-sm text-muted-foreground mt-1">پرونده فعال پرسنلی</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
                +۱.۲ میلیون
              </div>
              <p className="text-sm text-muted-foreground mt-1">تسک و پروژه انجام‌شده</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
                ۹۹.۹٪
              </div>
              <p className="text-sm text-muted-foreground mt-1">نرخ پایداری سرویس (SLA)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              هر آنچه برای مدیریت مدرن سازمان نیاز دارید
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              تروفلو ماژول‌های اساسی مدیریت منابع پرسنلی را در قالب یک پنل چابک، هماهنگ و متمرکز به
              سازمان شما هدیه می‌دهد.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">مدیریت پرسنل و کارمندان</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                تشکیل پرونده‌های دیجیتالی، ثبت سوابق، مشخصات بیمه‌ای، اطلاعات تماس و تخصیص افراد به
                دپارتمان‌های مختلف.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <CheckSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">مدیریت پروژه‌ها و تسک‌ها</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                تخصیص وظایف به اعضا، تعیین زمان‌بندی تحویل، ضمیمه فایل‌ها، مانیتورینگ روند پیشرفت و
                بررسی لاگ‌های کاری.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">مدیریت مرخصی و حضور</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                سیستم درخواست مرخصی استحقاقی و استعلاجی، تایید یا رد درخواست‌ها توسط مدیران و محاسبه
                خودکار مانده مرخصی سالانه.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">مدیریت امور مالی و پرداخت</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ثبت تاریخچه‌های واریزی، فیش‌های حقوقی پرسنل، تخصیص دستمزد پایه و ردیابی مغایرت‌های
                واریزی در بستر ماژول مالی.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">مدیریت ساختار و دپارتمان‌ها</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                مدل‌سازی دقیق چارت سازمانی، تخصیص مدیران ارشد به بخش‌های فنی، فروش، منابع انسانی و
                مالی به صورت گرافیکی.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">نقش‌ها و دسترسی‌های پیشرفته</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                برقراری سیستم RBAC برای تفکیک دسترسی مالکین سازمان، مدیران ارشد، سرپرستان بخش و
                کارمندان عادی جهت حفظ حریم داده.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW SECTION */}
      <section id="workflow" className="py-20 lg:py-32 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              راه‌اندازی و استفاده در ۴ مرحله ساده
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              با تروفلو می‌توانید در کمتر از ۱۰ دقیقه، ساختار سازمانی خود را شبیه‌سازی کرده و تیم
              کاری خود را مستقر سازید.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative mx-auto max-w-4xl before:absolute before:inset-0 before:right-1/2 before:w-[2px] before:bg-border before:hidden md:before:block">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-10 md:mb-16">
              <div className="hidden md:block w-5/12 text-left pl-8"></div>
              <div className="md:absolute md:right-1/2 md:translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm mb-4 md:mb-0 shrink-0">
                ۱
              </div>
              <div className="w-full md:w-5/12 pr-0 md:pr-8 bg-card border border-border p-5 sm:p-6 rounded-xl shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-2">ثبت نام و ایجاد سازمان</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ابتدا حساب کاربری خود را ایجاد کرده و مشخصات سازمان (مانند عنوان، حوزه فعالیت و
                  شناسه یکتای پیوند) را وارد نمایید.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-10 md:mb-16">
              <div className="w-full md:w-5/12 pl-0 md:pl-8 bg-card border border-border p-5 sm:p-6 rounded-xl shadow-sm order-2 md:order-1">
                <h3 className="text-base sm:text-lg font-bold mb-2">دعوت از اعضا و تشکیل دپارتمان‌ها</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ایمیل پرسنل خود را ثبت کنید تا دعوت‌نامه ورود دریافت کنند. سپس بخش‌های مختلف فنی،
                  فروش یا منابع انسانی را ایجاد کنید.
                </p>
              </div>
              <div className="md:absolute md:right-1/2 md:translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm mb-4 md:mb-0 shrink-0 order-1 md:order-2">
                ۲
              </div>
              <div className="hidden md:block w-5/12 text-right pr-8 order-3"></div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-10 md:mb-16">
              <div className="hidden md:block w-5/12 text-left pl-8"></div>
              <div className="md:absolute md:right-1/2 md:translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm mb-4 md:mb-0 shrink-0">
                ۳
              </div>
              <div className="w-full md:w-5/12 pr-0 md:pr-8 bg-card border border-border p-5 sm:p-6 rounded-xl shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-2">پیکربندی نقش‌ها و دسترسی‌ها</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  با استفاده از سیستم قدرتمند RBAC، نقش‌های پرسنل را تنظیم کنید تا فقط به پنل‌های
                  مجاز و دپارتمان خود دسترسی داشته باشند.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="w-full md:w-5/12 pl-0 md:pl-8 bg-card border border-border p-5 sm:p-6 rounded-xl shadow-sm order-2 md:order-1">
                <h3 className="text-base sm:text-lg font-bold mb-2">شروع کار چابک و گزارش‌گیری</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  تسک‌ها را ارجاع دهید، درخواست‌های حضور و غیاب پرسنل را پاسخگو باشید و در انتهای
                  ماه فیش‌های حقوقی پرسنل را صادر کنید.
                </p>
              </div>
              <div className="md:absolute md:right-1/2 md:translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm mb-4 md:mb-0 shrink-0 order-1 md:order-2">
                ۴
              </div>
              <div className="hidden md:block w-5/12 text-right pr-8 order-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERMISSION SYSTEM SECTION */}
      <section id="rbac" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Context Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                امنیت حریم خصوصی داده
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                معماری مبتنی بر نقش سازمانی (RBAC)
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                اطلاعات پرسنلی، حقوقی و مالی حساس‌ترین بخش داده‌های هر سازمانی است. در تروفلو هیچ
                کاربری فراتر از نیازش به داده‌ها دسترسی نخواهد داشت. ساختار دسترسی به صورت{" "}
                <strong className="text-foreground">مجوز → نقش → کاربر</strong> پیاده‌سازی شده است.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 mt-1">
                    <Check className="h-3..5 w-3.5" />
                  </div>
                  <span className="text-sm">
                    <strong>مدیر کل (Owner)</strong>: نظارت کامل بر مالی، تعریف حقوق، افزودن
                    دپارتمان‌ها و ویرایش نقش‌ها.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 mt-1">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm">
                    <strong>سرپرست بخش (Admin)</strong>: امکان تخصیص پروژه به پرسنل دپارتمان و تایید
                    مرخصی‌ها بدون دسترسی به بخش دستمزد کل سازمان.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 mt-1">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm">
                    <strong>عضو تیم (Member)</strong>: مشاهده و مدیریت وظایف شخصی، ثبت کارکردها و
                    ارسال فرم درخواست مرخصی.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual RBAC Diagram mockup */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
              <h3 className="text-base font-bold text-center mb-6">ساختار درختی تخصیص دسترسی</h3>

              <div className="space-y-4">
                {/* Layer 1: User */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                    ک
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground">کاربر سیستم</h4>
                    <p className="text-sm font-bold">sajjad@example.com</p>
                  </div>
                  <div className="mr-auto text-xs font-medium text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">
                    اختصاص داده شده به
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-6 w-[2px] bg-blue-500/30"></div>
                </div>

                {/* Layer 2: Role */}
                <div className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground">نقش ساختاری</h4>
                    <p className="text-sm font-bold">مدیر ارشد سازمان (Admin)</p>
                  </div>
                  <div className="mr-auto text-xs font-medium text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">
                    حاوی مجوزهای
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-6 w-[2px] bg-blue-500/30"></div>
                </div>

                {/* Layer 3: Permissions */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-2 text-xs font-medium">
                    <Key className="h-3.5 w-3.5 text-blue-500" />
                    <span>users:manage (مدیریت کارکنان)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-2 text-xs font-medium">
                    <Key className="h-3.5 w-3.5 text-blue-500" />
                    <span>org:view (مشاهده تنظیمات سازمان)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-2 text-xs font-medium">
                    <Key className="h-3.5 w-3.5 text-blue-500" />
                    <span>tasks:manage (تعریف و ارجاع پروژه‌ها)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-2 text-xs font-medium">
                    <Key className="h-3.5 w-3.5 text-blue-500" />
                    <span>finance:view (مشاهده فیش‌های واریزی)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DASHBOARD PREVIEW SECTION */}
      <section className="py-20 lg:py-32 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              طراحی شده برای استفاده روزانه و مداوم
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              یک رابط کاربری متمرکز، بدون پیچیدگی‌های غیرضروری و کاملاً بهینه‌سازی شده برای انواع
              صفحه‌نمایش‌ها.
            </p>
          </div>

          {/* Interactive Mockup Container */}
          <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden text-right">
            {/* Mockup Topbar */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block"></span>
              </div>
              <div className="rounded bg-background border border-border px-8 py-1 text-xs text-muted-foreground select-none">
                app.trueflow.ir/org/acme-corp
              </div>
              <div className="w-12"></div>
            </div>

            {/* Mockup Content - Sidebar & Main */}
            <div className="flex h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden text-sm">
              {/* Sidebar */}
              <div className="w-1/4 border-l border-border bg-muted/20 p-4 hidden sm:block space-y-4">
                <div className="flex items-center gap-2 font-bold mb-6">
                  <div className="h-6 w-6 rounded bg-blue-600"></div>
                  <span>تروفلو</span>
                </div>
                <div className="space-y-1">
                  <div className="h-8 rounded bg-blue-500/10 text-blue-600 flex items-center px-3 font-semibold text-xs">
                    داشبورد اصلی
                  </div>
                  <div className="h-8 rounded hover:bg-muted/50 flex items-center px-3 text-muted-foreground text-xs">
                    پرونده پرسنلی
                  </div>
                  <div className="h-8 rounded hover:bg-muted/50 flex items-center px-3 text-muted-foreground text-xs">
                    مدیریت مالی
                  </div>
                  <div className="h-8 rounded hover:bg-muted/50 flex items-center px-3 text-muted-foreground text-xs">
                    تنظیمات سازمان
                  </div>
                </div>
              </div>

              {/* Main Panel */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-card">
                {/* Stats widgets */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-border rounded-lg p-3 bg-muted/10 space-y-1">
                    <p className="text-[10px] text-muted-foreground font-medium">کل پرسنل فعال</p>
                    <p className="text-lg font-bold">۲۴ نفر</p>
                  </div>
                  <div className="border border-border rounded-lg p-3 bg-muted/10 space-y-1">
                    <p className="text-[10px] text-muted-foreground font-medium">
                      درخواست‌های مرخصی باز
                    </p>
                    <p className="text-lg font-bold text-yellow-600">۳ مورد</p>
                  </div>
                  <div className="border border-border rounded-lg p-3 bg-muted/10 space-y-1">
                    <p className="text-[10px] text-muted-foreground font-medium">
                      پروژه‌های در حال انجام
                    </p>
                    <p className="text-lg font-bold text-blue-600">۸ پروژه</p>
                  </div>
                </div>

                {/* Table Mockup */}
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="bg-muted/30 px-3 py-2 border-b border-border text-xs font-bold flex items-center justify-between">
                    <span>لیست حضور غیاب امروز پرسنل</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-semibold">
                      پایدار
                    </span>
                  </div>
                  <div className="p-3 space-y-2.5">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-border/50">
                      <span className="font-semibold">نیما حسینی (توسعه‌دهنده)</span>
                      <span className="text-emerald-600 font-medium">حاضر (ورود: ۰۸:۱۵)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-border/50">
                      <span className="font-semibold">سارا امینی (طراح محصول)</span>
                      <span className="text-emerald-600 font-medium">حاضر (ورود: ۰۸:۳۰)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">امیر کریمی (بازاریابی)</span>
                      <span className="text-yellow-600 font-medium">مرخصی استحقاقی</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              پلن‌های منعطف برای تمامی تیم‌ها و سازمان‌ها
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              با توجه به ابعاد کسب‌وکار خود مناسب‌ترین گزینه را انتخاب کنید. امکان تغییر پلن در هر
              زمان وجود دارد.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">پلن شروع (Starter)</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  مناسب برای ارزیابی و تیم‌های استارتاپی کوچک
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">رایگان</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>حداکثر تا ۱۰ کارمند فعال</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>مدیریت پایه‌ای تسک‌ها و دپارتمان‌ها</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>سیستم ثبت مرخصی استاندارد</span>
                  </li>
                </ul>
              </div>

              <Link href="/register">
                <Button variant="outline" className="w-full font-bold">
                  شروع رایگان
                </Button>
              </Link>
            </div>

            {/* Business (Recommended) */}
            <div className="flex flex-col rounded-2xl border-2 border-blue-600 bg-card p-6 shadow-md justify-between relative">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black tracking-wider px-3 py-1 rounded-full uppercase">
                پیشنهاد ویژه
              </span>

              <div>
                <h3 className="text-lg font-bold mb-1">پلن تجاری (Business)</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  مناسب برای شرکت‌ها و تیم‌های متوسط رو به رشد
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">۴۵۰,۰۰۰</span>
                  <span className="text-xs text-muted-foreground font-medium">تومان / ماهانه</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>کارمندان فعال نامحدود</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>پشتیبانی کامل از ماژول مالی و حقوق</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>مدیریت پیشرفته نقش‌ها و دسترسی (RBAC)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>گزارش‌گیری ماهانه پیشرفته</span>
                  </li>
                </ul>
              </div>

              <Link href="/register">
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold">
                  انتخاب پلن تجاری
                </Button>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">پلن سازمانی (Enterprise)</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  مناسب برای سازمان‌های بزرگ و هلدینگ‌ها
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold tracking-tight">تماس بگیرید</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>تمامی قابلیت‌های پلن تجاری</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>سرور اختصاصی و SLA اختصاصی</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>یکپارچه‌سازی اختصاصی با API سازمانی</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>مدیر حساب اختصاصی تیمی</span>
                  </li>
                </ul>
              </div>

              <Link href="/register">
                <Button variant="outline" className="w-full font-bold">
                  درخواست مشاوره
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faq" className="py-20 lg:py-32 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">پاسخ به سوالات متداول شما</h2>
            <p className="text-muted-foreground text-sm">
              اگر سوال خود را در لیست زیر پیدا نکردید، با کارشناسان ما تماس بگیرید.
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-5 text-right font-semibold text-base focus:outline-none"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed animate-accordion-down">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="relative py-20 lg:py-32 bg-card text-foreground overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl max-w-3xl mx-auto leading-relaxed">
            مدیریت هوشمند منابع انسانی و فرآیندهای سازمانی را از همین امروز آغاز کنید
          </h2>
          <p className="max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
            با پلن رایگان TrueFlow شروع کنید، کارمندان خود را سازماندهی کنید، سطوح دسترسی را مدیریت
            نمایید و بهره‌وری تیم را افزایش دهید.
          </p>
          <div className="pt-4">
            <Link href="/register">
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/20">
                ایجاد حساب کاربری رایگان هم اکنون
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <div>
                  <Image src={Logo} alt="Logo" width={32} height={32} />
                </div>
                <span className="text-blue-600 dark:text-blue-500">تروفلو</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                سامانه بومی و دانش‌بنیان TrueFlow جهت سازماندهی چابک و ارتقای همکاری تیمی در
                کسب‌وکارهای مدرن ایرانی.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold mb-4">بخش‌های پلتفرم</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground">
                    بررسی امکانات
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:text-foreground">
                    مراحل راه‌اندازی
                  </a>
                </li>
                <li>
                  <a href="#rbac" className="hover:text-foreground">
                    مدیریت دسترسی‌ها
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground">
                    قیمت‌گذاری پلن‌ها
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-sm font-bold mb-4">پشتیبانی</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <a href="#faq" className="hover:text-foreground">
                    سوالات متداول
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground/60 cursor-not-allowed">
                    قوانین و مقررات (بزودی)
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground/60 cursor-not-allowed">
                    حریم خصوصی داده‌ها (بزودی)
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <h4 className="text-sm font-bold text-foreground mb-4">ارتباط با ما</h4>
              <p className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500 shrink-0" />
                <span>قزوین، پارک علم و فناوری</span>
              </p>
              <p className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                <span>شماره تماس: ۰۲۸-۷۶۲۵۰۰۰۰ (فرضی)</span>
              </p>
              <p className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <span className="underline">info@trueflow.ir</span>
              </p>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} تروفلو. طراحی شده جهت استفاده در بستر بومی سازمانی.</p>
            <div className="flex gap-4">
              <span className="text-muted-foreground/50">پیش‌فاز معماری سازمانی</span>
              <span>نسخه 1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
