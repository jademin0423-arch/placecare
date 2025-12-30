interface FAQItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FAQItem[];
}

export function Faq({ items }: FaqProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">자주 묻는 질문</h2>
      <dl className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <dt className="text-lg font-semibold text-gray-900 mb-2">
              {item.question}
            </dt>
            <dd className="text-gray-700 leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

