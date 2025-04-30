"use client"

import { Room } from '../types/map-data'
import { Example } from "./example"
import { BathroomSpace } from "./rooms/bathroom"
import { EmptySpace } from "./rooms/empty-space"
import { KitchenSpace } from "./rooms/kitchen-space"
import { RoomSpace } from "./rooms/room-space"
import { Stripes } from "./stripes"

interface FrancisFloorProps {
  floorRooms: Room[]
}


export function FrancisBasement({ floorRooms }: FrancisFloorProps) {
  const getRoom = (row: number, col: number) => {
    return floorRooms.find(room => 
      room.position.row === row && room.position.col === col
    )
  }

  return (
    <>
      <Example>
        <div className="grid grid-cols-1">
          <Stripes border className="col-start-1 row-start-1 rounded-lg" />
          <div className="col-start-1 row-start-1 grid grid-cols-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
            {/* Row 1 */}
            {getRoom(2, 1) ? <RoomSpace room={getRoom(2, 1)!} /> : <EmptySpace />}
            <EmptySpace />
            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">stairs</div>

            {/* Row 2 */}
            {getRoom(2, 2) ? <RoomSpace room={getRoom(2, 2)!} /> : <EmptySpace />}
            <EmptySpace />
            <EmptySpace />

            {/* Row 3 */}
            <EmptySpace />
            <EmptySpace />
            <EmptySpace />

            {/* Row 4 */}
            <BathroomSpace />
            <EmptySpace />
            <EmptySpace />

            {/* Bottom Section */}
            <div className="col-span-3 grid grid-cols-subgrid gap-4">
              {getRoom(1, 8) ? <RoomSpace room={getRoom(1, 8)!} /> : <EmptySpace />}
              {getRoom(2, 8) ? <RoomSpace room={getRoom(2, 8)!} /> : <EmptySpace />}
              <EmptySpace />
            </div>
          </div>
        </div>
      </Example>
    </>
  )
}

export function FrancisFirstFloor({ floorRooms }: FrancisFloorProps) {
  const getRoom = (row: number, col: number) => {
    return floorRooms.find(room => 
      room.position.row === row && room.position.col === col
    )
  }

  return (
    <>
      <Example>
        <div className="grid grid-cols-1">
          <Stripes border className="col-start-1 row-start-1 rounded-lg" />
          <div className="col-start-1 row-start-1 grid grid-cols-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
            <div className="col-span-3 row-span-3 grid grid-cols-subgrid gap-4">
              <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-3 col-end-4 row-start-1 row-end-3">
                <EmptySpace />
                <p>
                  stairs
                </p>
                <EmptySpace />
              </div>
            </div>
            <div className="col-span-3 row-span-3 grid grid-cols-subgrid gap-4">
              <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-3 col-end-4 row-start-1  ">
                <EmptySpace />
                <EmptySpace />
                <p>
                  kitchen
                </p>
                <EmptySpace />
                <EmptySpace />
              </div>
            </div>
            <div className="col-span-3 row-span-3 grid grid-cols-subgrid gap-4">
              <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-1 col-end-1 ">
                <EmptySpace />
                <p>
                  Bathroom
                </p>
                <EmptySpace />
              </div>
              <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-3 col-end-3 row-start-1 row-end-3">
                <EmptySpace />
                Pantry
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-subgrid gap-4">
              {getRoom(2, 4) ? <RoomSpace room={getRoom(2, 4)!} /> : <EmptySpace />}
              <EmptySpace />
              {getRoom(1, 4) ? <RoomSpace room={getRoom(1, 4)!} /> : <EmptySpace />}
            </div>
          </div>
        </div>
      </Example>
    </>
  )
}

export function FrancisSecondFloor({ floorRooms }: FrancisFloorProps) {
  const getRoom = (row: number, col: number) => {
    return floorRooms.find(room => 
      room.position.row === row && room.position.col === col
    )
  }

  return (
    <>
      <Example>
        <div className="grid grid-cols-1">
          <Stripes border className="col-start-1 row-start-1 rounded-lg" />
          <div className="col-start-1 row-start-1 grid grid-cols-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
            {/* Top row */}
            {getRoom(1, 1) ? <RoomSpace room={getRoom(1, 1)!} /> : <EmptySpace />}
            {getRoom(1, 2) ? <RoomSpace room={getRoom(1, 2)!} /> : <EmptySpace />}
            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">stairs</div>

            {/* Second row */}
            {getRoom(1, 3) ? <RoomSpace room={getRoom(1, 3)!} /> : <EmptySpace />}
            <EmptySpace />
            <EmptySpace />

            {/* Third row */}
            {getRoom(1, 4) ? <RoomSpace room={getRoom(1, 4)!} /> : <EmptySpace />}
            <EmptySpace />
            {getRoom(1, 5) ? <RoomSpace room={getRoom(1, 5)!} /> : <EmptySpace />}

            {/* Fourth row */}
            {getRoom(1, 6) ? <RoomSpace room={getRoom(1, 6)!} /> : <EmptySpace />}
            <EmptySpace />
            {getRoom(1, 7) ? <RoomSpace room={getRoom(1, 7)!} /> : <EmptySpace />}

            {/* Fifth row */}
            <BathroomSpace />
            <EmptySpace />
            {getRoom(1, 8) ? <RoomSpace room={getRoom(1, 8)!} /> : <EmptySpace />}

            {/* Bottom row */}
            {getRoom(1, 9) ? <RoomSpace room={getRoom(1, 9)!} /> : <EmptySpace />}
            <EmptySpace />
          </div>
        </div>
      </Example>
    </>
  )
}

