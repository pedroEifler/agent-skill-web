"use client"

import { cn } from "@/lib/utils"
import { Lock, Check } from "lucide-react"
import type { Option } from "@/lib/types"

interface OptionCardProps {
  option: Option
  selected: boolean
  onSelect: (id: string) => void
}

export function OptionCard({ option, selected, onSelect }: OptionCardProps) {
  const isDisabled = option.locked

  return (
    <button
      onClick={() => !isDisabled && onSelect(option.id)}
      disabled={isDisabled}
      className={cn(
        "relative flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
        "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        selected && !isDisabled && "border-primary bg-primary/5",
        !selected && !isDisabled && "border-border hover:border-primary/50",
        isDisabled && "cursor-not-allowed border-border bg-muted/50 opacity-60"
      )}
    >
      {/* Ícone de selecionado */}
      {selected && !isDisabled && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}

      {/* Ícone de bloqueado */}
      {isDisabled && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/20">
          <Lock className="h-3 w-3 text-muted-foreground" />
        </div>
      )}

      <h3 className={cn(
        "text-lg font-semibold",
        isDisabled ? "text-muted-foreground" : "text-foreground"
      )}>
        {option.name}
        {isDisabled && (
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            (Bloqueado)
          </span>
        )}
      </h3>

      <p className={cn(
        "text-sm",
        isDisabled ? "text-muted-foreground/70" : "text-muted-foreground"
      )}>
        {option.description}
      </p>
    </button>
  )
}
