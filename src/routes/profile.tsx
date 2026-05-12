import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Heart, MapPin, Settings, Star } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ListingCard } from "@/components/listing-card";
import { listings } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — CampusXchange" },
      { name: "description", content: "Manage your listings, sales, and saved items." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const myListings = listings.slice(0, 3);
  const saved = listings.slice(3, 6);

  return (
    <SiteShell>
      <section className="relative">
        <div className="h-48 sm:h-56 gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 relative">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border shadow-elegant flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-3xl gradient-primary grid place-items-center text-primary-foreground text-3xl font-bold shadow-elegant">
              AS
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Alex Sharma</h1>
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-1 text-sm text-muted-foreground flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 · 32 sales
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> IIT Delhi · Block 4
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-lg">
                CSE final year. Selling stuff I don't need anymore. Quick replies, fair prices, easy meetups.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/sell"
                className="h-10 px-5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold inline-flex items-center"
              >
                + New listing
              </Link>
              <button className="h-10 w-10 grid place-items-center rounded-xl border bg-background hover:bg-secondary">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { v: "32", l: "Sales" },
              { v: "₹1.2L", l: "Earned" },
              { v: "4.9", l: "Rating" },
            ].map((s) => (
              <div key={s.l} className="p-5 rounded-2xl bg-card border text-center">
                <div className="text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Your active listings">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myListings.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </Section>

      <Section title="Saved items" icon={<Heart className="w-5 h-5 text-destructive fill-destructive" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
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
