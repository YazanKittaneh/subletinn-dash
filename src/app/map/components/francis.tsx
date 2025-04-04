"use client"

import { francis0, francis1, francis2, FrancisAmenities } from "../types/map-data"
import { Example } from "./example"
import { BathroomSpace } from "./rooms/bathroom"
import { EmptySpace } from "./rooms/empty-space"
import { RoomSpace } from "./rooms/room-space"
import { Stripes } from "./stripes"


export function FrancisBasement() {
    return (
        <>
            <Example>
                <div className="grid grid-cols-1">
                    <Stripes border className="col-start-1 row-start-1 rounded-lg" />
                    {

                        <div className="col-start-1 row-start-1 grid grid-cols-4 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
                            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">stairs</div>
                            <EmptySpace ></EmptySpace>
                            <EmptySpace></EmptySpace>
                            <RoomSpace room={francis0[0]}></RoomSpace>
                            <RoomSpace room={francis0[1]}></RoomSpace>
                            <div className="col-span-3 grid grid-cols-subgrid gap-4">
                                <RoomSpace room={francis0[2]}></RoomSpace>
                                <BathroomSpace></BathroomSpace>
                                <RoomSpace room={francis0[3]}></RoomSpace>
                            </div>
                        </div>
                    }
                </div>
            </Example>
        </>
    )
}

export function FrancisFirstFloor() {
    return (
        <>
            <Example>
                <div className="grid grid-cols-1">
                    <Stripes border className="col-start-1 row-start-1 rounded-lg" />
                    {
                        <div className="col-start-1 row-start-1 grid grid-cols-4 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
                            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">Living Room</div>
                            <div className="col-span-3 grid grid-cols-subgrid gap-4">
                                <EmptySpace></EmptySpace>
                                <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">Kitchen</div>
                                <RoomSpace room={francis1[1]}></RoomSpace>
                                <EmptySpace></EmptySpace>
                                <BathroomSpace></BathroomSpace>
                                <RoomSpace room={francis1[0]}></RoomSpace>
                            </div>

                        </div>
                    }
                </div>
            </Example >
        </>
    )
}

export function FrancisSecondFloor() {
    return (
        <>
            <Example>
                <div className="grid grid-cols-1">
                    <Stripes border className="col-start-1 row-start-1 rounded-lg" />
                    {
                        <div className="grid grid-cols-6 gap-4 sm:gap-0 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
                            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">stairs</div>
                            <EmptySpace></EmptySpace>
                            <div className="col-span-4 grid grid-cols-subgrid gap-4">

                                <RoomSpace room={francis2[6]}></RoomSpace>
                                <RoomSpace room={francis2[7]}></RoomSpace>
                                <RoomSpace room={francis2[8]}></RoomSpace>

                            </div>

                            <div className="row-start-2 col-span-4 grid grid-cols-subgrid gap-4">
                                <RoomSpace room={francis2[5]}></RoomSpace>
                                <EmptySpace></EmptySpace>
                                <EmptySpace></EmptySpace>
                                <EmptySpace></EmptySpace>
                                <EmptySpace></EmptySpace>


                            </div>
                            <div className="row-start-3 col-span-8 min-sm:col-span-6 grid grid-cols-subgrid gap-4">
                                <RoomSpace room={francis2[4]}></RoomSpace>
                                <RoomSpace room={francis2[3]}></RoomSpace>
                                <RoomSpace room={francis2[2]}></RoomSpace>
                                <RoomSpace room={francis2[1]}></RoomSpace>
                                <BathroomSpace></BathroomSpace>
                                <RoomSpace room={francis2[0]}></RoomSpace>

                            </div>

                        </div>
                    }
                </div>
            </Example >
        </>
    )
}