import { prisma } from '../prisma';

export async function getOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        clerkUserId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: true,
      },
    });

    return orders.map(order => ({
      id: order.id,
      total: Number(order.total),
      status: order.status,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name || '',
        quantity: Number(item.quantity),
        price: Number(item.price),
        image: item.image || undefined,
      })),
      createdAt: order.createdAt,
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
} 