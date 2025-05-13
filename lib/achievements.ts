import { prisma } from './prisma';

export interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  unlockedAt: Date | null;
  userId: string;
}

export async function getUnlockedAchievements(userId: string): Promise<Achievement[]> {
  try {
    const achievements = await prisma.achievement.findMany({
      where: {
        userId: userId,
        unlockedAt: {
          not: null
        }
      },
      orderBy: {
        unlockedAt: 'desc'
      }
    });

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function unlockAchievement(userId: string, type: AchievementType): Promise<Achievement | null> {
  try {
    const achievement = await prisma.achievement.upsert({
      where: {
        userId_type: {
          userId,
          type
        }
      },
      update: {
        unlockedAt: new Date()
      },
      create: {
        userId,
        type,
        name: getAchievementName(type),
        description: getAchievementDescription(type),
        unlockedAt: new Date()
      }
    });
    return achievement;
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return null;
  }
}

export type AchievementType = 
  | 'first_order'
  | 'second_order'
  | 'third_order'
  | 'premium_collector';

function getAchievementName(type: AchievementType): string {
  switch (type) {
    case 'first_order':
      return 'First Steps';
    case 'second_order':
      return 'Art Enthusiast';
    case 'third_order':
      return 'Dedicated Collector';
    case 'premium_collector':
      return 'Premium Collector';
  }
}

function getAchievementDescription(type: AchievementType): string {
  switch (type) {
    case 'first_order':
      return 'Complete your first order';
    case 'second_order':
      return 'Complete your second order';
    case 'third_order':
      return 'Complete your third order';
    case 'premium_collector':
      return 'Spend over $10,000 in total purchases';
  }
} 