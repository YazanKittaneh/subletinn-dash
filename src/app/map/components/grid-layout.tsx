"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Room } from "../types/map-data"

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
      className="w-full h-full aspect-square" // Maintain square aspect ratio
      style={{
        gridColumn: `${column} / span ${colSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
      }}
    >
      <Drawer
        key={room.room_number}
        open={
          selectedRoom?.room_number === room.room_number && isDrawerOpen
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
              room_number: selectedRoom.room_number,
              room_name: selectedRoom.room_name,
              occupant: selectedRoom.occupant,
              status: selectedRoom.status,
              move_in: selectedRoom.move_in,
              last_cleaned: selectedRoom.last_cleaned || undefined,
              notes: selectedRoom.notes || undefined,
            }}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </Drawer>
    </Card>
  )
}

// Component for a single card in the grid
const BathroomCard = () => {
  const colSpan = 2;
  const rowSpan = 1;
  const column = 7;
  const row = 2;
  return (
    <Card
      className="w-full h-full aspect-square" // Maintain square aspect ratio
      style={{
        gridColumn: `${column} / span ${colSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
      }}
    >
      <div className="flex flex-col items-center">
        <span className="text-gray-500 text-xs">Bathroom</span>
      </div>
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
    <div className="mx-auto px-4 py-8 container">
      <h1 className="mb-6 font-bold text-2xl">8×4 Grid Layout</h1>

      <div className="relative pb-[25%] w-full"> {/* 8:2 aspect ratio container */}
        <div
          className="inset-0 grid border border-gray-300 border-dashed rounded-lg"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(10, 1fr)",
          }}
        >
          {/**** Grid lines for visualization ****
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`col-line-${i}`}
            className="absolute border-gray-200 border-l"
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
            className="absolute border-gray-200 border-t"
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
          <BathroomCard></BathroomCard>
        </div>

        {/* <div className="mt-8">
        <h2 className="mb-4 font-semibold text-xl">Grid Coordinates</h2>
        <div className="gap-1 sm:gap-2 grid grid-cols-8 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 p-1 sm:p-2 rounded text-xs sm:text-sm text-center">
              Col {i + 1}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-col gap-1 sm:gap-2 mr-2 sm:mr-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-center items-center bg-gray-100 p-1 sm:p-2 rounded h-8 sm:h-10 text-xs sm:text-sm text-center">
                Row {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div> */}
      </div>
    </div>
  )
}

