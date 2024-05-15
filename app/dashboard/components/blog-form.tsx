"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Edit, EyeIcon, Loader, SaveIcon, Send, StarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import { BlogformSchema, BlogSchemaType } from "../schema";

export default function BlogForm({
  onHandleSubmit,
}: {
  onHandleSubmit: (data: BlogSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [ispreview, setIsPreview] = useState(false);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof BlogformSchema>>({
    mode: "all",
    resolver: zodResolver(BlogformSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      is_premium: false,
      is_published: true,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof BlogformSchema>) {
    startTransition(() => {
      onHandleSubmit(values);
    });

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    toast({
      title: "!!",
      description: values.title,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full rounded-md border pb-10"
      >
        <div className="p-5 flex items-center  flex-wrap justify-between border-b">
          <div className="flex gap-5  items-center flex-wrap">
            <span
              role="button"
              tabIndex={0}
              className="inline-flex items-center gap-1 text-sm bg-zinc-700  p-1 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all"
              onClick={() =>
                setIsPreview(
                  !ispreview && !form.getFieldState("image_url").invalid
                )
              }
            >
              {ispreview ? (
                <>
                  {" "}
                  <Edit className="w-3 h-3" />
                  Edit
                </>
              ) : (
                <>
                  {" "}
                  <EyeIcon className="w-3 h-3" />
                  Preview
                </>
              )}
            </span>

            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="inline-flex items-center gap-1 text-sm bg-zinc-700  p-1 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all">
                      <StarIcon className="w-4 h-4" />
                      <span>Premium</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="inline-flex items-center gap-1 text-sm bg-zinc-700  p-1 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all">
                      <Send className="w-4 h-4" />
                      <span>Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            className={cn(" inline-flex gap-1 items-center")}
            size={"sm"}
            disabled={!form.formState.isValid}
          >
            {isPending ? (
              <Loader className="w-4 h-4  animate-spin" />
            ) : (
              <SaveIcon className="w-4 h-4" />
            )}
            {isPending ? "saving ...." : "save"}
          </Button>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full p-2 flex break-words gap-2",
                    ispreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="Blog Title"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed",
                      ispreview ? "w-0 p-0" : "w-full lg:w-1/2 "
                    )}
                  />

                  <div
                    className={cn(
                      "lg:px-10 ",
                      ispreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <h1 className="text-xl tracking-tighter font-bold md:font-extrabold md:text-2xl lg:text-3xl underline underline-offset-4">
                      {form.getValues().title}
                    </h1>
                  </div>
                </div>
              </FormControl>

              {/* <FormDescription>
                This is your the title of your blog.
              </FormDescription> */}

              {form.getFieldState("title").invalid &&
                form.getValues().title && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full p-2 flex break-words gap-2",
                    ispreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="Image url"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed",
                      ispreview ? "w-0 p-0" : "w-full lg:w-1/2 "
                    )}
                  />

                  <div
                    className={cn(
                      "lg:px-10 ",
                      ispreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    {!ispreview ? (
                      <>click on preview to see image</>
                    ) : (
                      <>
                        <div className="relative h-80 mt-5 border rounded-md">
                          <Image
                            src={form.getValues("image_url")}
                            alt="blog image"
                            fill
                            className="object-cover  object-center rounded-md"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </FormControl>

              {/* <FormDescription>
                This is your the title of your blog.
              </FormDescription> */}

              {form.getFieldState("image_url").invalid &&
                form.getValues().image_url && (
                  <div className="p-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full p-2 flex break-words gap-2",
                    ispreview ? "divide-x-0" : "divide-x h-70vh"
                  )}
                >
                  <Textarea
                    placeholder="content"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed resize-none h-full",
                      ispreview ? "w-0 p-0" : "w-full lg:w-1/2 "
                    )}
                  />

                  <div
                    className={cn(
                      "overflow-y-auto ",
                      ispreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <MarkdownPreview content={form.getValues().content} />
                  </div>
                </div>
              </FormControl>

              {/* todo: add some desc */}

              {form.getFieldState("content").invalid &&
                form.getValues().content && (
                  <div className="p-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
