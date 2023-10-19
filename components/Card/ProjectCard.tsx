"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import React from "react";
import projectsData from "@/db/static/projects";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Carousel from "../Carousel";
import Image from "next/image";
export default function ProjectCard({ params }: { params: { title: string } }) {
  const parsedTitle = decodeURIComponent(params.title);
  const project = projectsData.filter(
    (project) => project.endpoint === parsedTitle
  )[0];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card>
      <CardHeader className="text-fs-500 justify-center">
        {params.title}
      </CardHeader>
      <CardBody className="rounded-lg relative min-h-[200px] sm:min-h-[350px] md:min-h-[500px] overflow-hidden z-50">
        <Image
          onClick={onOpen}
          src={project.images[0].src}
          alt={project.images[0].src}
          width={1920}
          height={1080}
          className="rounded-lg"
        />
        <Modal
          size="full"
          isOpen={isOpen}
          hideCloseButton
          onOpenChange={onOpenChange}
        >
          <ModalContent className="overflow-hidden">
            {(onClose) => (
              <>
                <ModalBody>
                  <Carousel className="p-4" images={project.images} />
                </ModalBody>
                <ModalFooter className="z-[99]">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}
