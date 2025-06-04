import { memo, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { Handle } from "reactflow";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";
import { TbTransitionBottom } from "react-icons/tb";
import "reactflow/dist/style.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteNode from "../modal/DeleteNode";

const TransferCall = memo(({ data, id }) => {
  const [isDelete, setIsDelete] = useState(false);

  const [selected, setSelected] = useState(false);
  const [isEditHeading, setIsEditHeading] = useState(false);
  const [headingText, setHeadingText] = useState("Transfer Call");

  return (
    <>
    
    <DeleteNode open={isDelete} setOpen={setIsDelete} onDelete={()=>{
        data.onRemoveNode(id)
      }}/>
    
    <div
      className={`relative bg-[#fff7ed] p-2 rounded-md shadow-sm min-w-[300px] ${
        selected ? "border-2 border-blue-500" : ""
      }`}
      onClick={() => setSelected(!selected)}
    >
      {/* Header */}
      <div className="px-3 py-2 bg-[#fff7ed]">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <FaHashtag className="text-yellow-800" size={15} />
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
                className="font-medium text-yellow-800 cursor-pointer"
                onClick={() => setIsEditHeading(true)}
              >
                {headingText}
              </h4>
            )}
            <button onClick={() => setIsEditHeading((prev) => !prev)}>
              <CiEdit className="text-yellow-800" />
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
      </div>

      {/* Transitions */}
      <div className="bg-white px-3 py-4">
        <div className="flex justify-between text-gray-400 items-center">
          <div className="flex gap-2 items-center">
            <TbTransitionBottom />
            <p>Transitions</p>
          </div>
        </div>

        <div className="bg-gray-100 mt-4 relative flex items-center justify-between rounded-md bg-bg-weak-50 p-2 my-1 border">
          <span className="text-sm text-gray-400">Transfer Failed</span>
        </div>
      </div>

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

export default TransferCall;
