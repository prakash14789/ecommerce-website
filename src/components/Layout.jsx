import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import Drawers from './Drawers';
import MobileNav from './MobileNav';
import Toast from './Toast';
import ConciergeAI from './ConciergeAI';

export default function Layout({ children }) {
  const { isMenuOpen, isCartOpen, setIsMenuOpen, setIsCartOpen } = useAppContext();
  const isDrawerOpen = isMenuOpen || isCartOpen;

  return (
    <div className="min-h-screen bg-background font-body text-on-surface flex flex-col pt-24 pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 md:px-12">
        {children}
      </main>
      
      <Footer />
      
      <MobileNav />
      <Drawers />
      <Toast />
      <ConciergeAI />
      
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 backdrop-blur-sm ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsMenuOpen(false);
          setIsCartOpen(false);
        }}
      />
    </div>
  );
}
