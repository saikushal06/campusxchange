import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, IndianRupee, Sparkles, Upload, X, Wand2, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { categories } from "@/lib/data";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell on CampusXchange" },
      { name: "description", content: "List your item in 60 seconds. Reach thousands of students on your campus." },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "Books",
    condition: "Like New",
    location: "",
    description: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const selectedFiles = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 6 - imageFiles.length);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...selectedFiles].slice(0, 6));
    setImages((prev) => [...prev, ...previewUrls].slice(0, 6));
  };

  const removeImage = (i: number) => {
    setImages((p) => p.filter((_, idx) => idx !== i));
    setImageFiles((p) => p.filter((_, idx) => idx !== i));
  };

  const aiSuggested = useMemo(() => {
    const baseMap: Record<string, number> = {
      Books: 600,
      Notes: 250,
      Gadgets: 12000,
      "Hostel/PG": 6500,
      "Event Tickets": 1800,
      Others: 1500,
    };

    const condMul: Record<string, number> = {
      New: 1,
      "Like New": 0.85,
      Excellent: 0.7,
      Good: 0.55,
      Fair: 0.4,
    };

    const base = baseMap[form.category] ?? 1000;
    const mul = condMul[form.condition] ?? 0.7;
    const center = Math.round((base * mul) / 50) * 50;

    return {
      low: Math.round(center * 0.85),
      mid: center,
      high: Math.round(center * 1.15),
    };
  }, [form.category, form.condition]);

  const uploadImagesToCloudinary = async () => {
    const uploads = imageFiles.map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "docwrip5");

      const res = await fetch("https://api.cloudinary.com/v1_1/dsi3y9dsj/image/upload", {
        method: "POST",
        body: data,
      });

      const imgData = await res.json();

      if (!res.ok) {
        throw new Error(imgData.error?.message || "Image upload failed");
      }

      return imgData.secure_url;
    });

    return Promise.all(uploads);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      toast.error("Title and price are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const uploadedImages = await uploadImagesToCloudinary();

      await addDoc(collection(db, "listings"), {
        title: form.title,
        price: Number(form.price),
        category: form.category,
        condition: form.condition,
        location: form.location,
        description: form.description,
        images: uploadedImages,
        createdAt: new Date(),
        seller: "Student Seller",
      });

      toast.success("Listing posted!", {
        description: "Your item is now live.",
      });

      setTimeout(() => navigate({ to: "/browse" }), 700);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <div className="relative">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-60" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3 h-3" /> Free forever for students
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Post a <span className="gradient-text">new listing</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Reach thousands of verified students from your campus in under a minute.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-10 grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="grid gap-6 p-6 sm:p-8 rounded-3xl glass-strong border shadow-soft">
              <Field label="Photos">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  className={`relative rounded-2xl border-2 border-dashed transition-all ${
                    dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/60"
                  }`}
                >
                  <label className="block aspect-[3/1] cursor-pointer">
                    <div className="h-full w-full grid place-items-center text-center p-6">
                      <div>
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 grid place-items-center">
                          {dragOver ? (
                            <Upload className="w-5 h-5 text-primary animate-bounce" />
                          ) : (
                            <Camera className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div className="mt-3 text-sm font-semibold">
                          {dragOver ? "Drop to upload" : "Drag & drop or click to upload"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Up to 6 images. The first one is your cover.
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {images.map((src, i) => (
                      <div key={i} className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden border group">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary text-primary-foreground">
                            COVER
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/80 text-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Title" required>
                  <Input value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. MacBook Air M2" />
                </Field>

                <Field label="Price" required>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      inputMode="numeric"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="0"
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-background border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
                    />
                  </div>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Category">
                  <Select value={form.category} onChange={(v) => update("category", v)} options={categories.map((c) => c.name)} />
                </Field>

                <Field label="Condition">
                  <Select value={form.condition} onChange={(v) => update("condition", v)} options={["New", "Like New", "Excellent", "Good", "Fair"]} />
                </Field>
              </div>

              <Field label="Pickup location">
                <Input value={form.location} onChange={(v) => update("location", v)} placeholder="e.g. Hostel Block C" />
              </Field>

              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={5}
                  placeholder="Tell buyers more about the item, its condition, and why you're selling..."
                  className="w-full p-4 rounded-xl bg-background border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm resize-none"
                />
              </Field>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? "Publishing..." : "Publish listing"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate({ to: "/browse" })}
                  className="h-12 px-6 rounded-xl border bg-background hover:bg-secondary text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 self-start">
              <div className="relative p-5 rounded-3xl bg-card border shadow-soft overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    <Wand2 className="w-3 h-3" /> AI SUGGESTED
                  </div>
                  <h3 className="mt-3 font-semibold">Smart price range</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on similar {form.condition.toLowerCase()} {form.category.toLowerCase()} on campus.
                  </p>
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
                    <div className="text-3xl font-bold gradient-text tracking-tight">
                      ₹{aiSuggested.mid.toLocaleString("en-IN")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Range: ₹{aiSuggested.low.toLocaleString("en-IN")} – ₹{aiSuggested.high.toLocaleString("en-IN")}
                    </div>
                    <button
                      type="button"
                      onClick={() => update("price", String(aiSuggested.mid))}
                      className="mt-3 w-full h-9 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Use this price
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp className="w-3 h-3" /> Items at this price sell 2.4x faster
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-card border shadow-soft">
                <h3 className="font-semibold text-sm">Tips for a great listing</h3>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <li>📸 Use natural light & a clean background</li>
                  <li>📝 Mention purchase year & accessories included</li>
                  <li>📍 Choose a busy on-campus pickup spot</li>
                  <li>⚡ Reply within an hour to boost visibility</li>
                </ul>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </div>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-12 px-4 rounded-xl bg-background border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 px-4 rounded-xl bg-background border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}