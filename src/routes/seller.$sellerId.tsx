import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Mail, Package, Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { SiteShell } from "@/components/site-shell";
import { ListingCard } from "@/components/listing-card";

export const Route = createFileRoute("/seller/$sellerId")({
  component: SellerPage,
});

function formatListing(id: string, item: any) {
  return {
    id,
    userId: item.userId || "",
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
    postedAt: "Just now",
    rating: 4.8,
    badges: ["verified"],
  };
}

function SellerPage() {
  const { sellerId } = Route.useParams();

  const [sellerListings, setSellerListings] = useState<any[]>([]);
  const [sellerName, setSellerName] = useState("Student Seller");
  const [sellerAvatar, setSellerAvatar] = useState("S");
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchSellerListings = async () => {
      const q = query(collection(db, "listings"), where("userId", "==", sellerId));
      const snap = await getDocs(q);

      const data = snap.docs.map((docItem) =>
        formatListing(docItem.id, docItem.data())
      );

      setSellerListings(data);

      if (data.length > 0) {
        setSellerName(data[0].seller || "Student Seller");
        setSellerAvatar(data[0].sellerAvatar || "S");
        let totalStars = 0;
let totalCount = 0;

for (const listing of snap.docs) {
  const reviewsSnap = await getDocs(
    collection(
      db,
      "listings",
      listing.id,
      "reviews"
    )
  );

  reviewsSnap.docs.forEach((reviewDoc) => {
    const reviewData = reviewDoc.data();

    if (reviewData.rating) {
      totalStars += reviewData.rating;
      totalCount++;
    }
  });
}

setTotalReviews(totalCount);

setAvgRating(
  totalCount > 0
    ? Number((totalStars / totalCount).toFixed(1))
    : 0
);
      }
    };

    fetchSellerListings();
  }, [sellerId]);
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to browse
        </Link>

        <section className="mt-8 p-8 rounded-3xl border bg-card shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-3xl gradient-primary grid place-items-center text-primary-foreground text-3xl font-bold shadow-elegant">
              {sellerAvatar}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold">{sellerName}</h1>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Verified Seller
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {sellerListings.length} active listings
                </span>

                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
{avgRating || "New"} seller rating
{totalReviews > 0 && (
  <span>
    ({totalReviews} reviews)
  </span>
)}
                </span>

                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Campus seller
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground max-w-xl">
                Trusted CampusXchange seller with verified student listings,
                quick replies, and safe campus pickup.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">
            Listings by {sellerName}
          </h2>

          {sellerListings.length === 0 ? (
            <div className="mt-6 p-10 rounded-3xl border bg-card text-center text-muted-foreground">
              No active listings from this seller.
            </div>
          ) : (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sellerListings.map((listing, index) => (
                <ListingCard key={listing.id} listing={listing} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </SiteShell>
  );
}