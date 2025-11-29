import "./globals.css";
import Navbar from "./components/Navbar"; // Import the Navbar

export const metadata = {
  title: "Jacob Clement | Visual Storyteller",
  description: "Portfolio of Jacob Clement, 2D Animator and Storyboard Artist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar /> {/* <--- Add Navbar here, ABOVE children */}
        
        <main>
            {children}
        </main>
        
        {/* Optional: Simple Footer */}
        <footer className="text-center text-gray-400 py-10 text-sm mt-20 border-t border-gray-100">
            &copy; {new Date().getFullYear()} Jacob Clement. All rights reserved.
        </footer>
      </body>
    </html>
  );
}