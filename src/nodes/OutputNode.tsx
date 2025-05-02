import React from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ data, id }: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.onEdit(id, { message: e.target.value });
  };
  return (
    <div style={{ padding: 10, border: '2px solid orange', borderRadius: 8, backgroundColor: '#fff4e6' }}>
      <Handle type="target" position={Position.Top} />
      <div><strong>Output:</strong></div>
      <input value={data.message} onChange={onChange} placeholder="Mesaj" />
    </div>
  );
};