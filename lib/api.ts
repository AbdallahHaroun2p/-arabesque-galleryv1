import { prisma } from './prisma'

export async function getAchievements(userId: string) {
  const response = await fetch('/api/achievements', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch achievements');
  }

  return response.json();
} 