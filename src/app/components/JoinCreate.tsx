import { useState } from 'react'
import { useRoomId } from '../hooks/useRoomId'

interface JoinCreateProps {
    connectionStatus: string
    onCreateRoom: () => void
    onJoinRoom: (roomCode: string) => void
}

export default function JoinCreate({ connectionStatus, onCreateRoom, onJoinRoom }: JoinCreateProps) {
    const [roomCode, setRoomCode] = useState('')
    const { currentRoomId } = useRoomId();
    const handleJoinRoom = () => {
        if (roomCode) {
            onJoinRoom(roomCode)
        }
    }

    return (
        <div className="space-y-4">
            <div>Connection status: {connectionStatus}</div>
            <button
                onClick={onCreateRoom}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={connectionStatus !== 'connected'}
            >
                Create Room
            </button>
            {currentRoomId && (
                <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                    Room created! Code: {currentRoomId}
                </div>
            )}
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                />
                <button
                    onClick={handleJoinRoom}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    disabled={connectionStatus !== 'connected'}
                >
                    Join Room
                </button>
            </div>
        </div>
    )
}

