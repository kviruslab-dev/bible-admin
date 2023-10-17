import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

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
  columnHelper.accessor('id', { header: 'ID', size: 30, enableColumnFilter: false }),
  columnHelper.accessor('create_at', { header: '등록일', size: 200 }),
  columnHelper.accessor('title', { header: '제목', enableSorting: false }),
  columnHelper.accessor('tick', { header: '클릭수', enableColumnFilter: false }),
  columnHelper.accessor('start_date', { header: '시작일' }),
  columnHelper.accessor('end_date', { header: '종료일' }),
  columnHelper.accessor('page', { header: '페이지', enableSorting: false }),
  columnHelper.accessor('location', { header: '광고위치', size: 60 }),
  columnHelper.accessor('rate', { header: '가중치', size: 80 }),
  columnHelper.accessor('image', { header: '이미지', size: 120, enableSorting: false, enableColumnFilter: false }),
  columnHelper.accessor('link', {
    header: '링크',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, row, column, table }) => {
      console.log(row);
      return (
        <input
          className="w-" /* value={getValue() as string} readOnly  */ /* value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} */
        />
      );
    },
  }),
  columnHelper.accessor('active', { header: '운영', size: 80 }),
  columnHelper.accessor('timezone', { header: '지역(시)', size: 60 }),
  columnHelper.accessor('city', { header: '지역(구)', size: 60 }),
  columnHelper.accessor('edit', {
    header: '수정',
    size: 100,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column, table }) => {
      return (
        <button
          onClick={() => {
            // console.log(row.row.original);
            alert('저장 ');
          }}
          className="bg-main w-full h-full px-5 rounded-md text-white"
        >
          저장
        </button>
      );
    },
  }),
];
