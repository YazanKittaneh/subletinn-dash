"use client"

import { useState } from "react"
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

// Table data structure
type TableStatus = "available" | "occupied" | "reserved" | "cleaning"
type Table = {
  id: number
  number: number
  seats: number
  status: TableStatus
  timeOccupied?: string
  server?: string
  orders?: Order[]
}

type Order = {
  id: number
  item: string
  price: number
  status: "pending" | "preparing" | "served" | "paid"
}

// Sample data
const tables: Table[] = [
  { id: 1, number: 1, seats: 2, status: "available" },
  {
    id: 2,
    number: 2,
    seats: 2,
    status: "occupied",
    timeOccupied: "12:30 PM",
    server: "John",
    orders: [
      { id: 1, item: "Pasta Carbonara", price: 15.99, status: "served" },
      { id: 2, item: "Caesar Salad", price: 8.99, status: "served" },
      { id: 3, item: "Iced Tea", price: 3.99, status: "served" },
    ],
  },
  { id: 3, number: 3, seats: 4, status: "reserved" },
  { id: 4, number: 4, seats: 4, status: "available" },
  {
    id: 5,
    number: 5,
    seats: 6,
    status: "occupied",
    timeOccupied: "1:15 PM",
    server: "Sarah",
    orders: [
      { id: 4, item: "Margherita Pizza", price: 14.99, status: "preparing" },
      { id: 5, item: "Garlic Bread", price: 5.99, status: "served" },
      { id: 6, item: "Soft Drinks", price: 2.99, status: "served" },
    ],
  },
  { id: 6, number: 6, seats: 6, status: "cleaning" },
  { id: 7, number: 7, seats: 8, status: "available" },
  {
    id: 8,
    number: 8,
    seats: 2,
    status: "occupied",
    timeOccupied: "2:00 PM",
    server: "Mike",
    orders: [
      { id: 7, item: "Grilled Salmon", price: 22.99, status: "pending" },
      { id: 8, item: "House Wine", price: 9.99, status: "pending" },
    ],
  },
]

export default function MapPOS() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleTableClick = (table: Table) => {
    setSelectedTable(table)
    setIsDrawerOpen(true)
  }

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "bg-emerald-500"
      case "occupied":
        return "bg-rose-500"
      case "reserved":
        return "bg-sky-500"
      case "cleaning":
        return "bg-amber-500"
      default:
        return "bg-slate-500"
    }
  }

  const calculateTotal = (orders?: Order[]) => {
    if (!orders) return 0
    return orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Restaurant Floor Plan</h1>
      <p className="text-gray-500 mb-8">Interactive table management system</p>

      <div className="flex mb-6 gap-4 flex-wrap">
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

      <div className="relative border-2 border-gray-200 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 mb-8 shadow-sm">
        {/* Restaurant layout */}
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

          {/* Tables grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4">
            {/* Tables */}
            {tables.map((table) => (
              <Drawer
                key={table.id}
                open={selectedTable?.id === table.id && isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
              >
                <DrawerTrigger asChild>
                  <div
                    className={cn(
                      "relative cursor-pointer transition-all duration-200",
                      "hover:scale-105 hover:shadow-lg",
                      "flex flex-col items-center justify-center",
                      table.seats <= 2 ? "rounded-full aspect-square" : "rounded-lg aspect-[4/3]",
                      "bg-white shadow-md border border-gray-200",
                      "p-4",
                    )}
                    onClick={() => handleTableClick(table)}
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
                </DrawerTrigger>
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
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

