'use client';

import { useEffect, useRef } from 'react';

export default function TrustindexWidget() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    wrapperRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?841704f6759404492966fa31cba';
    script.async = true;
    script.defer = true;

    wrapperRef.current.appendChild(script);
  }, []);

  return <div ref={wrapperRef} />;
}