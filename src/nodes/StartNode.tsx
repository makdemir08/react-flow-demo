import React from 'react';
import { Handle, Position } from 'reactflow';

export const StartNode = () => {
  return (
    <div style={{ padding: 10, border: '2px solid green', borderRadius: 8, backgroundColor: '#e6ffe6' }}>
      <div><strong>Başla</strong></div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};