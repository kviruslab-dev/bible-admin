'use client';
import {
  EditAreaCell,
  EditDateCell,
  EditImgCell,
  EditSelectCell,
  EditTextCell,
  IndeterminateCheckbox,
} from '@/components/edit-cell';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CITY, GU } from './routes';
import toast from 'react-hot-toast';

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
  city: string;
  edit: string;
}

export interface ProductColumnType {
  id: string;
  create_at: string;
  title: string;
  tick: number;
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

export const columns: Array<ColumnDef<ColumnType>> = [
  {
    accessorKey: 'select',
    id: 'select',
    enableSorting: false,
    enableColumnFilter: false,
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: 'id', header: 'ID', maxSize: 70, enableColumnFilter: false, minSize: 70 },
  { accessorKey: 'create_at', header: '등록일' },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  { accessorKey: 'tick', header: '클릭수', enableColumnFilter: false },
  {
    accessorKey: 'start_date',
    header: '시작일',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditDateCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'end_date',
    header: '종료일',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditDateCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  { accessorKey: 'page', header: '페이지', enableColumnFilter: false },
  {
    accessorKey: 'location',
    header: '광고위치',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} {...{ type: 'number' }} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'rate',
    header: '가중치',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} {...{ type: 'number' }} />
    ),
    footer: props => props.column.id,
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
    footer: props => props.column.id,
  },
  {
    accessorKey: 'link',
    header: '링크',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
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
    footer: props => props.column.id,
  },
  {
    accessorKey: 'city',
    header: '지역(구)',
    cell: ({ getValue, row: { index, original }, column: { id }, table }) => (
      <EditSelectCell key={index + id} getValue={getValue} index={index} id={id} table={table} selectData={GU} />
    ),
    footer: props => props.column.id,
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
          onClick={async () => {
            const formData = new FormData();
            formData.append('id', row.original.id.toString());
            formData.append('upload', row.original.image);
            formData.append('title', row.original.title);
            formData.append('start_date', row.original.start_date);
            formData.append('end_date', row.original.end_date);
            formData.append('link', row.original.link);
            formData.append('rate', row.original.rate.toString());
            formData.append('location', row.original.location.toString());
            formData.append('city', row.original.city);
            formData.append('active', row.original.active === '운영함' ? '1' : '0');

            const result =
              row.original.id.toString() === ''
                ? await fetch('https://spare25backend.givemeprice.co.kr/admin/ad', {
                    method: 'POST',
                    body: formData,
                  })
                    .then(() => toast.success('성공하였습니다.'))
                    .catch(() => toast.error('실패하였습니다.'))
                : await fetch('https://spare25backend.givemeprice.co.kr/admin/ad', {
                    method: 'PATCH',
                    body: formData,
                  })
                    .then(() => toast.success('성공하였습니다.'))
                    .catch(() => toast.error('실패하였습니다.'));
            result && window.location.reload();
          }}
          className="absBtn"
        >
          저장
        </button>
      );
    },
    footer: props => props.column.id,
  },
];

export const productColumn: Array<ColumnDef<ProductColumnType>> = [
  {
    accessorKey: 'select',
    id: 'select',
    enableSorting: false,
    enableColumnFilter: false,
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: 'id', header: 'ID', enableColumnFilter: false, minSize: 70 },
  { accessorKey: 'create_at', header: '등록일' },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  { accessorKey: 'tick', header: '클릭수', enableColumnFilter: false },
  {
    accessorKey: 'gubun',
    header: '구분',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'money',
    header: '금액',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'star',
    header: '별점',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'dc',
    header: '할인율',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'sequence',
    header: '순서',
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
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
    footer: props => props.column.id,
  },
  {
    accessorKey: 'link',
    header: '링크',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'active',
    header: '운영',
    enableSorting: false,
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
    footer: props => props.column.id,
  },
  {
    accessorKey: 'edit',
    header: '수정',
    minSize: 70,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column, table }) => {
      return (
        <button
          onClick={async () => {
            console.log(row.original);
            const formData = new FormData();
            formData.append('id', row.original.id.toString());
            formData.append('upload', row.original.image);
            formData.append('title', row.original.title);
            formData.append('gubun', row.original.gubun);
            formData.append('money', row.original.money);
            formData.append('link', row.original.link);
            formData.append('sequence', row.original.sequence.toString());
            formData.append('star', row.original.star.toString());
            formData.append('dc', row.original.dc);
            formData.append('active', row.original.active === '운영함' ? '1' : '0');

            const result =
              row.original.id.toString() === ''
                ? await fetch('https://spare25backend.givemeprice.co.kr/admin/pd', {
                    method: 'POST',
                    body: formData,
                  })
                    .then(() => toast.success('성공하였습니다.'))
                    .catch(() => toast.error('실패하였습니다.'))
                : await fetch('https://spare25backend.givemeprice.co.kr/admin/pd', {
                    method: 'PATCH',
                    body: formData,
                  })
                    .then(() => toast.success('성공하였습니다.'))
                    .catch(() => toast.error('실패하였습니다.'));
          }}
          className="absBtn"
        >
          저장
        </button>
      );
    },
  },
];
export interface DonateColumnType {
  id: string;
  create_at: string;
  title: string;
  image: string;
  link: string;
  type: string;
}
export const donateColumn: Array<ColumnDef<DonateColumnType>> = [
  {
    accessorKey: 'select',
    id: 'select',
    enableSorting: false,
    enableColumnFilter: false,
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: 'id', header: 'ID', enableColumnFilter: false, minSize: 70 },
  { accessorKey: 'create_at', header: '등록일' },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'image',
    header: '이미지',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditImgCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'link',
    header: '링크',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'type',
    header: '타입',
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'edit',
    header: '수정',
    minSize: 70,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ getValue, row, column, table }) => {
      return (
        <button
          onClick={async () => {
            console.log(row.original);
            const formData = new FormData();
            formData.append('id', row.original.id.toString());
            formData.append('upload', row.original.image);
            formData.append('title', row.original.title);
            formData.append('link', row.original.link);
            formData.append('type', row.original.type);

            const result =
              row.original.id.toString() === ''
                ? await fetch('https://spare25backend.givemeprice.co.kr/admin/bd', {
                    method: 'POST',
                    body: formData,
                  })
                    .then(() => toast.success('성공하였습니다.'))
                    .catch(() => toast.error('실패하였습니다.'))
                : await fetch('https://spare25backend.givemeprice.co.kr/admin/bd', {
                    method: 'PATCH',
                    body: formData,
                  })
                    .then(() => toast.success('성공하였습니다.'))
                    .catch(() => toast.error('실패하였습니다.'));
          }}
          className="absBtn"
        >
          저장
        </button>
      );
    },
  },
];

