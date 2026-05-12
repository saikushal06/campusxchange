import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, IndianRupee, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { categories } from "@/lib/data";

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

  const update = <K extends keyof typeof form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      toast.error("Title and price are required");
      return;
    }
    toast.success("Listing posted!", { description: "Your item is now live for students to discover." });
    setTimeout(() => navigate({ to: "/browse" }), 700);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> Free forever for students
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Post a <span className="gradient-text">new listing</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Reach thousands of verified students from your campus in under a minute.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-12 grid gap-6 p-6 sm:p-8 rounded-3xl bg-card border shadow-soft">
          <Field label="Photos">
            <label className="aspect-[3/1] rounded-2xl border-2 border-dashed border-border hover:border-primary cursor-pointer grid place-items-center text-center transition-colors">
              <div>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 grid place-items-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div className="mt-3 text-sm font-semibold">Add photos</div>
                <div className="text-xs text-muted-foreground">Up to 6. The first one is your cover.</div>
              </div>
              <input type="file" multiple accept="image/*" className="hidden" />
            </label>
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
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-background border outline-none focus:border-primary text-sm"
                />
              </div>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Category">
              <Select
                value={form.category}
                onChange={(v) => update("category", v)}
                options={categories.map((c) => c.name)}
              />
            </Field>
            <Field label="Condition">
              <Select
                value={form.condition}
                onChange={(v) => update("condition", v)}
                options={["New", "Like New", "Excellent", "Good", "Fair"]}
              />
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
              className="w-full p-4 rounded-xl bg-background border outline-none focus:border-primary text-sm resize-none"
            />
          </Field>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all"
            >
              Publish listing
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/browse" })}
              className="h-12 px-6 rounded-xl border bg-background hover:bg-secondary text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
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
      className="w-full h-12 px-4 rounded-xl bg-background border outline-none focus:border-primary text-sm"
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 px-4 rounded-xl bg-background border outline-none focus:border-primary text-sm"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
