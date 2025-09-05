import { useState } from 'react';
import type { GetServerSideProps } from 'next';

type TestProps = {
  ipAddress: string;
};

const Test: React.FC<TestProps> = ({ ipAddress }) => {
  const [clientIP, setClientIP] = useState<string | null>(null);

  const getPublicIPFunc = async () => {
    try {
      const res = await fetch('/api/GetIP/getip');
      if (!res.ok) throw new Error('Failed to fetch client IP');
      const data: { ip: string } = await res.json();
      setClientIP(data.ip);
    } catch (err) {
      console.error('Client fetch error:', err);
      setClientIP('Error fetching IP');
    }
  };

  return (
    <>
      <div>Server Side IP: {ipAddress}</div>
      <div>Client Side IP: {clientIP}</div>
      <div onClick={getPublicIPFunc} style={{ cursor: 'pointer', color: 'blue' }}>
        Get IP
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<TestProps> = async (ctx) => {
  try {
    const { req } = ctx;

    const result =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      null;

    let item = '';
    if (result) {
      item = result.split(',').length > 0 ? result.split(',')[0] : result;
    }

    return { props: { ipAddress: item } };
  } catch (err) {
    console.error('SSR error:', err);
    return { props: { ipAddress: 'Error retrieving IP' } };
  }
};

export default Test;
