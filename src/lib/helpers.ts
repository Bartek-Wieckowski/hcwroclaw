export function formatDate(dateString: string, locale: 'pl' | 'en') {
  const months: Record<'pl' | 'en', string[]> = {
    pl: [
      'STY',
      'LUT',
      'MAR',
      'KWI',
      'MAJ',
      'CZE',
      'LIP',
      'SIE',
      'WRZ',
      'PAŹ',
      'LIS',
      'GRU',
    ],
    en: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
  };

  const [year, month, day] = dateString.split('-');
  const monthIndex = parseInt(month, 10) - 1;

  return `${parseInt(day, 10)} ${months[locale][monthIndex]}`;
}

export function convertDate(dateString: string): Date {
  const parts = dateString.split('-');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return new Date(formattedDate);
}

export function findDotAndCutText(text: string) {
  const dotIndex = text.indexOf('.');
  if (dotIndex !== -1) {
    return text.substring(0, dotIndex + 1) + '..';
  }
  return '';
}

export function truncateText(text: string) {
  const words: string[] = text.split(' ');

  if (words.length > 7) {
    const truncatedText: string = words.slice(0, 7).join(' ');
    return truncatedText + '...';
  } else {
    return text;
  }
}
export function getInitials(name: string) {
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else if (words.length > 1) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }
  return '';
}

export function convertDateWithTimezone(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatDateInNews(date: string, locale: string) {
  return new Date(date).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'pl-PL',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
}
