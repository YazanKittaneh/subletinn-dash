'use client';

import { Room } from '../map-data';
import { cn } from '@/lib/utils';
import {
  DrawerContent,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RoomDetailsProps {
  room: Room;
  onClose: () => void;
}

export function RoomDetails({ room, onClose }: RoomDetailsProps) {
  return (
    <DrawerContent className="dark:bg-gray-900">
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="dark:text-white">
            Room {room.roomNumber}
          </DrawerTitle>
          <DrawerDescription>
            {room.roomName} • Status:{' '}
            <Badge
              variant="outline"
              className={cn(
                'ml-1',
                room.status === 'available'
                  ? 'text-green-600'
                  : room.status === 'occupied'
                    ? 'text-red-600'
                    : room.status === 'maintenance'
                      ? 'text-blue-600'
                      : 'text-yellow-600'
              )}
            >
              {room.status}
            </Badge>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {room.status === 'occupied' && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Occupied since: {room.moveIn}
                </p>
              </div>

              <h3 className="font-medium mb-2">Orders</h3>
              {/* {room.orders && room.orders.length > 0 ? (
                <div className="space-y-2">
                  {room.orders.map((order) => (
                    <Card key={order.id} className="p-3 dark:bg-gray-800">
                      <div className="flex justify-between">
                        <span className="dark:text-white">{order.item}</span>
                        <span className="dark:text-white">${order.price.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500">Status: {order.status}</div>
                    </Card>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${calculateTotal(room.orders)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No orders yet</p>
              )} */}
            </>
          )}

          {room.status === 'available' && (
            <p className="text-sm text-gray-500">
              This room is ready to be seated.
            </p>
          )}

          {room.status === 'occupied' && (
            <p className="text-sm text-gray-500">
              This room has been reserved.
            </p>
          )}

          {room.status === 'maintenance' && (
            <p className="text-sm text-gray-500">This room is being cleaned.</p>
          )}
        </div>
        <DrawerFooter>
          {room.status === 'available' && <Button>Seat Guests</Button>}
          {room.status === 'occupied' && (
            <>
              <Button>Add Order</Button>
              <Button variant="outline">Print Bill</Button>
            </>
          )}
          {room.status === 'occupied' && <Button>Check In</Button>}
          {room.status === 'maintenance' && <Button>Mark as Available</Button>}
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
