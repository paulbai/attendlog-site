import { useState, useEffect, useCallback, useRef } from 'react';

const WORDS = ['Smarter', 'Verified', 'Trusted', 'Accountable', 'Real-Time'];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]';
const DECODE_SPEED = 30;      // ms per tick during scramble
const REVEAL_STAGGER = 2;     // ticks between each char locking in
const HOLD_DURATION = 2500;   // ms to hold the resolved word
const SCRAMBLE_TICKS = 5;     // ticks of pure scramble before reveal starts
// Total cycle per word ≈ scramble-in(~800ms) + hold(2500ms) + scramble-out(~700ms) = ~4s

export default function DecoderText({ className = '' }) {
  const [display, setDisplay] = useState('');
  const [lockedCount, setLockedCount] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const wordIndexRef = useRef(0);
  const phaseRef = useRef('hold'); // 'scramble-in' | 'reveal' | 'hold' | 'scramble-out'
  const tickRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const getMaxLen = useCallback(() => {
    // Use the max length across current and next word for smooth transitions
    const curr = WORDS[wordIndexRef.current];
    const next = WORDS[(wordIndexRef.current + 1) % WORDS.length];
    return Math.max(curr.length, next.length);
  }, []);

  const startScrambleIn = useCallback(() => {
    const target = WORDS[wordIndexRef.current];
    setCurrentWord(target);
    phaseRef.current = 'scramble-in';
    tickRef.current = 0;
    setLockedCount(0);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      tickRef.current++;
      const maxLen = target.length;

      if (tickRef.current <= SCRAMBLE_TICKS) {
        // Pure scramble phase
        const scrambled = Array.from({ length: maxLen }, () => randomChar()).join('');
        setDisplay(scrambled);
      } else {
        // Reveal phase - lock in characters one by one
        const revealTick = tickRef.current - SCRAMBLE_TICKS;
        const locked = Math.min(Math.floor(revealTick / REVEAL_STAGGER), maxLen);
        setLockedCount(locked);

        const chars = Array.from({ length: maxLen }, (_, i) => {
          if (i < locked) return target[i];
          return randomChar();
        });
        setDisplay(chars.join(''));

        if (locked >= maxLen) {
          // Fully revealed
          clearInterval(intervalRef.current);
          setDisplay(target);
          setLockedCount(maxLen);
          phaseRef.current = 'hold';

          timeoutRef.current = setTimeout(() => {
            startScrambleOut();
          }, HOLD_DURATION);
        }
      }
    }, DECODE_SPEED);
  }, []);

  const startScrambleOut = useCallback(() => {
    const prev = WORDS[wordIndexRef.current];
    phaseRef.current = 'scramble-out';
    tickRef.current = 0;
    const maxLen = prev.length;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      tickRef.current++;
      const unlocked = Math.min(Math.floor(tickRef.current / REVEAL_STAGGER), maxLen);
      setLockedCount(maxLen - unlocked);

      const chars = Array.from({ length: maxLen }, (_, i) => {
        if (i >= unlocked) return prev[i];
        return randomChar();
      });
      setDisplay(chars.join(''));

      if (unlocked >= maxLen) {
        clearInterval(intervalRef.current);
        // Move to next word
        wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length;
        // Small pause then start next word
        timeoutRef.current = setTimeout(() => {
          startScrambleIn();
        }, 150);
      }
    }, DECODE_SPEED);
  }, []);

  useEffect(() => {
    // Initial hold on first word, then start cycling
    const firstWord = WORDS[0];
    setCurrentWord(firstWord);
    setDisplay(firstWord);
    setLockedCount(firstWord.length);

    timeoutRef.current = setTimeout(() => {
      startScrambleOut();
    }, HOLD_DURATION);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [startScrambleOut]);

  // Render each character as a span for individual styling
  return (
    <span className={`inline-block ${className}`} aria-label={currentWord}>
      {display.split('').map((char, i) => {
        const isLocked = i < lockedCount;
        return (
          <span
            key={`${i}-${char}`}
            className="inline-block transition-colors duration-150"
            style={{
              color: isLocked ? undefined : 'rgba(0, 200, 210, 0.5)',
              textShadow: isLocked
                ? undefined
                : '0 0 8px rgba(0, 242, 255, 0.3)',
              fontFamily: isLocked ? undefined : '"Space Grotesk", monospace',
              opacity: isLocked ? 1 : 0.7,
              transform: isLocked ? 'none' : `translateY(${Math.random() > 0.5 ? -1 : 1}px)`,
              minWidth: char === ' ' ? '0.3em' : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
      {/* Blinking cursor */}
      <span
        className="inline-block w-[3px] ml-1 align-middle"
        style={{
          height: '0.85em',
          background: 'linear-gradient(180deg, #00f2ff, #00696f)',
          animation: 'decoder-blink 0.8s ease-in-out infinite',
          borderRadius: '1px',
        }}
      />
    </span>
  );
}
