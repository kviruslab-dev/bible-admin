'use client';

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columns, tableData } from '@/constants/column';

export const GridProvider = ({ data }: any) => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="font-medium"
                style={{ width: header.getSize(), cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {
                  {
                    asc: '<',
                    desc: '>',
                  }[header.column.getIsSorted() as string]
                }
                {header.column.getCanSort() && !header.column.getIsSorted() ? '<>' : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
