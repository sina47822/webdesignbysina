"use client"

import { useState, useEffect } from "react"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { PreviewArea } from "@/components/Preview-Area/preview-area"
import { Toolbar } from "@/components/Toolbar/toolbar"
import { ComponentLibrary } from "@/components/Component-library/component-library"
import { ExportModal } from "@/components/Export-Modal/export-modal"
import { MobileRestriction } from "@/components/Mobile-Restriction/mobile-restriction"

export interface Block {
  id: string
  type: string
  content: string
  props?: Record<string, unknown>
  editableProps?: {
    texts?: Record<string, { content: string; styles: TextStyles }>
    buttons?: Record<string, { text: string; link: string; styles: ButtonStyles }>
    styles?: ComponentStyles
  }
}

export interface TextStyles {
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  color: string
  textAlign: string
  lineHeight: string
  letterSpacing: string
  textDecoration: string
  textTransform: string
}

export interface ButtonStyles {
  backgroundColor: string
  textColor: string
  borderRadius: string
  fontSize: string
  fontWeight: string
  paddingX: string
  paddingY: string
  borderWidth: string
  borderStyle: string
  borderColor: string
}

export interface ComponentStyles {
  backgroundColor: string
  padding: string
  paddingTop: string
  paddingRight: string
  paddingBottom: string
  paddingLeft: string
  margin: string
  marginTop: string
  marginRight: string
  marginBottom: string
  marginLeft: string
  width: string
  height: string
  display: string
  position: string
  zIndex: string
  opacity: string
  boxShadow: string
  rotate: string
  scale: string
  translateX: string
  translateY: string
  blur: string
  brightness: string
  contrast: string
  saturate: string
  transition: string
}

export default function HTMLBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (isMobile) {
    return <MobileRestriction />
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    // From library to canvas
    if (source.droppableId === "component-library" && destination.droppableId === "canvas") {
      const componentType = draggableId
      const newBlock: Block = {
        id: `block-${Date.now()}`,
        type: componentType,
        content: ComponentLibrary[componentType as keyof typeof ComponentLibrary] || "",
        props: {},
        editableProps: {},
      }

      const newBlocks = [...blocks]
      newBlocks.splice(destination.index, 0, newBlock)
      setBlocks(newBlocks)
      return
    }

    // Reordering within canvas
    if (source.droppableId === "canvas" && destination.droppableId === "canvas") {
      const newBlocks = Array.from(blocks)
      const [reorderedItem] = newBlocks.splice(source.index, 1)
      newBlocks.splice(destination.index, 0, reorderedItem)
      setBlocks(newBlocks)
    }
  }

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId))
    if (selectedBlock === blockId) {
      setSelectedBlock(null)
    }
  }

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find((block) => block.id === blockId)
    if (blockToDuplicate) {
      const newBlock: Block = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
      }
      const blockIndex = blocks.findIndex((block) => block.id === blockId)
      const newBlocks = [...blocks]
      newBlocks.splice(blockIndex + 1, 0, newBlock)
      setBlocks(newBlocks)
    }
  }

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    const blockIndex = blocks.findIndex((block) => block.id === blockId)
    if (blockIndex === -1) return

    const newBlocks = [...blocks]

    if (direction === "up" && blockIndex > 0) {
      ;[newBlocks[blockIndex - 1], newBlocks[blockIndex]] = [newBlocks[blockIndex], newBlocks[blockIndex - 1]]
    } else if (direction === "down" && blockIndex < blocks.length - 1) {
      ;[newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]]
    }

    setBlocks(newBlocks)
  }

  const generateHTML = () => {
    const htmlContent = blocks.map((block) => block.content).join("\n\n")
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated HTML Template</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
${htmlContent}
</body>
</html>`
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          selectedBlock={selectedBlock}
          onBlockSelect={setSelectedBlock}
          blocks={blocks}
          onDeleteBlock={deleteBlock}
          onDuplicateBlock={duplicateBlock}
          onMoveBlock={moveBlock}
          onOpenSettings={() => {}}
        />

        <div className="flex-1 flex flex-col">
          <Toolbar
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            onExport={() => setShowExportModal(true)}
            onClear={() => setBlocks([])}
          />

          <PreviewArea
            blocks={blocks}
            selectedBlock={selectedBlock}
            onBlockSelect={setSelectedBlock}
            previewMode={previewMode}
            onDeleteBlock={deleteBlock}
            onDuplicateBlock={duplicateBlock}
            onMoveBlock={moveBlock}
            onShowPropertyPanel={() => {}}
          />
        </div>

        <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} htmlContent={generateHTML()} />
      </div>
    </DragDropContext>
  )
}
