import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function MobileNav() {
  const { setIsMenuOpen, setIsCartOpen } = useAppContext();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl z-50 rounded-t-3xl border-t border-zinc-200/20 shadow-2xl tonal-shift">
      <Link to="/" onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90">
        <span className="material-symbols-outlined">home</span>
        <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Home</span>
      </Link>
      <Link to="/shop" className="flex flex-col items-center justify-center bg-red-900 text-white rounded-full p-3 active:scale-90">
        <span className="material-symbols-outlined">storefront</span>
        <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Shop</span>
      </Link>
      <Link to="/collections" className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90">
        <span className="material-symbols-outlined">receipt_long</span>
        <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Orders</span>
      </Link>
      <Link to="/heritage" className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90">
        <span className="material-symbols-outlined">person</span>
        <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Profile</span>
      </Link>
    </div>
  );
}
