import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { ListingCard, ListingCardSkeleton } from "@/components/listing-card";
import { categories, listings, type Category } from "@/lib/data";

const allCategories = ["All", ...categories.map((c) => c.name)] as const;

const searchSchema = z.object({
  category: fallback(z.enum(allCategories as unknown as [string, ...string[]]), "All").default("All"),
  q: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["newest", "low", "high", "rating"]), "newest").default("newest"),
});

export const Route = createFileRoute("/browse")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Browse Listings — CampusXchange" },
      { name: "description", content: "Browse verified student listings — books, gadgets, hostel rooms and more." },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const { category, q, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let r = listings.slice();
    if (category !== "All") r = r.filter((l) => l.category === (category as Category));
    if (query) {
      const ql = query.toLowerCase();
      r = r.filter((l) => l.title.toLowerCase().includes(ql) || l.description.toLowerCase().includes(ql));
    }
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [category, query, sort]);

  return (
    <SiteShell>
      <section className="border-b bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Browse <span className="gradient-text">listings</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            {results.length} item{results.length === 1 ? "" : "s"} from verified students near you.
          </p>

          <div className="mt-6 flex flex-col lg:flex-row gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ search: (s) => ({ ...s, q: query }) });
              }}
              className="flex-1 flex items-center gap-2 px-4 h-12 rounded-2xl bg-card border shadow-soft"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search listings..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              {query && (
                <button type="button" onClick={() => { setQuery(""); navigate({ search: (s) => ({ ...s, q: "" }) }); }}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </form>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="lg:hidden inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-card border text-sm font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => navigate({ search: (s) => ({ ...s, sort: e.target.value as "newest" }) })}
              className="h-12 px-4 rounded-2xl bg-card border text-sm font-medium outline-none"
            >
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          <div className={`mt-5 flex flex-wrap gap-2 ${showFilters ? "" : "hidden lg:flex"}`}>
            {allCategories.map((c) => (
              <Link
                key={c}
                to="/browse"
                search={(s) => ({ ...s, category: c })}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  category === c
                    ? "gradient-primary text-primary-foreground border-transparent shadow-elegant"
                    : "bg-card hover:border-primary"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {results.length === 0 ? (
            <EmptyState onReset={() => navigate({ search: () => ({ category: "All", q: "", sort: "newest" }) })} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((l, i) => (
                <ListingCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-20 text-center max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 grid place-items-center">
        <Search className="w-8 h-8 text-primary" />
      </div>
      <h3 className="mt-6 text-xl font-bold">No listings found</h3>
      <p className="mt-2 text-muted-foreground">
        Try adjusting your filters or search for something different.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-full gradient-primary text-primary-foreground text-sm font-semibold"
      >
        Reset filters
      </button>
    </div>
  );
}

export const _Skeleton = ListingCardSkeleton;
