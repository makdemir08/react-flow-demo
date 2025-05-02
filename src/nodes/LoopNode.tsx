import React from 'react';
import { Handle, Position } from 'reactflow';

export const LoopNode = ({ data }: any) => {
  return (
    <div style={{ padding: 10, border: '2px dashed purple', borderRadius: 8, backgroundColor: '#f3e6ff' }}>
      <Handle type="target" position={Position.Top} />
      <div><strong>Döngü</strong></div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};