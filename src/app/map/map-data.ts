export type RoomStatus = "available" | "occupied" | "maintenance"

export interface RoomPosition {
  row: number  // 1-2
  col: number  // 1-8
  className?: string // Additional styling
}

export interface Room {
  roomNumber: number
  roomName: string
  occupant: string
  status: RoomStatus
  lastCleaned?: string
  notes?: string
  moveIn: string
  position: RoomPosition
}


export const francis0: Room[] = [
  {
    roomNumber: 16,
    roomName: 'Sawyer',
    occupant: 'Juan San',
    status: 'occupied',
    moveIn: 'April',
    position: {
      row: 1,
      col: 1,
      className: 'bg-blue-50'
    }
  },
  {
    roomNumber: 15,
    roomName: 'California',
    occupant: '',
    status: 'available',
    moveIn: 'September',
    position: {
      row: 1,
      col: 2,
      className: 'bg-green-50'
    }
  },
  {
    roomNumber: 14,
    roomName: 'Point',
    occupant: 'FERRAN',
    status: 'occupied',
    moveIn: 'January',
    position: {
      row: 1,
      col: 3
    }
  },
  {
    roomNumber: 13,
    roomName: 'Clark',
    occupant: 'Henry Me',
    status: 'occupied',
    moveIn: 'July',
    position: {
      row: 1,
      col: 4
    }
  },
];

export const francis1: Room[] = [
  {
    roomNumber: 12,
    roomName: "Michigan",
    occupant: "Lu Wang",
    status: "occupied",
    moveIn: "March",
    position: {
      x: 'left-8',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 10,
    roomName: "Cortez",
    occupant: "Kyriakos",
    status: "occupied",
    moveIn: "November",
    position: {
      x: 'right-8',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
]

export const francis2: Room[] = [
  {
    roomNumber: 9,
    roomName: "Grand",
    occupant: "",
    status: "available",
    moveIn: "June",
    position: {
      x: 'left-8',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 8,
    roomName: "Chicago",
    occupant: "Val (Rob)",
    status: "occupied",
    moveIn: "August",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 7,
    roomName: "Damen",
    occupant: "Jaime He",
    status: "occupied",
    moveIn: "February",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 6,
    roomName: "Medill",
    occupant: "Cody Ran",
    status: "occupied",
    moveIn: "May",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 5,
    roomName: "Pierce",
    occupant: "",
    status: "available",
    moveIn: "October",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 4,
    roomName: "Drake",
    occupant: "Jamel Co",
    status: "occupied",
    moveIn: "December",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 3,
    roomName: "Palmer",
    occupant: "",
    status: "available",
    moveIn: "April",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 2,
    roomName: "Rockwell",
    occupant: "",
    status: "available",
    moveIn: "July",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
  },
  {
    roomNumber: 1,
    roomName: "Fulton",
    occupant: "",
    status: "available",
    moveIn: "March",
    position: {
      x: 'left-48',
      y: 'top-8',
      width: 'w-32',
      height: 'h-24'
    }
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

