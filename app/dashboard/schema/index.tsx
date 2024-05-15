import { z } from "zod";

export const BlogformSchema = z
  .object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    image_url: z.string().url({
      message: "invalid url",
    }),

    content: z.string().min(2, {
      message: "content must be at least 2 characters.",
    }),
    is_published: z.boolean(),
    is_premium: z.boolean(),
  })
  .refine(
    (data) => {
      const image_url = data.image_url;

      try {
        const url = new URL(image_url);

        return (
          url.hostname === "images.unsplash.com" || "ibb.co" || "i.postimg.cc"
        );
      } catch (error) {
        return false;
      }
    },
    { message: "use correct image link", path: ["image_url"] }
  );

export type BlogSchemaType = z.infer<typeof BlogformSchema>;
