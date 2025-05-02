'use client';

import { Room, getStatusColor } from '../../types/map-data';

import {
    RoomCard,
    RoomDetails,
} from '../../map-components';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from "react";

interface RoomSpaceProps {
    room: Room;
}

export function RoomSpace({ room }: RoomSpaceProps) {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleRoomClick = (room: Room) => {
      setSelectedRoom(room);
      setIsDrawerOpen(true);
    };

    return (
        <>
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
                            room_number: selectedRoom.room_number,
                            room_name: selectedRoom.room_name,
                            occupant: selectedRoom.occupant,
                            status: selectedRoom.status,
                            move_in: selectedRoom.move_in,
                            last_cleaned: selectedRoom.last_cleaned || undefined,
                            notes: selectedRoom.notes || undefined,
                            building: selectedRoom.building,
                            floor: selectedRoom.floor,
                            id: selectedRoom.id,
                            created_at: selectedRoom.created_at
                        }}
                        onClose={() => setIsDrawerOpen(false)}
                    />
                )}
            </Drawer>
        </>
    )
}
