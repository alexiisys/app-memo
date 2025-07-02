export const HAIR_COLORS = [
  { label: 'Light brown', value: 'light_brown' },
  { label: 'Dark brown', value: 'dark_brown' },
  { label: 'Blonde', value: 'blonde' },
  { label: 'Red', value: 'red' },
  { label: 'Black', value: 'black' },
  { label: 'Gray', value: 'gray' },
  { label: 'White', value: 'white' },
  { label: 'Other', value: 'other' },
];

export const EYE_COLORS = [
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Brown', value: 'brown' },
  { label: 'Gray', value: 'gray' },
  { label: 'Hazel', value: 'hazel' },
  { label: 'Amber', value: 'amber' },
  { label: 'Other', value: 'other' },
];

export function getAge(birthDate: Date, now: Date = new Date()): number {
  let age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
