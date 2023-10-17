import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useRef, useState } from 'react';

interface AD {
  id: string;
  create_at: string;
  title: string;
  tick: string;
  start_date: string;
  end_date: string;
  page: string;
  location: string;
  rate: string;
  image: string;
  link: string;
  active: string;
  timezone: string;
  city: string;
  edit: string;
}

const columnHelper = createColumnHelper();

export const columns: any = [
  columnHelper.accessor('id', { header: 'ID', enableColumnFilter: false }),
  columnHelper.accessor('create_at', { header: '등록일' }),
  columnHelper.accessor('title', { header: '제목', enableSorting: false }),
  columnHelper.accessor('tick', { header: '클릭수', enableColumnFilter: false }),
  columnHelper.accessor('start_date', { header: '시작일' }),
  columnHelper.accessor('end_date', { header: '종료일' }),
  columnHelper.accessor('page', { header: '페이지', enableSorting: false }),
  columnHelper.accessor('location', { header: '광고위치' }),
  columnHelper.accessor('rate', { header: '가중치' }),
  columnHelper.accessor('image', { header: '이미지', enableSorting: false, enableColumnFilter: false }),
  columnHelper.accessor('link', {
    header: '링크',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, renderValue, row, column, table }) => {
      const [value, setValue] = useState<string>(getValue());
      const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value);
      };

      return (
        <input
          className="adsInput"
          value={value}
          onChange={e => {
            renderValue();
            setValue(e.target.value as string);
            row.original.link = e.target.value as string;
          }}
          onBlur={onBlur}
        />
      );
    },
  }),
  columnHelper.accessor('active', { header: '운영', size: 80 }),
  columnHelper.accessor('timezone', { header: '지역(시)', size: 60 }),
  columnHelper.accessor('city', { header: '지역(구)', size: 60 }),
  columnHelper.accessor('edit', {
    header: '수정',
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column, table }) => {
      return (
        <button
          onClick={() => {
            // console.log(row.row.original);
            alert(row.original?.link);
          }}
          className="bg-main px-5 rounded-md text-white"
        >
          저장
        </button>
      );
    },
  }),
];
