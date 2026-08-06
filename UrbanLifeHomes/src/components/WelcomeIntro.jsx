import { useState, useEffect, useCallback } from 'react';
import './WelcomeIntro.css';

const greetings = [
  { text: 'Hello' },
  { text: 'नमस्कार' },
  { text: 'ہیلو'},
  { text: 'வணக்கம்' },
  { text: 'કેમ છો' },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' },



  
];

export default function WelcomeIntro({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('greetings');
  const [exitAnimation, setExitAnimation] = useState(false);

  const handleComplete = useCallback(() => {
    setExitAnimation(true);
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== 'greetings') return;

    if (currentIndex < greetings.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 280);
      return () => clearTimeout(timer);
    } else {
      setPhase('brand');
    }
  }, [currentIndex, phase]);

  useEffect(() => {
    if (phase !== 'brand') return;
    const timer = setTimeout(() => {
      handleComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [phase, handleComplete]);

  return (
    <div className={`welcome-intro ${exitAnimation ? 'welcome-exit' : ''}`}>
      <div className="welcome-bg">
        {phase !== 'brand' && phase !== 'clearing' && greetings.map((g, i) => {
          if (i >= currentIndex) return null;
          const offset = currentIndex - i;
          if (offset > 1) return null;

          const position = 1 - offset;

          return (
            <span
              key={`${g.text}-${i}`}
              className={`welcome-greeting welcome-greeting-pos-${position}`}
              style={{
                opacity: position === 0 ? 0 : Math.max(0.05, 1 - position * 0.25),
              }}
            >
              {g.text}
            </span>
          );
        })}

        {phase === 'brand' && (
          <div className="welcome-brand">
            <div className="welcome-brand-line" />
            <span className="welcome-brand-text">Urban Life Homes</span>
            <div className="welcome-brand-line" />
          </div>
        )}
      </div>
    </div>
  );
}
