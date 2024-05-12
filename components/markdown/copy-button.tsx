import { CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CopyCheckIcon } from "lucide-react";

function CopyButton({ id }: { id: string }) {
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyDone, setIsCopyDone] = useState(false);
  const handleCopy = async () => {
    const text = document.getElementById(id)?.textContent;
    setIsCopy((prev) => !prev);

    try {
      await navigator.clipboard.writeText(text!);
    } catch (error) {
      console.log("error copying text: ", error);
    }
  };
  return (
    <div className="relative">
      <Button variant={"outline"} size={"icon"} onClick={handleCopy}>
        <CopyCheckIcon
          className={cn(
            "w-4 h-4 transition-all text-green-500",
            isCopyDone ? "scale-100" : "scale-0"
          )}
          onTransitionEnd={() => {
            setTimeout(() => {
              setIsCopy(false);
              setIsCopyDone(false);
            }, 500);
          }}
        />
        <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
          <CopyIcon
            className={cn(
              "w-4 h-4 transition-all",
              isCopy ? "scale-0 " : "scale-100"
            )}
            onTransitionEnd={() => {
              if (isCopy) {
                setIsCopyDone(true);
              }
            }}
          />
        </div>
      </Button>
    </div>
  );
}

export default CopyButton;
