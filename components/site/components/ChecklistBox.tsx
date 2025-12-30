interface ChecklistBoxProps {
  title: string;
  items: string[];
}

export function ChecklistBox({ title, items }: ChecklistBoxProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 rounded border-2 border-wedding-pink flex items-center justify-center">
              <svg className="w-3 h-3 text-wedding-pink" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

