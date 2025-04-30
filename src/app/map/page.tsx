'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Verify supabase import path
import { Room } from './types/map-data';
import {
  StatusBadges,
  RestaurantLayout,
  RoomCard,
  RoomDetails,
} from './map-components';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GridLayout from './components/grid-layout';
import { Example } from './components/example';
import { Stripes } from './components/stripes';
import { FrancisFirstFloor, FrancisBasement, FrancisSecondFloor } from './components/francis';

export default function MapPOS() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [floors, setFloors] = useState<Room[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('building', 'Francis')
          .order('floor', { ascending: true })
          .order('position->col', { ascending: true });

        if (error) throw error;

        // Group rooms by floor number
        const grouped = data.reduce((acc: Record<number, Room[]>, room) => {
          const floor = room.floor;
          acc[floor] = acc[floor] || [];
          acc[floor].push(room);
          return acc;
        }, {});

        setFloors(Object.values(grouped));
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading room data...</div>;
  }

  return (
    <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8 container">
      <h1 className="mb-2 font-bold dark:text-white text-3xl">
        Room Management
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Interactive room status system
      </p>

      <div>

      <StatusBadges className="gap-2 mx-auto"></StatusBadges>

        <Tabs defaultValue="basement" className="w-100%">
          <TabsList className="mx-auto">
            <TabsTrigger value="basement">Basement</TabsTrigger>
            <TabsTrigger value="first">First</TabsTrigger>
            <TabsTrigger value="second">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="basement"><FrancisBasement floorRooms={floors[0] || []} /></TabsContent>
          <TabsContent value="first"><FrancisFirstFloor floorRooms={floors[1] || []} /></TabsContent>
          <TabsContent value="second"><FrancisSecondFloor floorRooms={floors[2] || []} /></TabsContent>

        </Tabs>

      </div>
    </div>
  );
}
