'use client';

import { Room } from '../types/map-data';
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

//function should display a popup that allows the user to select a date from a shadcn calender picker. Send date to supabase
function setMoveInDate(): Date{
  return new Date;
}

export function RoomDetails({ room, onClose }: RoomDetailsProps) {

  return (
    <DrawerContent className="dark:bg-gray-900">
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="dark:text-white">
            Room {room.room_number} • {room.room_name }
          </DrawerTitle>
          <DrawerDescription>
            Status:{' '}
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
                      : room.status === 'ready'
                        ? 'text-blue-600'
                        : room.status === 'needs_clean'
                          ? 'text-purple-600'
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
                <p className="text-gray-500 text-sm">
                  Occupied since: {room.move_in}
                </p>
              </div>

              <h3 className="mb-2 font-medium">Orders</h3>
              {/* {room.orders && room.orders.length > 0 ? (
                <div className="space-y-2">
                  {room.orders.map((order) => (
                    <Card key={order.id} className="dark:bg-gray-800 p-3">
                      <div className="flex justify-between">
                        <span className="dark:text-white">{order.item}</span>
                        <span className="dark:text-white">${order.price.toFixed(2)}</span>
                      </div>
                      <div className="text-gray-500 text-xs">Status: {order.status}</div>
                    </Card>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${calculateTotal(room.orders)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No orders yet</p>
              )} */}
            </>
          )}

          {room.status === 'available' && (
            <p className="text-gray-500 text-sm">
              This room is ready.
            </p>
          )}

          {room.status === 'occupied' && (
            <p className="text-gray-500 text-sm">
              This room is occupied.
            </p>
          )}

          {room.status === 'maintenance' && (
            <p className="text-orange-500 text-sm">Needs attention.</p>
          )}

          {room.status === 'ready' && (
            <p className="text-blue-500 text-sm">
              Ready for occupancy.
            </p>
          )}

          {room.status === 'needs_clean' && (
            <p className="text-purple-500 text-sm">
              Requires cleaning.
            </p>
          )}
        </div>
        <DrawerFooter>
          {room.status === 'available' && (
            <>
              <Button onClick={setMoveInDate}>Mark Move-in</Button>
              <Button>Needs Maintenance</Button>
            </>
          )}
          {room.status === 'occupied' && (
            <>
              <Button>Add Order</Button>
              <Button variant="outline">Print Bill</Button>
            </>
          )}
          {room.status === 'occupied' && <Button>Check In</Button>}
          {room.status === 'maintenance' && <Button>Mark as Available</Button>}
          {room.status === 'ready' && <Button>Mark as Occupied</Button>}
          {room.status === 'needs_clean' && <Button>Mark as Ready</Button>}
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
