import Link from "next/link";

export default function Navbar() {
  return (
    <header className="py-6 px-4 top-0 z-50 sticky bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition"
        >
            JACOB CLEMENT
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6 font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition">
            Work
          </Link>
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>
          <a href="mailto:jacob.clement00@gmail.com" className="hover:text-black transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}