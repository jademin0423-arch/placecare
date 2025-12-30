interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TocProps {
  items: TocItem[];
}

export function Toc({ items }: TocProps) {
  if (items.length === 0) return null;
  
  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6" aria-label="목차">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">목차</h2>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}>
            <a
              href={`#${item.id}`}
              className="text-gray-700 hover:text-wedding-pink focus-ring transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

