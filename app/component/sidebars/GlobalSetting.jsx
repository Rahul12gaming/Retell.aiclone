"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiSettings } from "react-icons/fi";

const voices = [
  {
    name: "Adrian",
    trait: "American Young Retell",
    id: "11labs-Adrian",
  },
  {
    name: "Amritanshu (en-IN)",
    trait: "Indian Middle Aged Provider",
    id: "11labs-Amritanshu",
  },
  {
    name: "Amy(UK)",
    trait: "British Young Provider",
    id: "11labs-Amy",
  },
];

const GlobalSettingsSidebar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-[300px] border-l bg-white p-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Global Settings</h2>
        <div className="mt-2">
          <h3 className="text-xs font-medium text-gray-500 mb-1">Agent Settings</h3>

          <div className="mb-2">
            <label className="block text-xs text-gray-500 mb-1">
              Voice & Language
            </label>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
              </Select>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="whitespace-nowrap text-xs"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Cimo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full">
                  <DialogHeader>
                    <DialogTitle>Select Voice</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-2 mb-4">
                    <Button variant="secondary">+ Add custom voice</Button>
                    <Input placeholder="Search..." className="max-w-sm" />
                  </div>
                  <Table className={"w-full"}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Voice</TableHead>
                        <TableHead>Trait</TableHead>
                        <TableHead>Voice ID</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {voices.map((voice) => (
                        <TableRow key={voice.id}>
                          <TableCell>{voice.name}</TableCell>
                          <TableCell>{voice.trait}</TableCell>
                          <TableCell>{voice.id}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">Use Voice</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>

              <Button size="icon" variant="ghost">
                <FiSettings className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs text-gray-500 mb-1">Global Prompt</label>
            <div className="flex items-center gap-2 mb-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="GPT 4.1" />
                </SelectTrigger>
              </Select>
              <Button size="icon" variant="ghost">
                <FiSettings className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
            <textarea
              placeholder="Enter your global prompt here"
              className="w-full h-28 border rounded p-2 text-sm"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsSidebar;
