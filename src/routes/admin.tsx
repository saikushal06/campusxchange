import { createFileRoute } from "@tanstack/react-router";
import { auth, db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const user = auth.currentUser;

  const [listings, setListings] = useState<any[]>([]);

  const adminEmail = "saikushal467@gmail.com";

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "listings"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListings(data);
      }
    );

    return () => unsub();
  }, []);

  const deleteListing = async (id: string) => {
    try {
      await deleteDoc(doc(db, "listings", id));

      toast.success("Listing removed");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (!user || user.email !== adminEmail) {
    return (
      <div className="min-h-screen grid place-items-center text-2xl font-bold">
        Access Denied
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid gap-4">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border bg-card flex items-center justify-between"
            >
              <div>
                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>

                <p className="text-sm text-muted-foreground">
                  ₹{item.price}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {item.userEmail}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteListing(item.id)
                }
                className="h-11 w-11 rounded-xl bg-red-500/10 text-red-500 grid place-items-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}