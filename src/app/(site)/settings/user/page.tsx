"use client";

import { Button } from "@/components/Button";
import axios from "axios";
import { UserX } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
} from "@/utils/@chakraui/wrapper";
import { useState } from "react";

export default function UserSettings() {
  const [deleting, setDeleting] = useState(false);
  const session = useSession();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleDelete() {
    if (!session?.data?.user) return;

    setDeleting(true);

    try {
      await axios.delete("/api/user", {
        data: { userId: session.data?.user?.id },
      });

      signOut();

      toast({ title: "User deleted.", status: "success" });
    } catch (error) {
      toast({ title: "Something wen't wrong.", status: "error" });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Button
        leftIcon={<UserX width={18} />}
        colorScheme="red"
        onClick={onOpen}
      >
        Delete Account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          containerProps={{ alignItems: "center", padding: "1rem" }}
        >
          <ModalHeader>
            Are you sure you want to delete your account?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Deleting your account will delete all the associated media &
              posts. This action is permanent and you can&apos;t recover any
              deleted data.
            </p>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button
              onClick={handleDelete}
              mr={3}
              variant="ghost"
              colorScheme="red"
              isLoading={deleting}
            >
              Delete Account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
