'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  // Camera shutter effect animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 45) % 360);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative">
      {/* Floating aperture blades background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-blue-400"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'float infinite linear'
            }}
          />
        ))}
      </div>
      
      {/* Camera aperture SVG */}
      <div className="mb-8 relative" style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s ease-in-out' }}>
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-blue-500">
          <polygon points="60,10 37,18 18,37 10,60 18,83 37,102 60,110 83,102 102,83 110,60 102,37 83,18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="opacity-80"
          />
          <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="60" cy="60" r="15" fill="currentColor" className="animate-pulse" />
        </svg>
      </div>
      
      <div className="relative text-center z-10 backdrop-blur-sm bg-black/30 rounded-xl p-8 border border-blue-900/30">
        <h1 className="text-9xl font-extrabold tracking-widest text-blue-500 photo-error-text">
          404
        </h1>
        <p className="text-xl mt-4 text-blue-200 font-light">Shot Not Found</p>
        <p className="text-lg text-gray-400 mt-2 max-w-md">
          Looks like this frame was never captured. Let's refocus and head back to the gallery.
        </p>
      </div>
      
      <button 
        onClick={() => router.back()} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="mt-8 rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-blue-700 flex items-center gap-3 shadow-lg shadow-blue-900/50"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: isHovering ? 'translateX(-4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Return to Gallery
      </button>
        
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        .photo-error-text {
          position: relative;
          text-shadow: 3px 3px 6px rgba(0, 162, 255, 0.5);
        }
        
        .photo-error-text::before,
        .photo-error-text::after {
          content: '404';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .photo-error-text::before {
          color: #ff3d71;
          z-index: -1;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-5px, -5px);
          animation-delay: -1s;
        }
        
        .photo-error-text::after {
          color: #00d9ff;
          z-index: -2;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
          transform: translate(5px, 5px);
        }
        
        @keyframes glitch-anim {
          0% {
            transform: translate(0);
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          }
          20% {
            clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%);
          }
          40% {
            clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%);
          }
          60% {
            clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          }
          80% {
            clip-path: polygon(0 30%, 100% 30%, 100% 100%, 0 100%);
          }
          100% {
            transform: translate(3px, 3px);
            clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
}