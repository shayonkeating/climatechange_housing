import React from 'react';
import Link from 'next/link';

function NotFoundPage() {
    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          color: 'white',
          width: '100%',
          fontSize: '24px',
          gap: '20px'
          }}>
          Whoopsies climate cowboy 🤠! <br />
          Looks like you didn't input anything 🤔
          <Link href="/" passHref>
              <div style={{cursor: 'pointer'}}>
                  <a className="text-white underline text-2xl">👋 Let's take you back home...</a>
              </div>
          </Link>
      </div>
  );
}

export default NotFoundPage;
