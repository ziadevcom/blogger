import { useContext } from "react";
import { EditorContext } from "./Editor";
import { InputGroup, InputLeftAddon } from "@/utils/@chakraui/wrapper";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Spacer } from "@/components/Spacer";

export function EditorHeader() {
  const editorContext = useContext(EditorContext);

  if (!editorContext) return null;

  const { postData, setPostData } = editorContext;
  const { title, slug } = postData;

  return (
    <div className="w-full">
      <Textarea
        rows={1}
        value={title}
        onChange={(e) =>
          setPostData((postData) => {
            return { ...postData, title: e.target.value };
          })
        }
        fontSize="3xl"
        textAlign="left"
        w="full"
      />
      <Spacer space={4} />
      <InputGroup>
        <InputLeftAddon>/{postData.blogSlug}/</InputLeftAddon>
        <Input
          display="inline"
          value={slug}
          onChange={(e) =>
            setPostData((postData) => {
              return {
                ...postData,
                slug: e.target.value.replace(/ /g, "-"),
              };
            })
          }
          fontSize="md"
          textAlign="left"
          w="full"
          roundedLeft="none"
        />
      </InputGroup>
    </div>
  );
}
