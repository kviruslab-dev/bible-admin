'use client';

import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnResizeMode,
} from '@tanstack/react-table';
import { ColumnType, columns } from '@/constants/column';
import { useMemo, useState } from 'react';

export const GridProvider = ({ data }: { data: ColumnType[] }) => {
  // const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange');

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <table {...{ style: { width: table.getTotalSize() } }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map(header => {
              const [open, setOpen] = useState(false);
              const sortedUniqueValues = useMemo(
                () => Array.from(header.column?.getFacetedUniqueValues().keys()).sort(),
                [header.column]
              );
              const onFilterChange = (value: string) => {
                if (value === 'null') {
                  header.column.setFilterValue(null);
                } else {
                  header.column.setFilterValue(value);
                }
              };
              return (
                <th
                  key={header.id}
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                  className={`font-medium`}
                  // style={{ /* width: header.getSize(), */ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  // onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {
                    <span
                      className="aaa"
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default', fontSize: '20px' }}
                      onClick={header.column.getToggleSortingHandler() /* () => setOpen(pre => !pre) */}
                    >
                      ‹
                    </span>
                  }
                  {
                    <span style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default', fontSize: '20px' }}>
                      ›
                    </span>
                  }
                  {<div style={open ? { display: 'block' } : { display: 'none' }}>하이</div>}
                  {/* {
                    {
                      asc: '<',
                      desc: '>',
                    }[header.column.getIsSorted() as string]
                  } */}
                  {/* {header.column.getCanSort() && !header.column.getIsSorted() ? '<>' : null} */}
                  {/* {header.column.getCanFilter() ? (
                    <select onChange={({ currentTarget: { value } }) => onFilterChange(value)}>
                      <option value="null">선택 안함</option>
                      {sortedUniqueValues.map((value: string, index) => (
                        <option key={value + index} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  ) : null} */}
                  <div
                    {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                      // style: {
                      //   transform:
                      //     columnResizeMode === 'onEnd' && header.column.getIsResizing()
                      //       ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                      //       : '',
                      // },
                    }}
                  />
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
