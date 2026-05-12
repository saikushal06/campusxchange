import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { ListingCard } from "@/components/listing-card";
import { categories, listings } from "@/lib/data";
import heroImg from "@/assets/hero-products.jpg";
import bookImg from "@/assets/p-books.jpg";
import headphoneImg from "@/assets/p-headphones.jpg";
import ticketImg from "@/assets/p-ticket.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Categories />
      <Featured />
      <Trending />
      <HowItWorks />
      <Testimonials />
      <AppCTA />
    </SiteShell>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const [q, setQ] = useState("");
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-primary-glow/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Trusted by 12,400+ students across 38 campuses
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Buy. Sell. Exchange.
            <br />
            <span className="gradient-text">Within Your Campus.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
            The trusted marketplace for college students. Snag verified deals on books, gadgets, tickets and more — all from people you actually study with.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 p-2 rounded-2xl bg-card border shadow-elegant flex items-center gap-2 max-w-xl"
          >
            <div className="flex items-center gap-2 px-3 flex-1 min-w-0">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search calculators, MacBooks, hostel rooms..."
                className="bg-transparent outline-none w-full text-sm py-2"
              />
            </div>
            <Link
              to="/browse"
              className="inline-flex items-center gap-1 h-11 px-5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-all"
            >
              Search <ArrowRight className="w-4 h-4" />
            </Link>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.slice(0, 5).map((c) => (
              <Link
                key={c.name}
                to="/browse"
                search={{ category: c.name }}
                className="px-3 py-1.5 rounded-full bg-card border text-xs font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {c.emoji} {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "12k+", l: "Active Students" },
              { v: "₹4.2Cr", l: "Traded" },
              { v: "4.9★", l: "Avg Rating" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold tracking-tight">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <FloatingCards />
      </div>
    </section>
  );
}

function FloatingCards() {
  return (
    <div className="relative h-[500px] sm:h-[560px] hidden lg:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-elegant"
      >
        <img src={heroImg} alt="Marketplace products" className="w-full h-full object-cover" width={1280} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-6 w-56 p-3 rounded-2xl glass-strong shadow-elegant"
      >
        <div className="flex items-center gap-3">
          <img src={bookImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <div className="text-xs text-muted-foreground">Books</div>
            <div className="text-sm font-semibold">Engg Math Bundle</div>
            <div className="text-sm font-bold gradient-text">₹850</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 -right-6 w-60 p-3 rounded-2xl glass-strong shadow-elegant"
      >
        <div className="flex items-center gap-3">
          <img src={headphoneImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <div className="text-xs text-muted-foreground">Gadgets</div>
            <div className="text-sm font-semibold">Sony XM4</div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.8 · Priya
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-6 left-2 w-64 p-4 rounded-2xl glass-strong shadow-elegant"
      >
        <div className="flex items-center gap-3">
          <img src={ticketImg} alt="" className="w-14 h-14 rounded-xl object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <Zap className="w-3 h-3" /> SOLD IN 2 HOURS
            </div>
            <div className="text-sm font-semibold">Coldplay Mumbai</div>
            <div className="text-sm font-bold">₹6,500</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-6 right-10 px-3 py-2 rounded-full glass-strong shadow-elegant flex items-center gap-2"
      >
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold">Verified Sellers</span>
      </motion.div>
    </div>
  );
}

/* ---------------- CATEGORIES ---------------- */

function Categories() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Browse by category"
          title="Find exactly what you need"
          subtitle="Six curated categories built around what students actually buy and sell."
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                to="/browse"
                search={{ category: c.name }}
                className="group block p-5 rounded-2xl bg-card border hover:border-primary/40 hover:-translate-y-1 hover:shadow-elegant transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} grid place-items-center text-2xl group-hover:scale-110 transition-transform`}>
                  {c.emoji}
                </div>
                <h3 className="mt-4 font-semibold text-sm">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">Explore →</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURED ---------------- */

function Featured() {
  const featured = listings.filter((l) => l.featured);
  return (
    <section className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 gap-4">
          <SectionHeader
            eyebrow="Featured"
            title="Hand-picked listings"
            subtitle="Top-rated items from verified sellers near you."
            align="left"
          />
          <Link
            to="/browse"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRENDING ---------------- */

function Trending() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 gap-4">
          <SectionHeader
            eyebrow={<><TrendingUp className="w-3.5 h-3.5" /> Trending now</>}
            title="What's hot this week"
            align="left"
          />
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-5 min-w-max pb-4">
          {listings.map((l, i) => (
            <div key={l.id} className="w-72 shrink-0">
              <ListingCard listing={l} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */

function HowItWorks() {
  const steps = [
    { icon: Tag, title: "List in 60 seconds", desc: "Snap a photo, set your price, and you're live to thousands of students." },
    { icon: Users, title: "Connect on-campus", desc: "Chat with verified buyers from your own college. No strangers." },
    { icon: ShieldCheck, title: "Trade safely", desc: "Meet at safe campus spots. Build your seller rating with every deal." },
  ];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="From listing to handshake in three steps"
          subtitle="Designed for students. No fees. No fuss."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-card border hover:shadow-elegant transition-all"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-elegant">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 grid place-items-center">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */

function Testimonials() {
  const items = [
    {
      name: "Riya Kapoor",
      role: "BITS Pilani · 3rd year",
      quote: "Sold my old MacBook in two hours flat. The verified-student thing makes it actually feel safe.",
    },
    {
      name: "Arjun Nair",
      role: "IIT Bombay · 2nd year",
      quote: "I've bought all my second-year books from CampusXchange. Saved nearly ₹6000 in one semester.",
    },
    {
      name: "Sneha Das",
      role: "NIT Trichy · Final year",
      quote: "The hostel listing helped me find a single room when nothing else worked. Premium experience all around.",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved by students"
          title="Reviews that speak for themselves"
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border hover:shadow-elegant transition-all"
            >
              <Quote className="w-8 h-8 text-primary/30" />
              <p className="mt-4 text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary grid place-items-center text-primary-foreground font-semibold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- APP CTA ---------------- */

function AppCTA() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 sm:p-16 text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-black/40 blur-3xl" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium">
                <Sparkles className="w-3 h-3" /> Coming soon
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
                The CampusXchange app — built for the way students actually trade.
              </h2>
              <p className="mt-4 text-primary-foreground/85 max-w-md">
                Push notifications for new listings near you, in-app chat, and one-tap re-listing. Drop your email and we'll let you know.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="you@college.edu"
                  className="flex-1 h-12 px-4 rounded-xl bg-white/15 placeholder-primary-foreground/60 outline-none border border-white/20 focus:border-white/40"
                />
                <button className="h-12 px-5 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity">
                  Notify me
                </button>
              </form>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-semibold">
                  <Download className="w-4 h-4" /> App Store
                </button>
                <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-semibold">
                  <Download className="w-4 h-4" /> Google Play
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="space-y-3">
                {["Free forever for students", "Verified college emails only", "Zero commission, ever"].map((t) => (
                  <div key={t} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/15">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${a}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold ${align === "center" ? "" : ""}`}>
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
