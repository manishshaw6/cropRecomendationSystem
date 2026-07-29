import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  /** When provided, external rotation (in degrees) takes full control.
   *  Internal scroll listener and auto-rotate are disabled. */
  externalRotation?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, externalRotation, ...props }, ref) => {
    const [internalRotation, setInternalRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const isControlled = externalRotation !== undefined;
    const rotation = isControlled ? externalRotation! : internalRotation;

    // Internal scroll-based rotation (only when not controlled externally)
    useEffect(() => {
      if (isControlled) return;

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setInternalRotation(scrollProgress * 360);

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, [isControlled]);

    // Auto-rotate when not scrolling (only when not controlled externally)
    useEffect(() => {
      if (isControlled) return;

      const autoRotate = () => {
        if (!isScrolling) setInternalRotation(prev => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, autoRotateSpeed, isControlled]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn('relative w-full h-full flex items-center justify-center', className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            // Removed transparency calculation - always fully opaque
            const opacity = 1;

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute w-[300px] h-[400px] group cursor-pointer"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-200px',
                  opacity,
                  transition: 'opacity 0.3s linear, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* The card itself has a bouncy hover scale effect now */}
                <div className="relative w-full h-full rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden border-4 border-white/50 bg-white transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-4">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <h2 className="text-2xl font-bold tracking-tight mb-1 drop-shadow-md">{item.common}</h2>
                    <em className="text-sm font-medium text-green-300 opacity-90 drop-shadow-sm">{item.binomial}</em>
                    <p className="text-xs mt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center gap-1">
                       <span className="text-xl">📷</span> By {item.photo.by}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
