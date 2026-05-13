import { createFileRoute } from "@tanstack/react-router";
import { auth, db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { CheckCircle2, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const user = auth.currentUser;

  const [listings, setListings] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  const adminEmail = "saikushal467@gmail.com";

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "listings"), (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setListings(data);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reports"), (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setReports(data);
    });

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

  const markReportReviewed = async (id: string) => {
    try {
      await updateDoc(doc(db, "reports", id), {
        status: "reviewed",
      });

      toast.success("Report marked as reviewed");
    } catch (error) {
      toast.error("Failed to update report");
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

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">
              Reported Listings
            </h2>
          </div>

          {reports.length === 0 ? (
            <div className="p-6 rounded-2xl border bg-card text-muted-foreground">
              No reports yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 rounded-2xl border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">
                        {report.listingTitle || "Reported listing"}
                      </h3>

                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          report.status === "reviewed"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {report.status || "pending"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      Reported by: {report.reportedByEmail || "Unknown user"}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      Listing ID: {report.listingId}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => markReportReviewed(report.id)}
                      className="h-11 px-4 rounded-xl bg-emerald-500/10 text-emerald-500 font-semibold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Reviewed
                    </button>

                    <button
                      onClick={() => deleteListing(report.listingId)}
                      className="h-11 px-4 rounded-xl bg-red-500/10 text-red-500 font-semibold flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            All Listings
          </h2>

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
                    Seller ID: {item.userId}
                  </p>
                </div>

                <button
                  onClick={() => deleteListing(item.id)}
                  className="h-11 w-11 rounded-xl bg-red-500/10 text-red-500 grid place-items-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}