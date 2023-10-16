'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from '@/constants/column';

export const GridProvider = ({ data }: any) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="bg-blue-200 text-14 font-medium border-[2px]"
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody></tbody>
    </table>
  );
};
