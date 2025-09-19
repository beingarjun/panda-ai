import React from "react";

export function SimpleTable<T extends {}>({
  rows, columns
}: {
  rows: T[];
  columns: { key: keyof T; label: string; render?: (v: any, row: T) => React.ReactNode }[];
}) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={String(c.key)} style={{ borderTop: "1px solid #e5e7eb", padding: 8, textAlign: "left" }}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={String(c.key)} style={{ borderTop: "1px solid #e5e7eb", padding: 8 }}>
                {c.render ? c.render((r as any)[c.key], r) : String((r as any)[c.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
