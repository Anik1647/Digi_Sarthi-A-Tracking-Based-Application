import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Create particles
    const particleCount = 100;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      background.appendChild(particle);
      particles.push(particle);
    }

    // Cursor-responsive particle movement
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particles.forEach((particle, index) => {
        const factor = (index % 3 + 1) * 0.02;
        const translateX = (mouseX - 0.5) * factor * 100;
        const translateY = (mouseY - 0.5) * factor * 100;
        
        particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return <div ref={backgroundRef} className="space-background" />;
}
