'use client';

import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnResizeMode,
  ColumnDef,
} from '@tanstack/react-table';
import { productColumn as columns, ColumnType, ProductColumnType } from '@/constants/column';
import { FocusEvent, useEffect, useMemo, useState } from 'react';

const defaultColumn: Partial<ColumnDef<ProductColumnType>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
      table.options.meta?.updateData(index, id, e.target.value);
    };
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <td key={index + id} style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <input
          readOnly
          className="adsInput"
          value={value as string}
          onChange={e => {
            table.options.meta?.updateData(index, id, e.target.value);
            setValue(e.target.value);
          }}
          onBlur={onBlur}
        />
      </td>
    );
  },
};

export const ProductGrid = ({ data }: { data: ProductColumnType[] }) => {
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    defaultColumn,
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
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
                  {/* {
                      {
                        asc: '<',
                        desc: '>',
                      }[header.column.getIsSorted() as string]
                    } */}
                  {/* {header.column.getCanSort() && !header.column.getIsSorted() ? '<>' : null}
                    {header.column.getCanFilter() ? (
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
              <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
