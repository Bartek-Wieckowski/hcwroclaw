export function formatDate(dateString: string) {
  const months = [
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
  ];
  const [year, month, day] = dateString.split('-');
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
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
