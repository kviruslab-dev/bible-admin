import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', { header: 'ID', size: 30, enableColumnFilter: false }),
  columnHelper.accessor('create_at', { header: '등록일', size: 120 }),
  columnHelper.accessor('title', { header: '제목', size: 100, enableSorting: false }),
  columnHelper.accessor('tick', { header: '클릭수', size: 80, enableColumnFilter: false }),
  columnHelper.accessor('start_date', { header: '시작일' }),
  columnHelper.accessor('end_date', { header: '종료일' }),
  columnHelper.accessor('last_edit_date', { header: '페이지', size: 60, enableSorting: false }),
  columnHelper.accessor('city', { header: '위치', size: 60 }),
  columnHelper.accessor('rate', { header: '가중치', size: 80 }),
  columnHelper.accessor('image', { header: '이미지', size: 120, enableSorting: false, enableColumnFilter: false }),
  columnHelper.accessor('link', { header: '링크', enableSorting: false, enableColumnFilter: false }),
  columnHelper.accessor('active', { header: '운영', size: 80 }),
  columnHelper.accessor('timezone', { header: '지역', size: 60 }),
  columnHelper.accessor('page', { header: '번호', size: 80, enableColumnFilter: false }),
  columnHelper.accessor('edit', { header: '수정', enableColumnFilter: false, enableSorting: false }),
] as any;
