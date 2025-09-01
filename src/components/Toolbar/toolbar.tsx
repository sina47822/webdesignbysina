"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Tablet, Smartphone, Download, Trash2 } from "lucide-react"
import { ConfirmationDialog } from "@/components/Dialog/confirmation-dialog"
import { ModeToggle } from "../ModeToggle"

interface ToolbarProps {
  previewMode: "desktop" | "tablet" | "mobile"
  onPreviewModeChange: (mode: "desktop" | "tablet" | "mobile") => void
  onExport: () => void
  onClear: () => void
}

export function Toolbar({ previewMode, onPreviewModeChange, onExport, onClear }: ToolbarProps) {
  const [showClearDialog, setShowClearDialog] = useState(false)

  return (
    <>
      <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">پیش نمایش سایت</h1>
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-500 rounded-lg p-1">
            <Button
              size="sm"
              variant={previewMode === "desktop" ? "default" : "ghost"}
              onClick={() => onPreviewModeChange("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === "tablet" ? "default" : "ghost"}
              onClick={() => onPreviewModeChange("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === "mobile" ? "default" : "ghost"}
              onClick={() => onPreviewModeChange("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowClearDialog(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            پاک کردن همه بخش ها
          </Button>
          <Button onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            خروجی HTML
          </Button>
          <ModeToggle />
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={onClear}
        title="Clear All Components"
        description="Are you sure you want to remove all components from the page? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  )
}
