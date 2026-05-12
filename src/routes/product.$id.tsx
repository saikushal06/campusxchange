import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { ListingCard } from "@/components/listing-card";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function formatListing(id: string, item: any) {
  return {
    id,
    title: item.title || "Untitled listing",
    description: item.description || "",
    price: Number(item.price) || 0,
    category: item.category || "Others",
    condition: item.condition || "Good",
    location: item.location || "Campus",
    image:
      item.images?.[0] ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    images: item.images || [],
    seller: item.seller || "Student Seller",
    sellerAvatar: item.sellerAvatar || "S",
    postedAt: item.postedAt || "Just now",
    rating: item.rating || 4.5,
    badges: item.badges || ["verified"],
  };
}

function ProductPage() {
  const { id } = Route.useParams();

  const [listing, setListing] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setListing(null);
          return;
        }

        const product = formatListing(docSnap.id, docSnap.data());
        setListing(product);

        const querySnapshot = await getDocs(collection(db, "listings"));

        const relatedListings = querySnapshot.docs
          .map((d) => formatListing(d.id, d.data()))
          .filter((x) => x.category === product.category && x.id !== product.id)
          .slice(0, 3);

        setRelated(relatedListings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!listing) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-md text-center py-32">
          <h1 className="text-2xl font-bold">Loading listing...</h1>
          <Link to="/browse" className="mt-4 inline-block text-primary font-semibold">
            ← Back to browse
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to browse
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-elegant"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full glass-strong text-xs font-semibold">
                {listing.category}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {listing.condition}
              </span>
            </div>

            <button
              onClick={() => setSaved((s) => !s)}
              className="absolute top-4 right-4 w-11 h-11 grid place-items-center rounded-full glass-strong"
            >
              <Heart className={`w-5 h-5 ${saved ? "fill-destructive text-destructive" : ""}`} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" /> {listing.location} · {listing.postedAt}
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              {listing.title}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <div className="text-4xl font-bold gradient-text">
                ₹{listing.price.toLocaleString("en-IN")}
              </div>
              <div className="text-sm text-muted-foreground">negotiable</div>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-card border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold">
                    {listing.sellerAvatar}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      {listing.seller}
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {listing.rating} · 24 sales
                    </div>
                  </div>
                </div>
                <button className="text-sm font-semibold text-primary hover:underline">
                  View profile
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all">
                <MessageCircle className="w-4 h-4" /> Chat with seller
              </button>
              <button className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-card border hover:border-primary transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-card border hover:border-primary transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8">
              <h2 className="font-semibold">Description</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, label: "Verified seller" },
                { icon: Tag, label: listing.condition + " condition" },
                { icon: MapPin, label: listing.location },
                { icon: CheckCircle2, label: "Safe campus pickup" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/60 text-sm"
                >
                  <f.icon className="w-4 h-4 text-primary" />
                  {f.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold tracking-tight">
              More in {listing.category}
            </h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r, i) => (
                <ListingCard key={r.id} listing={r} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}