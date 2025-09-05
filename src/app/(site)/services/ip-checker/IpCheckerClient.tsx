'use client';
import Callout from '@/components/mdx/Callout';
import React, { useEffect } from 'react';
import useSWR from 'swr';

type IpResponse = {
  ipv4: string | null;
  ipv6: string | null;
};

const fetcher = async (url: string): Promise<IpResponse> => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.error('Fetcher error:', err);
    return { ipv4: null, ipv6: null };
  }
};

const IpCheckerClient: React.FC<{ initialData?: IpResponse }> = ({ initialData }) => {
  useEffect(() => {
    console.log(`Referrer: ${document.referrer}`);
  }, []);

  const { data, error } = useSWR<IpResponse>('/api/GetIP', fetcher, { fallbackData: initialData });

  if (error) return <div className="py-20">Failed to load</div>;
  if (!data) return <div className="py-20">Loading...</div>;
  if (!data.ipv4 && !data.ipv6) return <div className="py-20">No IP found</div>;

  return (
    <div className="py-20 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-6xl">IP checker</h1>
      <Callout>
        {data.ipv4 && <h2>آی‌پی شما (IPv4): {data.ipv4}</h2>}
        {data.ipv6 && <h2>آی‌پی شما (IPv6): {data.ipv6}</h2>}
      </Callout>
    </div>
  );
};

export default IpCheckerClient;