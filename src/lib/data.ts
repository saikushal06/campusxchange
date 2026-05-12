import books from "@/assets/p-books.jpg";
import headphones from "@/assets/p-headphones.jpg";
import laptop from "@/assets/p-laptop.jpg";
import hostel from "@/assets/p-hostel.jpg";
import ticket from "@/assets/p-ticket.jpg";
import calc from "@/assets/p-calc.jpg";
import bike from "@/assets/p-bike.jpg";

export type Category =
  | "Event Tickets"
  | "Books"
  | "Notes"
  | "Gadgets"
  | "Hostel/PG"
  | "Others";

export const categories: { name: Category; emoji: string; color: string }[] = [
  { name: "Event Tickets", emoji: "🎟️", color: "from-pink-400/30 to-rose-500/20" },
  { name: "Books", emoji: "📚", color: "from-amber-400/30 to-orange-500/20" },
  { name: "Notes", emoji: "📝", color: "from-blue-400/30 to-indigo-500/20" },
  { name: "Gadgets", emoji: "💻", color: "from-emerald-400/30 to-teal-500/20" },
  { name: "Hostel/PG", emoji: "🏠", color: "from-violet-400/30 to-purple-500/20" },
  { name: "Others", emoji: "✨", color: "from-yellow-400/30 to-amber-500/20" },
];

export interface Listing {
  id: string;
  title: string;
  price: number;
  category: Category;
  image: string;
  seller: string;
  sellerAvatar: string;
  rating: number;
  location: string;
  postedAt: string;
  description: string;
  condition: string;
  featured?: boolean;
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "MacBook Air M2 — Like New",
    price: 78000,
    category: "Gadgets",
    image: laptop,
    seller: "Aarav Mehta",
    sellerAvatar: "AM",
    rating: 4.9,
    location: "Hostel Block C",
    postedAt: "2h ago",
    description:
      "Selling my MacBook Air M2 (2023) — only 8 months old, kept in pristine condition with original box and charger. Perfect for coding, design and productivity.",
    condition: "Like New",
    featured: true,
  },
  {
    id: "2",
    title: "Sony WH-1000XM4 Headphones",
    price: 14500,
    category: "Gadgets",
    image: headphones,
    seller: "Priya Sharma",
    sellerAvatar: "PS",
    rating: 4.8,
    location: "Girls Hostel A",
    postedAt: "5h ago",
    description: "Industry-leading noise cancellation. Battery life still amazing. Selling because upgrading.",
    condition: "Excellent",
    featured: true,
  },
  {
    id: "3",
    title: "Engineering Mathematics Bundle",
    price: 850,
    category: "Books",
    image: books,
    seller: "Rahul Verma",
    sellerAvatar: "RV",
    rating: 4.7,
    location: "Library Lane",
    postedAt: "1d ago",
    description: "Set of 4 textbooks: M1, M2, M3, M4 by B.S. Grewal. Slight highlights inside.",
    condition: "Good",
  },
  {
    id: "4",
    title: "Coldplay Concert Ticket — Mumbai",
    price: 6500,
    category: "Event Tickets",
    image: ticket,
    seller: "Ishita Rao",
    sellerAvatar: "IR",
    rating: 5.0,
    location: "Online Transfer",
    postedAt: "30m ago",
    description: "Music of the Spheres tour. Section B, Row 12. Genuine ticket, original price 8500.",
    condition: "New",
    featured: true,
  },
  {
    id: "5",
    title: "Single Hostel Room Available",
    price: 7500,
    category: "Hostel/PG",
    image: hostel,
    seller: "Kabir Singh",
    sellerAvatar: "KS",
    rating: 4.6,
    location: "Off-Campus North",
    postedAt: "3h ago",
    description: "Fully furnished single room with WiFi, AC, attached washroom. Walking distance from main gate.",
    condition: "Available",
  },
  {
    id: "6",
    title: "Casio fx-991ES Calculator",
    price: 750,
    category: "Gadgets",
    image: calc,
    seller: "Neha Joshi",
    sellerAvatar: "NJ",
    rating: 4.9,
    location: "Hostel Block B",
    postedAt: "6h ago",
    description: "Barely used scientific calculator. Perfect for engineering exams.",
    condition: "Like New",
  },
  {
    id: "7",
    title: "Mountain Bike — 21 Gears",
    price: 9200,
    category: "Others",
    image: bike,
    seller: "Vikram Patel",
    sellerAvatar: "VP",
    rating: 4.5,
    location: "Parking Bay 3",
    postedAt: "1d ago",
    description: "Hercules Roadeo, 21 gears, recently serviced. Great for campus commute.",
    condition: "Good",
  },
  {
    id: "8",
    title: "DSA Handwritten Notes — Complete",
    price: 299,
    category: "Notes",
    image: books,
    seller: "Ananya Iyer",
    sellerAvatar: "AI",
    rating: 5.0,
    location: "Digital",
    postedAt: "2d ago",
    description: "300+ pages of color-coded handwritten DSA notes covering arrays to graphs.",
    condition: "Digital PDF",
  },
];

export const getListing = (id: string) => listings.find((l) => l.id === id);
