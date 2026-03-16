'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import TeamMemberCard from '@/components/ui/team-member-card';
import { useRef, useState } from 'react';
import { getFounders, siteCopy, type Locale } from '@/lib/site-content';

export default function Home() {
  const heroRef = useRef(null);
  const [locale, setLocale] = useState<Locale>('en');
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const copy = siteCopy[locale];
  const founders = getFounders(locale);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 mix-blend-difference flex justify-between items-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl font-bold tracking-tighter uppercase"
        >
          Fellatio.
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center gap-4 md:gap-8 text-xs uppercase tracking-[0.2em] font-medium"
        >
          <a href="#about" className="hover:opacity-50 transition-opacity">{copy.nav.about}</a>
          <a href="#founders" className="hover:opacity-50 transition-opacity">{copy.nav.founders}</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">{copy.nav.contact}</a>
          <div className="flex rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-md">
            {(['en', 'ko'] as const).map((nextLocale) => (
              <button
                key={nextLocale}
                type="button"
                onClick={() => setLocale(nextLocale)}
                className={`rounded-full px-3 py-1 text-[10px] tracking-[0.28em] transition-colors ${
                  locale === nextLocale ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {nextLocale.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center px-4">
        {/* Abstract animated grain/noise or gradient effect */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/30 via-black to-black opacity-80" />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-7xl"
        >
          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-none font-extralight tracking-tighter uppercase"
            >
              Fellatio.
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[clamp(0.95rem,2vw,1.8rem)] text-zinc-400 max-w-5xl mx-auto font-light tracking-wide ${
                copy.hero.compact ? 'whitespace-nowrap' : ''
              }`}
            >
              {copy.hero.line1}
              <br/>{copy.hero.line2}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 120 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            className="mt-16 w-[1px] bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-40 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
         <div className="w-full lg:w-5/12">
           <motion.h2 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className={`font-light leading-tight tracking-tight ${
               locale === 'ko' ? 'text-[clamp(2.5rem,5vw,4.5rem)]' : 'text-5xl lg:text-7xl'
             }`}
           >
             <span className="block whitespace-nowrap">{copy.about.titleLines[0]}</span>
             <span className="block whitespace-nowrap font-medium italic">{copy.about.titleLines[1]}</span>
           </motion.h2>
         </div>
         <div className="w-full lg:w-7/12">
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-2xl text-zinc-400 leading-relaxed font-light"
           >
             {copy.about.body}
           </motion.p>
         </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-40 px-4 md:px-16 w-full max-w-[1600px] mx-auto overflow-hidden">
        <div className="mb-32 flex flex-col md:flex-row space-y-4 md:space-y-0 text-center md:text-left justify-between md:items-end border-b border-zinc-900 pb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-light uppercase tracking-tighter"
          >
            {copy.founders.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-zinc-600 font-medium tracking-[0.3em] uppercase text-sm"
          >
            {copy.founders.meta}
          </motion.p>
        </div>

        <div className="flex flex-col gap-40 md:gap-64">
          {founders.map((founder, index) => (
            <TeamMemberCard 
              key={index}
              position={founder.position}
              firstName={founder.firstName}
              lastName={founder.lastName}
              jobPosition={founder.jobPosition}
              description={founder.description}
              imageUrl={founder.publicImageUrl}
              fallbackImageUrl={founder.fallbackImageUrl}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-24 border-t border-zinc-900 text-center text-zinc-600 text-sm tracking-widest uppercase flex flex-col items-center px-12 gap-12">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10vw] font-extralight tracking-tighter uppercase text-zinc-800 leading-none"
          >
            Fellatio.
        </motion.h2>
        <div className="flex justify-between items-center w-full max-w-7xl flex-col md:flex-row gap-8">
          <p>{copy.footer.copyright}</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors duration-500 font-medium">{copy.footer.links.x}</a>
            <a href="#" className="hover:text-white transition-colors duration-500 font-medium">{copy.footer.links.instagram}</a>
            <a href="#" className="hover:text-white transition-colors duration-500 font-medium">{copy.footer.links.linkedin}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
