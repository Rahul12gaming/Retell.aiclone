import { memo, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { Handle } from "reactflow";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";
import { TbTransitionBottom } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import "reactflow/dist/style.css";
import { BiMath } from "react-icons/bi";
import { TbPrompt } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteNode from "../modal/DeleteNode";

export const ConversationNode = memo(({ data, id }) => {
  
  const [isDelete,setIsDelete]=useState(false);
  const [conditions, setConditions] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [activeTab, setActiveTab] = useState("Prompt");
  const [selected, setSelected] = useState(false);
  const [isEditHeading, setIsEditHeading] = useState(false);
  const [headingText, setHeadingText] = useState("Conversation");
  const [transitions, setTransitions] = useState([]);
  const [editingEquationId, setEditingEquationId] = useState(null);
  const [editingPromptId, setEditingPromptId] = useState(null);

  const handleAddTransition = (type) => {
    const newItem = {
      id: Date.now(),
      type,
      value: `${type} condition here...`,
      variable: "",
      operator: "=",
    };
    setTransitions([...transitions, newItem]);
  };

  const handleDeleteTransition = (id) => {
    setTransitions(transitions.filter((t) => t.id !== id));
  };

  const handleAddCondition = () => {
    const updated = transitions.map((t) =>
      t.id === editingEquationId
        ? { ...t, variable: "", operator: "=", value: "" }
        : t
    );
    setTransitions(updated);
    setConditions((prev) => [
      ...prev,
      { id: Date.now(), variable: "", operator: "=", value: "" },
    ]);
  };

  const handleConditionChange = (id, key, val) => {
    setConditions((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [key]: val } : c
      )
    );
    const updated = transitions.map((t) =>
      t.id === editingEquationId ? { ...t, [key]: val } : t
    );
    setTransitions(updated);
  };

  return (
    <>
      <DeleteNode open={isDelete} setOpen={setIsDelete} onDelete={()=>{
        data.onRemoveNode(id)
      }}/>
    
    <div
      className={`relative bg-[#fdf2fc] p-2 rounded-md shadow-sm min-w-[300px] ${
        selected ? "border-2 border-blue-500" : ""
      }`}
      onClick={() => setSelected(!selected)}
    >
      {/* Header */}
      <div className="px-3 py-2 bg-[#fdf2fc]">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <FaHashtag className="text-pink-800" size={15} />
            {isEditHeading ? (
              <input
                type="text"
                className="border px-2 rounded-md outline-none text-sm"
                value={headingText}
                onChange={(e) => setHeadingText(e.target.value)}
                onBlur={() => setIsEditHeading(false)}
                autoFocus
              />
            ) : (
              <h4
                className="font-medium text-pink-800 cursor-pointer"
                onClick={() => setIsEditHeading(true)}
              >
                {headingText}
              </h4>
            )}
            <button onClick={() => setIsEditHeading((prev) => !prev)}>
              <CiEdit className="text-pink-800" />
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <CiMenuKebab size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <IoDuplicateOutline /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setIsDelete(true)} className="text-red-500">
                <MdOutlineDeleteOutline className="text-red-500" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabs */}
        {selected && (
          <div className="mt-4 flex w-auto gap-1.5 rounded-[10px] bg-gray-100 px-1 py-1">
            <button
              className={`px-3 py-1.5 text-xs rounded-[8px] font-medium ${
                activeTab === "Prompt"
                  ? "bg-white text-pink-800 shadow-sm"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Prompt")}
            >
              Prompt
            </button>
            <button
              className={`px-3 py-1.5 text-xs rounded-[8px] font-medium ${
                activeTab === "StaticSentence"
                  ? "bg-white text-pink-800 shadow-sm"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("StaticSentence")}
            >
              Static Sentence
            </button>
          </div>
        )}
      </div>

      {/* Node Body */}
      <div className="">
        <textarea
          rows={5}
          className="px-4 py-2 w-full resize-none bg-white border-none outline-none"
        ></textarea>
      </div>

      {/* Transitions */}
      <div className="bg-white px-3 py-4">
        <div className="flex justify-between text-gray-400 items-center">
          <div className="flex gap-2 items-center">
            <TbTransitionBottom />
            <p>Transitions</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoIosAdd size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAddTransition("Prompt")}>
                <TbPrompt /> Prompt
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddTransition("Equation")}>
                <BiMath /> Equation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {transitions.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 mt-4 relative flex items-center justify-between rounded-md bg-bg-weak-50 p-2 my-1 border"
            onClick={() => {
              if (item.type === "Equation") {
                setEditingEquationId(item.id);
                setShowPopover(true);
              } else if (item.type === "Prompt") {
                setEditingPromptId(item.id);
              }
            }}
          >
            {item.type === "Prompt" && editingPromptId === item.id ? (
              <textarea
                rows={2}
                className="resize-none border border-black text-center rounded-md outline-none w-full"
                value={item.value}
                autoFocus
                onChange={(e) => {
                  const updated = transitions.map((t) =>
                    t.id === item.id ? { ...t, value: e.target.value } : t
                  );
                  setTransitions(updated);
                }}
                onBlur={() => setEditingPromptId(null)}
              />
            ) : item.type === "Prompt" ? (
              <span className="text-sm">{item.value}</span>
            ) : (
              <span className="text-sm">
                {item.variable} {item.operator} {item.value}
              </span>
            )}

            <div className="flex gap-2 ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTransition(item.id);
                }}
                className="text-xs text-red-500"
              >
                <MdOutlineDeleteOutline />
              </button>
              <button className="text-xs text-blue-500">
                <CiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Equation Config */}
      {showPopover && (
        <Dialog open={showPopover} onOpenChange={setShowPopover}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Configure Conditions</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 text-sm items-center">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">All</SelectItem>
                  <SelectItem value="dark">Any</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-gray-500">
                Any of the following conditions match:
              </p>
            </div>

            {conditions.map((condition) => (
              <div key={condition.id} className="flex items-center gap-2 my-2">
                <Input
                  placeholder="{{Variable}}"
                  className="w-[150px]"
                  value={condition.variable}
                  onChange={(e) =>
                    handleConditionChange(
                      condition.id,
                      "variable",
                      e.target.value
                    )
                  }
                />

                <Select
                  value={condition.operator}
                  onValueChange={(val) =>
                    handleConditionChange(condition.id, "operator", val)
                  }
                >
                  <SelectTrigger className="w-[60px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="=">=</SelectItem>
                    <SelectItem value="!=">≠</SelectItem>
                    <SelectItem value=">">{">"}</SelectItem>
                    <SelectItem value="<">{"<"}</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Value"
                  className="w-[120px]"
                  value={condition.value}
                  onChange={(e) =>
                    handleConditionChange(condition.id, "value", e.target.value)
                  }
                />
              </div>
            ))}

            <div className="flex gap-2">
              <Button onClick={handleAddCondition}>Add Condition</Button>
              <Button variant={"outline"} onClick={() => setShowPopover(false)}>
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Handle type="target" position="left" style={{ background: "#d977aa" }} />
      <Handle
        type="source"
        position="right"
        style={{ background: "#d977aa" }}
      />
    </div>

  </>
  );
});
