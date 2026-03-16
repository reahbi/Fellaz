'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import TeamMemberCard from '@/components/ui/team-member-card';
import { useRef } from 'react';

const founders = [
  {
    firstName: 'Yoonho',
    lastName: 'Kim',
    fullName: '김윤호',
    jobPosition: 'Co-Founder & CEO',
    description: 'Visionary leader driving Fellatio towards shaping the future of digital experiences with uncompromising aesthetic standards.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    position: 'left' as const,
  },
  {
    firstName: 'Changhyun',
    lastName: 'Kim',
    fullName: '김창현',
    jobPosition: 'Co-Founder & CTO',
    description: 'Master architect of robust scalable solutions, ensuring flawless execution from the deepest backend to the sharpest frontend.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
    position: 'right' as const,
  },
  {
    firstName: 'Sanghyun',
    lastName: 'Lee',
    fullName: '이상현',
    jobPosition: 'Co-Founder & CDO',
    description: 'Design purist crafting pixel-perfect, memorable digital aesthetics. Every curve and whitespace is an exercise in intentionality.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    position: 'left' as const,
  },
  {
    firstName: 'Jaehyup',
    lastName: 'Jung',
    fullName: '정재협',
    jobPosition: 'Co-Founder & COO',
    description: 'Operations genius orchestrating seamless workflows and business growth with surgical precision.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
    position: 'right' as const,
  }
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
          className="text-xs uppercase tracking-[0.2em] flex gap-8 font-medium"
        >
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#founders" className="hover:opacity-50 transition-opacity">Founders</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
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
              className="text-lg md:text-3xl text-zinc-400 max-w-3xl mx-auto font-light tracking-wide"
            >
              Redefining digital elegance. 
              <br/>Crafted by four visionaries.
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
             className="text-5xl lg:text-7xl font-light leading-tight tracking-tight"
           >
             The Intersection of<br/><span className="font-medium italic">Art & Tech</span>
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
             We believe in pushing the boundaries of what's possible on the web. Our team combines deep technical expertise with an obsessive focus on design, ensuring every interaction feels magical. Black and white is not a constraint; it's our canvas for ultimate clarity and uncompromising aesthetics.
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
            Our Founders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-zinc-600 font-medium tracking-[0.3em] uppercase text-sm"
          >
            Est. 2026 / Seoul
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
              imageUrl={founder.imageUrl}
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
          <p>© 2026 Fellatio Inc. All rights reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors duration-500 font-medium">Twitter</a>
            <a href="#" className="hover:text-white transition-colors duration-500 font-medium">Instagram</a>
            <a href="#" className="hover:text-white transition-colors duration-500 font-medium">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
