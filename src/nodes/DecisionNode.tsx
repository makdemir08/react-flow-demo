import React from 'react';
import { Handle, Position } from 'reactflow';

export const DecisionNode = ({ data, id }: any) => {
  const onChange = (side: 'left' | 'right') => (e: React.ChangeEvent<HTMLInputElement>) => {
    data.onEdit(id, { [side]: e.target.value });
  };

  return (
    <div style={{ padding: 10, border: '2px solid #ff6600', borderRadius: 8, backgroundColor: '#fff3e0' }}>
      <Handle type="target" position={Position.Top} />
      <div><strong>Koşul:</strong></div>
      <input value={data.left} onChange={onChange('left')} placeholder="Sol" />
      <span> &gt; </span>
      <input value={data.right} onChange={onChange('right')} placeholder="Sağ" />
      <Handle type="source" position={Position.Bottom} id="true" style={{ background: 'green', left: '30%' }} />
      <Handle type="source" position={Position.Bottom} id="false" style={{ background: 'red', left: '70%' }} />
    </div>
  );
};