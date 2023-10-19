'use client';

import { useEffect, useRef, useState } from 'react';

export const EditTextCell = ({ getValue }: { getValue: () => unknown }) => {
  const [active, setActive] = useState(0);
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
  const [active, setActive] = useState(0);
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

  return (
    <td
      className={active ? 'active' : ''}
      onClick={() => {
        setActive(1);
      }}
    >
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
    </td>
  );
};

export const EditImgCell = ({ getValue }: { getValue: () => unknown }) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  //! 호버와 클릭 비교

  return (
    <td
      className={active ? 'active' : ''}
      onClick={() => {
        setActive(1);
      }}
    >
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
    </td>
  );
};
