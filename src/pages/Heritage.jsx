import { Link } from 'react-router-dom';

export default function Heritage() {
  return (
    <div className="flex flex-col gap-16 mt-8">
      <section className="animate-fade-in">
        <div className="max-w-4xl">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4 block underline underline-offset-4">Established 1994</span>
          <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter text-on-surface leading-tight">Our Story:<br />Modern Heritage</h2>
          <p className="mt-12 font-body text-xl text-secondary max-w-2xl leading-relaxed">
            Founded in a small atelier in Milan, Monograph was born from a singular vision: to create objects of permanence in a world of transience. Every piece we create is a chapter in an ongoing study of form, material, and shadow.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmfBTKRIXCOW_66ujLUnGvJDE4kXsom8OndstMS7eODnODftsnRY4O6iyMEnCVw9wUDLMgv2ii8IiC5nzy8b5DM94sO-cUh9BKBpVqWwztVXwdRZBQXOI-KX4tKgHpmxGpYdMVYb5MCnpfXAJ9BMlSvYmxi2DqvnzEOaKdaAvSHYtCOz9e0Fha9rKQvcHMbTqfCy70D4oRVaXQMPkE7YPm274IWqI_JXlYAc3kiqgcH0cAjdM5EX5HeQfJKqnUU4YbPWh9l-dPdwk"
            className="w-full h-full object-cover"
            alt="Monograph Archive"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="font-headline text-3xl font-bold tracking-tight text-red-900 uppercase">The Archive</h3>
          <p className="font-body text-zinc-600 leading-loose">
            We don't believe in seasons, only in additions. Our archives house every piece ever produced, each assigned a unique number that identifies its origin, material source, and the artisan who brought it to life. This transparency is the cornerstone of our heritage.
          </p>
          <div className="h-px w-32 bg-red-900/30"></div>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div>
              <h4 className="font-bold text-red-900 uppercase text-xs tracking-widest mb-2">Ethics</h4>
              <p className="text-sm text-zinc-500">Sourced exclusively from LWG certified tanneries.</p>
            </div>
            <div>
              <h4 className="font-bold text-red-900 uppercase text-xs tracking-widest mb-2">Artistry</h4>
              <p className="text-sm text-zinc-500">Hand-finished by master craftspeople in Italy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Footer CTA */}
      <section className="py-24 bg-zinc-900 -mx-6 md:-mx-12 px-6 md:px-20 text-center animate-fade-in-up">
        <h3 className="font-headline text-4xl text-white mb-8 tracking-tight">Become part of the history.</h3>
        <Link to="/shop" className="inline-block bg-white text-zinc-900 px-12 py-5 font-label uppercase tracking-widest text-sm hover:bg-red-900 hover:text-white transition-all shadow-2xl">
          Acquire a Piece
        </Link>
      </section>
    </div>
  );
}
