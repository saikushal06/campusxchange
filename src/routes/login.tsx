import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CampusXchange" },
      { name: "description", content: "Sign in to CampusXchange with your college email." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ensure theme is initialized for this standalone page
  useTheme();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 gradient-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-black/40 blur-3xl" />
        </div>
        <Link to="/" className="relative inline-flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 grid place-items-center">
            <span className="font-bold">C</span>
          </div>
          <span className="font-bold text-lg">CampusXchange</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <h2 className="text-4xl font-bold leading-tight">
            Your campus.
            <br /> Your marketplace.
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            Built for students. Verified by college emails. Premium experience without the hassle.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: GraduationCap, t: "Verified college students only" },
              { icon: ShieldCheck, t: "Safe meetups, real ratings" },
              { icon: Sparkles, t: "Free forever — zero commission" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15">
                <f.icon className="w-5 h-5" />
                <span className="font-medium">{f.t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="relative text-sm text-primary-foreground/70">
          "Sold my old laptop in two hours flat." — Riya, BITS Pilani
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-primary grid place-items-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="font-bold text-lg">CampusXchange</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in with your college email to continue.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Signed in", { description: "Welcome to CampusXchange." });
              setTimeout(() => navigate({ to: "/" }), 600);
            }}
            className="mt-8 space-y-4"
          >
            <label className="block">
              <div className="text-sm font-medium mb-2">College email</div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-card border outline-none focus:border-primary text-sm"
                  required
                />
              </div>
            </label>
            <label className="block">
              <div className="text-sm font-medium mb-2 flex justify-between">
                Password
                <a href="#" className="text-primary text-xs">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-card border outline-none focus:border-primary text-sm"
                  required
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-1 shadow-elegant hover:shadow-glow transition-all"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full h-12 rounded-xl bg-card border font-semibold text-sm hover:bg-secondary transition-colors">
            Continue with Google
          </button>

          <p className="mt-8 text-sm text-center text-muted-foreground">
            New to CampusXchange?{" "}
            <Link to="/signup" className="text-primary font-semibold">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
