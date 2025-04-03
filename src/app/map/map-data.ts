export type RoomStatus = "available" | "occupied" | "maintenance"

export interface Room {
  roomNumber: number
  roomName: string
  occupant: string
  status: RoomStatus
  lastCleaned?: string
  notes?: string
  moveIn: string
}


export const francis0: Room[] = [
  {
    roomNumber: 16,
    roomName: 'Sawyer',
    occupant: 'Juan San',
    status: 'occupied',
    moveIn: 'April',
  },
  {
    roomNumber: 15,
    roomName: 'California',
    occupant: '',
    status: 'available',
    moveIn: 'September',
  },
  {
    roomNumber: 14,
    roomName: 'Point',
    occupant: 'FERRAN',
    status: 'occupied',
    moveIn: 'January',
  },
  {
    roomNumber: 13,
    roomName: 'Clark',
    occupant: 'Henry Me',
    status: 'occupied',
    moveIn: 'July',
  },
];

export const francis1: Room[] = [
  {
    roomNumber: 12,
    roomName: "Michigan",
    occupant: "Lu Wang",
    status: "occupied",
    moveIn: "March"
  },
  {
    roomNumber: 10,
    roomName: "Cortez",
    occupant: "Kyriakos",
    status: "occupied",
    moveIn: "November"
  },
]

  export const francis2: Room[] = [

  {
    roomNumber: 9,
    roomName: "Grand",
    occupant: "",
    status: "available",
    moveIn: "June"
  },
  {
    roomNumber: 8,
    roomName: "Chicago",
    occupant: "Val (Rob)",
    status: "occupied",
    moveIn: "August"
  },
  {
    roomNumber: 7,
    roomName: "Damen",
    occupant: "Jaime He",
    status: "occupied",
    moveIn: "February"
  },
  {
    roomNumber: 6,
    roomName: "Medill",
    occupant: "Cody Ran",
    status: "occupied",
    moveIn: "May"
  },
  {
    roomNumber: 5,
    roomName: "Pierce",
    occupant: "",
    status: "available",
    moveIn: "October"
  },
  {
    roomNumber: 4,
    roomName: "Drake",
    occupant: "Jamel Co",
    status: "occupied",
    moveIn: "December"
  },
  {
    roomNumber: 3,
    roomName: "Palmer",
    occupant: "",
    status: "available",
    moveIn: "April"
  },
  {
    roomNumber: 2,
    roomName: "Rockwell",
    occupant: "",
    status: "available",
    moveIn: "July"
  },
  {
    roomNumber: 1,
    roomName: "Fulton",
    occupant: "",
    status: "available",
    moveIn: "March"
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

