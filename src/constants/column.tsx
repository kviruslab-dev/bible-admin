'use client';
import { EditDateCell, EditImgCell, EditSelectCell, EditTextCell } from '@/components/edit-cell';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CITY } from './routes';

export interface ColumnType {
  id: string;
  create_at: string;
  title: string;
  tick: number;
  start_date: string;
  end_date: string;
  page: number;
  location: number;
  rate: number;
  image: string;
  link: string;
  active: string;
  timezone: string;
  city: string;
  edit: string;
}

export interface ProductColumnType {
  id: string;
  create_at: string;
  title: string;
  tick: string;
  gubun: string;
  money: string;
  image: string;
  link: string;
  active: string;
  star: string;
  dc: string;
  sequence: string;
  edit: string;
}

// ! default 값
export const defaultRow = {
  id: Math.floor(Math.random() * 10000).toString(),
  create_at: new Date().toLocaleString(),
  title: '제목',
  tick: 0,
  start_date: '',
  end_date: '',
  page: 1,
  location: 1,
  rate: 0,
  image: '',
  link: '',
  active: '',
  timezone: '',
  city: '',
  edit: '',
};

// type Colum =  typeof defaultColumn

// const productColumn = {
//   id: Math.floor(Math.random() * 10000).toString(),
//   create_at: new Date().toLocaleString(),
//   title: '제목',
// tick: 0,
// gubun: 1,
// money: 0,
// image: '',
// link: '',
// active:
// star: 0
// dc:0,
// sequence:
// edit: ''
// }

// const columnHelper = createColumnHelper();

// enableResizing: false
// maxSize?: number
// getStart: (position?: ColumnPinningPosition) => number

export const columns: Array<ColumnDef<ColumnType>> = [
  { accessorKey: 'id', header: 'ID', maxSize: 70, enableColumnFilter: false, minSize: 70 },
  { accessorKey: 'create_at', header: '등록일' },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  { accessorKey: 'tick', header: '클릭수', enableColumnFilter: false },
  {
    accessorKey: 'start_date',
    header: '시작일',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditDateCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'end_date',
    header: '종료일',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditDateCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  { accessorKey: 'page', header: '페이지', enableColumnFilter: false },
  {
    accessorKey: 'location',
    header: '광고위치',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} {...{ type: 'number' }} />
    ),
  },
  {
    accessorKey: 'rate',
    header: '가중치',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} {...{ type: 'number' }} />
    ),
  },
  {
    accessorKey: 'image',
    header: '이미지',
    enableSorting: false,
    enableColumnFilter: false,
    size: 200,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditImgCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'link',
    header: '링크',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'active',
    header: '운영',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditSelectCell
        key={index + id}
        getValue={getValue}
        index={index}
        id={id}
        table={table}
        selectData={['운영함', '운영안함']}
      />
    ),
  },
  { accessorKey: 'timezone', header: '지역(시)', size: 100 },
  {
    accessorKey: 'city',
    header: '지역(구)',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditSelectCell key={index + id} getValue={getValue} index={index} id={id} table={table} selectData={CITY} />
    ),
  },
  {
    accessorKey: 'edit',
    header: '수정',
    minSize: 70,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column: { id }, table }) => {
      return (
        <button
          onClick={() => {
            // console.log(row.row.original);
            alert(row.original?.link);
          }}
          className="absBtn"
        >
          저장
        </button>
      );
    },
  },
];

export const productColumn: Array<ColumnDef<ProductColumnType>> = [
  { accessorKey: 'id', header: 'ID', enableColumnFilter: false, minSize: 70 },
  { accessorKey: 'create_at', header: '등록일' },
  { accessorKey: 'title', header: '제목' },
  { accessorKey: 'tick', header: '클릭수', enableColumnFilter: false },
  { accessorKey: 'gubun', header: '구분', enableColumnFilter: false },
  { accessorKey: 'money', header: '금액', enableColumnFilter: false },
  { accessorKey: 'star', header: '별점', enableColumnFilter: false },
  { accessorKey: 'dc', header: '할인율', enableColumnFilter: false },
  { accessorKey: 'sequence', header: '순서', enableColumnFilter: false },
  { accessorKey: 'image', header: '이미지', enableSorting: false, enableColumnFilter: false, size: 200 },
  { accessorKey: 'link', header: '링크', enableSorting: false, enableColumnFilter: false },
  { accessorKey: 'active', header: '운영', enableSorting: false },
  {
    accessorKey: 'edit',
    header: '수정',
    minSize: 70,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column, table }) => {
      return (
        <td>
          <button
            onClick={() => {
              alert(row.original?.link);
            }}
            className="absBtn"
          >
            저장
          </button>
        </td>
      );
    },
  },
];
interface DonateColumnType {
  id: string;
  create_at: string;
  title: string;
  image: string;
  link: string;
  type: string;
}
export const donateColumn: Array<ColumnDef<DonateColumnType>> = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'create_at', header: '등록일' },
  { accessorKey: 'title', header: '제목' },
  { accessorKey: 'image', header: '이미지' },
  { accessorKey: 'link', header: '링크' },
  { accessorKey: 'type', header: '타입' },
];
