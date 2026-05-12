import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Crown,
  Download,
  Flame,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { ListingCard } from "@/components/listing-card";
import { AnimatedCounter } from "@/components/animated-counter";
import { categories, faqs, leaderboard, listings, recentlySold } from "@/lib/data";
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
      <SocialProof />
      <Categories />
      <Featured />
      <Trending />
      <RecentlySold />
      <Leaderboard />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <AppCTA />
    </SiteShell>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section ref={ref} className="relative overflow-hidden gradient-hero pt-20 pb-20 lg:pt-28 lg:pb-28">
      {/* Animated glow orbs */}
      <motion.div style={{ y: y1 }} className="glow-orb top-20 -left-32 w-[28rem] h-[28rem] bg-primary/40 animate-pulse-glow" />
      <motion.div style={{ y: y2 }} className="glow-orb bottom-0 right-0 w-[32rem] h-[32rem] bg-primary-glow/40 animate-pulse-glow" />
      <div className="absolute inset-0 -z-10 opacity-[0.025] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div style={{ opacity }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Trusted by 12,400+ students across 38 campuses
          </motion.div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.02] text-balance">
            Buy. Sell. Exchange.
            <br />
            <span className="gradient-text">Within Your Campus.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl text-balance">
            The trusted marketplace for college students. Snag verified deals on books, gadgets, tickets and more — all from people you actually study with.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 p-2 rounded-2xl glass-strong border shadow-elegant flex items-center gap-2 max-w-xl"
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
              className="inline-flex items-center gap-1 h-11 px-5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all"
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
                className="px-3 py-1.5 rounded-full bg-card/70 backdrop-blur border text-xs font-medium hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
              >
                {c.emoji} {c.name}
              </Link>
            ))}
          </div>
        </motion.div>

        <FloatingCards />
      </motion.div>
    </section>
  );
}

