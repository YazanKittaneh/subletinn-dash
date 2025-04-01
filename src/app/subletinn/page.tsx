"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronDown, ChevronRight, Home, AlertCircle, Building2, DollarSign, Percent } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Define interfaces for our data structure
interface Unit {
  id: number
  unitNumber: string
  tenant: string | null
  moveIn: string | null
  moveOut: string | null
  rentAmount: number
  datePaid: string | null
  amountPaid: number
  fee: number
  notes: string
}

interface Property {
  id: number
  name: string
  address: string
  neighborhood: string
  units: Unit[]
  notes: string
}

export default function RentalPropertyTable() {
  const [month, setMonth] = useState("March 2024")
  const [openProperties, setOpenProperties] = useState<Record<number, boolean>>({})
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({})

  // Sample data with properties containing multiple units
  const properties: Property[] = [
    {
      id: 1,
      name: "Bronzeville Apartments",
      address: "123 Main St, Chicago, IL",
      neighborhood: "Bronzeville",
      notes: "Well-maintained building with good tenant retention",
      units: [
        {
          id: 101,
          unitNumber: "101",
          tenant: "James Wilson",
          moveIn: "2023-06-15",
          moveOut: "2024-06-15",
          rentAmount: 850,
          datePaid: "2024-03-01",
          amountPaid: 850,
          fee: 0,
          notes: "",
        },
        {
          id: 102,
          unitNumber: "102",
          tenant: "Sarah Johnson",
          moveIn: "2023-09-01",
          moveOut: "2024-09-01",
          rentAmount: 795,
          datePaid: "2024-02-28",
          amountPaid: 795,
          fee: 0,
          notes: "",
        },
        {
          id: 103,
          unitNumber: "103",
          tenant: null,
          moveIn: null,
          moveOut: null,
          rentAmount: 825,
          datePaid: null,
          amountPaid: 0,
          fee: 0,
          notes: "Vacant - renovation in progress",
        },
      ],
    },
    {
      id: 2,
      name: "Wicker Park Residences",
      address: "456 Oak Ave, Chicago, IL",
      neighborhood: "Wicker Park",
      notes: "Premium location with higher-end units",
      units: [
        {
          id: 201,
          unitNumber: "201",
          tenant: "Michael Brown",
          moveIn: "2023-11-15",
          moveOut: "2024-04-15",
          rentAmount: 925,
          datePaid: "2024-03-02",
          amountPaid: 925,
          fee: 0,
          notes: "Short-term lease ending soon",
        },
        {
          id: 202,
          unitNumber: "202",
          tenant: "Emily Davis",
          moveIn: "2023-07-01",
          moveOut: "2024-12-31",
          rentAmount: 895,
          datePaid: "2024-02-25",
          amountPaid: 895,
          fee: 0,
          notes: "",
        },
      ],
    },
    {
      id: 3,
      name: "Little Village Complex",
      address: "789 Elm St, Chicago, IL",
      neighborhood: "Little Village",
      notes: "Recently renovated building",
      units: [
        {
          id: 301,
          unitNumber: "301",
          tenant: "David Martinez",
          moveIn: "2024-01-15",
          moveOut: "2024-07-15",
          rentAmount: 750,
          datePaid: "2024-03-03",
          amountPaid: 750,
          fee: 0,
          notes: "6-month lease",
        },
        {
          id: 302,
          unitNumber: "302",
          tenant: null,
          moveIn: null,
          moveOut: null,
          rentAmount: 775,
          datePaid: null,
          amountPaid: 0,
          fee: 0,
          notes: "Vacant - needs cleaning",
        },
        {
          id: 303,
          unitNumber: "303",
          tenant: null,
          moveIn: null,
          moveOut: null,
          rentAmount: 795,
          datePaid: null,
          amountPaid: 0,
          fee: 0,
          notes: "Vacant - showing scheduled",
        },
      ],
    },
    {
      id: 4,
      name: "Hyde Park Towers",
      address: "101 Park Blvd, Chicago, IL",
      neighborhood: "Hyde Park",
      notes: "Older building with long-term tenants",
      units: [
        {
          id: 401,
          unitNumber: "401",
          tenant: "Jennifer Lee",
          moveIn: "2023-08-01",
          moveOut: "2025-01-31",
          rentAmount: 875,
          datePaid: "2024-03-01",
          amountPaid: 875,
          fee: 0,
          notes: "Long-term tenant",
        },
        {
          id: 402,
          unitNumber: "402",
          tenant: "Robert Taylor",
          moveIn: "2023-10-15",
          moveOut: "2024-04-15",
          rentAmount: 800,
          datePaid: "2024-03-05",
          amountPaid: 800,
          fee: 0,
          notes: "Not renewing lease",
        },
        {
          id: 403,
          unitNumber: "403",
          tenant: "Olivia Merritt",
          moveIn: "2023-12-01",
          moveOut: "2024-12-01",
          rentAmount: 870,
          datePaid: "2024-03-01",
          amountPaid: 1740,
          fee: 0,
          notes: "Paid for March and April",
        },
        {
          id: 404,
          unitNumber: "404",
          tenant: "Thomas Garcia",
          moveIn: "2024-03-01",
          moveOut: "2024-09-01",
          rentAmount: 700,
          datePaid: "2024-03-01",
          amountPaid: 700,
          fee: 0,
          notes: "New tenant",
        },
      ],
    },
    {
      id: 5,
      name: "Rogers Park Suites",
      address: "222 Lake St, Chicago, IL",
      neighborhood: "Rogers Park",
      notes: "Lakefront property with premium views",
      units: [
        {
          id: 501,
          unitNumber: "501",
          tenant: "Lisa Wong",
          moveIn: "2023-05-15",
          moveOut: "2024-05-15",
          rentAmount: 775,
          datePaid: "2024-02-27",
          amountPaid: 775,
          fee: 0,
          notes: "Considering renewal",
        },
        {
          id: 502,
          unitNumber: "502",
          tenant: "Kevin Smith",
          moveIn: "2023-09-01",
          moveOut: "2024-09-01",
          rentAmount: 825,
          datePaid: null,
          amountPaid: 0,
          fee: 25,
          notes: "Late payment - contacted tenant",
        },
      ],
    },
  ]

  // Helper functions
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const isApproachingMoveOut = (dateString: string | null) => {
    if (!dateString) return false
    const moveOutDate = new Date(dateString)
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    return moveOutDate <= thirtyDaysFromNow && moveOutDate >= today
  }

  // Toggle collapsible states
  const toggleProperty = (id: number) => {
    setOpenProperties((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleUnit = (propertyId: number, unitId: number) => {
    const key = `${propertyId}-${unitId}`
    setOpenUnits((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Calculate statistics
  const getAllUnits = () => {
    return properties.flatMap((property) => property.units)
  }

  const getOccupiedUnits = () => {
    return getAllUnits().filter((unit) => unit.tenant !== null)
  }

  const getVacantUnits = () => {
    return getAllUnits().filter((unit) => unit.tenant === null)
  }

  const getLatePaymentUnits = () => {
    return getAllUnits().filter((unit) => unit.tenant !== null && unit.amountPaid === 0)
  }

  const totalUnits = getAllUnits().length
  const occupiedUnits = getOccupiedUnits().length
  const vacantUnits = getVacantUnits().length
  const latePaymentUnits = getLatePaymentUnits().length
  const totalRevenue = getAllUnits().reduce((sum, unit) => sum + unit.amountPaid, 0)
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100)

  // Calculate property-specific statistics
  const getPropertyStats = (property: Property) => {
    const totalUnits = property.units.length
    const occupiedUnits = property.units.filter((unit) => unit.tenant !== null).length
    const vacantUnits = totalUnits - occupiedUnits
    const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100)
    const totalRevenue = property.units.reduce((sum, unit) => sum + unit.amountPaid, 0)
    const potentialRevenue = property.units.reduce((sum, unit) => sum + unit.rentAmount, 0)
    const revenueRate = Math.round((totalRevenue / potentialRevenue) * 100)

    return {
      totalUnits,
      occupiedUnits,
      vacantUnits,
      occupancyRate,
      totalRevenue,
      potentialRevenue,
      revenueRate,
    }
  }

  // Filter properties and units based on tab
  const filterPropertiesByTab = (tab: string) => {
    switch (tab) {
      case "all":
        return properties
      case "occupied":
        return properties.filter((property) =>
          property.units.some((unit) => unit.tenant !== null && unit.amountPaid > 0),
        )
      case "vacant":
        return properties.filter((property) => property.units.some((unit) => unit.tenant === null))
      case "late":
        return properties.filter((property) =>
          property.units.some((unit) => unit.tenant !== null && unit.amountPaid === 0),
        )
      default:
        return properties
    }
  }

  const filterUnitsByTab = (property: Property, tab: string) => {
    switch (tab) {
      case "all":
        return property.units
      case "occupied":
        return property.units.filter((unit) => unit.tenant !== null && unit.amountPaid > 0)
      case "vacant":
        return property.units.filter((unit) => unit.tenant === null)
      case "late":
        return property.units.filter((unit) => unit.tenant !== null && unit.amountPaid === 0)
      default:
        return property.units
    }
  }

  // Render unit row with collapsible details
  const renderUnitRow = (property: Property, unit: Unit, tab: string) => {
    const isVacant = unit.tenant === null
    const isLatePayment = unit.tenant !== null && unit.amountPaid === 0
    const isApproachingEnd = isApproachingMoveOut(unit.moveOut)
    const isNewTenant = unit.moveIn && new Date(unit.moveIn) > new Date("2024-02-01")
    const unitKey = `${property.id}-${unit.id}`

    return (
      <Collapsible
        key={unitKey}
        open={openUnits[unitKey]}
        onOpenChange={() => toggleUnit(property.id, unit.id)}
        className="border rounded-md mb-2 overflow-hidden ml-6"
      >
        <CollapsibleTrigger className="w-full">
          <div
            className={`flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer ${isVacant ? "bg-green-50" : isLatePayment ? "bg-red-50" : ""}`}
          >
            <div className="flex items-center gap-2">
              {openUnits[unitKey] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="font-medium">Unit {unit.unitNumber}</span>
              {unit.tenant && <span className="text-muted-foreground">{unit.tenant}</span>}
            </div>
            <div className="flex items-center gap-2">
              {isVacant && (
                <Badge variant="outline" className="bg-green-50">
                  Vacant
                </Badge>
              )}
              {isLatePayment && (
                <Badge variant="outline" className="bg-red-50">
                  Late Payment
                </Badge>
              )}
              {isApproachingEnd && (
                <Badge variant="outline" className="bg-amber-50">
                  Ending Soon
                </Badge>
              )}
              {isNewTenant && (
                <Badge variant="outline" className="bg-blue-50">
                  New Tenant
                </Badge>
              )}
              <span className="font-medium">${unit.rentAmount}/mo</span>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-muted/10 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Tenant Information</h4>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Tenant:</span> {unit.tenant || "VACANT"}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Move In:</span>
                    <span className={isNewTenant ? "bg-green-100 px-2 py-0.5 rounded text-xs" : ""}>
                      {formatDate(unit.moveIn)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Move Out:</span>
                    <span className={isApproachingEnd ? "bg-red-100 px-2 py-0.5 rounded text-xs" : ""}>
                      {formatDate(unit.moveOut)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Rent Amount:</span> ${unit.rentAmount}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date Paid:</span> {formatDate(unit.datePaid) || "Not paid"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Amount Paid:</span> ${unit.amountPaid}
                  </p>
                  {unit.fee > 0 && (
                    <p className="text-sm text-red-500">
                      <span className="font-medium">Late Fee:</span> ${unit.fee}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {unit.notes && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">Notes</h4>
                <p className="text-sm bg-muted/20 p-2 rounded">{unit.notes}</p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // Render property card with collapsible units
  const renderPropertyCard = (property: Property, tab: string) => {
    const stats = getPropertyStats(property)
    const filteredUnits = filterUnitsByTab(property, tab)

    if (filteredUnits.length === 0) return null

    return (
      <Collapsible
        key={property.id}
        open={openProperties[property.id]}
        onOpenChange={() => toggleProperty(property.id)}
        className="mb-4"
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {property.name}
                </CardTitle>
                <CardDescription>
                  {property.address} • {property.neighborhood}
                </CardDescription>
              </div>
              <CollapsibleTrigger>
                <div className="p-1 hover:bg-muted rounded-full">
                  {openProperties[property.id] ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </div>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Units</p>
                <p className="text-lg font-semibold">
                  {stats.occupiedUnits}/{stats.totalUnits}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Occupancy</p>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">{stats.occupancyRate}%</p>
                </div>
                <Progress value={stats.occupancyRate} className="h-1 mt-1" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">${stats.totalRevenue}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Collection</p>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">{stats.revenueRate}%</p>
                </div>
                <Progress value={stats.revenueRate} className="h-1 mt-1" />
              </div>
            </div>

            <CollapsibleContent>
              {property.notes && (
                <div className="mb-4 p-2 bg-muted/20 rounded text-sm">
                  <span className="font-medium">Property Notes:</span> {property.notes}
                </div>
              )}

              <div className="space-y-2">{filteredUnits.map((unit) => renderUnitRow(property, unit, tab))}</div>
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Rental Property Management</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="month">Month:</Label>
          <Input id="month" value={month} onChange={(e) => setMonth(e.target.value)} className="w-40" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <span className="text-xs text-muted-foreground">
                ({occupiedUnits}/{totalUnits})
              </span>
            </div>
            <Progress value={occupancyRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vacantUnits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed View */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>All Properties</span>
          </TabsTrigger>
          <TabsTrigger value="occupied" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Occupied Units</span>
          </TabsTrigger>
          <TabsTrigger value="vacant" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Vacant Units</span>
          </TabsTrigger>
          <TabsTrigger value="late" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>Late Payments</span>
          </TabsTrigger>
        </TabsList>

        {["all", "occupied", "vacant", "late"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterPropertiesByTab(tab).map((property) => renderPropertyCard(property, tab))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

