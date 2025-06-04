import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { FaHashtag } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { IoDuplicateOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Handle } from "reactflow";
import DeleteNode from "../modal/DeleteNode";

const EndCall = ({data,id}) => {
  const [isDelete, setIsDelete] = useState(false);

  const [selected, setSelected] = useState(false);
  const [isEditHeading, setIsEditHeading] = useState(false);
  const [headingText, setHeadingText] = useState("End Call");

  return (
    <>
      <DeleteNode
        open={isDelete}
        setOpen={setIsDelete}
        onDelete={() => {
          data.onRemoveNode(id);
        }}
      />

      <div
        className={`relative bg-[#eff6ff] p-2 rounded-md shadow-sm min-w-[300px] ${
          selected ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => setSelected(!selected)}
      >
        {/* Header */}
        <div className="px-3 py-2 bg-[#eff6ff]">
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <FaHashtag className="text-blue-800" size={15} />
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
                  className="font-medium text-blue-800 cursor-pointer"
                  onClick={() => setIsEditHeading(true)}
                >
                  {headingText}
                </h4>
              )}
              <button onClick={() => setIsEditHeading((prev) => !prev)}>
                <CiEdit className="text-blue-800" />
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

        <Handle
          type="target"
          position="left"
          style={{ background: "#eff6ff" }}
        />
        <Handle
          type="source"
          position="right"
          style={{ background: "#eff6ff" }}
        />
      </div>
    </>
  );
};

export default EndCall;
