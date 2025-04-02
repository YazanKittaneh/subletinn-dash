"use client"

import { useState } from "react"
import { tables } from "./map-data"
import { StatusBadges, RestaurantLayout, TableCard, TableDetails } from "./map-components"
import { Drawer, DrawerTrigger } from "@/components/ui/drawer"

export default function MapPOS() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleTableClick = (table: Table) => {
    setSelectedTable(table)
    setIsDrawerOpen(true)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Restaurant Floor Plan</h1>
      <p className="text-gray-500 mb-8">Interactive table management system</p>

      <StatusBadges />

      <RestaurantLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4">
          {tables.map((table) => (
            <Drawer
              key={table.id}
              open={selectedTable?.id === table.id && isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
            >
              <DrawerTrigger asChild>
                <TableCard table={table} onClick={() => handleTableClick(table)} />
              </DrawerTrigger>
              {selectedTable && (
                <TableDetails 
                  table={selectedTable} 
                  onClose={() => setIsDrawerOpen(false)} 
                />
              )}
            </Drawer>
          ))}
        </div>
      </RestaurantLayout>
    </div>
  )
}

