'use client';

import { useState } from 'react';

export const EditCell = ({ id, getValue }: { id: string; getValue: () => unknown }) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(getValue() as string);

  return (
    <td
      key={id}
      className={active ? 'active' : ''}
      onClick={() => {
        setActive(pre => !pre);
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
