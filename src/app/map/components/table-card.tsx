"use client"

import { Room, getStatusColor } from "../map-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface RoomCardProps {
  room: Room
  onClick: () => void
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        "hover:scale-105 hover:shadow-lg",
        "flex flex-col items-center justify-center",
        "rounded-lg aspect-[4/3]",
        "bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700",
        "p-4",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white",
          getStatusColor(room.status),
        )}
      ></div>
      <div className="text-lg font-bold dark:text-white">Room {room.roomNumber}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {room.roomName}
      </div>
      {room.occupant && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {room.occupant}
        </Badge>
      )}
    </div>
  )
}
