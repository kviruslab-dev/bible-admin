'use client';

import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from '@/constants/column';
import { useMemo } from 'react';

export const GridProvider = ({ data }: any) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map(header => {
              const sortedUniqueValues = useMemo(
                () => Array.from(header.column.getFacetedUniqueValues().keys()).sort(),
                [header.column]
              );
              const onFilterChange = (value: string) => {
                if (value === 'null') {
                  header.column.setFilterValue(null);
                } else {
                  header.column.setFilterValue(value);
                }
              };
              console.log(header.getSize());
              return (
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
                  {header.column.getCanFilter() ? (
                    <select onChange={({ currentTarget: { value } }) => onFilterChange(value)}>
                      <option value="null">선택 안함</option>
                      {sortedUniqueValues.map((value: string, index) => (
                        <option key={value + index} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  ) : null}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table?.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
