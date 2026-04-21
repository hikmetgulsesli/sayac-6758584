export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthNames = [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
  ];
  const month = monthNames[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${date.getFullYear()}, ${hours}:${minutes}`;
}

export function formatDateShort(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthNames = [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
  ];
  const month = monthNames[date.getMonth()];
  return `${day} ${month} ${date.getFullYear()}`;
}