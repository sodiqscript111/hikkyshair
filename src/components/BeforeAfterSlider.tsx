import React, { useRef, useState, useEffect, useCallback } from 'react';

const BeforeAfterSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const [dividerX, setDividerX] = useState(50); // Initial position of the divider in percentage

  // Handles updating the divider position based on clientX
  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const offset = ((clientX - bounds.left) / bounds.width) * 100; // Calculate position as percentage
    const newX = Math.max(0, Math.min(offset, 100)); // Clamp between 0 and 100

    // Use requestAnimationFrame for smooth updates
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      setDividerX(newX);
    });
  }, []); // No dependencies as it uses ref for container and internal state for dividerX

  // Mouse move handler
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  }, [handleMove]);

  // Touch move handler
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (isDraggingRef.current && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  // Stop drag handler
  const stopDrag = useCallback(() => {
    isDraggingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = null; // Clear the animation frame ID
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchend', stopDrag);
  }, [onMouseMove, onTouchMove]); // Dependencies are the functions themselves

  // Start drag handler
  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent default browser behavior (e.g., image drag)
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    handleMove(clientX);

    // Add global event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
  }, [handleMove, onMouseMove, onTouchMove, stopDrag]); // Dependencies are the functions themselves

  // Cleanup effect for event listeners
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [onMouseMove, onTouchMove, stopDrag]); // Dependencies are the functions themselves

  return (
    <div
      ref={containerRef}
      className="relative w-full max-h-[70vh] md:h-[550px] overflow-hidden select-none group border border-black"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(dividerX)}
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    >
      <img
        src="https://i.ibb.co/ZphCM03P/Image-fx-68.png"
        alt="After"
        className="w-full h-full object-cover select-none"
        draggable={false}
      />
      <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 border border-black text-xs font-semibold">
        AFTER
      </div>

      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${dividerX}%` }}
      >
        <img
          src="https://i.ibb.co/xtbkVf0Z/Chat-GPT-Image-Jun-24-2025-11-01-47-AM.png"
          alt="Before"
          className="w-full h-full object-cover select-none"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 border border-black text-xs font-semibold">
          BEFORE
        </div>
      </div>

      <div
        className="absolute top-0 h-full w-[2px] bg-black z-10"
        style={{ left: `${dividerX}%`, transform: 'translateX(-50%)' }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-8 h-8 rounded-full bg-white border border-black
                       flex items-center justify-center cursor-grab
                       ${isDraggingRef.current ? '' : 'group-hover:scale-110 transition-transform duration-200'}`}
        >
          <div className="flex space-x-1">
            <div className="w-2 h-2 border-t-2 border-l-2 border-black rotate-[-45deg]"></div>
            <div className="w-2 h-2 border-t-2 border-r-2 border-black rotate-[45deg]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HikkiyHairSection: React.FC = () => {
  return (
    <div className="w-full bg-[#f2e7dd] mt-[20px] py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-12 font-sans ">
      {/* Text Content */}
      <div className="text-center lg:text-left max-w-xl lg:w-1/2">
        <h1 className="text-4xl text-[#121212] font-serif md:text-5xl font-light text-black mb-6 leading-tight uppercase tracking-wide">
          Transform Your Look with HIKKIY’S HAIR
        </h1>
        <p className="text-[18px] text-black mb-6 leading-relaxed">
          At Hikkiy's Hair, we specialize in premium hair extensions and styles that highlight your natural beauty.
        </p>
        <a
          href="https://www.fresha.com/a/the-hikkys-hair-studio-lagos-block-111-plot-26a-daniyan-natalia-street-off-oladimeji-alo-street-freedom-way-lekki-phase-1-q57mqdmb/booking?menu=true&utm_source=instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black border border-black px-6 py-3 text-sm uppercase font-semibold hover:bg-black hover:text-white transition-colors"
          aria-label="Book your appointment now"
        >
          Book Now
        </a>
      </div>

      {/* Before/After Comparison */}
      <div className="w-full lg:w-1/2">
        <BeforeAfterSlider />
      </div>
    </div>
  );
};

export default HikkiyHairSection;
