import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CircularGallery, GalleryItem } from './components/ui/circular-gallery';
import Footer from './components/Footer';

const galleryData: GalleryItem[] = [
  {
    common: 'Golden Wheat Fields',
    binomial: 'Triticum aestivum',
    photo: {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&auto=format&fit=crop&q=80',
      text: 'golden wheat fields at sunset',
      pos: '50% 60%',
      by: 'Ales Krivec'
    }
  },
  {
    common: 'Rice Paddy Fields',
    binomial: 'Oryza sativa',
    photo: {
      url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=900&auto=format&fit=crop&q=80',
      text: 'terraced rice paddies in lush green hills',
      pos: '50% 40%',
      by: 'Johny Goerend'
    }
  },
  {
    common: 'Farmer at Work',
    binomial: 'Homo sapiens agricola',
    photo: {
      url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&auto=format&fit=crop&q=80',
      text: 'farmer working in a green field',
      pos: '50% 30%',
      by: 'Sandie Clarke'
    }
  },
  {
    common: 'Fresh Tomatoes',
    binomial: 'Solanum lycopersicum',
    photo: {
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=900&auto=format&fit=crop&q=80',
      text: 'cluster of ripe red tomatoes on the vine',
      pos: '50% 50%',
      by: 'Markus Spiske'
    }
  },
  {
    common: 'Sunflower Farm',
    binomial: 'Helianthus annuus',
    photo: {
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&fit=crop&q=80',
      text: 'vast field of sunflowers in full bloom',
      pos: '50% 40%',
      by: 'James Baltz'
    }
  },
  {
    common: 'Apple Orchard',
    binomial: 'Malus domestica',
    photo: {
      url: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=900&auto=format&fit=crop&q=80',
      text: 'red apples hanging from orchard trees',
      pos: '50% 40%',
      by: 'Matheus Cenali'
    }
  },
  {
    common: 'Corn Harvest',
    binomial: 'Zea mays',
    photo: {
      url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=900&auto=format&fit=crop&q=80',
      text: 'rows of ripe corn cobs ready for harvest',
      pos: '50% 50%',
      by: 'Kai Pilger'
    }
  },
  {
    common: 'Lavender Fields',
    binomial: 'Lavandula angustifolia',
    photo: {
      url: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=900&auto=format&fit=crop&q=80',
      text: 'purple lavender fields stretching to the horizon',
      pos: '50% 50%',
      by: 'Dane Deaner'
    }
  },
  {
    common: 'Fresh Vegetables',
    binomial: 'Market Garden Mix',
    photo: {
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=80',
      text: 'assorted fresh vegetables at a farmers market',
      pos: '50% 40%',
      by: 'ja ma'
    }
  },
  {
    common: 'Farmland Sunrise',
    binomial: 'Terra agricola',
    photo: {
      url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&auto=format&fit=crop&q=80',
      text: 'scenic farmland with misty sunrise over rolling hills',
      pos: '50% 50%',
      by: 'Lukas Hartmann'
    }
  },
];

const features = [
  {
    icon: <i className="fa-solid fa-seedling"></i>,
    title: 'AI Crop Recommendation',
    desc: 'Our machine learning model analyzes soil type, climate, and rainfall data to suggest the most profitable crops for your land.',
  },
  {
    icon: <i className="fa-solid fa-cloud-sun-rain"></i>,
    title: 'Weather Integration',
    desc: 'Real-time weather forecasts and seasonal trend analysis help you plan sowing and harvesting with precision.',
  },
  {
    icon: <i className="fa-solid fa-flask"></i>,
    title: 'Soil Analysis',
    desc: 'Input your soil nutrient values (N, P, K, pH) and let our model calculate the ideal crop match instantly.',
  },
  {
    icon: <i className="fa-solid fa-chart-column"></i>,
    title: 'Yield Prediction',
    desc: 'Get estimated yield forecasts and revenue projections before you plant, reducing risk and maximizing output.',
  },
  {
    icon: <i className="fa-solid fa-map-location-dot"></i>,
    title: 'Region-Aware Models',
    desc: 'Trained on data from diverse agro-climatic zones across India, our model adapts to your specific location.',
  },
  {
    icon: <i className="fa-solid fa-robot"></i>,
    title: 'Continuous Learning',
    desc: 'The AI model improves over time with new datasets, seasonal feedback, and crop performance reports.',
  },
];