export interface PhoneColumnType {
  id: number;
  name: string;
  phone: string;
  status: string;
  create_at: string;
  company: string;
  memo: string;
}

export const phoneColumn: Array<ColumnDef<PhoneColumnType>> = [
  {
    accessorKey: 'select',
    id: 'select',
    enableSorting: false,
    enableColumnFilter: false,
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: 'id', header: 'ID', enableSorting: true, enableColumnFilter: true },
  { accessorKey: 'name', header: '이름', enableSorting: true, enableColumnFilter: true },
  { accessorKey: 'phone', header: '핸드폰번호', enableSorting: true, enableColumnFilter: true },
  {
    accessorKey: 'company',
    header: '통신사',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditSelectCell
        key={index + id}
        getValue={getValue}
        index={index}
        id={id}
        table={table}
        selectData={['lg', 'kt', 'sk']}
      />
    ),
  },
  { accessorKey: 'create_at', header: '생성일', enableSorting: true, enableColumnFilter: true },
  {
    accessorKey: 'status',
    header: '상태',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditSelectCell
        key={index + id}
        getValue={getValue}
        index={index}
        id={id}
        table={table}
        selectData={['상담신청', '상담취소', '상담완료', '설치완료']}
      />
    ),
  },
  {
    accessorKey: 'memo',
    header: '상담메모',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditAreaCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
];

export interface TodayColumnType {
  select: boolean;
  id: number;
  active: number;
  image: string;
  today: string;
  content: string;
  title: string;
  song: string;
}

export const todayColumn: Array<ColumnDef<TodayColumnType>> = [
  {
    accessorKey: 'select',
    id: 'select',
    enableSorting: false,
    enableColumnFilter: false,
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: 'id', header: 'ID', enableSorting: true, enableColumnFilter: true },
  { accessorKey: 'active', header: '활성화', enableSorting: true, enableColumnFilter: true },
  {
    accessorKey: 'today',
    header: '날짜',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditDateCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'image',
    header: '이미지',
    enableSorting: false,
    enableColumnFilter: true,
    enableResizing: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditImgCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'content',
    header: '본문',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditAreaCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'title',
    header: '제목',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'song',
    header: 'url',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
];

export interface MalsumColumnType {
  today: string;
  id: number;
  title: string;
  yojul: string;
  content: string;
  bible: string;
  song: string;
  sungchal: string;
  kido: string;
}

export const malsumColumn: Array<ColumnDef<MalsumColumnType>> = [
  {
    accessorKey: 'select',
    id: 'select',
    enableSorting: false,
    enableColumnFilter: false,
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: 'id', header: 'ID', enableSorting: true, enableColumnFilter: true },
  {
    accessorKey: 'today',
    header: '날짜',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditDateCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'song',
    header: '찬송',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'bible',
    header: '성경',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'title',
    header: '제목',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditTextCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'yojul',
    header: '요절',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditAreaCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'sungchal',
    header: '성찰',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditAreaCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'kido',
    header: '기도',
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditAreaCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
  {
    accessorKey: 'content',
    header: '본문',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue, row: { index }, column: { id }, table }) => (
      <EditAreaCell key={index + id} getValue={getValue} index={index} id={id} table={table} />
    ),
  },
];
