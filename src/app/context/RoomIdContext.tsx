/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, ReactNode, useState } from "react";

interface DarkModeContextType {
    currentRoomId: string;
    setCurrentRoomId: any;
}

export const RoomIdContext = createContext<DarkModeContextType | null>(null)


interface DarkModeProviderProps {
    children: ReactNode;
}

const RoomIdContextProvider = ({ children }: DarkModeProviderProps) => {
    const [currentRoomId, setCurrentRoomId] = useState<string>('')

    return (
        <RoomIdContext.Provider value={{ currentRoomId, setCurrentRoomId }}>
            {children}
        </RoomIdContext.Provider>
    )
}

export default RoomIdContextProvider;