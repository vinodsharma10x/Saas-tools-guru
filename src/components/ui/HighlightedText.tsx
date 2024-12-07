interface HighlightedTextProps {
  text: string;
  query: string;
}

export function HighlightedText({ text, query }: HighlightedTextProps) {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === query.toLowerCase()
              ? 'bg-yellow-200 font-medium'
              : undefined
          }
        >
          {part}
        </span>
      ))}
    </>
  );
}