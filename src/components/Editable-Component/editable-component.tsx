"use client"

import { useMemo } from "react"
import type { Block } from "@/app/services/webbuilder/page"

interface EditableComponentProps {
  block: Block
  onClick: () => void
}

export function EditableComponent({ block, onClick }: EditableComponentProps) {
  const processedContent = useMemo(() => {
    let content = block.content
    const editableProps = block.editableProps

    // Helper function to convert camelCase to kebab-case
    const camelToKebab = (str: string) => {
      return str.replace(/([A-Z])/g, "-$1").toLowerCase()
    }

    // Helper function to create CSS from styles object
    const createCSSString = (styles: Record<string, string>) => {
      return Object.entries(styles)
        .filter(([_, value]) => value && value !== "")
        .map(([key, value]) => {
          const cssKey = camelToKebab(key)

          // Handle special cases for CSS properties
          if (key === "paddingX") {
            return `padding-left: ${value}; padding-right: ${value}`
          }
          if (key === "paddingY") {
            return `padding-top: ${value}; padding-bottom: ${value}`
          }

          // Handle transform properties
          if (["rotate", "scale", "translateX", "translateY"].includes(key)) {
            return "" // Handle these separately in transform
          }

          // Handle filter properties
          if (["blur", "brightness", "contrast", "saturate"].includes(key)) {
            return "" // Handle these separately in filter
          }

          return `${cssKey}: ${value}`
        })
        .filter((rule) => rule !== "")
        .join("; ")
    }

    // Helper function to create transform string
    const createTransformString = (styles: Record<string, string>) => {
      const transforms = []
      if (styles.rotate) transforms.push(`rotate(${styles.rotate})`)
      if (styles.scale) transforms.push(`scale(${styles.scale})`)
      if (styles.translateX) transforms.push(`translateX(${styles.translateX})`)
      if (styles.translateY) transforms.push(`translateY(${styles.translateY})`)
      return transforms.length > 0 ? `transform: ${transforms.join(" ")}` : ""
    }

    // Helper function to create filter string
    const createFilterString = (styles: Record<string, string>) => {
      const filters = []
      if (styles.blur) filters.push(`blur(${styles.blur})`)
      if (styles.brightness) filters.push(`brightness(${styles.brightness})`)
      if (styles.contrast) filters.push(`contrast(${styles.contrast})`)
      if (styles.saturate) filters.push(`saturate(${styles.saturate})`)
      return filters.length > 0 ? `filter: ${filters.join(" ")}` : ""
    }

    // Apply button styles
    if (editableProps?.buttons) {
      Object.entries(editableProps.buttons).forEach(([buttonId, buttonData]) => {
        const regex = new RegExp(`(<[^>]*data-button-id="${buttonId}"[^>]*)(>)([^<]*)(</[^>]*>)`, "g")

        content = content.replace(regex, (match, openTag, closeBracket, currentText, closeTag) => {
          const styles = buttonData.styles || {}
          const text = buttonData.text || currentText
          const link = buttonData.link || "#"

          // Update href attribute
          let updatedOpenTag = openTag
          if (updatedOpenTag.includes("href=")) {
            updatedOpenTag = updatedOpenTag.replace(/href="[^"]*"/, `href="${link}"`)
          } else {
            updatedOpenTag = updatedOpenTag.replace(/<(\w+)/, `<$1 href="${link}"`)
          }

          return updatedOpenTag + closeBracket + text + closeTag
        })
      })
    }

    // Apply component-level styles
    if (editableProps?.styles) {
      const componentStyles = editableProps.styles
      const regex = /(<section[^>]*data-component="hero"[^>]*)(>)/g

      content = content.replace(regex, (match, openTag, closeBracket) => {

        return match
      })
    }

    return content
  }, [block.content, block.editableProps])

  return (
    <div onClick={onClick} className="cursor-pointer">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  )
}
