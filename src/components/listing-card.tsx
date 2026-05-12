import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Flame, Heart, MapPin, ShieldCheck, Sparkles, Star, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Badge, Listing } from "@/lib/data";

const badgeMap: Record<Badge, { label: string; icon: React.ComponentType<{ className?: string }>; cls: string }> = {
  verified: { label: "Verified Seller", icon: ShieldCheck, cls: "bg-primary/90 text-primary-foreground" },
  trending: { label: "Trending", icon: Flame, cls: "bg-rose-500/90 text-white" },
  sold: { label: "Recently Sold", icon: Tag, cls: "bg-foreground/85 text-background" },
  trusted: { label: "Campus Trusted", icon: Sparkles, cls: "bg-amber-500/90 text-white" },
};

export function ListingCard({
  listing,
  index = 0,
  onDelete,
}: {
  listing: Listing;
  index?: number;
  onDelete?: (id: string) => void;
}) {
  const [saved, setSaved] = useState(false);
  const [hover, setHover] = useState(false);
  const discount = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : 0;
  const primaryBadge = listing.badges?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <Link
        to="/product/$id"
        params={{ id: listing.id }}
        className="group relative block rounded-2xl bg-card border border-border/80 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-elegant hover:-translate-y-1.5"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <motion.img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover"
            animate={{ scale: hover ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {primaryBadge && (
              <BadgePill badge={primaryBadge} />
            )}
            {discount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/95 text-white text-[10px] font-bold tracking-wide shadow-soft">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist */}
          {onDelete && (
  <button
    onClick={(e) => {
      e.preventDefault();
      onDelete(listing.id);
    }}
    className="absolute bottom-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform"
  >
    <Trash2 className="w-4 h-4" />
  </button>
)}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              setSaved((s) => !s);
            }}
            whileTap={{ scale: 0.85 }}
            aria-label="Save"
            className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full glass-strong shadow-soft hover:scale-110 transition-transform"
          >
            <motion.span
              key={String(saved)}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
            >
              <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
            </motion.span>
          </motion.button>

          {/* Quick preview button (slides up on hover) */}
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 14, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-3 inset-x-3 flex justify-between items-center gap-2"
              >
                <span className="px-2.5 py-1 rounded-full glass-strong text-[11px] font-medium">
                  {listing.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-[11px] font-semibold shadow-elegant">
                  <Eye className="w-3 h-3" /> Quick view
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-[15px] leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <p className="text-lg font-bold tracking-tight">
              ₹{listing.price.toLocaleString("en-IN")}
            </p>
            {listing.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                ₹{listing.originalPrice.toLocaleString("en-IN")}
              </p>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-foreground">{listing.rating}</span>
              <span>· {listing.seller.split(" ")[0]}</span>
            </span>
            <span>{listing.postedAt}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function BadgePill({ badge }: { badge: Badge }) {
  const { label, icon: Icon, cls } = badgeMap[badge];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-soft ${cls}`}>
      <Icon className="w-2.5 h-2.5" /> {label}
    </span>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-muted via-muted/50 to-muted shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 rounded shimmer w-3/4" />
        <div className="h-5 rounded shimmer w-1/3" />
        <div className="h-3 rounded shimmer w-1/2" />
      </div>
    </div>
  );
}
