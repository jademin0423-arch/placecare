interface DisclosureBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function DisclosureBox({ title = "주의사항 및 안내", children }: DisclosureBoxProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold mb-3 text-amber-900">{title}</h3>
      <div className="text-sm text-amber-800 space-y-2">
        {children}
      </div>
    </div>
  );
}

