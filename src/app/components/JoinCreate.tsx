import { useState } from 'react'
import { useRoomId } from '../hooks/useRoomId'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentRoomId);
        toast.success("Room Code Copied successfully")
    };

    return (
        <div className="space-y-4 w-[40vw] max-sm:w-full">
            <div className='text-sm'>Connection status: {connectionStatus}</div>
            <div className="flex flex-col space-y-2 pb-4">
                <input
                    type="text"
                    placeholder="Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="border border-gray-300 bg-black dark:bg-white dark:border-gray-700 h-10 px-5 rounded-lg text-sm focus:outline-none"
                />
                <button
                    onClick={handleJoinRoom}
                    className="bg-white hover:bg-gray-200 dark:bg-black dark:text-white text-black py-2 px-4 rounded max-sm:rounded-lg"
                    disabled={connectionStatus !== 'connected'}
                >
                    Join Room
                </button>
            </div>
            <hr className='opacity-30 dark:opacity-100 rounded-full dark:bg-gray-950' />
            <div className="pt-4 text-center">
                <button
                    onClick={onCreateRoom}
                    className="hover:bg-[#1E41B2] bg-blue-600 w-full text-white py-2 px-4 rounded max-sm:rounded-lg"
                    disabled={connectionStatus !== 'connected'}
                >
                    Create Room
                </button>
                {currentRoomId && (
                    <div className="mt-2 p-2 rounded flex flex-col">
                        <span className='opacity-70 text-sm'>Share this code with anyone to invite them to join the room</span>

                        <div className="flex justify-center items-center space-x-1 mt-1 cursor-pointer" onClick={copyToClipboard}>
                            <span className="text-xl font-semibold">{currentRoomId}</span>
                            <span> <CopyIcon className='h-4 w-4' /> </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

