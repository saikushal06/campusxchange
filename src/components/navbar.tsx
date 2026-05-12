import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Menu, Moon, Plus, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const nav = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/sell", label: "Sell" },
  { to: "/profile", label: "Profile" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-primary grid place-items-center shadow-elegant group-hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Campus<span className="gradient-text">Xchange</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full transition-colors relative"
              activeProps={{ className: "text-foreground" }}
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/60"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="hidden sm:grid w-9 h-9 place-items-center rounded-full hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/browse"
            aria-label="Search"
            className="hidden sm:grid w-9 h-9 place-items-center rounded-full hover:bg-accent transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            to="/profile"
            aria-label="Wishlist"
            className="hidden sm:grid w-9 h-9 place-items-center rounded-full hover:bg-accent transition-colors"
          >
            <Heart className="w-4 h-4" />
          </Link>
          <Link
            to="/sell"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Sell
          </Link>
          <button
            className="md:hidden grid w-9 h-9 place-items-center rounded-full hover:bg-accent"
            onClick={() => setOpen((s) => !s)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong border-t"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={toggle}
              className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent text-left flex items-center gap-2"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light" : "Dark"} mode
            </button>
            <Link
              to="/sell"
              className="mt-2 inline-flex items-center justify-center gap-1.5 h-11 rounded-xl gradient-primary text-primary-foreground font-semibold"
            >
              <Plus className="w-4 h-4" /> Post a Listing
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
