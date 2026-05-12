import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/lib/data";

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to="/product/$id"
        params={{ id: listing.id }}
        className="group block rounded-2xl bg-card border overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaved((s) => !s);
            }}
            aria-label="Save"
            className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full glass-strong hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-destructive text-destructive" : ""}`} />
          </button>
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-strong text-[11px] font-medium">
            {listing.category}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-snug line-clamp-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
          </div>
          <p className="mt-1.5 text-lg font-bold tracking-tight">
            ₹{listing.price.toLocaleString("en-IN")}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-medium text-foreground">{listing.rating}</span>
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

export function ListingCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-5 bg-muted rounded animate-pulse w-1/3" />
        <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
