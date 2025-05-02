import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  StartNode,
  EndNode,
  ConditionNode,
  InputNode,
  OutputNode,
} from './CustomNodes';

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  decision: ConditionNode,
  input: InputNode,
  output: OutputNode,
};

let id = 0;
const getId = () => `node_${id++}`;

const createNode = (
  type: keyof typeof nodeTypes,
  x = Math.random() * 300,
  y = Math.random() * 300,
  data: any = {}
): Node => ({
  id: getId(),
  type,
  position: { x, y },
  data: { label: type, ...data },
});

export default function FlowEditor() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'start', type: 'start', position: { x: 100, y: 100 }, data: {} },
    { id: 'end', type: 'end', position: { x: 500, y: 300 }, data: {} },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selected, setSelected] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleNodeEdit = (id: string, changes: any) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...changes, onEdit: handleNodeEdit } } : n
      )
    );
  };

  const addCustomNode = (type: keyof typeof nodeTypes) => {
    const data = { onEdit: handleNodeEdit };
    const newNode = createNode(type, undefined, undefined, data);
    setNodes((nds) => [...nds, newNode]);
  };

  const onSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelected({ nodes, edges });
    },
    []
  );

  const deleteSelected = useCallback(() => {
    setNodes((nds) =>
      nds.filter(
        (n) =>
          !selected.nodes.some((s) => s.id === n.id) &&
          !['start', 'end'].includes(n.type || '')
      )
    );
    setEdges((eds) => eds.filter((e) => !selected.edges.some((s) => s.id === e.id)));
    setSelected({ nodes: [], edges: [] });
  }, [selected]);

  const exportToJson = () => {
    const output = {
      nodes: nodes.map(({ id, type, position, data }) => ({
        id,
        type,
        position,
        data,
      })),
      edges: edges.map(({ id, source, target, sourceHandle, targetHandle }) => ({
        id,
        source,
        target,
        sourceHandle,
        targetHandle,
      })),
    };
    setJsonOutput(JSON.stringify(output, null, 2));
  };

  const importFromJson = () => {
    try {
      const parsed = JSON.parse(prompt('Yüklemek istediğiniz JSON\'u girin:') || '');
      const importedNodes: Node[] = parsed.nodes.map((n: Node) => ({
        ...n,
        data: { ...n.data, onEdit: handleNodeEdit },
      }));
      const importedEdges: Edge[] = parsed.edges;

      // Başla ve Bitir düğümlerini iki kere eklememek için filtrele
      const filteredNodes = importedNodes.filter(n => !['start', 'end'].includes(n.id));
      const fixedNodes = [
        { id: 'start', type: 'start', position: { x: 100, y: 100 }, data: {} },
        { id: 'end', type: 'end', position: { x: 500, y: 300 }, data: {} },
        ...filteredNodes,
      ];

      setNodes(fixedNodes);
      setEdges(importedEdges);
    } catch (err) {
      alert('Geçersiz JSON!');
    }
  };

  // DELETE tuşu ile silme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        deleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', gap: 8 }}>
        <button onClick={() => addCustomNode('input')}>+ Input</button>
        <button onClick={() => addCustomNode('decision')}>+ Koşul</button>
        <button onClick={() => addCustomNode('output')}>+ Output</button>
        <button onClick={exportToJson} style={{ backgroundColor: '#007acc', color: 'white' }}>
          JSON Al
        </button>
        <button onClick={importFromJson} style={{ backgroundColor: '#009e60', color: 'white' }}>
          JSON Yükle
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {jsonOutput && (
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          background: 'white',
          padding: 10,
          border: '1px solid #ccc',
          width: 400,
          height: 300,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 12,
          zIndex: 10,
        }}>
          <strong>Akış JSON:</strong>
          <pre>{jsonOutput}</pre>
        </div>
      )}
    </div>
  );
}
