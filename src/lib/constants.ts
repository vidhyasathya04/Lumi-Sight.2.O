export const LANGUAGES = [
  'English',
  'Español (Spanish)',
  'Français (French)',
  'Deutsch (German)',
  '中文 (Chinese)',
  '日本語 (Japanese)',
  'Português (Portuguese)',
  'Русский (Russian)',
  'العربية (Arabic)',
  'हिंदी (Hindi)',
  'বাংলা (Bengali)',
  'தமிழ் (Tamil)',
] as const;

export const USER_TYPES = ['Patient', 'Blood Donor', 'Healthcare Provider'] as const;
export type UserType = typeof USER_TYPES[number];

export const DIABETES_STATUSES = ['Yes', 'No', 'Don\'t Know'] as const;
export type DiabetesStatus = typeof DIABETES_STATUSES[number];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export type BloodGroup = typeof BLOOD_GROUPS[number];

export const LAST_CHECKUPS = ['Never', '1yr', '2yr', 'More'] as const;
export type LastCheckup = typeof LAST_CHECKUPS[number];

export const WILLING_TO_DONATE_OPTIONS = ['Yes', 'No', 'Maybe'] as const;
export type WillingToDonate = typeof WILLING_TO_DONATE_OPTIONS[number];
