"use client"

import { Table, getStatusColor } from "../map-data"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TableCardProps {
  table: Table
  onClick: () => void
}

export function TableCard({ table, onClick }: TableCardProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        "hover:scale-105 hover:shadow-lg",
        "flex flex-col items-center justify-center",
        table.seats <= 2 ? "rounded-full aspect-square" : "rounded-lg aspect-[4/3]",
        "bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700",
        "p-4",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white",
          getStatusColor(table.status),
        )}
      ></div>
      <div className="text-lg font-bold dark:text-white">Table {table.number}</div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Users className="h-4 w-4 mr-1" />
        {table.seats}
      </div>
      {table.status === "occupied" && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {table.timeOccupied}
        </Badge>
      )}
    </div>
  )
}
