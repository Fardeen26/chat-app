import { useContext } from "react"
import { RoomIdContext } from "../context/RoomIdContext"

export const useRoomId = () => {
    const context = useContext(RoomIdContext)

    if (!context) {
        throw new Error("darkModeContext is possibly undefined!");
    }
    return context;
}