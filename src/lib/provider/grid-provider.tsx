'use client';

import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { ColumnType, columns, defaultRow } from '@/constants/column';
import { FocusEvent, useEffect, useLayoutEffect, useMemo, useState } from 'react';

// const defaultColumn: Partial<ColumnDef<ColumnType>> = {
//   cell: ({ getValue, row: { index }, column: { id }, table }) => {
//     const initialValue = getValue();
//     const [value, setValue] = useState(initialValue);
//     const onBlur = (e: FocusEvent<HTMLInputElement>) => {
//       table.options.meta?.updateData(index, id, e.target.value);
//     };
//     useEffect(() => {
//       setValue(initialValue);
//     }, [initialValue]);

//     return (
//       // <td key={index + id} style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
//       <input
//         readOnly
//         className="adsInput"
//         value={initialValue as string}
//         onChange={e => {
//           // table.options.meta?.updateData(index, id, e.target.value);
//           setValue(e.target.value);
//         }}
//         onBlur={onBlur}
//       />
//       // </td>
//     );
//   },
// };

export const GridProvider = ({ data, type }: { data: ColumnType[]; type: string }) => {
  const [rowData, setRowData] = useState(data);
  const [rowSelection, setRowSelection] = useState({});

  useLayoutEffect(() => {
    type && setRowData(data);
  }, [type]);

  const table = useReactTable({
    data: rowData,
    columns,
    // defaultColumn,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      // editedRows,
      // setEditedRows,
      // revertData: () => { },
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        setRowData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const setFunc = (old: ColumnType[]) => [...old, defaultRow];
        setRowData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: ColumnType[]) =>
          old.filter((_row: ColumnType, index: number) => index !== rowIndex);
        setRowData(setFilterFunc);
      },
    },
  });

  return (
    <>
      <div className="absBtnWrapper">
        <button
          className="absBtn"
          onClick={() => {
            table.options.meta?.addRow();
          }}
        >
          추가
        </button>
        <button
          className="absBtn"
          onClick={() => {
            table.options.meta?.removeRow(4);
          }}
        >
          선택저장
        </button>
      </div>
      <section className="flex justify-center w-full">
        <div id="table_wrapper">
          <table {...{ style: { minWidth: /*  table.getTotalSize() */ '1800px' } }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
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
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                        {/* {<div style={open ? { display: 'block' } : { display: 'none' }}>하이</div>} */}
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
                    return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={table.getCenterLeafColumns().length} align="right"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </>
  );
};
