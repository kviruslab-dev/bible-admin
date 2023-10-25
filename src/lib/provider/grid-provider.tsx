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
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

const defaultColumn: Partial<ColumnDef<ColumnType>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    // console.log(id, index)
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <td key={index + id} style={{ backgroundColor: 'blue' }}>
        <input
          readOnly
          className="adsInput"
          value={value as string}
          onChange={e => setValue(e.target.value)}
          onBlur={onBlur}
        />
      </td>
    );
  },
};

export const GridProvider = ({ data }: { data: ColumnType[] }) => {
  // const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange');
  const [rowData, setRowData] = useState(() => data);

  useLayoutEffect(() => {
    setRowData(data);
  }, [data]);

  const table = useReactTable({
    data: rowData,
    columns,
    defaultColumn,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    enableRowSelection: true,
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
    <table {...{ style: { width: table.getTotalSize() } }}>
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
              return <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>;
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          {/* {table.getFooterGroups} */}
          <th /* colSpan={table.getCenterLeafColumns().length / 2} */ align="left">
            {/* {table.getFooterGroups().map(item, index) => {
              if(index < 2) return 
            }} */}
            <div className="footer-buttons">
              <button
                className="add-button text-main"
                onClick={() => {
                  table.options.meta?.addRow();
                }}
              >
                Add New +
              </button>
            </div>
          </th>
          <th /* colSpan={table.getCenterLeafColumns().length / 2} */ align="left">
            <div className="footer-buttons">
              <button
                className="add-button text-main"
                onClick={() => {
                  table.options.meta?.removeRow(4);
                }}
              >
                Delete -
              </button>
            </div>
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
};
