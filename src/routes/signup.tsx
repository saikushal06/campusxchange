import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — CampusXchange" },
      { name: "description", content: "Join CampusXchange — the trusted marketplace for college students." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", college: "", password: "" });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-primary grid place-items-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="font-bold text-lg">CampusXchange</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Use your college email — we'll keep things student-only.</p>

          <form
            onSubmit={async (e) => {
  e.preventDefault();

  try {
    await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    toast.success("Account created!", {
      description: "Welcome to CampusXchange.",
    });

    setTimeout(() => navigate({ to: "/" }), 600);
  } catch (error: any) {
    toast.error(error.message);
  }
}}
            className="mt-8 space-y-4"
          >
            <Input icon={User} label="Full name" placeholder="Alex Sharma" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input icon={Mail} type="email" label="College email" placeholder="you@college.edu" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Input icon={GraduationCap} label="College / University" placeholder="IIT Delhi" value={form.college} onChange={(v) => setForm({ ...form, college: v })} />
            <Input icon={Lock} type="password" label="Password" placeholder="At least 8 characters" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />

            <button
              type="submit"
              className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-1 shadow-elegant hover:shadow-glow transition-all"
            >
              Create account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            By signing up you agree to our Terms and Privacy Policy.
          </p>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            Already a member?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="relative hidden lg:flex flex-col justify-between p-12 gradient-primary text-primary-foreground overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-black/40 blur-3xl" />
        </div>
        <div className="relative" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <h2 className="text-4xl font-bold leading-tight">
            Join 12,400+ students
            <br /> already trading on CampusXchange.
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            Verified profiles. Real ratings. Real meetups. Built for the way you actually buy and sell.
          </p>
        </motion.div>
        <p className="relative text-sm text-primary-foreground/70">
          Available across 38 campuses and growing weekly.
        </p>
      </div>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full h-12 pl-10 pr-4 rounded-xl bg-card border outline-none focus:border-primary text-sm"
        />
      </div>
    </label>
  );
}
