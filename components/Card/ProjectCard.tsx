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
import { X } from "lucide-react";
import Carousel from "../Carousel";
import Image from "next/image";
export default function ProjectCard({ params }: { params: { title: string } }) {
  const parsedTitle = decodeURIComponent(params.title);
  const project = projectsData.filter(
    (project) => project.endpoint === parsedTitle
  )[0];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card className="bg-background" classNames={{ body: "z-[99]" }}>
      <CardHeader className="text-fs-500 justify-center">
        {project.title}
      </CardHeader>
      <CardBody className="rounded-lg relative min-h-[200px] sm:min-h-[350px] md:min-h-[500px] overflow-hidden z-50">
        <Image
          onClick={onOpen}
          src={project.images[0].src}
          alt={project.images[0].src}
          width={1920}
          height={1080}
          quality={100}
          priority
          loading="eager"
          sizes="100vw"
          className="rounded-lg cursor-pointer"
        />
        <Modal
          hideCloseButton
          size="full"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent className="overflow-hidden">
            {(onClose) => (
              <>
                <ModalBody>
                  <Carousel images={project.images} />
                </ModalBody>
                <ModalFooter className="z-[99]">
                  <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-danger hover:bg-danger/20 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}