const stats = [
  { value: '95%', label: 'Recommendation Accuracy' },
  { value: '22+', label: 'Supported Crops' },
  { value: '500K+', label: 'Data Points Trained' },
  { value: '10+', label: 'Agro-Climatic Zones' },
];

function App() {
  const [heroRotation, setHeroRotation] = useState(0);
  const [heroUnlocked, setHeroUnlocked] = useState(false);
  const rotationRef = useRef(0);

  // SVG progress ring constants
  const RADIUS = 26;
  const CIRC = 2 * Math.PI * RADIUS;
  const progress = Math.min(heroRotation / 360, 1);

  // Scroll-lock: intercept wheel/touch events until gallery completes 360°
  useEffect(() => {
    if (heroUnlocked) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const unlock = () => {
      setHeroUnlocked(true);
      document.body.style.overflow = '';
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      rotationRef.current = Math.max(0, rotationRef.current + e.deltaY * 0.4);
      setHeroRotation(rotationRef.current);
      if (rotationRef.current >= 360) unlock();
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = (touchStartY - e.touches[0].clientY) * 0.6;
      touchStartY = e.touches[0].clientY;
      rotationRef.current = Math.max(0, rotationRef.current + delta);
      setHeroRotation(rotationRef.current);
      if (rotationRef.current >= 360) unlock();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [heroUnlocked]);

  return (
    <div className="landing-shell w-full bg-background text-foreground overflow-x-hidden font-sans">

      {/* ── NAVBAR ────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-300"
        style={{ background: 'transparent' }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl drop-shadow-lg text-green-400"><i className="fa-solid fa-wheat-awn"></i></span>
          <span className="text-2xl font-black tracking-tight"
            style={{ background: 'linear-gradient(90deg, #4ade80, #86efac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 2px 10px rgba(74,222,128,0.2)' }}>
            AgrovisionX AI
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-green-100">
          <a href="#features" className="hover:text-green-400 transition-colors drop-shadow-md">Features</a>
          <a href="#how-it-works" className="hover:text-green-400 transition-colors drop-shadow-md">How It Works</a>
          <a href="#stats" className="hover:text-green-400 transition-colors drop-shadow-md">Stats</a>
          <Link to="/predict"
            className="ml-2 px-6 py-2.5 rounded-full text-sm font-bold text-background transition-all hover:opacity-90 hover:scale-105 shadow-xl shadow-green-900/50"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
            Get Started
          </Link>
        </nav>
      </header>

      {/* ── HERO: Scroll-locked Circular Gallery ──────────────── */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #052010 0%, #020d05 100%)' }}>

        {/* Gallery (controlled by external rotation state) */}
        <div className="w-full h-full">
          <CircularGallery items={galleryData} externalRotation={heroRotation} />
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(34,197,94,0.1) 0%, transparent 70%)' }} />

        <div className="field-scanline" aria-hidden="true" />

        {/* Progress ring — visible while locked */}
        {!heroUnlocked && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 select-none">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 60 60">
                {/* Track */}
                <circle cx="30" cy="30" r={RADIUS} fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="4" />
                {/* Arc */}
                <circle
                  cx="30" cy="30" r={RADIUS}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 0.08s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center drop-shadow-md">
                <span className="text-green-400 text-sm font-bold">{Math.round(progress * 100)}<span className="text-xs">%</span></span>
              </div>
            </div>
            <p className="text-[10px] text-green-500 font-bold tracking-[0.2em] uppercase drop-shadow-md">
              Scroll to explore
            </p>
          </div>
        )}

        {/* Bounce arrow when unlocked */}
        {heroUnlocked && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 animate-bounce">
            <p className="text-[10px] text-green-400 font-bold tracking-[0.2em] uppercase drop-shadow-md">Continue</p>
            <span className="text-green-400 text-2xl font-bold drop-shadow-lg">↓</span>
          </div>
        )}
      </div>

      {/* ── REST OF PAGE — fades in after unlock ──────────────── */}
      <div style={{
        opacity: heroUnlocked ? 1 : 0,
        transform: heroUnlocked ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        pointerEvents: heroUnlocked ? 'auto' : 'none',
      }}>

        {/* ── STATS BAR ───────────────────────────────────────── */}
        <section id="stats" className="border-y border-green-950"
          style={{ background: 'linear-gradient(135deg, #041a0a 0%, #062010 100%)' }}>
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="text-5xl font-black mb-3"
                  style={{ background: 'linear-gradient(135deg, #4ade80, #86efac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </div>
                <div className="text-sm font-medium text-green-400/80 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────── */}
        <section id="features" className="py-28 px-6"
          style={{ background: 'linear-gradient(180deg, #020d05 0%, #031508 100%)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-sm uppercase tracking-widest text-green-500 font-bold mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-6"
              style={{ background: 'linear-gradient(135deg, #bbf7d0, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Everything a Farmer Needs
            </h2>
            <p className="text-center text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
              From soil analysis to yield prediction, AgrovisionX provides a complete AI-driven toolkit to modernize your farm operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f) => (
                <div key={f.title}
                  className="feature-card group rounded-3xl p-8 border border-green-900/30 transition-all duration-300 hover:border-green-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-950"
                  style={{ background: 'linear-gradient(135deg, #0a1f0e, #071509)' }}>
                  <div className="text-4xl mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">{f.icon}</div>
                  <h3 className="text-xl font-bold text-green-300 mb-3">{f.title}</h3>
                  <p className="text-sm text-green-100/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────── */}
        <section id="how-it-works" className="py-28 px-6 border-t border-green-950"
          style={{ background: '#020c05' }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm uppercase tracking-widest text-green-500 font-bold mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20"
              style={{ background: 'linear-gradient(135deg, #bbf7d0, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              How AgrovisionX Works
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-start relative">
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-1 bg-green-900/50 rounded-full" />
              {[
                { step: '01', title: 'Enter Your Data', desc: 'Provide soil nutrients (N, P, K, pH), temperature, humidity, and rainfall values.' },
                { step: '02', title: 'AI Analysis', desc: 'Our trained ML model processes your inputs against thousands of agricultural data points.' },
                { step: '03', title: 'Get Recommendation', desc: 'Receive the top crop recommendation with confidence score and farming tips instantly.' },
              ].map((item, i) => (
                <div key={item.step} className="flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-6 border-4 border-green-800 text-green-400 shadow-xl shadow-green-950 transition-transform hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #052010, #0a2e14)' }}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-green-300 mb-3">{item.title}</h3>
                  <p className="text-sm text-green-100/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section id="get-started" className="py-28 px-6 text-center border-t border-green-950"
          style={{ background: 'linear-gradient(180deg, #020c05 0%, #041208 100%)' }}>
          <div className="max-w-3xl mx-auto p-12 rounded-3xl border border-green-900/30"
            style={{ background: 'linear-gradient(135deg, rgba(10,31,14,0.8), rgba(7,21,9,0.8))' }}>
            <span className="text-6xl drop-shadow-md inline-block mb-6 text-green-400"><i className="fa-solid fa-seedling"></i></span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
              style={{ background: 'linear-gradient(135deg, #bbf7d0, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ready to Grow Smarter?
            </h2>
            <p className="text-green-100/70 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              Join thousands of farmers who are using AgrovisionX AI to increase yields, reduce risk, and make data-driven decisions every season.
            </p>
            <Link to="/predict"
              className="inline-block px-10 py-5 rounded-full font-black text-background hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-green-900/50 text-lg"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
              Start Your Free Analysis →
            </Link>
          </div>
        </section>

        <Footer />

      </div>
    </div>
  );
}

export default App;
