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
import { useLayoutEffect, useMemo, useState } from 'react';
import { EditTextCell } from '@/components/edit-cell';

// declare module '@tanstack/react-table' {
//   interface TableMeta<TData extends ColumnType> {
//     updateData: (rowIndex: number, columnId: string, value: unknown) => void
//   }
// }

export const GridProvider = ({ data }: { data: ColumnType[] }) => {
  // const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange');
  const [rowData, setRowData] = useState(() => data);

  useLayoutEffect(() => {
    setRowData(data);
  }, [data]);

  const table = useReactTable({
    data: rowData,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
    enableRowSelection: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      // editedRows,
      // setEditedRows,
      revertData: () => {},
      updateData: () => {},
      addRow: () => {
        console.log('addRow');
        const newRow: ColumnType = {
          id: Math.floor(Math.random() * 10000).toString(),
          create_at: new Date().toLocaleString(),
          title: '',
          tick: '',
          start_date: '',
          end_date: '',
          page: '',
          location: '',
          rate: '',
          image: '',
          link: '',
          active: '',
          timezone: '',
          city: '',
          edit: '',
        };
        const setFunc = (oldData: ColumnType[]) => [...oldData, newRow];
        setRowData(setFunc);
        // setData(setFunc);
        // setOriginalData(setFunc);
      },
    },
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
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    },
                  }}
                  className={`font-medium hover:bg-gray-600`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
            {row.getVisibleCells().map((cell, index) => {
              // return <EditTextCell key={cell.id} getValue={cell.getValue} />;
              return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={table.getCenterLeafColumns().length} align="right">
            <div className="footer-buttons">
              <button
                className="add-button text-main"
                onClick={() => {
                  const meta = table.options.meta;
                  // meta?.addRow()
                }}
              >
                Add New +
              </button>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
