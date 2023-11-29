'use client';

import { instance } from '@/utils/woxios';
import { Table } from '@tanstack/react-table';
import { HTMLProps, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Spacing } from './common/spacing';

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
  table: Table</* ColumnType */ any>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    visible && inputRef?.current?.focus();
    setValue(getValue() as string);
  }, [visible, getValue()]);

  return (
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
      }}
      onDoubleClick={() => {
        setVisible(pre => !pre);
      }}
      onChange={e => {
        table.options.meta?.updateData(index, id, e.target.value);
        setValue(e.target.value);
      }}
      onKeyDown={e => {
        e.key === 'Enter' && setVisible(pre => !pre);
      }}
      {...props}
    />
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
  table: Table</* ColumnType */ any>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    visible && inputRef?.current?.focus();
    setValue(getValue() as string);
  }, [visible, getValue()]);

  return (
    <input
      style={visible ? { backgroundColor: '#eee' } : {}}
      readOnly={!visible}
      ref={inputRef}
      type="date"
      className="adsInput"
      value={value}
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
    />
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
  table: any /* Table<ColumnType | PhoneColumnType>; */;
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
      onDoubleClick={() => {
        setVisible(pre => !pre);
      }}
    >
      <select
        ref={selectRef}
        className="adsInput"
        disabled={!visible}
        defaultValue={getValue() as string}
        onChange={e => {
          table.options.meta?.updateData(index, id, e.target.value);
        }}
        onKeyDown={e => {
          e.key === 'Enter' && setVisible(pre => !pre);
        }}
        onBlur={e => {
          visible && setVisible(pre => !pre);
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
  table: Table</* ColumnType */ any>;
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as any);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<any>(null);

  const encodeFileToBase64 = (fileBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    //! 이미지  규격용
    // const img = new Image();
    // const _URL = window.URL || window.webkitURL;
    // img.src = _URL.createObjectURL(fileBlob);
    // img.onload = function () {
    //   if (img.width === 300 || img.height === 500) {
    //     alert('최소 이미지 사이즈(가로 300px, 세로 500px)에 맞춰서 올려주세요.');
    //     return;
    //   }
    //   return;
    // };

    return new Promise((resolve: any) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  useLayoutEffect(() => {
    visible && inputRef?.current?.focus();
    setValue(getValue() as string);
  }, [visible, getValue()]);

  return (
    <>
      <input
        type="text"
        value={!visible && typeof value === 'string' ? value : value?.name}
        className="adsInput"
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
        readOnly
      />
      {visible && (
        <div>
          <div
            className="top-wrapper fixed bg-black opacity-25 top-0 left-0 right-0 bottom-0"
            onClick={() => {
              setValue(null);
              setVisible(pre => !pre);
            }}
          ></div>
          <div className="top-area fixed bg-white rounded-[10px] w-[500px] h-[600px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-40 flex flex-col justify-between items-center overflow-y-auto">
            {value && imageSrc ? (
              <img src={imageSrc} alt="사진 이미지" className="w-[300px]" />
            ) : (
              <img src={value} className="w-[300px]" />
            )}
            <Spacing size={30} />
            <div className="border-[1px] bg-gray-200">
              <input
                type="file"
                className="w-full"
                accept="image/gif, image/jpeg, image/png, image/webp, image/avif"
                onChange={e => {
                  setValue(e.target.files === null ? getValue() : e?.target?.files[0]);
                  e.target.files && encodeFileToBase64(e?.target?.files[0]);
                }}
              />
            </div>
            <Spacing size={30} />
            <button
              className="bg-main w-full px-[10px] py-[5px] rounded-[8px] font-semibold text-white text-[18px]"
              onClick={() => {
                table.options.meta?.updateData(index, id, value);
                setVisible(pre => !pre);
              }}
            >
              입력하기
            </button>
          </div>
        </div>
      )}
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

export const UpdateImgCell = ({
  getValue,
  index,
  id,
  table,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table</* ColumnType */ any>;
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
      <input
        readOnly={!visible}
        ref={inputRef}
        type="file"
        className="adsInput"
        accept="image/gif, image/jpeg, image/png, image/webp, image/avif"
        onBlur={e => {
          visible && setVisible(pre => !pre);
          !visible && table.options.meta?.updateData(index, id, e.target.files === null ? '' : e?.target?.files[0]);
        }}
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
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
    </>
  );
};

export const EditAreaCell = ({
  getValue,
  index,
  id,
  table,
  ...props
}: {
  getValue: () => unknown;
  index: number;
  id: string;
  table: Table</* ColumnType */ any>;
}) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(getValue() as string);

  return (
    <>
      <textarea
        readOnly
        className="adsInput h-[20px] overflow-y-auto"
        defaultValue={getValue() as string}
        // value={text}
        onBlur={e => {
          // table.options.meta?.updateData(index, id, e.target.value);
        }}
        onDoubleClick={() => {
          setVisible(pre => !pre);
        }}
      />
      {visible && (
        <div>
          <div
            className="top-wrapper fixed bg-black opacity-25 top-0 left-0 right-0 bottom-0"
            onClick={() => setVisible(pre => !pre)}
          ></div>
          <div className="top-area fixed bg-white rounded-[10px] w-[500px] h-[550px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-40 flex flex-col">
            <textarea
              name=""
              id=""
              defaultValue={getValue() as string}
              className="w-full h-full p-[30px] bg-gray-100"
              onChange={e => setText(`${e.target.value}`)}
            />
            <Spacing size={30} />
            <button
              className="bg-main px-[10px] py-[5px] rounded-[8px] font-semibold text-white text-[18px]"
              onClick={() => {
                table.options.meta?.updateData(index, id, text);
                console.log(text);
                setVisible(pre => !pre);
              }}
            >
              입력하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

//! 현재 필요한 것 : 수정 불가 셀, 수정 가능 셀 (text, select, img, date)
