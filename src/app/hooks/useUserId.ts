import { useContext } from "react"
import { UserIdContext } from "../context/UserIdContext";

export const useUserId = () => {
    const context = useContext(UserIdContext)

    if (!context) {
        throw new Error("UserIdContext is possibly undefined!");
    }
    return context;
}