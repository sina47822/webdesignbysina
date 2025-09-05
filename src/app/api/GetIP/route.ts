import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';  // برای جلوگیری از static rendering

export async function GET(req: NextRequest) {
  try {
    let ip = req.headers.get('x-forwarded-for') || null;

    let ipv4: string | null = null;
    let ipv6: string | null = null;

    if (ip) {
      ip = ip.split(',')[0].trim();
      if (ip.startsWith("::ffff:")) {
        ipv4 = ip.replace("::ffff:", "");
        ipv6 = null;
      } else if (ip === "::1") {
        ipv6 = "::1";
        ipv4 = "127.0.0.1";
      } else if (ip.includes(":")) {
        ipv6 = ip;
      } else {
        ipv4 = ip;
      }
    }

    if (!ip) {
      ipv4 = '127.0.0.1';
    }

    return NextResponse.json({ ipv4, ipv6 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ ipv4: null, ipv6: null }, { status: 500 });
  }
}