import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', { header: 'ID', size: 80 }),
  columnHelper.accessor('create_at', { header: '등록일', size: 80 }),
  columnHelper.accessor('title', { header: '제목', size: 80 }),
  columnHelper.accessor('tick', { header: '클릭수', size: 80 }),
  columnHelper.accessor('start_date', { header: '시작일', size: 80 }),
  columnHelper.accessor('end_date', { header: '종료일', size: 80 }),
  columnHelper.accessor('last_edit_date', { header: '페이지', size: 80 }),
  columnHelper.accessor('city', { header: '위치', size: 80 }),
  columnHelper.accessor('rate', { header: '가중치', size: 80 }),
  columnHelper.accessor('image', { header: '이미지', size: 80 }),
  columnHelper.accessor('link', { header: '링크', size: 80 }),
  columnHelper.accessor('active', { header: '운영', size: 80 }),
  columnHelper.accessor('timezone', { header: '지역', size: 80 }),
  columnHelper.accessor('page', { header: '번호', size: 80 }),
] as any;
