"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { logoutUser, logSession } from '../lib/actions/session';

const Page = () => {
  const router = useRouter();
  const [session, setSession] = useState(null); 

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await logSession();
        setSession(userSession); 

        if (!userSession) {
          router.push('/login');
        }
      } catch (error) {
        console.error("Error fetching session", error);
      }
    };
    checkSession();
  }, [router]);

  if (session === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <button onClick={() => logoutUser()}>Logout</button>
    </div>
  )
}

export default Page