import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitiales = (name: string) => {
  if (!name) return null
  const words = name.normalize('NFKC').toUpperCase().split(' ');
  let initials = '';
  if (words.length === 1) {
    initials = words[0].charAt(0);
  } else if (words.length >= 2) {
    for (let i = 0; i < 2; i++) {
      initials += words[i].charAt(0);
    }
  }
  return initials;
};

export function ConvertHoursMinutes(runtime: number) {
  const heures = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;

  return (`${heures}h${minutesFormat}`);
}

export function convertDate(date: string) {
  const parts = date.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}/${year}`;
}
