import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-library-primary text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/favicon.ico.png" alt="Kitabi Keeda Logo" className="h-10 w-10" />
            <span className="text-2xl font-serif font-bold">Kitabi Keeda</span>
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-library-accent transition-colors">Home</Link>
            <Link to="/about" className="hover:text-library-accent transition-colors">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
