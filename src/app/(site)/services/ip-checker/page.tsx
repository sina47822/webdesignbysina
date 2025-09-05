import { headers } from "next/headers";
import IpCheckerClient from "./IpCheckerClient";

type IpResponse = {
  ipv4: string | null;
  ipv6: string | null;
};

export default async function IpCheckerPage() {
  // مستقیم IP رو از headers بگیر (بدون fetch)
  const h = headers();
  let ip = (await h).get('x-forwarded-for') || null;

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
    ipv4 = '127.0.0.1';  // fallback برای لوکال
  }

  const data: IpResponse = { ipv4, ipv6 };

  return <IpCheckerClient initialData={data} />;
}