"use client";

import React from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
function ALertDelete() {
  const { toast } = useToast();

  const onSubmitDelte = () => {
    // toast({
    //   title: "Deleted! ",
    //   description: "Deleted, successfully",
    // });
  };

  return (
    <Button
      variant={"link"}
      className="inline-flex items-center justify-center gap-x-1 text-red-400"
      onClick={onSubmitDelte}
    >
      <TrashIcon className="w-4 h-4 text-red-400" />
      delete
    </Button>
  );
}

export default ALertDelete;
