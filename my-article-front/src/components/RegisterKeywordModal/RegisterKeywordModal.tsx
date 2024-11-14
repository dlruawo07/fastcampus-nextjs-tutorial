import { registerKeyword } from "@/app/api/keyword/registerKeyword";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

interface RegisterKeywordModalProps {
  isOpen: boolean;
  onOpenClose: () => void;
  onSubmit: () => void;
}

export default function RegisterKeywordModal({
  isOpen,
  onOpenClose,
  onSubmit,
}: RegisterKeywordModalProps) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async () => {
    if (keyword !== "") {
      await registerKeyword({ keyword });
      alert("Keyword registered successfully");
      setKeyword("");
      onOpenClose();
    } else {
      alert("Type keyword to register");
    }
  };
  return (
    <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="">키워드 등록</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                placeholder="Type keyword"
                variant="bordered"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                {" "}
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
