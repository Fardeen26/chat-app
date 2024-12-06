"use client"
import { createContext, ReactNode, useState } from "react";

interface RoomIdContextType {
    currentRoomId: string;
    setCurrentRoomId: (id: string) => void;
}

export const RoomIdContext = createContext<RoomIdContextType | null>(null)


interface RoomIdProviderProps {
    children: ReactNode;
}

const RoomIdContextProvider = ({ children }: RoomIdProviderProps) => {
    const [currentRoomId, setCurrentRoomId] = useState<string>('')

    return (
        <RoomIdContext.Provider value={{ currentRoomId, setCurrentRoomId }}>
            {children}
        </RoomIdContext.Provider>
    )
}

export default RoomIdContextProvider;