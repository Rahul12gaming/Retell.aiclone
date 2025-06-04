"use client";

import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  BackgroundVariant,
  useReactFlow,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeSidebar from "../component/sidebars/NodeSidebar";
import { ConversationNode } from "../component/nodes/ConversationNode";
import EndCall from "../component/nodes/EndCall";
import TransferCall from "../component/nodes/TransferCall";
import PressDigit from "../component/nodes/PressDigit";
import NodeSettingsSidebar from "../component/sidebars/CallConversationSetting";
import PageHeader from "../component/header/Header";

const nodeTypes = {
  Conversation: ConversationNode,
  EndCall: EndCall,
  TransferCall: TransferCall,
  PressDigit: PressDigit,
};

const Editor = () => {

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "Conversation",
      position: { x: 250, y: 150 },
      data: { label: "Conversation" }, // You can access this via props inside ConversationNode
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //generate unique id for each  node
  const generateUniqueId = () => {
    const existingIds = new Set([
      ...nodes
        .flatMap((node) => [parseInt(node.id, 10), parseInt(node.parentID, 10)])
        .filter(Boolean),
      ...edges
        .flatMap((edge) => [
          parseInt(edge.source, 10),
          parseInt(edge.target, 10),
        ])
        .filter(Boolean),
    ]);

    let newId = 1; // Start from 1

    while (existingIds.has(newId)) {
      newId++; // Find the next available ID
    }

    return `${newId}`; // Return as a string
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (typeof type === "undefined" || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: generateUniqueId(),
        type: type.label,
        position,
        data: {
          label: type.label,
        },
      };


      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [reactFlowInstance]
  );


  const handleRemoveNode = (id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };
  return (
    <>
      <PageHeader />

      <div className="flex w-full h-screen">
        <NodeSidebar />

        <div className="flex-1 bg-[#f2f2f2] relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data, // ✅ preserve existing data like label
                onRemoveNode: handleRemoveNode,
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Background
              variant={BackgroundVariant.Dots}
              color="rgba(0, 0, 0, 0.2)" // Light, faded dots for a premium look
              gap={30}
              size={2} // Slightly larger dots for a polished effect
            />
          </ReactFlow>
        </div>

        <NodeSettingsSidebar />
      </div>
    </>
  );
};

export default Editor;
