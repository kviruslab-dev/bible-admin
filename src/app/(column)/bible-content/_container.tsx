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
import { TodayColumnType, todayColumn } from '@/constants/column';
import { useLayoutEffect, useState } from 'react';
import { excelDownload } from '@/lib/grid/xlsx';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const defaultRow = {
  image: '',
  active: 0,
  date: '',
  title: '',
  url: '',
  content: '',
};

export const Container = ({ data }: { data: TodayColumnType[] }) => {
  const [rowData, setRowData] = useState(data);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  useLayoutEffect(() => {
    setRowData(data);
  }, []);

  const table = useReactTable({
    data: rowData,
    columns: todayColumn,
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
      updateData: (rowIndex, columnId, value) => {
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
        const setFunc = (old: TodayColumnType[]): any => [...old, defaultRow];
        setRowData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: TodayColumnType[]) =>
          old.filter((_row: TodayColumnType, index: number) => index !== rowIndex);
        setRowData(setFilterFunc);
      },
    },
  });

  return (
    <>
      <div className="absBtnWrapper">
        <button
          onClick={async () => {
            fetch('/api/logout', {
              method: 'POST',
            })
              .then(() => {
                router.replace('/signin');
              })
              .catch(err => {
                console.log(err);
              });
          }}
          className="px-12 py-8 rounded-[10px] mr-10 border-[2px] transition-all ease-in-out hover:border-gray-400 hover:ease-in-out"
        >
          로그아웃
        </button>
        <button
          className="text-main font-medium p-8 rounded-[10px] bg-blue-100 hover:bg-gray-300 hover:text-gray-500 mr-[10px]"
          onClick={() => {
            table.options.meta?.addRow();
          }}
        >
          추가하기
        </button>
        <button
          className="text-white font-medium p-8 rounded-[10px] bg-main hover:bg-blue-600"
          onClick={async () => {
            console.log(table.getRowModel().rows.map(row => row.original));
            await toast.promise(
              fetch('https://dev25backend.givemeprice.co.kr/cms', {
                method: 'PATCH',
                body: JSON.stringify(
                  table.getRowModel().rows.map(row => ({
                    active: row.original.active,
                    today: row.original.today,
                    image: row.original.image,
                    content: row.original.content,
                    title: row.original.title,
                    song: row.original.song,
                  }))
                ),
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }),
              {
                loading: '잠시만 기다려주세요',
                success: <span>저장에 성공했어요!</span>,
                error: <span>저장에 실패했어요!</span>,
              }
            );
            router.refresh();
          }}
        >
          저장
        </button>
      </div>
      <section className="flex justify-center w-full">
        <div id="table_wrapper">
          <table {...{ style: { width: table.getTotalSize() } }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    // const [open, setOpen] = useState(false);
                    // const sortedUniqueValues = useMemo(
                    //   () => Array.from(header.column?.getFacetedUniqueValues().keys()).sort(),
                    //   [header.column]
                    // );
                    // const onFilterChange = (value: string) => {
                    //   if (value === 'null') {
                    //     header.column.setFilterValue(null);
                    //   } else {
                    //     header.column.setFilterValue(value);
                    //   }
                    // };
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
                        className={`font-medium hover:bg-gray-300`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
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
              {table?.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell, index) => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
            {/* <tfoot>
              <tr>
                <th colSpan={table.getCenterLeafColumns().length} align="right"></th>
              </tr>
            </tfoot> */}
          </table>
        </div>
      </section>
    </>
  );
};
