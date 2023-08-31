import dynamic from "next/dynamic";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { EditorContext } from "./Editor";
import ReactQuill, { Quill } from "react-quill";
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import { DeltaStatic, Sources } from "quill";
// @ts-ignore
import ImageUploader from "quill-image-uploader";
import BlotFormatter from "quill-blot-formatter";
Quill.register("modules/imageUploader", ImageUploader); // Image upload to server
Quill.register("modules/blotFormatter", BlotFormatter); // Resizing for images and iframes
import "react-quill/dist/quill.snow.css";
import "../_stylesheets/quill.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css"; // Import to enable loading animation for image upload

//BEGIN allow image alignment styles
const ImageFormatAttributesList = ["alt", "height", "width", "style"];
const BaseImageFormat = Quill.import("formats/image");
class ImageFormat extends BaseImageFormat {
  static formats(domNode: HTMLElement) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        // @ts-ignore
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name: string, value: string) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Quill.register(ImageFormat, true);
//END allow image alignment styles

export function EditorBody() {
  const editorContext = useContext(EditorContext);

  const quillOptions = useMemo(() => {
    return {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          ["bold", "italic", "underline", "strike"], // toggled buttons
          [
            "blockquote",
            "code-block",
            "image",
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme

          ["clean"], // remove formatting button
        ],
        imageUploader: {
          upload: (file: File) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);
              if (editorContext?.postData)
                formData.append("postId", editorContext?.postData.id);
              axios
                .post("/api/image", formData)
                .then((res) => {
                  resolve(res.data.url);
                })
                .catch((error) => {
                  reject("Upload failed");
                  console.error("Error:", error);
                });
            });
          },
        },
        blotFormatter: {},
      },
    };
  }, []);
  if (!editorContext) return null;

  const { postData, setPostData } = editorContext;
  const { content } = postData;

  function handleEditorChange(
    content: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) {
    setPostData((postData) => {
      return {
        ...postData,
        content: editor.getContents(),
      };
    });
  }

  return (
    <div className="w-full" data-color-mode="light">
      <QuillNoSSRWrapper
        {...quillOptions}
        value={content}
        onChange={handleEditorChange}
      />
    </div>
  );
}
