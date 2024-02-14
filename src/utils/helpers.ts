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
