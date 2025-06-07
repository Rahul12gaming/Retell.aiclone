"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
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
import { downloadFlowAsJSON, readFlowJSONFile } from "../utils/EditorUtils";
import GlobalSettingsSidebar from "../component/sidebars/GlobalSetting";

const nodeTypes = {
  Conversation: ConversationNode,
  EndCall: EndCall,
  TransferCall: TransferCall,
  PressDigit: PressDigit,
};

const flowKey = "my-flow-key";

const Editor = () => {

  const [selectedNode,setSelectedNode]=useState(null)
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // handle onConnect nodes
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );

  //handle node drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // handle ondrop nodes
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
        id: `node-${Date.now()}`,
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

  //handle remove nodes
  const handleRemoveNode = (id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

const handleExport = () => {
  downloadFlowAsJSON(nodes, edges);
};

const handleImport = (event) => {
  const file = event.target.files[0];
  if (file) {
    readFlowJSONFile(file, ({ nodes, edges }) => {
      setNodes(nodes);
      setEdges(edges);
    });
  }
};

  const onNodeClick = (_, node) => {
    
    setSelectedNode(node.id)
  }
  // Load saved flow on mount
  useEffect(() => {
    try {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow && Array.isArray(flow.nodes) && Array.isArray(flow.edges)) {
        setNodes(flow.nodes);
        setEdges(flow.edges);
      }
    } catch (error) {
      console.error("Failed to load flow from localStorage:", error);
    }
  }, [setNodes, setEdges]);

  // Save flow whenever nodes or edges change
  useEffect(() => {
    const flow = { nodes, edges };
    try {
      localStorage.setItem(flowKey, JSON.stringify(flow));
    } catch (error) {
      console.error("Failed to save flow to localStorage:", error);
    }
  }, [nodes, edges]);

  return (
    <>
      <PageHeader downloadJson={handleExport} importJson={handleImport}/>

      <div className="flex w-full h-screen">
        <NodeSidebar />

        <div className="flex-1 bg-[#f2f2f2] relative" ref={reactFlowWrapper}>
          <ReactFlow
          onNodeClick={onNodeClick}
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data, // ✅ preserve existing data like label
                onRemoveNode: handleRemoveNode,
              },
            }))}
            edges={edges}
            onNodesChange={(changes) => {
              onNodesChange(changes);
            }}
            onEdgesChange={(changes) => {
              onEdgesChange(changes);
            }}
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
          {!selectedNode? <GlobalSettingsSidebar/>
        :<NodeSettingsSidebar />}
      </div>
    </>
  );
};

export default Editor;
