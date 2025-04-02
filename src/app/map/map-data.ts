export type TableStatus = "available" | "occupied" | "reserved" | "cleaning"

export interface Order {
  id: number
  item: string
  price: number
  status: "pending" | "preparing" | "served" | "paid"
}

export interface Table {
  id: number
  number: number
  seats: number
  status: TableStatus
  timeOccupied?: string
  server?: string
  orders?: Order[]
}

export const tables: Table[] = [
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

export const getStatusColor = (status: TableStatus) => {
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

export const calculateTotal = (orders?: Order[]) => {
  if (!orders) return "0.00"
  return orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)
}
