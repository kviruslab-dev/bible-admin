'use client';

import { ColumnType } from '@/constants/column';
import { instance } from '@/utils/woxios';
import { Table } from '@tanstack/react-table';
import { HTMLProps, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
  useLayoutEffect(() => {
    visible && inputRef?.current?.focus();
    setValue(getValue() as string);
  }, [visible, getValue()]);

  return (
    // <td >
    <input
      readOnly={!visible}
      ref={inputRef}
      className="adsInput"
      value={value}
      style={visible ? { backgroundColor: '#eee' } : {}}
      onFocus={e => {
        // e.target.className = 'adsInput focus';
      }}
      onBlur={e => {
        visible && setVisible(pre => !pre);
        table.options.meta?.updateData(index, id, e.target.value);
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
    // </td>
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
  useLayoutEffect(() => {
    visible && inputRef?.current?.focus();
    setValue(getValue() as string);
  }, [visible, getValue()]);

  return (
    // <td key={index + id}>
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
    // </td>
    // </td>
  );
};

export const EditSelectCell = ({
  getValue,
  index,
  id,
  table,
  selectData,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table<ColumnType>;
  selectData: string[];
}) => {
  const [visible, setVisible] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    visible && selectRef?.current?.focus();
  }, [visible]);

  return (
    <div
      key={index + id}
      // onClick={() => { setVisible(pre => !pre) }}
      onDoubleClick={() => {
        setVisible(pre => !pre);
      }}
    >
      <select
        ref={selectRef}
        className="adsInput"
        disabled={!visible}
        onChange={e => {
          table.options.meta?.updateData(index, id, e.target.value);
        }}
        onKeyDown={e => {
          e.key === 'Enter' && setVisible(pre => !pre);
        }}
        onBlur={e => {
          visible && setVisible(pre => !pre);
          !visible && table.options.meta?.updateData(index, id, e.target.value);
        }}
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
      >
        {selectData.map((value, index) => (
          <option key={index + id + value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
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

  useLayoutEffect(() => {
    visible && inputRef?.current?.focus();
    setValue(getValue() as string);
  }, [visible, getValue()]);

  return (
    <>
      <div
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
      </div>
    </>
  );
};

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
}

//! 현재 필요한 것 : 수정 불가 셀, 수정 가능 셀 (text, select, img, date)
