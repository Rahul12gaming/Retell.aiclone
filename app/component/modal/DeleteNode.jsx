import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteNode = ({ onDelete,open,setOpen }) => {

  const handleDelete = () => {
    if (onDelete) onDelete(); // Trigger delete callback
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Node</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-700">
          Are you sure you want to delete this node? This action cannot be undone.
        </div>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-zinc-800"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNode;
