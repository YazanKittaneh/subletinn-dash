"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Room } from "../map-data"

import {
  StatusBadges,
  RestaurantLayout,
  RoomCard,
  RoomDetails,
} from '../map-components';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from "react";


// Define the card type with position information
type GridCardProps = {
  room: Room
}

// Component for a single card in the grid
const GridCard = ({ room }: GridCardProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };
  const colSpan = 1;
  const rowSpan = 1;
  const column = room.position.col;
  const row = room.position.row;
  return (
    <Card
      className="h-full "
      style={{
        gridColumn: `${column} / span ${colSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
      }}
    >
        <Drawer
          key={room.roomNumber}
          open={
            selectedRoom?.roomNumber === room.roomNumber && isDrawerOpen
          }
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerTrigger asChild>
            <RoomCard room={room} onClick={() => handleRoomClick(room)} />
          </DrawerTrigger>
          {selectedRoom && (
            <RoomDetails
              room={{
                position: selectedRoom.position,
                roomNumber: selectedRoom.roomNumber,
                roomName: selectedRoom.roomName,
                occupant: selectedRoom.occupant,
                status: selectedRoom.status,
                moveIn: selectedRoom.moveIn,
                lastCleaned: selectedRoom.lastCleaned || undefined,
                notes: selectedRoom.notes || undefined,
              }}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </Drawer>
    </Card>
  )
}

interface GridLayoutProps {
  rooms: Room[]
}


export default function GridLayout({
  rooms,
}: GridLayoutProps) {

  ///todo: should display community + floor
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">8×4 Grid Layout</h1> 

      <div
        className="grid gap-4 border border-dashed border-gray-300 p-4 rounded-lg"
        style={{
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(2, minmax(120px, auto))",
        }}
      >
        {/* Grid lines for visualization
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`col-line-${i}`}
            className="absolute border-l border-gray-200"
            style={{
              left: `calc(${(i + 1) * 12.5}% + ${i * 0.5 - 0.25}rem)`,
              top: 0,
              bottom: 0,
              zIndex: 0,
            }}
          />
        ))}

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`row-line-${i}`}
            className="absolute border-t border-gray-200"
            style={{
              top: `calc(${(i + 1) * 25}%)`,
              left: 0,
              right: 0,
              zIndex: 0,
            }}
          />
        ))} */}

        {/* Render the cards */}
        {rooms.map((room, index) => (
          <GridCard key={index} room={room} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Grid Coordinates</h2>
        <div className="grid grid-cols-8 gap-2 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 p-2 text-center rounded">
              Column {i + 1}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2 mr-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 p-2 text-center rounded h-10 flex items-center justify-center">
                Row {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

