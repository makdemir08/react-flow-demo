import React from 'react';
import { Handle, Position } from 'reactflow';

export const EndNode = () => {
  return (
    <div style={{ padding: 10, border: '2px solid red', borderRadius: 8, backgroundColor: '#ffe6e6' }}>
      <Handle type="target" position={Position.Top} />
      <div><strong>Bitir</strong></div>
    </div>
  );
};
