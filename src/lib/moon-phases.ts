// Moon phase calculation utility
// Based on astronomical approximation using synodic month

// Known new moon reference: January 6, 2000, 18:14 UTC
const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00.000Z');
const SYNODIC_MONTH = 29.530588; // Average length of lunar cycle in days

export interface MoonPhase {
  name: string;
  emoji: string;
  illumination: number;
  key: string;
}

// Moon phase definitions with emojis and illumination percentages
const MOON_PHASES: MoonPhase[] = [
  { name: 'New Moon', emoji: '🌑', illumination: 0, key: 'new-moon' },
  { name: 'Waxing Crescent', emoji: '🌒', illumination: 25, key: 'waxing-crescent' },
  { name: 'First Quarter', emoji: '🌓', illumination: 50, key: 'first-quarter' },
  { name: 'Waxing Gibbous', emoji: '🌔', illumination: 75, key: 'waxing-gibbous' },
  { name: 'Full Moon', emoji: '🌕', illumination: 100, key: 'full-moon' },
  { name: 'Waning Gibbous', emoji: '🌖', illumination: 75, key: 'waning-gibbous' },
  { name: 'Last Quarter', emoji: '🌗', illumination: 50, key: 'last-quarter' },
  { name: 'Waning Crescent', emoji: '🌘', illumination: 25, key: 'waning-crescent' }
];

/**
 * Calculate moon phase for a given date
 * @param date - The date to calculate the moon phase for
 * @returns MoonPhase object with name, emoji, and illumination
 */
export function getMoonPhase(date: Date): MoonPhase {
  // Calculate days since known new moon
  const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
  
  // Get moon age (position in current cycle)
  const moonAge = ((daysSinceNewMoon % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  
  // Map moon age to phase index (0-7)
  const phaseIndex = Math.round(moonAge / (SYNODIC_MONTH / 8)) % 8;
  
  // Calculate precise illumination based on moon age
  const illumination = Math.round(50 * (1 - Math.cos(2 * Math.PI * moonAge / SYNODIC_MONTH)));
  
  return {
    ...MOON_PHASES[phaseIndex],
    illumination
  };
}

/**
 * Get moon phases for the next N days starting from today
 * @param days - Number of days to get phases for
 * @returns Array of objects with date and moon phase
 */
export function getUpcomingPhases(days: number = 7) {
  const phases = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    phases.push({
      date,
      phase: getMoonPhase(date)
    });
  }
  
  return phases;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format date for today display
 */
export function formatTodayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}