'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client'; // Verify supabase import path
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
    return <div className="text-center p-8">Loading room data...</div>;
  }

  return (
    <div className="container mx-auto py-4 sm:py-8 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">
        Room Management
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Interactive room status system
      </p>

      <div>

      <StatusBadges className="mx-auto gap-2"></StatusBadges>

        <Tabs defaultValue="basement" className="w-100%">
          <TabsList className="mx-auto">
            <TabsTrigger value="basement">Basement</TabsTrigger>
            <TabsTrigger value="first">First</TabsTrigger>
            <TabsTrigger value="second">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="basement"><FrancisBasement></FrancisBasement></TabsContent>
          <TabsContent value="first"> <FrancisFirstFloor></FrancisFirstFloor></TabsContent>
          <TabsContent value="second"><FrancisSecondFloor></FrancisSecondFloor></TabsContent>

        </Tabs>

      </div>
    </div>
  );
}
