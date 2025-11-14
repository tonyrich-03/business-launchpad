export interface BrandPreferences {
  industry: string;
  targetAudience: string;
  brandPersonality: string[];
  keywords: string[];
  stylePreferences: string[];
}

export interface BrandName {
  name: string;
  meaning: string;
  availability: boolean;
  domainAvailable?: boolean;
  socialHandlesAvailable?: boolean;
}

export interface LogoConcept {
  id: string;
  name: string;
  description: string;
  style: string;
  colors: string[];
  symbolism: string[];
  sketchDescription: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  success: string;
  warning: string;
  error: string;
  shades: {
    [key: string]: string[];
  };
}

export interface TypographyPair {
  heading: string;
  body: string;
  description: string;
  pairingRationale: string;
}

export interface BrandVoice {
  tone: string[];
  communicationStyle: string;
  keyMessages: string[];
  do: string[];
  dont: string[];
}

export interface BrandKit {
  brandName: BrandName;
  logoConcepts: LogoConcept[];
  colorPalette: ColorPalette;
  typography: TypographyPair;
  brandVoice: BrandVoice;
  tagline?: string;
  missionStatement?: string;
  createdAt: Date;
}