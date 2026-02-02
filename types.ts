
export type AppMode = 'SETUP' | 'ADMIN' | 'KIOSK' | 'APP_VIEW';

export interface KioskApp {
  id: string;
  name: string;
  icon: string;
  category: string;
  isEnabled: boolean;
  color: string;
}

export interface KioskConfig {
  pin: string;
  allowedApps: string[]; // Array of App IDs
  tabletName: string;
  lastLogin: string;
}
