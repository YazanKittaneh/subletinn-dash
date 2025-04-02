export type RoomStatus = "available" | "occupied" | "maintenance"

export interface Room {
  roomNumber: number
  roomName: string
  occupant: string
  status: RoomStatus
  lastCleaned?: string
  notes?: string
}

export const rooms: Room[] = [
  {
    roomNumber: 16,
    roomName: "Sawyer",
    occupant: "Juan San",
    status: "occupied"
  },
  {
    roomNumber: 15,
    roomName: "California",
    occupant: "",
    status: "available"
  },
  {
    roomNumber: 14,
    roomName: "Point",
    occupant: "FERRAN",
    status: "occupied"
  },
  {
    roomNumber: 13,
    roomName: "Clark",
    occupant: "Henry Me",
    status: "occupied"
  },
  {
    roomNumber: 12,
    roomName: "Michigan",
    occupant: "Lu Wang",
    status: "occupied"
  },
  {
    roomNumber: 10,
    roomName: "Cortez",
    occupant: "Kyriakos",
    status: "occupied"
  },
  {
    roomNumber: 9,
    roomName: "Grand",
    occupant: "",
    status: "available"
  },
  {
    roomNumber: 8,
    roomName: "Chicago",
    occupant: "Val (Rob)",
    status: "occupied"
  },
  {
    roomNumber: 7,
    roomName: "Damen",
    occupant: "Jaime He",
    status: "occupied"
  },
  {
    roomNumber: 6,
    roomName: "Medill",
    occupant: "Cody Ran",
    status: "occupied"
  },
  {
    roomNumber: 5,
    roomName: "Pierce",
    occupant: "",
    status: "available"
  },
  {
    roomNumber: 4,
    roomName: "Drake",
    occupant: "Jamel Co",
    status: "occupied"
  },
  {
    roomNumber: 3,
    roomName: "Palmer",
    occupant: "",
    status: "available"
  },
  {
    roomNumber: 2,
    roomName: "Rockwell",
    occupant: "",
    status: "available"
  },
  {
    roomNumber: 1,
    roomName: "Fulton",
    occupant: "",
    status: "available"
  }
]

export const getStatusColor = (status: RoomStatus) => {
  switch (status) {
    case "available":
      return "bg-emerald-500"
    case "occupied":
      return "bg-rose-500"
    case "maintenance":
      return "bg-amber-500"
    default:
      return "bg-slate-500"
  }
}
