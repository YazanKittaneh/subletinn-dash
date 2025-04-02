"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgesProps {
  className?: string
}

export function StatusBadges({ className }: StatusBadgesProps) {
  return (
    <div className={cn("flex mb-6 gap-4 flex-wrap", className)}>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 dark:bg-gray-800 dark:text-gray-200">
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        Available
      </Badge>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 dark:bg-gray-800 dark:text-gray-200">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        Occupied
      </Badge>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 dark:bg-gray-800 dark:text-gray-200">
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        Maintenance
      </Badge>
    </div>
  )
}
