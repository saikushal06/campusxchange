import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const Route = createFileRoute("/edit-listing/$id")({
  component: EditListingPage,
});

function EditListingPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const ref = doc(db, "listings", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) return;

        const data: any = snap.data();

        if (data.userId !== auth.currentUser?.uid) {
          alert("Unauthorized");
          navigate({ to: "/profile" });
          return;
        }

        setForm({
          title: data.title || "",
          price: data.price?.toString() || "",
          description: data.description || "",
          category: data.category || "",
          location: data.location || "",
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "listings", id), {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        location: form.location,
      });

      alert("Listing updated!");

      navigate({ to: "/profile" });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-card border rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Edit Listing
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium">
              Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Price
            </label>

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Category
            </label>

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-2xl border px-4 py-3 mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
}