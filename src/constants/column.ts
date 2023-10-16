import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', { header: 'ID', size: 30, enableColumnFilter: false }),
  columnHelper.accessor('create_at', { header: '등록일', size: 80 }),
  columnHelper.accessor('title', { header: '제목', size: 80, enableSorting: false }),
  columnHelper.accessor('tick', { header: '클릭수', size: 80, enableColumnFilter: false }),
  columnHelper.accessor('start_date', { header: '시작일', size: 80 }),
  columnHelper.accessor('end_date', { header: '종료일', size: 80 }),
  columnHelper.accessor('last_edit_date', { header: '페이지', size: 60, enableSorting: false }),
  columnHelper.accessor('city', { header: '위치', size: 60 }),
  columnHelper.accessor('rate', { header: '가중치', size: 80 }),
  columnHelper.accessor('image', { header: '이미지', size: 80, enableSorting: false, enableColumnFilter: false }),
  columnHelper.accessor('link', { header: '링크', size: 80, enableSorting: false, enableColumnFilter: false }),
  columnHelper.accessor('active', { header: '운영', size: 80 }),
  columnHelper.accessor('timezone', { header: '지역', size: 60 }),
  columnHelper.accessor('page', { header: '번호', size: 80, enableColumnFilter: false }),
] as any;

export const tableData = [
  {
    id: '11',
    create_at: '11',
    title: '11',
    tick: '5',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '강서구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '21',
    create_at: '11',
    title: '11',
    tick: '3',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '강동구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
  {
    id: '31',
    create_at: '11',
    title: '11',
    tick: '6',
    start_date: '11',
    end_date: '11',
    last_edit_date: '11',
    city: '관악구',
    rate: '11',
    image: '11',
    link: '11',
    active: '11',
    timezone: '11',
    page: '11',
  },
];
