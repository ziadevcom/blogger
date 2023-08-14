import {
  Select,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@/utils/@chakraui/wrapper";
import { EditorContext } from "./Editor";
import { SyntheticEvent, useContext, useState } from "react";
import { Button } from "@/components/Button";
import { maxImageUploadSize } from "@/utils/constants";
import axios from "axios";

export function EditorSidebar() {
  const editorContext = useContext(EditorContext);

  if (!editorContext) return null;

  const { postData, setPostData, submitting, modified } = editorContext;
  const { status } = postData;

  function handleChange(event: SyntheticEvent) {
    const target = event.target as HTMLTextAreaElement;
    return setPostData((postData) => {
      return { ...postData, status: target.value };
    });
  }

  return (
    <aside className="sticky top-4 flex flex-col gap-4">
      <Box
        background="gray.50"
        borderColor="border"
        _dark={{ background: "gray.900", borderColor: "transparent" }}
        className="flex w-full flex-col gap-4 rounded border-[1px] p-4"
      >
        <div>
          <label htmlFor="status" className="mb-2 block font-semibold">
            Post Status
          </label>
          <Select
            onChange={handleChange}
            id="status"
            name="status"
            focusBorderColor="brand.400"
            value={status}
          >
            <option value="public">Public</option>
            <option value="draft">Draft</option>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button type="submit" isLoading={submitting} isDisabled={!modified}>
            Update
          </Button>
        </div>
      </Box>
      <FeaturedImage />
    </aside>
  );
}

export function FeaturedImage() {
  const editorContext = useContext(EditorContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!editorContext) return null;

  const {
    postData: { featured_image },
    setPostData,
  } = editorContext;

  function updateFeaturedImage(imageURL: string) {
    setPostData((prev) => {
      return { ...prev, featured_image: imageURL };
    });

    onClose(); // close modal
  }

  return (
    <Box
      background="gray.50"
      borderColor="border"
      _dark={{ background: "gray.900", borderColor: "transparent" }}
      className="mb-2 flex flex-col gap-4 p-4"
    >
      <p className="font-bold">Featured Image</p>
      <div className="relative">
        <Button
          _before={{
            content: '""',
            bgImage: featured_image || "",
            bgSize: "cover",
            pos: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 0.4,
          }}
          type="button"
          onClick={onOpen}
          variant="unstyled"
          color="white"
          bg="black"
          _hover={{ background: "brand.100", color: "black" }}
          className="min-h-[200px] w-full rounded text-lg"
        >
          {/* Wrap text in span to fix text fading */}
          <span className="relative block text-inherit">
            {featured_image ? "Change Image" : "Add Image"}
          </span>
        </Button>
      </div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ImageUpload onUpload={updateFeaturedImage} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export function ImageUpload({
  onUpload,
}: {
  onUpload: (imageURL: string) => void;
}) {
  const toast = useToast();
  const [image, setImage] = useState<File | undefined>();
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const imageFile = (e.target as HTMLInputElement)?.files?.[0];

    console.log(imageFile);

    setImage(imageFile);
    setImageURL(URL.createObjectURL(imageFile as File));
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!image) return null;

      setLoading(true);

      if (image.size > maxImageUploadSize) {
        return toast({
          status: "error",
          title: "Image size can't be more than 0.5 MB.",
        });
      }

      const formData = new FormData();

      formData.append("image", image);

      const response = await axios.post("/api/image", formData);

      console.log(response.data);

      toast({
        status: "success",
        title: "Image uploaded.",
      });

      onUpload(response.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpload} method="POST" className="flex flex-col gap-4">
      {imageURL && (
        <picture>
          <img src={imageURL} alt={image?.name} className="mx-auto"></img>
        </picture>
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleInputChange}
        // className="h-[50px]"
      />
      <Button type="submit" isLoading={loading} isDisabled={!image}>
        Upload & Set Featured Image
      </Button>
    </form>
  );
}
