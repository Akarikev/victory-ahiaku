import { Button } from "@/components/ui/button";
import { EyeIcon, PencilLine, TrashIcon } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";

function BlogTable() {
  return (
    <div className="overflow-x-auto">
      <div className="border bg-gradient-dark rounded-md w-[900px] md:w-full ">
        <div className="grid grid-cols-5 p-5 text-gray-500">
          <div className="col-span-2">Title</div>
          <div>Premium</div>
          <div>Publish</div>
        </div>

        <div className="grid grid-cols-5 p-5">
          <h1 className="col-span-2 ">Blog Title</h1>
          <Switch checked={false} />
          <Switch checked={true} />

          <Action />
        </div>
      </div>
    </div>
  );
}

export default BlogTable;

const Action = () => {
  const actions = [];
  return (
    <div className="flex items-center gap-5 flex-wrap xl:flex-row">
      <Button
        variant={"link"}
        className="inline-flex items-center justify-center gap-x-1"
      >
        <EyeIcon className="w-4 h-4" /> view
      </Button>
      <Button
        variant={"link"}
        className="inline-flex items-center justify-center gap-x-1 text-red-400"
      >
        <TrashIcon className="w-4 h-4 text-red-400" />
        delete
      </Button>
      <Button
        variant={"link"}
        className="inline-flex items-center justify-center gap-x-1"
      >
        <PencilLine className="w-4 h-4" /> Edit
      </Button>
    </div>
  );
};
