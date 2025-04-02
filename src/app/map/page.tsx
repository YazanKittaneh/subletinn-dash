"use client"

import { useState } from "react"
import { Room, rooms } from "./map-data"
import { StatusBadges, RestaurantLayout, RoomCard, RoomDetails } from "./map-components"
import { Drawer, DrawerTrigger } from "@/components/ui/drawer"

export default function MapPOS() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room)
    setIsDrawerOpen(true)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">Room Management</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Interactive room status system</p>

      <StatusBadges />

      <RestaurantLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4">
          {rooms.map((room) => (
            <Drawer
              key={room.roomNumber}
              open={selectedRoom?.roomNumber === room.roomNumber && isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
            >
              <DrawerTrigger asChild>
                <RoomCard 
                  room={room}
                  onClick={() => handleRoomClick(room)} 
                />
              </DrawerTrigger>
              {selectedRoom && (
                <TableDetails 
                  table={{
                    id: selectedRoom.roomNumber,
                    number: selectedRoom.roomNumber,
                    seats: 0,
                    status: selectedRoom.status,
                    timeOccupied: selectedRoom.occupant || undefined
                  }}
                  onClose={() => setIsDrawerOpen(false)} 
                />
              )}
            </Drawer>
          ))}
        </div>
      </RestaurantLayout>
    </div>
  )
}

