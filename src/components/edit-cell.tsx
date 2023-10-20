'use client';

import { instance } from '@/utils/woxios';
import { useEffect, useRef, useState } from 'react';

export const EditTextCell = ({ getValue }: { getValue: () => unknown }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  //! 호버와 클릭 비교

  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    // <td
    //   className={active ? 'active' : ''}
    //   onClick={() => {
    //     setActive(1);
    //   }}
    // >
    <>
      {!visible && (
        <div
          onDoubleClick={() => {
            setVisible(pre => !pre);
          }}
        >
          {value}
        </div>
      )}
      {visible && (
        <input
          ref={inputRef}
          className="adsInput"
          value={value}
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
      )}
    </>
  );
};

export const EditDateCell = ({ getValue }: { getValue: () => unknown }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  //! 호버와 클릭 비교

  useEffect(() => {
    visible && inputRef?.current?.focus();
  }, [visible]);

  return (
    // <td
    //   className={active ? 'active' : ''}
    //   onClick={() => {
    //     setActive(1);
    //   }}
    // >
    <>
      <div
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
      >
        {!visible && value}
        {visible && (
          <input
            ref={inputRef}
            type="date"
            className="adsInput"
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            onKeyDown={e => {
              e.key === 'Enter' && setVisible(pre => !pre);
            }}
          />
        )}
      </div>
    </>
    // </td>
  );
};

export const EditSelectCell = ({ getValue }: { getValue: () => unknown }) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  //! 호버와 클릭 비교

  // const location = instance.get('/admin/local', { params: { type: '서울' }, cache: 'force-cache' }).then()

  return (
    <div
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
  const [active, setActive] = useState(0);
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
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
      >
        {!visible && value}
        {visible && (
          <input
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
