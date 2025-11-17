import React, { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  /** URL of the background image */
  backgroundImage: string;
  /** Overlay color (including alpha) */
  overlayColor?: string;
  /** Parallax scroll speed multiplier (ignored if using CSS attachment) */
  speed?: number;
  /** Title text centered in the section */
  title: string;
  /** Custom height (e.g. '50vh', '400px') */
  height?: string;
  /** If true, use CSS fixed attachment for parallax */
  useFixed?: boolean;
}

export default function ParallaxSection({
  backgroundImage,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  speed = 0.5,
  title,
  height = '60vh',
  useFixed = true,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (useFixed) return;
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const offset = window.scrollY - (sectionRef.current.offsetTop || 0);
        sectionRef.current.style.backgroundPosition =
          `center calc(50% + ${offset * speed}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, useFixed]);

  return (
    <div
      ref={sectionRef}
      className="position-relative d-flex align-items-center justify-content-center"
      style={{
        height,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: useFixed ? 'fixed' : 'scroll',
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content */}
      <div className="position-relative text-center px-3">
        <h1 className="display-4 text-white fw-bold">
          {title}
        </h1>
      </div>
    </div>
  );
}
