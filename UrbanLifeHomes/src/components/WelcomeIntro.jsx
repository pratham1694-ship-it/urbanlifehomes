import { useState, useEffect, useCallback } from 'react';
import './WelcomeIntro.css';

const greetings = ['Hello', 'नमस्कार', 'ہیلو', 'வணக்கம்', 'કેમ છો', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ'];

const GREETING_MS = 580;
const LEAVE_MS = 520;

export default function WelcomeIntro({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [phase, setPhase] = useState('greetings');
  const [exitAnimation, setExitAnimation] = useState(false);

  const handleComplete = useCallback(() => {
    setExitAnimation(true);
    setTimeout(() => {
      onComplete?.();
    }, 850);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== 'greetings') return;

    if (index >= greetings.length) {
      const timer = setTimeout(() => setPhase('brand'), 350);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLeaving({ text: greetings[index], key: index });
      setIndex((prev) => prev + 1);
    }, GREETING_MS);
    return () => clearTimeout(timer);
  }, [index, phase]);

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => setLeaving(null), LEAVE_MS);
    return () => clearTimeout(timer);
  }, [leaving]);

  useEffect(() => {
    if (phase !== 'brand') return;
    const timer = setTimeout(handleComplete, 1300);
    return () => clearTimeout(timer);
  }, [phase, handleComplete]);

  const active = index < greetings.length ? { text: greetings[index], key: index } : null;

  return (
    <div className={`welcome-intro ${exitAnimation ? 'welcome-exit' : ''}`}>
      <div className="welcome-bg">
        {leaving && (
          <span key={`leave-${leaving.key}`} className="welcome-greeting welcome-greeting-leave">
            {leaving.text}
          </span>
        )}
        {active && (
          <span key={`active-${active.key}`} className="welcome-greeting welcome-greeting-enter">
            {active.text}
          </span>
        )}
        {phase === 'brand' && (
          <div className="welcome-brand">
            <div className="welcome-brand-line" />
            <span className="welcome-brand-text">URBAN LiFE HOMES</span>
            <div className="welcome-brand-line" />
          </div>
        )}
      </div>
    </div>
  );
}
