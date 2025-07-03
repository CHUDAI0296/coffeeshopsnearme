import React from 'react';

interface HighlightProps {
  text: string;
  keyword: string;
}

export default function Highlight({ text, keyword }: HighlightProps) {
  if (!keyword) return <>{text}</>;
  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-yellow-200 text-yellow-900 font-bold">{part}</mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
} 