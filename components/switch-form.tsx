"use client";

import React, { SyntheticEvent } from "react";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";

function SwitchForm({
  checked,
  onToggle,
  name,
}: {
  checked: boolean;
  onToggle: () => Promise<string>;
  name: string;
}) {
  const { toast } = useToast();
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { error } = JSON.parse(await onToggle());

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "error in updating " + name,
        description: "there was an error in updating" + name,
      });
    } else {
      toast({
        title: "sucessfully updated " + name,
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Switch checked={checked} type="submit" />
    </form>
  );
}

export default SwitchForm;
