import React from 'react';

interface NodeFormPanelProps {
  selectedNode: any;
  updateNodeData: (id: string, newData: any) => void;
}

export default function NodeFormPanel({ selectedNode, updateNodeData }: NodeFormPanelProps) {
  if (!selectedNode) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateNodeData(selectedNode.id, {
      ...selectedNode.data,
      [name]: value,
    });
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, width: 250, padding: 10, background: '#f3f3f3', border: '1px solid #ccc', borderRadius: 8 }}>
      <h4>{selectedNode.data.label}</h4>
      {selectedNode.data.label === 'Koşul (if)' && (
        <>
          <label>Karşılaştırma:</label>
          <input name="condition" placeholder="örn: x > 5" value={selectedNode.data.condition || ''} onChange={handleInputChange} />
        </>
      )}
      {selectedNode.data.label === 'Döngü (loop)' && (
        <>
          <label>Döngü Koşulu:</label>
          <input name="loopCondition" placeholder="örn: i < 10" value={selectedNode.data.loopCondition || ''} onChange={handleInputChange} />
        </>
      )}
    </div>
  );
}
