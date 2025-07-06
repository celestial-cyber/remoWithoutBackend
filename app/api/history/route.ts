import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust path if needed
import { history } from '@/lib/schema'; // Your Drizzle schema table
import { desc } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const rows = await db.select().from(history).orderBy(desc(history.timestamp));

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Failed to fetch history.' }, { status: 500 });
  }
}
