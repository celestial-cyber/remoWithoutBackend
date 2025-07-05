import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
    });

    const [rows] = await connection.execute('SELECT * FROM history ORDER BY timestamp DESC');

    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Failed to fetch history.' }, { status: 500 });
  }
}
