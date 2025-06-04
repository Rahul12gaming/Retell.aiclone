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
import Editor from "./Editor";

const nodeTypes = {
  Conversation: ConversationNode,
  EndCall: EndCall,
  TransferCall: TransferCall,
  PressDigit: PressDigit,
};

const Page = () => {
  const reactFlowWrapper = useRef(null);

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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (typeof type === "undefined" || !type) return;

      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      const newNode = {
        id: Date.now(),
        type: type.label,
        position,
        data:{
          label:type.label
        }
      };

      console.log(newNode, "New Node");

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [reactFlowInstance]
  );

  console.log(nodes, "nodes");

  const handleRemoveNode = (id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };
  return (
    <>
     <ReactFlowProvider>
      <Editor/>
     </ReactFlowProvider>
    </>
  );
};

export default Page;
