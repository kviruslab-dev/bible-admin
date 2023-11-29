'use client';

import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TodayColumnType, todayColumn } from '@/constants/column';
import { use, useLayoutEffect, useState } from 'react';
import { excelDownload } from '@/lib/grid/xlsx';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const defaultRow = {
  image: '더블 클릭해주세요.',
  id: '',
  active: 0,
  today: '더블 클릭해주세요',
  title: '더블 클릭해주세요',
  song: '더블 클릭해주세요',
  content: '더블 클릭해주세요',
};

export const Container = ({ data, type }: { data: TodayColumnType[]; type: string }) => {
  const [rowData, setRowData] = useState(data);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  useLayoutEffect(() => {
    setRowData(data);
  }, [type]);

  const table = useReactTable({
    data: rowData,
    columns: todayColumn,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
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
        const setFunc = (old: TodayColumnType[]): any => [defaultRow, ...old];
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
          className="text-white font-medium py-8 px-[14px] rounded-[10px] bg-main hover:bg-blue-600"
          onClick={async () => {
            if (table.getRowModel().rows.every(row => row.getIsSelected() === false)) {
              return toast.error('하나 이상의 활성화된 데이터가 필요합니다.');
            } else {
              const result = await Promise.all([
                ...table.getRowModel().rows.map(async row => {
                  if (row.getIsSelected() === true) {
                    const formData = new FormData();
                    formData.append('id', row.original.id.toString());
                    formData.append('upload', row.original.image);
                    formData.append('today', row.original.today);
                    formData.append('title', row.original.title);
                    formData.append('song', row.original.song);
                    formData.append('content', row.original.content);

                    return row.original.id.toString() === ''
                      ? fetch(`https://spare25backend.givemeprice.co.kr/admin/${type}`, {
                          method: 'POST',
                          body: formData,
                        })
                          .then(() => toast.success('성공하였습니다.'))
                          .catch(() => toast.error('실패하였습니다.'))
                      : fetch(`https://spare25backend.givemeprice.co.kr/admin/${type}`, {
                          method: 'PATCH',
                          body: formData,
                        })
                          .then(() => toast.success('성공하였습니다.'))
                          .catch(() => toast.error('실패하였습니다.'));
                  }
                }),
              ]);
              return result && window.location.reload();
            }
          }}
        >
          저장
        </button>
      </div>
      <section className="flex justify-center w-full">
        <div id="table_wrapper">
          <table {...{ style: { minWidth: /*  table.getTotalSize() */ '1200px' } }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
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
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
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
          </table>
        </div>
      </section>
    </>
  );
};
