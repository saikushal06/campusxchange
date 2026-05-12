import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Crown,
  Heart,
  MapPin,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { ListingCard } from "@/components/listing-card";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — CampusXchange" },
      { name: "description", content: "Manage your listings, sales, and saved items." },
    ],
  }),
  component: ProfilePage,
});

const achievements = [
  { icon: Crown, label: "Top Seller", color: "from-amber-400 to-orange-500" },
  { icon: Zap, label: "Quick Replier", color: "from-blue-400 to-indigo-500" },
  { icon: ShieldCheck, label: "ID Verified", color: "from-emerald-400 to-teal-500" },
  { icon: Trophy, label: "30+ Sales", color: "from-purple-400 to-pink-500" },
  { icon: Sparkles, label: "5★ Streak", color: "from-rose-400 to-red-500" },
];

const reviewBreakdown = [
  { stars: 5, count: 28, pct: 87 },
  { stars: 4, count: 3, pct: 9 },
  { stars: 3, count: 1, pct: 3 },
  { stars: 2, count: 0, pct: 0 },
  { stars: 1, count: 0, pct: 0 },
];

function ProfilePage() {
  const user = auth.currentUser;

  const [myListings, setMyListings] = useState<any[]>([]);
  const [saved] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "listings"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
          image:
            (docItem.data() as any).images?.[0] ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
          seller: user.displayName || "Student Seller",
          sellerAvatar: user.email?.charAt(0).toUpperCase() || "S",
          postedAt: "Just now",
          rating: 4.8,
          badges: ["verified"],
        }));

        setMyListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "listings", id));
      setMyListings((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SiteShell>
      <section className="relative">
        <div className="h-56 sm:h-64 gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-black/30 blur-3xl animate-pulse-glow" />
          </div>
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px] opacity-10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative">
          <div className="p-6 sm:p-8 rounded-3xl glass-strong border shadow-elegant flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl gradient-primary grid place-items-center text-primary-foreground text-3xl font-bold shadow-elegant ring-4 ring-card">
                {user?.email?.charAt(0).toUpperCase() || "S"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary grid place-items-center ring-4 ring-card">
                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {user?.displayName || "Campus User"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> Verified Seller
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[11px] font-bold">
                  <Crown className="w-3 h-3" /> Level 8 · Gold
                </span>
              </div>

              <div className="mt-1.5 text-sm text-muted-foreground flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-semibold text-foreground">4.9</span> · {myListings.length} listings
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Campus
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Replies fast
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground max-w-lg">
                {user?.email}
              </p>

              <div className="mt-4 max-w-sm">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                  <span className="font-semibold">Level 8 — Gold Seller</span>
                  <span>320 / 500 XP to Platinum</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: "64%" }} />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to="/sell"
                className="h-10 px-5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold inline-flex items-center shadow-soft hover:shadow-glow transition-all"
              >
                + New listing
              </Link>
              <button className="h-10 w-10 grid place-items-center rounded-xl border bg-background hover:bg-secondary transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 grid grid-cols-3 gap-3">
              {[
                { v: myListings.length.toString(), l: "Listings" },
                { v: "₹1.2L", l: "Earned" },
                { v: "4.9", l: "Rating" },
              ].map((s) => (
                <div key={s.l} className="p-5 rounded-2xl bg-card border text-center hover:shadow-soft transition-shadow">
                  <div className="text-2xl font-bold tracking-tight">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-card border">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">Achievements</h3>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {achievements.map((a) => (
                  <div key={a.label} className="group flex flex-col items-center gap-1.5" title={a.label}>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.color} grid place-items-center shadow-soft group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
                      <a.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[9px] font-medium text-center text-muted-foreground line-clamp-1">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Review breakdown</h3>
                <span className="text-xs text-muted-foreground">32 reviews</span>
              </div>
              <div className="space-y-1.5">
                {reviewBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2 text-xs">
                    <span className="w-3 font-semibold">{r.stars}</span>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="w-6 text-right text-muted-foreground">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Your active listings">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myListings.map((l, i) => (
            <ListingCard
              key={l.id}
              listing={l}
              index={i}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Section>

      <Section title="Saved items" icon={<Heart className="w-5 h-5 text-rose-500 fill-rose-500" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}

function Section({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}