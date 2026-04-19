import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart, showToast } = useAppContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock checkout items if cart is empty for demonstration (or redirect)
  const items = cartItems.length > 0 ? cartItems : [
    { id: 'm1', title: 'Méridien Sneaker', price: 850, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL31Ll2GcJZ3RDux4wzthUnNWgfOw8_WzYJCJ3Znd8zfDptkv7KoG4VyA52RqDiWPnqZQ5z2AXfoCymFcU4UG9X8vZOn5fAWTfea2vpueZhrm44EPTn_4B1hO8qo4dDqnW8MLSdjKC4b6LPQu65fHfxPUi8EJwRUfWbaR_DAZZocfqyNyyhfPpXeAMDQ1cAuTYWcsykApN6KytE_mxWS_fns4nk_WT2Kt_YERVbEcL53mbcNajFCjaG28LrTNaQZyXKBWB5oNI9Ag', details: 'Mahogany / Size 42' },
    { id: 'm2', title: 'Nightfall Silk Tie', price: 185, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDANqA8_VCrcrBTPgEcn0d59ngvtGpSsys4CtNVBpWpLOiPhRle67Ge5flxUEvg-aGjADnABAWDNZgHZfKPbWIqekHX8F07ld2xXA2g7c5R5IzGk8xTGT1HW7CLHaLxeLkvxmhpTebj2PBUBV84yA9vMUPPSEUfjcPpmps2OCkIvYZiuT5vJ9_G8hf-D0VhzGE1iyuCzc5KVmKCy5zVVlWfhrm3wa8kUCCpI75jxpmQEPZzUcb2qDBZtuVhmpEtFH5HjfBsE0aTdF8', details: 'Onyx Black' }
  ];
  
  const total = cartItems.length > 0 ? cartTotal : items.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showToast('Order placed successfully. Welcome to the circle.');
      clearCart();
      navigate('/');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-surface pt-12 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Shipping & Payment */}
        <div className="animate-fade-in-up">
          <Link to="/shop" className="inline-flex items-center text-xs uppercase tracking-widest text-zinc-400 hover:text-red-900 mb-12 transition-colors">
            <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
            Return to Atelier
          </Link>
          
          <h1 className="font-headline text-4xl mb-12 tracking-tight text-on-surface">Checkout</h1>
          
          <form onSubmit={handlePlaceOrder} className="space-y-12">
            {/* Shipping Section */}
            <section>
              <h2 className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-8 block">01. Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required placeholder="First Name" className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-red-900 transition-colors font-body text-sm" />
                <input required placeholder="Last Name" className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-red-900 transition-colors font-body text-sm" />
                <input required placeholder="Email Address" type="email" className="md:col-span-2 bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-red-900 transition-colors font-body text-sm" />
                <input required placeholder="Shipping Address" className="md:col-span-2 bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-red-900 transition-colors font-body text-sm" />
                <input required placeholder="City" className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-red-900 transition-colors font-body text-sm" />
                <input required placeholder="Postal Code" className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-red-900 transition-colors font-body text-sm" />
              </div>
            </section>

            {/* Payment Section */}
            <section>
              <h2 className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-8 block">02. Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-6 border border-zinc-200 cursor-pointer hover:border-red-900 transition-all group">
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" defaultChecked className="text-red-900 focus:ring-red-900" />
                    <div>
                      <span className="font-body text-sm block">Credit or Debit Card</span>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400">Secure encrypted transaction</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-zinc-100 rounded-sm"></div>
                    <div className="w-8 h-5 bg-zinc-100 rounded-sm"></div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-6 border border-zinc-200 cursor-pointer hover:border-red-900 transition-all group opacity-60">
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" className="text-red-900 focus:ring-red-900" />
                    <div>
                      <span className="font-body text-sm block">Digital Wallet</span>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400">Apple Pay / PayPal</span>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-6 uppercase font-label text-sm tracking-[0.3em] transition-all relative overflow-hidden ${
                isProcessing ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-red-900 text-white hover:bg-black'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-3 border-2 border-zinc-400 border-t-zinc-100 rounded-full" viewBox="0 0 24 24"></svg>
                  Processing...
                </span>
              ) : 'Confirm and Pay'}
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
               <span className="material-symbols-outlined text-xs">lock</span>
               256-bit Secure Encryption
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-zinc-50 p-8 md:p-12 animate-fade-in-delayed h-fit sticky top-24">
          <h2 className="font-headline text-2xl mb-10 tracking-tight">Order Summary</h2>
          <div className="space-y-8 mb-12">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 items-center">
                <div className="w-20 h-24 bg-white overflow-hidden shadow-sm shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-base tracking-tight">{item.title}</h3>
                  <p className="text-xs text-zinc-500 font-body mt-1">{item.details}</p>
                </div>
                <span className="font-body text-sm">${item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-zinc-200">
            <div className="flex justify-between text-sm text-zinc-500 font-body">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500 font-body">
              <span>Shipping</span>
              <span className="text-xs uppercase tracking-widest font-bold text-green-700">Complimentary</span>
            </div>
            <div className="flex justify-between text-lg font-headline pt-4 border-t border-zinc-200 tracking-tight">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/50 border border-zinc-100 italic font-body text-zinc-500 text-sm leading-relaxed">
            "Every piece is a chapter. Thank you for becoming part of the Monograph story."
          </div>
        </div>

      </div>
    </div>
  );
}
