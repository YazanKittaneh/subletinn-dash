"use client"

import { Table, Order, getStatusColor, calculateTotal } from "./map-data"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface StatusBadgesProps {
  className?: string
}

export function StatusBadges({ className }: StatusBadgesProps) {
  return (
    <div className={cn("flex mb-6 gap-4 flex-wrap", className)}>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        Available
      </Badge>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        Occupied
      </Badge>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-sky-500"></div>
        Reserved
      </Badge>
      <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        Cleaning
      </Badge>
    </div>
  )
}

interface RestaurantLayoutProps {
  children: React.ReactNode
}

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  return (
    <div className="relative border-2 border-gray-200 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 mb-8 shadow-sm">
      <div className="relative">
        {/* Walls and sections */}
        <div className="absolute top-0 left-0 w-1/3 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute top-0 left-0 w-2 h-1/4 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-2 h-1/4 bg-gray-300 rounded-full"></div>

        {/* Restaurant features */}
        <div className="absolute top-4 left-4 w-28 h-16 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Main</span>
            <span>Entrance</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 w-36 h-20 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Restaurant</span>
            <span>Kitchen</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-28 h-16 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Drinks</span>
            <span>Bar</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute top-1/4 left-8 w-6 h-6 rounded-full bg-green-100 border border-green-200"
          title="Plant"
        ></div>
        <div
          className="absolute bottom-1/4 right-8 w-6 h-6 rounded-full bg-green-100 border border-green-200"
          title="Plant"
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-6 h-6 rounded-full bg-green-100 border border-green-200"
          title="Plant"
        ></div>

        {children}
      </div>
    </div>
  )
}

interface TableCardProps {
  table: Table
  onClick: () => void
}

export function TableCard({ table, onClick }: TableCardProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        "hover:scale-105 hover:shadow-lg",
        "flex flex-col items-center justify-center",
        table.seats <= 2 ? "rounded-full aspect-square" : "rounded-lg aspect-[4/3]",
        "bg-white shadow-md border border-gray-200",
        "p-4",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white",
          getStatusColor(table.status),
        )}
      ></div>
      <div className="text-lg font-bold">Table {table.number}</div>
      <div className="flex items-center text-sm text-gray-600">
        <Users className="h-4 w-4 mr-1" />
        {table.seats}
      </div>
      {table.status === "occupied" && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {table.timeOccupied}
        </Badge>
      )}
    </div>
  )
}

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
