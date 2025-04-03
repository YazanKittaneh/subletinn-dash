'use client';

import { useState } from 'react';
import { Room, francis0, francis1 } from './map-data';
import {
  StatusBadges,
  RestaurantLayout,
  RoomCard,
  RoomDetails,
} from './map-components';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import GridLayout from './components/grid-layout';

export default function MapPOS() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };

  const floors = [francis0, francis1]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">
        Room Management
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Interactive room status system
      </p>

      <StatusBadges />
      <div>
        <RestaurantLayout>

          {floors.map((floor, index) => (
            <GridLayout key={index} rooms={floor}>
            </GridLayout>
          ))

          }
        </RestaurantLayout>

      </div>
    </div>
  );
}
