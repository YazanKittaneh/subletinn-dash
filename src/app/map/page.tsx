'use client';

import { useState } from 'react';
import { Room, francis0, francis1, francis2 } from './map-data';
import {
  StatusBadges,
  RestaurantLayout,
  RoomCard,
  RoomDetails,
} from './map-components';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { FrancisLayout } from './components/francis-layout';

export default function MapPOS() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };

  const floors = [francis0, francis1, francis2]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">
        Room Management
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Interactive room status system
      </p>

      <StatusBadges />

      {floors.map((floor, index) => (
        <FrancisLayout floor={index}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-12 px-4">
            {floor.map((room) => (
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
            ))}
          </div>
        </FrancisLayout>
      ))
      }
    </div>
  );
}
