"use client";

import { FiChevronLeft, FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const PageHeader = ({ downloadJson, importJson }) => {
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      importJson(e);
      setOpen(false); // Close modal after file selection
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <FiChevronLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">
              Conversation Flow Agent
            </span>
            <span className="text-xs text-muted-foreground">
              Agent ID: ag...449 • Conversation Flow ID: co...937 • $0.115/min •
              970–1300ms latency • 9 tokens
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Auto saved at 15:25
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
          >
            <FiMoreHorizontal className="w-5 h-5 text-gray-600" />
          </Button>
          <Button onClick={downloadJson}>Download</Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Import</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Import JSON Flow</DialogTitle>
                <DialogDescription>
                  Upload a valid JSON file containing your nodes and edges.
                </DialogDescription>
              </DialogHeader>
              <Input
                type={"file"}
                accept=".json"
                onChange={handleFileChange}
                className="mt-4"
              />

              <DialogFooter className="mt-4">
                <Button onClick={() => setOpen(false)} variant="secondary">
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
