'use client';

import { instance } from '@/utils/woxios';
import { useEffect, useRef, useState } from 'react';

// TODO : td 태그를 다 갖고 있는 형태가 필요할 듯 하다.
//! readonly -> non-onchange type -> input 종류

export const EditTextCell = ({ getValue }: { getValue: () => unknown }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  //! 호버와 클릭 비교

  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    <input
      readOnly={!visible}
      ref={inputRef}
      className="adsInput"
      value={value}
      style={visible ? { backgroundColor: '#eee' } : {}}
      onFocus={e => {
        console.log(e.target.className);
        e.target.className = 'adsInput focus';
      }}
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
  );
};

export const EditDateCell = ({ getValue }: { getValue: () => unknown }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    <>
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
    </>
    // </td>
  );
};

export const EditSelectCell = ({ getValue }: { getValue: () => unknown }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  //! 호버와 클릭 비교

  // const location = instance.get('/admin/local', { params: { type: '서울' }, cache: 'force-cache' }).then()

  return (
    <div
      className="w-full h-full"
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
    </div>
  );
};

export const EditImgCell = ({ getValue }: { getValue: () => unknown }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  //! 호버와 클릭 비교

  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    <>
      <div
        className="w-full h-full"
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

//! 현재 필요한 것 : 수정 불가 셀, 수정 가능 셀 (text, select, img, date)
