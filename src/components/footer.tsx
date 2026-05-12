import { Link } from "@tanstack/react-router";
import { Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary grid place-items-center shadow-elegant">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="font-bold text-lg">
              Campus<span className="gradient-text">Xchange</span>
            </span>
          </div>
          <p className="mt-4 text-muted-foreground max-w-sm">
            The trusted marketplace for college students. Buy, sell, and exchange — all within your campus ecosystem.
          </p>
          <div className="flex gap-3 mt-6">
            {[Twitter, Instagram, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full grid place-items-center bg-secondary hover:bg-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Marketplace</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/browse" className="hover:text-foreground">Browse all</Link></li>
            <li><Link to="/sell" className="hover:text-foreground">Post a listing</Link></li>
            <li><Link to="/browse" className="hover:text-foreground">Categories</Link></li>
            <li><Link to="/profile" className="hover:text-foreground">My profile</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Trust & Safety</a></li>
            <li><a href="#" className="hover:text-foreground">Help Center</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} CampusXchange. Built for students, by students.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
