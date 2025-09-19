export function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(100, ...data.map(d => d.value));
  const h = 180, bw = 42, gap = 18, w = data.length * (bw + gap) + gap;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x={0} y={0} width={w} height={h} fill="#fff" stroke="#e5e7eb"/>
      {data.map((d, i) => {
        const val = Math.max(3, Math.round((d.value / max) * (h - 40)));
        const x = gap + i * (bw + gap);
        const y = h - 20 - val;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={val} fill="#111827"/>
            <text x={x + bw/2} y={h - 6} fontSize="10" textAnchor="middle">{d.label}</text>
            <text x={x + bw/2} y={y - 4} fontSize="10" textAnchor="middle">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}
