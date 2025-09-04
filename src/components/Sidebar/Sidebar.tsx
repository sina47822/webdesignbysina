"use client"

import { useState } from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { ComponentCategories } from "../Component-library/component-library"
import type { Block } from "@/app/services/webbuilder/page"
import { Layers, Trash2, Copy, Settings, ChevronDown, ChevronRight, ArrowUp, ArrowDown, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ConfirmationDialog } from "@/components/Dialog/confirmation-dialog"

interface SidebarProps {
  selectedBlock: string | null
  onBlockSelect: (blockId: string | null) => void
  blocks: Block[]
  onDeleteBlock: (blockId: string) => void
  onDuplicateBlock: (blockId: string) => void
  onMoveBlock?: (blockId: string, direction: "up" | "down") => void
  onOpenSettings?: () => void
}

export function Sidebar({
  selectedBlock,
  onBlockSelect,
  blocks,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  onOpenSettings,
}: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Navigation: true,
    "Hero Sections": false,
    "About Sections": false,
    "Footer Sections": false,
    "Basic Components": false,
  })
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; blockId: string | null }>({
    isOpen: false,
    blockId: null,
  })

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleDeleteClick = (blockId: string) => {
    setDeleteDialog({ isOpen: true, blockId })
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.blockId) {
      onDeleteBlock(deleteDialog.blockId)
    }
    setDeleteDialog({ isOpen: false, blockId: null })
  }

  const getBlockName = (blockId: string) => {
    const block = blocks.find((b) => b.id === blockId)
    return block ? block.type.replace(/([A-Z])/g, " $1").trim() : "Component"
  }

  return (
    <>
      <div className="w-80 bg-white dark:bg-gray-700 border-r border-gray-200 dark:border-gray-950 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-4">سایت ساز</h2>
          <p className="text-xs text-gray-500 dark:text-gray-300">با کشیدن اجزای مختلف در قسمت نمایش میتوانید سایت خود را بسازید</p>
        </div>

        <div className="flex-1 overflow-x-hidden">
          <div className="p-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">قابلیت ها</h3>
            <ScrollArea className="h-80">
              <Droppable droppableId="component-library" isDropDisabled={true}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {Object.entries(ComponentCategories).map(([category, components]) => (
                      <Collapsible
                        key={category}
                        open={openCategories[category]}
                        onOpenChange={() => toggleCategory(category)}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-right text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md">
                          {openCategories[category] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronLeft className="w-4 h-4" />
                          )}
                        <span>{category}</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 mt-2 mr-2">
                          {components.map((componentType, index) => (
                            <Draggable key={componentType} draggableId={componentType} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 cursor-move hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                                    snapshot.isDragging ? "opacity-50" : ""
                                  }`}
                                >
                                  <div className="flex items-center justify-between space-x-2">
                                    {/* icon sub menu */}
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-gray-500 rounded flex items-center justify-center">
                                      <Layers className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    {/* text sub menu */}
                                    <div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-100 capitalize">
                                        {componentType.replace(/([A-Z])/g, " $1").trim()}
                                        </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ScrollArea>
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50  mb-3">ساختار صفحه</h3>
            <ScrollArea className="h-64">
              {blocks.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">هنوز هیچ قابلیتی اضافه نشده است</p>
              ) : (
                <div className="space-y-2">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className={`p-2 rounded border cursor-pointer transition-colors ${
                        selectedBlock === block.id
                          ? "border-blue-500 bg-blue-50 dark:bg-gray-900"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => onBlockSelect(block.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs px-1 font-medium text-gray-700 dark:text-gray-300">
                            {block.type.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                            <Layers className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              onMoveBlock?.(block.id, "up")
                            }}
                            disabled={index === 0}
                            title="Move up"
                          >
                            <ArrowUp className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              onMoveBlock?.(block.id, "down")
                            }}
                            disabled={index === blocks.length - 1}
                            title="Move down"
                          >
                            <ArrowDown className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              onOpenSettings?.()
                            }}
                            title="تنظیمات"
                          >
                            <Settings className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDuplicateBlock(block.id)
                            }}
                            title="کپی"
                          >
                            <Copy className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(block.id)
                            }}
                            title="پاک کردن"
                          >
                            <Trash2 className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, blockId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Component"
        description={`از پاک کردن این قسمت مطمئنید؟ "${getBlockName(deleteDialog.blockId || "")}" رو داری پاک میکنی`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  )
}
