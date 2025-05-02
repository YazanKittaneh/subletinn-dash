'use client';

import { useState } from 'react';
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
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

interface RoomDetailsProps {
  room: Room;
  onClose: () => void;
}

export function RoomDetails({ room, onClose }: RoomDetailsProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleMoveInDateSelect = async () => {
    if (!selectedDate) return;
    
    try {
      // Format date for display
      const formattedDate = format(selectedDate, 'MMMM dd, yyyy');
      
      // TODO: Send to Supabase
      // const { data, error } = await supabase
      //   .from('rooms')
      //   .update({ 
      //     status: 'occupied', 
      //     move_in: selectedDate.toISOString() 
      //   })
      //   .eq('room_number', room.room_number)
      //   .select();
      
      // if (error) throw error;
      
      console.log(`Room ${room.room_number} marked as occupied with move-in date: ${formattedDate}`);
      setIsCalendarOpen(false);
      // You might want to refresh the room data or close the drawer here
    } catch (error) {
      console.error('Error updating move-in date:', error);
    }
  };

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
              <Button onClick={() => setIsCalendarOpen(true)}>Mark Move-in</Button>
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

      {/* Move-in Date Calendar Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Move-in Date</DialogTitle>
            <DialogDescription>
              Choose the date when the guest will move in to Room {room.room_number}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCalendarOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMoveInDateSelect}>
              Confirm Move-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DrawerContent>
  );
}
