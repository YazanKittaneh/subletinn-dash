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

export interface Amenity {
  building: string,
  floor: number,
  status: string
  lastCleaned?: string
  notes?: string
}



export const FrancisAmenities: Amenity[] = [
  {
    building: "Francis",
    floor: 1,
    status: 'cleaned',
    lastCleaned: "Yesterday",
  },

  {
    building: "Francis",
    floor: 0,
    status: 'cleaned',
    lastCleaned: "Yesterday",
  }
]


export const francis0: Room[] = [
  {
    roomNumber: 16,
    roomName: 'Sawyer',
    occupant: 'Juan San',
    status: 'occupied',
    moveIn: 'April',
    position: {
      row: 2,
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
      row: 2,
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
      col: 8
    }
  },
  {
    roomNumber: 13,
    roomName: 'Clark',
    occupant: 'Henry Me',
    status: 'occupied',
    moveIn: 'July',
    position: {
      row: 2,
      col: 8
    }
  },
];

export const francis1: Room[] = [
  {
    roomNumber: 11,
    roomName: "Michigan",
    occupant: "Lu Wang",
    status: "occupied",
    moveIn: "March",
    position: {
      row: 2,
      col: 4
    }
  },
  {
    roomNumber: 10,
    roomName: "Cortez",
    occupant: "Kyriakos",
    status: "occupied",
    moveIn: "November",
    position: {
      row: 1,
      col: 4
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
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 8,
    roomName: "Chicago",
    occupant: "Val (Rob)",
    status: "occupied",
    moveIn: "August",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 7,
    roomName: "Damen",
    occupant: "Jaime He",
    status: "occupied",
    moveIn: "February",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 6,
    roomName: "Medill",
    occupant: "Cody Ran",
    status: "occupied",
    moveIn: "May",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 5,
    roomName: "Pierce",
    occupant: "",
    status: "available",
    moveIn: "October",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 4,
    roomName: "Drake",
    occupant: "Jamel Co",
    status: "occupied",
    moveIn: "December",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 3,
    roomName: "Palmer",
    occupant: "",
    status: "available",
    moveIn: "April",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 2,
    roomName: "Rockwell",
    occupant: "",
    status: "available",
    moveIn: "July",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    roomNumber: 1,
    roomName: "Fulton",
    occupant: "",
    status: "available",
    moveIn: "March",
    position: {
      row: 1,
      col: 4
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

