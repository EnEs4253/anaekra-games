import { useCallback, useRef } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number = 0.3, type: OscillatorType = 'sine') => {
    try {
      const audioContext = initAudioContext();
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  }, [initAudioContext]);

  const playSuccessSound = useCallback(() => {
    // Happy ascending melody
    playTone(523.25, 0.2); // C5
    setTimeout(() => playTone(659.25, 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 0.3), 200); // G5
  }, [playTone]);

  const playErrorSound = useCallback(() => {
    // Gentle descending tone
    playTone(400, 0.2);
    setTimeout(() => playTone(350, 0.3), 150);
  }, [playTone]);

  const playClickSound = useCallback(() => {
    // Short pleasant click
    playTone(800, 0.1, 'triangle');
  }, [playTone]);

  const speakText = useCallback((text: string, lang: string = 'tr-TR') => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('🔊 Would speak:', text);
    }
  }, []);

  return {
    playSuccessSound,
    playErrorSound,
    playClickSound,
    speakText
  };
};