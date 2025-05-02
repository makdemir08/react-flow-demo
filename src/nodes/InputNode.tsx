import React from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ data, id }: any) => {
  const onChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    data.onEdit(id, { [field]: e.target.value });
  };

  return (
    <div style={{ padding: 10, border: '2px solid #007acc', borderRadius: 8, backgroundColor: '#e6f2ff', minWidth: 160 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ fontWeight: 'bold' }}>Input</div>
      <input
        placeholder="Değişken"
        value={data.variableName}
        onChange={onChange('variableName')}
        style={{ width: '90%', marginBottom: 4 }}
      />
      <input
        placeholder="Değer"
        value={data.value}
        onChange={onChange('value')}
        style={{ width: '90%' }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
