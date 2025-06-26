import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


import header1Video from '../assets/header1.mp4'; // Adjust this path based on your exact structure
import header2Video from '../assets/header2.mp4'; // Adjust this path based on your exact structure

interface Slide {
  id: number;
  media: string;
  mediaType: 'image' | 'video';
  collectionName: string;
  curator: string;
  buttonLabel: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    media: header1Video, // Use the imported variable here
    mediaType: 'video',
    collectionName: 'MANUKA HONEY COLLECTION',
    curator: 'CURATED BY CHRISSY BALES',
    buttonLabel: 'SHOP NOW',
    cta: 'Effortless Elegance',
  },
  {
    id: 2,
    media: header2Video, // Use the imported variable here
    mediaType: 'video',
    collectionName: 'RAW BUNDLE COLLECTION',
    curator: 'CURATED BY CHRISSY BALES',
    buttonLabel: 'SHOP NOW',
    cta: 'Refined Simplicity',
  },
  {
    id: 3,
    media: 'https://i.ibb.co/S7dhY6K6/Image-fx-64.png',
    mediaType: 'image',
    collectionName: 'LUXURY CURLS COLLECTION',
    curator: 'CURATED BY CHRISSY BALES',
    buttonLabel: 'SHOP NOW',
    cta: 'Timeless Texture',
  },
];

// ... (Rest of the component code for NewsletterPopup and HairBrandSlider is the same as above)
// ... (Including the enhanced video tag and useEffect for playback control)

const NewsletterPopup: React.FC = () => {
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      const dismissed = localStorage.getItem('newsletterDismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setShow(true), 5000);
        return () => clearTimeout(timer);
      }
    }, []);
  
    const handleClose = () => {
      setShow(false);
      localStorage.setItem('newsletterDismissed', 'true');
    };
  
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl max-w-md w-full mx-4 p-6 text-white relative shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 text-white text-2xl hover:opacity-70"
          >
            &times;
          </button>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#dbc4b2] mb-2">Stay in the Loop</h2>
          <p className="text-sm mb-4 text-[#dbc4b2]">
            Subscribe for collection drops, salon updates & exclusive styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none flex-1"
            />
            <button
              type="submit"
              className="bg-[#dbc4b2] text-black px-4 py-2 rounded-md hover:bg-[#cbb7a5] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  const HairBrandSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement[]>([]); // Use a ref for each video element
  
    // Effect for auto-advancing slides
    useEffect(() => {
      const resetAndStartSlider = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
      };
  
      if (!isPaused) {
        resetAndStartSlider();
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      // Cleanup on component unmount
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isPaused]); // Depend on isPaused
  
    // Effect to play/pause videos when the slide changes
    useEffect(() => {
      videoRef.current.forEach((video, index) => {
        if (video) { // Ensure video element exists
          if (index === currentSlide && slides[index].mediaType === 'video') {
            // Attempt to play only the current video
            video.currentTime = 0; // Reset video to start
            video.play().catch(error => {
              console.error(`Error playing video for slide ${index}:`, error);
              // This often catches "NotAllowedError" due to browser policies,
              // even with muted/playsInline. Consider a user interaction for full reliability.
            });
          } else {
            // Pause and reset other videos
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    }, [currentSlide]); // Depend on currentSlide
  
    const goToPrevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      // Restart slider after manual navigation if not paused
      if (!isPaused) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          setCurrentSlide((p) => (p + 1) % slides.length);
        }, 5000);
      }
    };
  
    const goToNextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      // Restart slider after manual navigation if not paused
      if (!isPaused) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          setCurrentSlide((p) => (p + 1) % slides.length);
        }, 5000);
      }
    };
  
    const togglePause = () => setIsPaused((prev) => !prev);
  
    return (
      <div className="relative w-full h-[60vh] sm:h-screen mt-[60px] overflow-hidden bg-white flex items-center justify-center">
        <NewsletterPopup />
  
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== currentSlide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.mediaType === 'video' ? (
              <video
                ref={el => { if (el) videoRef.current[index] = el; }} // Assign ref
                src={slide.media}
                autoPlay={index === currentSlide && !isPaused} // Only autoplay current slide if not paused
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
                aria-label={`${slide.collectionName} video`}
                onLoadStart={() => console.log(`Loading video: ${slide.media}`)}
                onLoadedData={() => console.log(`Loaded video data: ${slide.media}`)}
                onCanPlayThrough={() => console.log(`Can play through: ${slide.media}`)}
                onPlay={() => console.log(`Playing video: ${slide.media}`)}
                onPause={() => console.log(`Paused video: ${slide.media}`)}
                onError={(e) => {
                  console.error(`Error loading video ${slide.media}:`, e);
                  e.currentTarget.src = 'https://via.placeholder.com/1200x800?text=Video+Failed';
                }}
              />
            ) : (
              <img
                src={slide.media}
                alt={slide.collectionName}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute bottom-[70px] inset-x-0 mx-4 z-20 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-1 text-center sm:bottom-28 sm:left-10 sm:right-auto sm:w-auto sm:px-6 sm:py-4 sm:space-y-2 sm:text-left">
              <h2 className="text-2xl sm:text-5xl font-serif">{slide.cta}</h2>
              <Link
                to="/shop-all"
                className="text-sm sm:text-base font-medium underline underline-offset-4 hover:text-gray-200 transition"
              >
                Shop the Look &rarr;
              </Link>
            </div>
          </div>
        ))}
  
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center py-3 bg-white z-30">
          <button
            onClick={goToPrevSlide}
            className="text-black opacity-70 hover:opacity-100 text-xl px-3"
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <div className="flex space-x-2 mx-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  // Restart slider after manual navigation if not paused
                  if (!isPaused) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    intervalRef.current = window.setInterval(() => {
                      setCurrentSlide((p) => (p + 1) % slides.length);
                    }, 5000);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                  idx === currentSlide ? 'bg-black scale-125' : 'bg-black opacity-30 hover:opacity-70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goToNextSlide}
            className="text-black opacity-70 hover:opacity-100 text-xl px-3"
            aria-label="Next slide"
          >
            &gt;
          </button>
          <button
            onClick={togglePause}
            className="text-black opacity-70 hover:opacity-100 text-xl px-3"
            aria-label={isPaused ? 'Play slider' : 'Pause slider'}
          >
            {isPaused ? '►' : '||'}
          </button>
        </div>
      </div>
    );
  };
  
  export default HairBrandSlider;