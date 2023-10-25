'use client';

import { ColumnType } from '@/constants/column';
import { instance } from '@/utils/woxios';
import { Table } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';

// TODO : td 태그를 다 갖고 있는 형태가 필요할 듯 하다.
//! readonly -> non-onchange type -> input 종류

export const EditTextCell = ({
  getValue,
  index,
  id,
  table,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table<ColumnType>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    <td key={index + id}>
      <input
        readOnly={!visible}
        ref={inputRef}
        className="adsInput"
        value={value}
        style={visible ? { backgroundColor: '#eee' } : {}}
        onFocus={e => {
          console.log(e.target.className);
          // e.target.className = 'adsInput focus';
        }}
        onBlur={e => {
          visible && setVisible(pre => !pre);
          table.options.meta?.updateData(index, id, value);
        }}
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
        onChange={e => {
          setValue(e.target.value);
        }}
        onKeyDown={e => {
          e.key === 'Enter' && setVisible(pre => !pre);
        }}
        {...props}
      />
    </td>
  );
};

export const EditDateCell = ({
  getValue,
  index,
  id,
  table,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table<ColumnType>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    <td key={index + id}>
      <input
        style={visible ? { backgroundColor: '#eee' } : {}}
        readOnly={!visible}
        ref={inputRef}
        type="date"
        className="adsInput"
        value={value}
        onBlur={e => {
          visible && setVisible(pre => !pre);
        }}
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
        onChange={e => {
          setValue(e.target.value);
        }}
        onKeyDown={e => {
          e.key === 'Enter' && setVisible(pre => !pre);
        }}
      />
    </td>
    // </td>
  );
};

export const EditSelectCell = ({
  getValue,
  index,
  id,
  table,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table<ColumnType>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  // const location = instance.get('/admin/local', { params: { type: '서울' }, cache: 'force-cache' }).then()
  return (
    <td
      key={index + id}
      // className="w-full h-full"
      onDoubleClick={() => {
        setVisible(pre => !pre);
      }}
    >
      {!visible && value}
      {visible && (
        <select
          className="adsInput"
          name=""
          id=""
          onKeyDown={e => {
            e.key === 'Enter' && setVisible(pre => !pre);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          {}
        </select>
      )}
    </td>
  );
};

export const EditImgCell = ({
  getValue,
  index,
  id,
  table,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table<ColumnType>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    <>
      <td
        key={index + id}
        // className="w-full h-full"
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
      >
        {!visible && value}
        {visible && (
          <input
            readOnly={!visible}
            ref={inputRef}
            type="file"
            className="adsInput"
            accept="image/gif, image/jpeg, image/png, image/webp, image/avif"
            onChange={e => {
              if (e.target.files === null) {
                alert('이미지만 가능합니다.');
              } else {
                console.log(e?.target?.files[0]);
                setValue(e?.target?.files[0]?.name as string);
              }
            }}
            onKeyDown={e => {
              e.key === 'Enter' && setVisible(pre => !pre);
            }}
          />
        )}
      </td>
    </>
  );
};

//! 현재 필요한 것 : 수정 불가 셀, 수정 가능 셀 (text, select, img, date)
