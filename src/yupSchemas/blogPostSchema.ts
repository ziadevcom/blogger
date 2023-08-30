import * as yup from "yup";

export const postSchema = yup.object({
  title: yup.string().trim().required(),
  content: yup.string().required(),
  slug: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "Post URL can only contain alphabets, numbers, and dashes."
    )
    .required(),
  featured_image: yup
    .string()
    .trim()
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "Invalid image URL."
    )
    .nullable(),
  status: yup.string().trim().oneOf(["public", "draft", "trash"]).required(),
});
