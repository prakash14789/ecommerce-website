import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { setIsAuthenticated, setUserInfo, showToast, setIsAdminAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { email, name, password };
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        showToast(data.message || 'Identity Verification Failed');
        setIsVerifying(false);
        return;
      }

      showToast(isLogin ? 'Registry Connection Established' : 'Archive Identity Created');
      
      if (isLogin) {
        setIsAuthenticated(true);
        // Store name, email, id, and role for persistent session mapping
        setUserInfo({ 
          id: data.id, 
          name: data.name, 
          email: data.email, 
          role: data.role 
        });

        // Redirect based on role
        if (data.role === 'admin') {
          setIsAdminAuthenticated(true);
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        setIsLogin(true); // Switch to login after registration
      }
      setIsVerifying(false);
    } catch (err) {
      showToast('Backend Connection Failed');
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
      
      <div className="relative w-full max-w-lg animate-fade-in">
        <div className="text-center mb-16">
          <h1 className="font-headline text-5xl text-white tracking-[0.2em] mb-6">OBSIDIAN & MERLOT</h1>
          <p className="font-serif text-zinc-400 italic text-lg opacity-80">
            "Luxury is not an object, it is a state of being curated over time."
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 shadow-2xl">
          {isVerifying ? (
            <div className="py-12 text-center animate-pulse">
               <span className="material-symbols-outlined text-5xl text-red-900 mb-6">verified_user</span>
               <h2 className="font-headline text-2xl text-white mb-2">Identity Verified</h2>
               <p className="font-body text-xs uppercase tracking-[0.2em] text-zinc-400">Synchronizing your editorial preferences and curated archive...</p>
            </div>
          ) : (
            <>
              <h2 className="font-headline text-3xl text-white mb-2 tracking-tight">
                {isLogin ? 'Welcome Back' : 'Create Registry Identity'}
              </h2>
              <p className="font-body text-xs uppercase tracking-widest text-zinc-500 mb-10">
                {isLogin ? 'Access your curated archive.' : 'Securely join the Monograph registry.'}
              </p>
              
              <form onSubmit={handleAuth} className="space-y-8">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Full Identity Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-xs font-body focus:ring-1 focus:ring-red-900 outline-none transition-all" 
                      placeholder="Your First & Last Name"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Registry Email</label>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-xs font-body focus:ring-1 focus:ring-red-900 outline-none transition-all" 
                    placeholder="name@monograph.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Private Passphrase</label>
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-xs font-body focus:ring-1 focus:ring-red-900 outline-none transition-all" 
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-900 text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-zinc-900 transition-all shadow-xl"
                >
                  {isLogin ? 'Enter The Atelier' : 'Create Registry Archive'}
                </button>
              </form>

              <div className="mt-12 pt-12 border-t border-white/5 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] uppercase tracking-widest text-zinc-500"
                >
                  {isLogin ? 'New to the atelier? ' : 'Already have an identity? '}
                  <span className="text-white hover:text-red-900 transition-colors font-bold">
                    {isLogin ? 'Apply for Account' : 'Registry Sign-In'}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
          <a href="#" className="w-full md:w-auto text-center text-white border border-white/10 px-6 py-2 hover:bg-white hover:text-black transition-all shadow-lg">
            Privacy
          </a>
          <div className="group relative flex flex-col items-center w-full md:w-auto">
            <Link to="/admin/login" className="w-full md:w-auto text-white border border-white/25 px-6 py-2 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group-hover:border-white shadow-2xl bg-white/5">
              <span className="material-symbols-outlined text-sm">terminal</span>
              Atelier Admin
            </Link>
            <span className="hidden md:block absolute -top-10 text-[7px] uppercase tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap bg-black/40 backdrop-blur-md px-2 py-1 border border-white/5">
              Secure Owner Access
            </span>
          </div>
          <a href="#" className="w-full md:w-auto text-center text-white border border-white/10 px-6 py-2 hover:bg-white hover:text-black transition-all shadow-lg">
            Security
          </a>
        </div>
      </div>
    </div>
  );
}
