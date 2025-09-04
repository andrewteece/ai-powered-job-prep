import { NextResponse } from 'next/server';
import pg from 'pg';

export async function GET() {
  const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const { rows } = await pool.query<{ now: string }>('select now()');
    return NextResponse.json({ ok: true, dbTime: rows[0]?.now });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  } finally {
    await pool.end();
  }
}
