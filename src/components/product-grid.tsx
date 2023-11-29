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
import { ProductColumnType, productColumn } from '@/constants/column';
import { useLayoutEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const defaultRow = {
  id: '',
  create_at: new Date().toLocaleString(),
  title: '제목을 입력해주세요.',
  tick: 0,
  gubun: '구분을 입력해주세요.',
  money: '금액을 입력해주세요.',
  image: '이미지를 추가해주세요.',
  link: '링크를 추가해주세요.',
  active: '',
  star: '별점을 입력해주세요.',
  dc: '할인율을 입력해주세요.',
  sequence: '순서를 입력해주세요.',
  edit: '',
};

export const ProductGrid = ({ data }: { data: ProductColumnType[] }) => {
  const [rowData, setRowData] = useState(data);
  const [rowSelection, setRowSelection] = useState({});

  useLayoutEffect(() => {
    setRowData(data);
  }, []);

  const table = useReactTable({
    data: rowData,
    columns: productColumn,
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
        const setFunc = (old: ProductColumnType[]) => [defaultRow, ...old];
        setRowData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: ProductColumnType[]) =>
          old.filter((_row: ProductColumnType, index: number) => index !== rowIndex);
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
          onClick={async () => {
            if (table.getRowModel().rows.every(row => row.getIsSelected() === false)) {
              return toast.error('하나 이상의 활성화된 데이터가 필요합니다.');
            } else {
              const result = await Promise.all([
                ...table.getRowModel().rows.map(async row => {
                  if (row.getIsSelected() === true) {
                    console.log(row.original);
                    const formData = new FormData();
                    formData.append('id', row.original.id.toString());
                    formData.append('upload', row.original.image);
                    formData.append('title', row.original.title);
                    formData.append('star', row.original.star);
                    formData.append('gubun', row.original.gubun);
                    formData.append('link', row.original.link);
                    formData.append('money', row.original.money);
                    formData.append('dc', row.original.dc);
                    formData.append('sequence', row.original.sequence);
                    formData.append('active', row.original.active === '운영함' ? '1' : '0');

                    return row.original.id.toString() === ''
                      ? fetch('https://spare25backend.givemeprice.co.kr/admin/ad', {
                          method: 'POST',
                          body: formData,
                        })
                          .then(() => toast.success('성공하였습니다.'))
                          .catch(() => toast.error('실패하였습니다.'))
                      : fetch('https://spare25backend.givemeprice.co.kr/admin/ad', {
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
                        className={`font-medium hover:bg-gray-300`}
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
