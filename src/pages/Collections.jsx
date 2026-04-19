import { Link } from 'react-router-dom';

export default function Collections() {
  const years = ['2024', '2023', '2022', '2021', '2020'];
  
  return (
    <div className="flex flex-col gap-16 mt-8">
      <section className="mb-12">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4 block">The Monograph Catalog</span>
        <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter text-on-surface leading-tight">All Editions</h2>
      </section>

      <section className="flex flex-col gap-24">
        {years.map((year, i) => (
          <div key={year} className="group relative flex flex-col md:flex-row items-center border-t border-zinc-200 dark:border-zinc-800 pt-12 gap-12">
            <div className="text-zinc-200 dark:text-zinc-900 absolute -top-12 -left-12 font-headline text-[240px] font-black z-0 opacity-20 pointer-events-none">{year}</div>
            <div className={`relative z-10 w-full md:w-1/3 aspect-[3/4] overflow-hidden ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <img 
                  src={`https://lh3.googleusercontent.com/aida-public/AB6AXuA8${i % 2 === 0 ? 'gFlf57l8pv5PHTiWw35kUlF9N88QIvOJqJ9CrYbRjzSYhAgW1VX0KluT6kA1XUKENhC1VCCK8LhgOg-zvgxn0274lxoxtX-MGarszHiEZg3iaFv9q8AqtziOtK8XQIpPV9h5FLnt43XmIs5wpt72wewDovdpvxdZQvnVc4On5wbxLxuePH98OfyIiB-9LU1sRqoA2-jy7cRl4UrcvL0Q4tmDzZpnL_OxbNhas1dfywsUOQDyzCxGZ9fTpFVe6NerG78skaQQVj4' : 'Bs9GeAJFPFL4wD-RrZL-X3FQgdgfIfOIWKHLJ8jeRJOOYVOU0-figNKxJV-V-X_QEXs2KJi00aSr6AEkjoHrlewB26UuNCDJmUISjCjje4zg0K0NBzKDoJJMQAz2lA029FBLrQ5vCdMlwYgu9mUKmlFv2Ej6YXlrppJ1Sse3MxS4cG-YI2_bn9AelKYm4rTqeQt8mjDq7B78yRUhMnEgrbOu8jV5HQAxV8CVpJZHXlvKry7_LjIf0bPOwkCpSxyBYsOZHTXMwJ4'}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={`Monograph ${year}`}
                />
            </div>
            <div className={`flex flex-col gap-6 w-full md:w-2/3 ${i % 2 === 0 ? 'md:order-2 md:pl-24 text-right items-end' : 'md:order-1 md:pr-24 text-left items-start'}`}>
              <h3 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter text-red-900 underline underline-offset-8">Series {i + 1}: {i % 2 === 0 ? 'The Curated Shadow' : 'Interplay of Light'}</h3>
              <p className="font-body text-zinc-500 max-w-xl text-lg leading-relaxed italic">
                {i % 2 === 0 
                  ? 'A collection exploring the deep void and the strength of structural darkness through Italian calfskins and heavy silks.' 
                  : 'An investigation into the softness of light through transparent textiles and brushed wool fibers.'}
              </p>
              <Link to="/shop" className="w-fit border-b-2 border-red-900 pb-2 text-xs font-label uppercase tracking-widest text-red-900 font-bold hover:text-black hover:border-black transition-all">Explore Addition</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
