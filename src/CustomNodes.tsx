import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Başla node'u
export const StartNode = () => (
  <div style={{ padding: 10, background: '#4caf50', color: 'white', borderRadius: 8 }}>
    Başla
    <Handle type="source" position={Position.Bottom} />
  </div>
);

// Bitir node'u
export const EndNode = () => (
  <div style={{ padding: 10, background: '#f44336', color: 'white', borderRadius: 8 }}>
    Bitir
    <Handle type="target" position={Position.Top} />
  </div>
);

// Input node'u
export const InputNode = ({ data, id }: NodeProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      data.onEdit(id, {
        [e.target.name]: e.target.value,
      });
    };
  
    return (
      <div style={{ padding: 10}}>
        <input
          name="variableName"
          placeholder="Değişken Adı"
          value={data.variableName || ''}
          onChange={handleChange}
          style={{ padding: 4 }}
        />
        <input
          name="value"
          placeholder="Değer"
          value={data.value || ''}
          onChange={handleChange}
          style={{ padding: 4 }}
        />
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    );
  };

// Koşul node'u
export const ConditionNode = ({ data, id }: NodeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    data.onEdit(id, {
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ padding: 10, background: '#ff9800', borderRadius: 8, color: 'white' }}>
      <input
        name="left"
        placeholder="Sol operand (Değişken Adı)"
        value={data.left || ''}
        onChange={handleChange}
        style={{ padding: 4 }}
      />
      <select name="operator" value={data.operator || '>'} onChange={handleChange}>
        <option value=">">b</option>
        <option value="<">{'<'}</option>
        <option value="==">==</option>
        <option value="!=">!=</option>
        <option value=">=">{'>='}</option>
        <option value="<=">{'<='}</option>
      </select>
      <input
        name="right"
        placeholder="Sağ operand (Değişken Adı)"
        value={data.right || ''}
        onChange={handleChange}
        style={{ padding: 4 }}
      />
      <Handle type="target" position={Position.Top} />
      {/* Doğru çıkış (Yeşil) */}
      <Handle type="source" id="true" position={Position.Bottom} style={{ left: '30%',background: 'green' }} />
      {/* Yanlış çıkış (Kırmızı) */}
      <Handle type="source" id="false" position={Position.Bottom} style={{ left: '70%',background: 'red' }} />
    
    </div>
  );
};

// Output node'u
export const OutputNode = ({ data, id }: NodeProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      data.onEdit(id, {
        [e.target.name]: e.target.value,
      });
    };
  
    return (
      <div style={{ padding: 10, background: '#673ab7', color: 'white', borderRadius: 8 }}>
        <input
          name="message"
          placeholder="Mesaj"
          value={data.message || ''}
          onChange={handleChange}
          style={{ padding: 4 }}
        />
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    );
  };
