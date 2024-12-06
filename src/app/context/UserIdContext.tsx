"use client"
import { createContext, ReactNode, useState } from "react";

interface UserIdContextType {
    userId: string;
    setUserId: (id: string) => void;
}

export const UserIdContext = createContext<UserIdContextType | null>(null)


interface UserIdProviderProps {
    children: ReactNode;
}

const UserIdContextProvider = ({ children }: UserIdProviderProps) => {
    const [userId, setUserId] = useState<string>('')

    return (
        <UserIdContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserIdContext.Provider>
    )
}

export default UserIdContextProvider;
