import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

export interface ColumnType {
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

// const columnHelper = createColumnHelper();

export const columns: Array<ColumnDef<ColumnType>> = [
  { accessorKey: 'id', header: 'ID', enableColumnFilter: false, size: 70 },
  { accessorKey: 'create_at', header: '등록일' },
  { accessorKey: 'title', header: '제목' },
  { accessorKey: 'tick', header: '클릭수', enableColumnFilter: false },
  { accessorKey: 'page', header: '페이지', minSize: 100, enableColumnFilter: false },
  { accessorKey: 'location', minSize: 75, header: '광고위치' },
  { accessorKey: 'rate', header: '가중치' },
  { accessorKey: 'image', header: '이미지', enableSorting: false, enableColumnFilter: false, size: 200 },
  { accessorKey: 'link', header: '링크', enableSorting: false, enableColumnFilter: false },
  { accessorKey: 'active', header: '운영' },
  { accessorKey: 'timezone', header: '지역(시)', size: 100 },
  { accessorKey: 'city', header: '지역(구)' },
  {
    accessorKey: 'edit',
    header: '수정',
    minSize: 70,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column, table }) => {
      console.log(column, 'column ::: ');
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
  { accessorKey: 'id', header: 'ID', enableColumnFilter: false, size: 70 },
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