function FloatingCards() {
  return (
    <div className="relative h-[460px] sm:h-[540px] hidden lg:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-elegant ring-1 ring-border"
      >
        <img src={heroImg} alt="Marketplace products" className="w-full h-full object-cover" width={1280} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-6 w-56 p-3 rounded-2xl glass-strong shadow-elegant"
      >
        <div className="flex items-center gap-3">
          <img src={bookImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Books</div>
            <div className="text-sm font-semibold">Engg Math Bundle</div>
            <div className="text-sm font-bold gradient-text">₹850</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 -right-6 w-60 p-3 rounded-2xl glass-strong shadow-elegant"
      >
        <div className="flex items-center gap-3">
          <img src={headphoneImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Gadgets</div>
            <div className="text-sm font-semibold">Sony XM4</div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.8 · Priya
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
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

/* ---------------- SOCIAL PROOF / COUNTERS ---------------- */

function SocialProof() {
  const stats = [
    { v: 12400, suffix: "+", l: "Active Students", icon: Users },
    { v: 42, prefix: "₹", suffix: "M+", l: "Traded This Year", icon: TrendingUp },
    { v: 38, l: "Campuses Live", icon: ShieldCheck },
    { v: 4, suffix: ".9★", l: "Average Rating", icon: Star },
  ];
  return (
    <section className="relative -mt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-card/80 backdrop-blur border shadow-soft grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border overflow-hidden">
          {stats.map((s) => (
            <div key={s.l} className="p-6 sm:p-8 group hover:bg-accent/30 transition-colors">
              <s.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                <AnimatedCounter value={s.v} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1.5 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CATEGORIES ---------------- */

function Categories() {
  return (
    <section className="py-20 sm:py-24 relative">
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
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} grid place-items-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {c.emoji}
                </div>
                <h3 className="mt-4 font-semibold text-sm">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-primary transition-colors">Explore →</p>
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
    <section className="py-16 sm:py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="divider-fade absolute top-0 inset-x-0" />
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-primary/15" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 gap-4">
          <SectionHeader
            eyebrow={<><Sparkles className="w-3.5 h-3.5" /> Featured</>}
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

/* ---------------- TRENDING CAROUSEL ---------------- */

function Trending() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4">
          <SectionHeader
            eyebrow={<><Flame className="w-3.5 h-3.5" /> Trending now</>}
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

/* ---------------- RECENTLY SOLD ---------------- */

function RecentlySold() {
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={<><Tag className="w-3.5 h-3.5" /> Live activity</>}
          title="Recently sold on campus"
          subtitle="Real-time deals closing every hour from your peers."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlySold.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative p-4 rounded-2xl bg-card border hover:shadow-elegant transition-all overflow-hidden group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={s.image} alt={s.title} className="w-14 h-14 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 grid place-items-center ring-2 ring-card">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">SOLD</div>
                  <div className="text-sm font-semibold truncate">{s.title}</div>
                  <div className="text-xs text-muted-foreground">₹{s.price.toLocaleString("en-IN")} · {s.seller}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> Sold in {s.soldIn}</span>
                <span className="text-primary font-semibold">View deal</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LEADERBOARD ---------------- */

function Leaderboard() {
  const medal = ["text-amber-500", "text-zinc-400", "text-amber-700"];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" /> Campus leaderboard
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            The top sellers of <span className="gradient-text">this month.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Reputation matters. Sellers earn levels and badges based on verified sales, on-time deliveries, and buyer reviews.
          </p>
          <Link to="/browse" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            See full ranking <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="lg:col-span-3 rounded-3xl bg-card border shadow-soft overflow-hidden">
          {leaderboard.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center gap-4 px-5 py-4 ${i !== leaderboard.length - 1 ? "border-b border-border" : ""} hover:bg-accent/40 transition-colors`}
            >
              <div className={`w-8 grid place-items-center font-bold ${medal[i] ?? "text-muted-foreground"}`}>
                {i < 3 ? <Crown className="w-5 h-5" /> : `#${p.rank}`}
              </div>
              <div className="w-11 h-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold text-sm shadow-soft">
                {p.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm flex items-center gap-1.5">
                  {p.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">{p.campus}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{p.sales} sales</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {p.rating}
                </div>
              </div>
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
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 -z-10 bg-secondary/40" />
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
              className="relative p-8 rounded-3xl bg-card border hover:shadow-elegant hover:-translate-y-1 transition-all"
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
    { name: "Riya Kapoor", role: "BITS Pilani · 3rd year", quote: "Sold my old MacBook in two hours flat. The verified-student thing makes it actually feel safe." },
    { name: "Arjun Nair", role: "IIT Bombay · 2nd year", quote: "I've bought all my second-year books from CampusXchange. Saved nearly ₹6000 in one semester." },
    { name: "Sneha Das", role: "NIT Trichy · Final year", quote: "The hostel listing helped me find a single room when nothing else worked. Premium experience all around." },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Loved by students" title="Reviews that speak for themselves" />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border hover:shadow-elegant hover:-translate-y-1 transition-all"
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

/* ---------------- FAQ ---------------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 -z-10 bg-secondary/30" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Questions students ask us" />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border bg-card overflow-hidden transition-shadow ${isOpen ? "shadow-elegant" : "hover:shadow-soft"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-sm sm:text-base">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-black/40 blur-3xl animate-pulse-glow" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium">
                <Sparkles className="w-3 h-3" /> Coming soon
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
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
                <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:-translate-y-0.5 transition-transform">
                  <Download className="w-4 h-4" /> App Store
                </button>
                <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:-translate-y-0.5 transition-transform">
                  <Download className="w-4 h-4" /> Google Play
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="space-y-3">
                {["Free forever for students", "Verified college emails only", "Zero commission, ever"].map((t) => (
                  <div key={t} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur">
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground text-balance">{subtitle}</p>}
    </div>
  );
}
