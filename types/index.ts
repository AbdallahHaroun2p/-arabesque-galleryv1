export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked?: boolean;
  unlockedAt?: Date;
} 