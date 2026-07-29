import React, { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className={`border-t border-green-950 py-10 px-6 backdrop-blur-xl transition-all duration-1000 ease-out hover:shadow-[0_-10px_40px_-15px_rgba(74,222,128,0.15)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ background: 'rgba(2, 12, 5, 0.65)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-green-100/70 text-sm md:text-base font-medium mb-2">
            Developed with ❤️ by <span className="text-green-400 font-bold tracking-wide">Manish Shaw</span>
          </p>
          <p className="text-green-100/40 text-xs font-medium">
            © 2026 AgroVisionX. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3">
          <a href="https://github.com/manishshaw6" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
             className="flex items-center gap-2 text-green-100/40 hover:text-green-400 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-all duration-300">
            <i className="fa-brands fa-github text-xl"></i>
            <span className="text-sm font-semibold tracking-wide">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/manish-shaw-a8b828350/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
             className="flex items-center gap-2 text-green-100/40 hover:text-green-400 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-all duration-300">
            <i className="fa-brands fa-linkedin text-xl"></i>
            <span className="text-sm font-semibold tracking-wide">LinkedIn</span>
          </a>
          <a href="https://manishportfolio-5hte.onrender.com/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio"
             className="flex items-center gap-2 text-green-100/40 hover:text-green-400 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-all duration-300">
            <i className="fa-solid fa-globe text-xl"></i>
            <span className="text-sm font-semibold tracking-wide">Portfolio</span>
          </a>
          <a href="mailto:manishshaw301106@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"
             className="flex items-center gap-2 text-green-100/40 hover:text-green-400 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-all duration-300">
            <i className="fa-solid fa-envelope text-xl"></i>
            <span className="text-sm font-semibold tracking-wide">Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
