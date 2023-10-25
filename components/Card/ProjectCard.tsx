"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
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
import { CheckCircle, ExternalLink, HardHat, X } from "lucide-react";
import Carousel from "../Carousel";
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ endpoint }: { endpoint: string }) {
  const AnimatedImageComponent = motion(Image);
  const project = projectsData.filter(
    (project) => project.endpoint === endpoint
  )[0];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card className="bg-background" classNames={{ body: "z-[99]" }}>
      <CardHeader className="relative flex-col sm:flex-row items-start sm:items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-fs-500"
        >
          {project.title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sm:ml-auto sm:mr-4 pl-1 sm:pl-0"
        >
          {project.status === "completed" ? (
            <p className="text-success flex gap-2">
              <span>Completed</span>
              <CheckCircle />
            </p>
          ) : project.status === "in-progress" ? (
            <p className="text-warning flex gap-2">
              <span>In Progress</span>
              <HardHat />
            </p>
          ) : project.status === "planned" ? (
            <span className="text-danger">Planned</span>
          ) : null}
        </motion.div>
      </CardHeader>
      <CardBody className="rounded-lg relative min-h-[200px] sm:min-h-[350px] md:min-h-[500px] overflow-hidden z-50 gap-4">
        <AnimatedImageComponent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
                  <Carousel className="z-[99]" images={project.images} />
                </ModalBody>
                <ModalFooter className="z-[99]">
                  <button
                    onClick={onClose}
                    className="absolute top-0 right-0 sm:right-10 p-2 text-danger bg-danger/10 hover:bg-danger/30 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-fs-300"
        >
          {project.description}
        </motion.p>
        {/* @ts-ignore which causes nonsense error in Accordion component when I render an AccordionItem conditionally */}
        <Accordion variant="bordered" selectionMode="multiple">
          <AccordionItem title={"Tech Stack"}>
            <div className="w-full flex flex-wrap gap-4 items-center">
              {project.techStack.map((tech, index) => (
                <Link
                  target="_blank"
                  href={tech.url ?? "#"}
                  key={index}
                  className="text-fs-300 bg-accent/40 rounded-full px-4 py-2"
                >
                  {tech.name}
                </Link>
              ))}
            </div>
          </AccordionItem>
          {project.contributors ? (
            <AccordionItem title={"Contributors"}>
              <div className="w-full flex flex-wrap gap-4 items-center">
                {project.contributors?.map((contributor, index) => (
                  <Link
                    key={index}
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fs-300 bg-accent/40 rounded-full px-4 py-2"
                  >
                    {contributor.name}
                  </Link>
                ))}
              </div>
            </AccordionItem>
          ) : null}
        </Accordion>
      </CardBody>
      <Divider />
      <CardFooter className="flex-col">
        {project.repoLink ? (
          <Link
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fs-300 z-50 flex items-center gap-1"
          >
            Visit Source Code on GitHub <ExternalLink size={16} />
          </Link>
        ) : null}
        {project.demoLink ? (
          <Link
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fs-300 z-50 flex items-center gap-1"
          >
            Live Demo <ExternalLink size={16} />
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
