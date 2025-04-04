'use client';

import { Amenity, Room, getStatusColor } from '../../types/map-data';
import {
    RoomCard,
    RoomDetails,
} from '../../map-components';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from "react";

interface KitchenSpaceProps {
    room: Amenity
    row: number,
    col: number,
}

export function KitchenSpace({ room, row, col }: KitchenSpaceProps) {
    const [selectedRoom, setSelectedRoom] = useState<Amenity | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleRoomClick = (room: Amenity) => {
        setSelectedRoom(room);
        setIsDrawerOpen(true);
    };
    return (
        <>
            <Drawer
                key={room.floor}
                open={
                    selectedRoom?.building === room.building && selectedRoom?.floor === room.floor && isDrawerOpen
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
        </>
    )
}