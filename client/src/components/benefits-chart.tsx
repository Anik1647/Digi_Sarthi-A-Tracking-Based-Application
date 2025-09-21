import { useEffect, useRef } from 'react';

interface BenefitsChartProps {
  type: 'time-savings' | 'accuracy' | 'cost-comparison';
}

export default function BenefitsChart({ type }: BenefitsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slideUp');
        }
      });
    });

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (type === 'time-savings') {
    return (
      <div ref={chartRef} className="flex items-end justify-center space-x-2 h-24">
        <div className="chart-bar bg-primary/30 w-8 rounded-t" style={{height: '30%'}}></div>
        <div className="chart-bar bg-primary/50 w-8 rounded-t" style={{height: '60%'}}></div>
        <div className="chart-bar bg-primary w-8 rounded-t" style={{height: '100%'}}></div>
        <div className="chart-bar bg-accent w-8 rounded-t" style={{height: '80%'}}></div>
      </div>
    );
  }

  if (type === 'accuracy') {
    return (
      <div ref={chartRef} className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        <div 
          className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" 
          style={{animationDuration: '3s'}}
        ></div>
        <div className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-bold">99.9%</span>
        </div>
      </div>
    );
  }

  if (type === 'cost-comparison') {
    return (
      <div ref={chartRef} className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Without DigiSaarthi</span>
          <div className="w-20 h-2 bg-muted rounded-full">
            <div className="w-full h-full bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">With DigiSaarthi</span>
          <div className="w-20 h-2 bg-muted rounded-full">
            <div className="w-3/4 h-full bg-accent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
