import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const { setIsMenuOpen, setIsCartOpen, showToast, isAuthenticated, isAdminAuthenticated } = useAppContext();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/70 dark:bg-zinc-950/70 backdrop-blur-xl flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-red-900 dark:text-red-500 scale-95 duration-200"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <nav className="hidden md:flex gap-8 ml-8">
          <Link to="/heritage" className="text-zinc-500 dark:text-zinc-400 font-serif text-lg tracking-widest hover:text-red-800 transition-colors duration-300">Heritage</Link>
          <Link to="/shop" className="text-zinc-500 dark:text-zinc-400 font-serif text-lg tracking-widest hover:text-red-800 transition-colors duration-300">Shop</Link>
          <Link to="/collections" className="text-zinc-500 dark:text-zinc-400 font-serif text-lg tracking-widest hover:text-red-800 transition-colors duration-300">Collections</Link>
        </nav>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/">
          <h1 className="font-serif text-2xl font-bold tracking-tighter text-red-900 dark:text-white uppercase">MONOGRAPH</h1>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="group relative flex flex-col items-center">
          <button onClick={() => showToast('Opening Search...')} className="text-zinc-500 hover:text-red-900 transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <span className="absolute top-10 text-[8px] uppercase tracking-widest text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-700 pointer-events-none whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 border border-zinc-100 shadow-sm">
            Search Archive
          </span>
        </div>

        {/* Admin Terminal Access */}
        <div className="group relative flex flex-col items-center">
          <Link to={isAdminAuthenticated ? "/admin" : "/admin/login"} className="text-zinc-500 hover:text-red-900 transition-colors">
            <span className="material-symbols-outlined">terminal</span>
          </Link>
          <span className="absolute top-10 text-[8px] uppercase tracking-widest text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-700 pointer-events-none whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 border border-zinc-100 shadow-sm">
            {isAdminAuthenticated ? "Enter Dashboard" : "Atelier Terminal"}
          </span>
        </div>

        {/* User Identity Access */}
        <div className="group relative flex flex-col items-center">
          <Link to={isAuthenticated ? "/profile" : "/auth"} className="text-zinc-500 hover:text-red-900 transition-colors">
            <span className="material-symbols-outlined">{isAuthenticated ? "person" : "account_circle"}</span>
          </Link>
          <span className="absolute top-10 text-[8px] uppercase tracking-widest text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-700 pointer-events-none whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 border border-zinc-100 shadow-sm">
            {isAuthenticated ? "Your Identity" : "Registry Login"}
          </span>
        </div>

        <div className="group relative flex flex-col items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-red-900 dark:text-red-500 scale-95 duration-200">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <span className="absolute top-10 text-[8px] uppercase tracking-widest text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-700 pointer-events-none whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 border border-zinc-100 shadow-sm">
            Curated Bag
          </span>
        </div>
      </div>
    </header>
  );
}
