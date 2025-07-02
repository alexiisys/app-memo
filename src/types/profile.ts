export type Profile = {
  image: string;
  firstName: string;
  lastName: string;
  birth: string;
  city: string;
  gender: 'man' | 'female';
  country: string;
  hairColor: string;
  eyeColor: string;
  weight: string;
  height: string;
  relationships: boolean;
  orientation: 'straight' | 'homosexual';
  smoking: boolean;
  alcohol: boolean;
  interests: string[];
  description: string;
};
