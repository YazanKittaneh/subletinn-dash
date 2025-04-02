"use client"

import { Table, Order, calculateTotal } from "../map-data"
import { cn } from "@/lib/utils"
import {
  DrawerContent,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface TableDetailsProps {
  table: Table
  onClose: () => void
}

export function TableDetails({ table, onClose }: TableDetailsProps) {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Table {table.number}</DrawerTitle>
          <DrawerDescription>
            {table.seats} seats • Status:{" "}
            <Badge
              variant="outline"
              className={cn(
                "ml-1",
                table.status === "available"
                  ? "text-green-600"
                  : table.status === "occupied"
                    ? "text-red-600"
                    : table.status === "reserved"
                      ? "text-blue-600"
                      : "text-yellow-600",
              )}
            >
              {table.status}
            </Badge>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {table.status === "occupied" && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Occupied since: {table.timeOccupied}</p>
                <p className="text-sm text-gray-500">Server: {table.server}</p>
              </div>

              <h3 className="font-medium mb-2">Orders</h3>
              {table.orders && table.orders.length > 0 ? (
                <div className="space-y-2">
                  {table.orders.map((order) => (
                    <Card key={order.id} className="p-3">
                      <div className="flex justify-between">
                        <span>{order.item}</span>
                        <span>${order.price.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500">Status: {order.status}</div>
                    </Card>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${calculateTotal(table.orders)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No orders yet</p>
              )}
            </>
          )}

          {table.status === "available" && (
            <p className="text-sm text-gray-500">This table is ready to be seated.</p>
          )}

          {table.status === "reserved" && (
            <p className="text-sm text-gray-500">This table has been reserved.</p>
          )}

          {table.status === "cleaning" && (
            <p className="text-sm text-gray-500">This table is being cleaned.</p>
          )}
        </div>
        <DrawerFooter>
          {table.status === "available" && <Button>Seat Guests</Button>}
          {table.status === "occupied" && (
            <>
              <Button>Add Order</Button>
              <Button variant="outline">Print Bill</Button>
            </>
          )}
          {table.status === "reserved" && <Button>Check In</Button>}
          {table.status === "cleaning" && <Button>Mark as Available</Button>}
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  )
}
