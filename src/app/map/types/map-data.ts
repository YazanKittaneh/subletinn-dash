export type RoomStatus = "available" | "occupied" | "maintenance" | "ready" | "needs_clean"
export type AmenityType = "bathroom" | "kitchen" | "livingroom"

export interface RoomPosition {
  row: number  // 1-2
  col: number  // 1-8
  className?: string // Additional styling
}

export interface Room {
  id?: string
  room_number: number
  room_name: string
  occupant: string
  status: RoomStatus
  last_cleaned?: string
  notes?: string
  move_in: string
  position: RoomPosition
  building?: string
  floor?: number
  created_at?: string
}

export interface Amenity {
    type: AmenityType,
    building: string,
    floor: number,
    status: string
    lastCleaned?: string
    notes?: string
}



export const FrancisAmenities: Amenity[] = [
  {
    type: "kitchen",
      building: "Francis",
      floor: 1,
      status: 'cleaned',
      lastCleaned: "Yesterday"
  },
  {
    type: "bathroom",
    building: "Francis",
    floor: 0,
    status: 'cleaned',
    lastCleaned: "Yesterday",
  }
]


export const francis0: Room[] = [
  {
    room_number: 16,
    room_name: 'Sawyer',
    occupant: 'Juan San',
    status: 'occupied',
    move_in: 'April',
    position: {
      row: 2,
      col: 1,
      className: 'bg-blue-50'
    }
  },

  {
    room_number: 15,
    room_name: 'California',
    occupant: '',
    status: 'available',
    move_in: 'September',
    position: {
      row: 2,
      col: 2,
      className: 'bg-green-50'
    }
  },
  {
    room_number: 14,
    room_name: 'Point',
    occupant: 'FERRAN',
    status: 'occupied',
    move_in: 'January',
    position: {
      row: 1,
      col: 8
    }
  },
  {
    room_number: 13,
    room_name: 'Clark',
    occupant: 'Henry Me',
    status: 'occupied',
    move_in: 'July',
    position: {
      row: 2,
      col: 8
    }
  },
];

export const francis1: Room[] = [
  {
    room_number: 11,
    room_name: "Michigan",
    occupant: "Lu Wang",
    status: "occupied",
    move_in: "March",
    position: {
      row: 2,
      col: 4
    }
  },
  {
    room_number: 10,
    room_name: "Cortez",
    occupant: "Kyriakos",
    status: "occupied",
    move_in: "November",
    position: {
      row: 1,
      col: 4
    }
  },
]

export const francis2: Room[] = [
  {
    room_number: 9,
    room_name: "Grand",
    occupant: "",
    status: "available",
    move_in: "June",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 8,
    room_name: "Chicago",
    occupant: "Val (Rob)",
    status: "occupied",
    move_in: "August",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 7,
    room_name: "Damen",
    occupant: "Jaime He",
    status: "occupied",
    move_in: "February",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 6,
    room_name: "Medill",
    occupant: "Cody Ran",
    status: "occupied",
    move_in: "May",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 5,
    room_name: "Pierce",
    occupant: "",
    status: "available",
    move_in: "October",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 4,
    room_name: "Drake",
    occupant: "Jamel Co",
    status: "occupied",
    move_in: "December",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 3,
    room_name: "Palmer",
    occupant: "",
    status: "available",
    move_in: "April",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 2,
    room_name: "Rockwell",
    occupant: "",
    status: "available",
    move_in: "July",
    position: {
      row: 1,
      col: 4
    }
  },
  {
    room_number: 1,
    room_name: "Fulton",
    occupant: "",
    status: "available",
    move_in: "March",
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
    case "ready":
      return "bg-blue-500"
    case "needs_clean":
      return "bg-purple-500"
    default:
      return "bg-slate-500"
  }
}

