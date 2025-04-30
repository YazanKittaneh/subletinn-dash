"use client"

import { francis0, francis1, francis2, FrancisAmenities } from "../types/map-data"
import { Example } from "./example"
import { BathroomSpace } from "./rooms/bathroom"
import { EmptySpace } from "./rooms/empty-space"
import { KitchenSpace } from "./rooms/kitchen-space"
import { RoomSpace } from "./rooms/room-space"
import { Stripes } from "./stripes"


export function FrancisBasement() {
    return (
        <>
            <Example>
                <div className="grid grid-cols-1">
                    <Stripes border className="col-start-1 row-start-1 rounded-lg" />
                    {
                        <div className="col-start-1 row-start-1 grid grid-cols-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
                            <RoomSpace room={francis0[0]}></RoomSpace>
                            <EmptySpace ></EmptySpace>
                            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900">stairs</div>

                            <RoomSpace room={francis0[1]}></RoomSpace>
                            <EmptySpace ></EmptySpace>
                            <EmptySpace ></EmptySpace>

                            <EmptySpace ></EmptySpace>
                            <EmptySpace ></EmptySpace>
                            <EmptySpace ></EmptySpace>

                            <BathroomSpace></BathroomSpace>
                            <EmptySpace ></EmptySpace>
                            <EmptySpace ></EmptySpace>

                            <div className="col-span-3 grid grid-cols-subgrid gap-4">
                                <RoomSpace room={francis0[2]}></RoomSpace>
                                <RoomSpace room={francis0[3]}></RoomSpace>
                                <EmptySpace ></EmptySpace>

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
                        <div className="col-start-1 row-start-1 grid grid-cols-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
                            <div className="col-span-3 row-span-3 grid grid-cols-subgrid gap-4">
                                <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-3 col-end-4 row-start-1 row-end-3">
                                    <EmptySpace ></EmptySpace>
                                    <p>
                                        stairs
                                    </p>
                                    <EmptySpace ></EmptySpace>
                                </div>
                            </div>
                            <div className="col-span-3 row-span-3 grid grid-cols-subgrid gap-4">
                                <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-3 col-end-4 row-start-1  ">
                                    <EmptySpace ></EmptySpace>
                                    <EmptySpace ></EmptySpace>
                                    <p>
                                        kitchen
                                    </p>
                                    <EmptySpace ></EmptySpace>
                                    <EmptySpace ></EmptySpace>
                                </div>

                            </div>
                            <div className="col-span-3 row-span-3 grid grid-cols-subgrid gap-4">
                                <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-1 col-end-1 ">
                                    <EmptySpace ></EmptySpace>
                                    <p>
                                        Bathroom
                                    </p>
                                    <EmptySpace ></EmptySpace>
                                </div>
                                <div className="rounded-lg  bg-indigo-300 p-4 dark:bg-indigo-900  col-start-3 col-end-3 row-start-1 row-end-3">
                                    <EmptySpace ></EmptySpace>
                                    Pantry
                                </div>
                            </div>


                            <div className="col-span-3 grid grid-cols-subgrid gap-4">
                                <RoomSpace room={francis1[0]}></RoomSpace>
                                <EmptySpace ></EmptySpace>
                                <RoomSpace room={francis1[1]}></RoomSpace>

                            </div>
                        </div>
                    }
                </div>
            </Example>
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
                        <div className="col-start-1 row-start-1 grid grid-cols-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
                            <RoomSpace room={francis2[4]}></RoomSpace>
                            <RoomSpace room={francis2[5]}></RoomSpace>
                            <div className="rounded-lg bg-indigo-300 p-4 dark:bg-indigo-900 ">stairs</div>

                            <RoomSpace room={francis2[3]}></RoomSpace>
                            <EmptySpace ></EmptySpace>
                            <EmptySpace ></EmptySpace>

                            <RoomSpace room={francis2[2]}></RoomSpace>
                            <EmptySpace ></EmptySpace>
                            <RoomSpace room={francis2[6]}></RoomSpace>


                            <RoomSpace room={francis2[1]}></RoomSpace>
                            <EmptySpace ></EmptySpace>
                            <RoomSpace room={francis2[7]}></RoomSpace>

                            <BathroomSpace></BathroomSpace>
                            <EmptySpace ></EmptySpace>
                            <RoomSpace room={francis2[8]}></RoomSpace>

                            <RoomSpace room={francis2[0]}></RoomSpace>
                            <EmptySpace ></EmptySpace>


                        </div>
                    }
                </div>
            </Example >
        </>
    )
}

