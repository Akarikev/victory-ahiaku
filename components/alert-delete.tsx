"use client";

import React from "react";
import { Button } from "./ui/button";
import { Loader2, TrashIcon } from "lucide-react";
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
    toast({
      title: "Deleted! ",
      description: "Deleted, successfully",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"link"}
          className="inline-flex items-center justify-center gap-x-1 text-red-400"
        >
          <TrashIcon className="w-4 h-4 text-red-400" />
          delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmitDelte} className="bg-red-400">
            <form className="inline-flex gap-2 items-center">
              <Loader2 className="w-3 h-3 " />
              continue
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ALertDelete;
