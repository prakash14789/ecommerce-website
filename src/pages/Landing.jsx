import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="-mt-24 -mx-6 md:-mx-12">
      {/* ... Hero Section ... */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-20 overflow-hidden bg-surface">
        <div className="z-10 max-w-2xl animate-fade-in-up">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-6 block">Collection No. 04</span>
          <h1 className="font-headline text-6xl md:text-8xl text-on-surface leading-none mb-8">
            The Art of <br/>
            <span className="italic text-primary-container">Quiet Luxury</span>
          </h1>
          <p className="font-body text-lg text-secondary max-w-md mb-12 leading-relaxed">
            Meticulously crafted essentials for the modern curator. Designed in our Paris atelier, worn by those who define the unspoken.
          </p>
          <div className="flex gap-4">
            <Link to="/shop" className="bg-primary-container text-white px-10 py-5 rounded-none font-label uppercase tracking-widest text-sm hover:bg-primary transition-all duration-300 translate-y-0 hover:-translate-y-1 shadow-xl">
              Shop The Atelier
            </Link>
            <Link to="/heritage" className="border border-outline/20 px-10 py-5 rounded-none font-label uppercase tracking-widest text-sm hover:bg-surface-container-high transition-all">
              The Heritage Story
            </Link>
          </div>
        </div>
        
        {/* Asymmetric Floating Images */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <div className="absolute top-24 right-24 w-80 h-[500px] z-20 shadow-2xl animate-float">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDANqA8_VCrcrBTPgEcn0d59ngvtGpSsys4CtNVBpWpLOiPhRle67Ge5flxUEvg-aGjADnABAWDNZgHZfKPbWIqekHX8F07ld2xXA2g7c5R5IzGk8xTGT1HW7CLHaLxeLkvxmhpTebj2PBUBV84yA9vMUPPSEUfjcPpmps2OCkIvYZiuT5vJ9_G8hf-D0VhzGE1iyuCzc5KVmKCy5zVVlWfhrm3wa8kUCCpI75jxpmQEPZzUcb2qDBZtuVhmpEtFH5HjfBsE0aTdF8" 
              alt="Luxury Silk"
            />
          </div>
          <div className="absolute bottom-20 right-[400px] w-64 h-80 z-10 shadow-xl opacity-80 animate-float-delayed">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL31Ll2GcJZ3RDux4wzthUnNWgfOw8_WzYJCJ3Znd8zfDptkv7KoG4VyA52RqDiWPnqZQ5z2AXfoCymFcU4UG9X8vZOn5fAWTfea2vpueZhrm44EPTn_4B1hO8qo4dDqnW8MLSdjKC4b6LPQu65fHfxPUi8EJwRUfWbaR_DAZZocfqyNyyhfPpXeAMDQ1cAuTYWcsykApN6KytE_mxWS_fns4nk_WT2Kt_YERVbEcL53mbcNajFCjaG28LrTNaQZyXKBWB5oNI9Ag" 
              alt="Editorial Portrait"
            />
          </div>
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary-container/10 -translate-y-1/2 blur-3xl rounded-full"></div>
        </div>
      </section>

      {/* Featured Series */}
      <section className="py-32 px-6 md:px-20 bg-surface-container-low">
        <div className="flex justify-between items-end mb-16 max-w-[1600px] mx-auto">
          <div>
            <h2 className="font-headline text-4xl text-on-surface mb-2 tracking-tight">Curated Series</h2>
            <div className="h-1 w-12 bg-primary-container"></div>
          </div>
          <Link to="/shop" className="font-label text-sm uppercase tracking-widest border-b border-on-surface pb-1 hover:text-primary hover:border-primary transition-colors">Browse All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-[1600px] mx-auto">
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest shadow-sm">
            <div className="aspect-[16/9] overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYSSQkRQYAX5chRErbtooT0rXfGj4Tmyfb2Hg4-Nm7KHpgwLkipShKtZTmzmid0ivvs2B5fNwFldyt3fHOuNsDPWZ20XUPo-h6SxQzoP8KW_cjCRdYiDBfgA9bipkMID1QOCOkLTJ0BDZEX39HExzIxIMDV_QBHM08BNr9REnJCujoFSQKwyWSMJlEGY-hnLi7VXTMRRDrTjZ7BPDE9YgQYVwDTdDwR_y6r0d8yG_Lzd2QF4-Bta4r0Wjcd0aXMtW5CF3j-eZyX-A" alt="Leather Suite" />
            </div>
            <Link to="/shop?category=Leather Goods" className="p-10 flex justify-between items-center bg-white group cursor-pointer">
              <div>
                <h3 className="font-headline text-2xl mb-1 tracking-tight">The Leather Suite</h3>
                <p className="text-secondary font-body text-sm italic">Italian calfskin, hand-dyed in deep oxblood.</p>
              </div>
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-3 transition-transform duration-500 text-red-900">arrow_right_alt</span>
            </Link>
          </div>
          <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-lowest shadow-sm">
            <div className="h-full flex flex-col bg-white">
              <div className="flex-grow overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQxDcW0UdyHBJ0Hdb874qoec-sBsvLA1BK_GCOksJaZwAvFJLWjkno2vkbJhiOpmXDyrp07LkN-eg_sEoFRqR9cujYuAQ1VETW982bMJlQSvnFadaFCwsbQfhPn-9H2wO_u3BFZJ1FggqS-1u7aJLzeB2TKUrBSqxseDyyN0YpBpxeXRSQzmitpyoiDgSqS5P4PK1kXeomZM9w1Rm5t20WgX38TTaEts3GCn2XROZvEikvCAF0fbCVe3bzHilKAHkvray_6NF_p0I" alt="Signature Scent" />
              </div>
              <Link to="/shop?category=Outerwear" className="p-10 group cursor-pointer">
                <h3 className="font-headline text-2xl mb-1 tracking-tight group-hover:text-red-900 transition-colors">Signature Scent</h3>
                <p className="text-secondary font-body text-sm italic">Notes of sandalwood & aged vine.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-40 px-6 md:px-20 grid md:grid-cols-2 gap-24 items-center bg-white max-w-[1600px] mx-auto">
        <div className="order-2 md:order-1 relative">
          <div className="absolute -inset-4 border border-primary/10 -z-10 translate-x-8 translate-y-8"></div>
          <img className="w-full aspect-square object-cover shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtgtxP_rCpWLOrvqLh8EYmKWXDkXHbc_ccSaZndlqRmac3rXTTdcx-CRzU2tyE0Fmys7_jQvP6V7_JoVlE2QIbbNPhBPIII7ZSv9Gfrse_NP9hDGsDvn7eQaXc1mTkRrQWRcGGBhg5MK8VGAZDaVuIqZDUR1ZAG0nOzQUXfridGI3g6PCm7XnJCbd8M2o9wVOOLwf8ebxqtpfiMYS5SMQHz0VxBk1_H7JM6OMDuhf4dwsQ-DULYLowzQ-lE6K5nm-6N43ZmCreFRk" alt="Craftsmanship" />
        </div>
        <div className="order-1 md:order-2">
          <span className="font-headline italic text-primary text-2xl mb-6 block">Since 1924</span>
          <h2 className="font-headline text-5xl md:text-6xl text-on-surface mb-10 leading-tight tracking-tighter">Heritage in every stitch, <br/> Modernity in every line.</h2>
          <div className="space-y-8 text-secondary font-body text-lg leading-relaxed">
            <p>Monograph was born from a desire to bridge the gap between traditional craftsmanship and the fast-paced digital world. We don't believe in trends; we believe in the longevity of the object.</p>
            <p>Every piece is a chapter. Every material is a memory. We source only the finest raw components from sustainable partners across Europe, ensuring that luxury never costs the earth.</p>
          </div>
          <div className="mt-16 flex items-center gap-6">
            <div className="w-20 h-[1px] bg-red-900"></div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl text-red-900">Julianne Vane</span>
              <span className="font-body text-[10px] text-secondary uppercase tracking-[0.3em] mt-1">Founder & Creative Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-primary-container text-white px-6">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          {isSubmitted ? (
            <div className="py-20 animate-fade-in">
               <span className="material-symbols-outlined text-6xl mb-6 text-white/50">verified</span>
               <h2 className="font-headline text-5xl md:text-6xl mb-4 tracking-tighter text-white">Registry Synchronized</h2>
               <p className="font-body text-white/70 tracking-[0.4em] uppercase text-xs">A welcome manifest has been dispatched to your private archive.</p>
            </div>
          ) : (
            <>
              <h2 className="font-headline text-5xl md:text-6xl mb-4 tracking-tighter">The Elite Monograph Circle</h2>
              <p className="font-body text-white/70 mb-12 tracking-[0.4em] uppercase text-xs">Join our elite list for early access to seasonal monographs.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-0 border-b border-white/20">
                <input 
                  required
                  className="flex-grow bg-transparent border-none py-6 focus:ring-0 text-white placeholder:text-white/40 font-body text-lg" 
                  placeholder="Private Email Address" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-white text-primary-container px-12 py-6 uppercase font-label text-sm tracking-widest hover:bg-surface transition-all font-bold">Request Entry</button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
