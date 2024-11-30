import React, { useState } from 'react'
import { Room } from '../page'
import { toast } from 'sonner'
import { UsersRoundIcon } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AvailableRooms({ rooms, sendMessage }: { rooms: Room[], sendMessage: any }) {
    const [username, setUsername] = useState('')

    const handleJoinRoom = (roomCode: string) => {
        if (!roomCode) {
            return toast.error('Room Code required')
        }
        if (!username) {
            return toast.error('Username required')
        }
        sendMessage({ type: 'join', payload: { username, roomId: roomCode } })
    }

    return (
        <div className='w-full flex flex-wrap justify-center gap-4 pb-5 px-40 max-sm:px-4'>
            {
                rooms ? rooms.map((room: Room, idx) => (
                    <article className="w-[40vw] max-sm:w-full bg-transparent rounded-xl border dark:border-gray-500 border-gray-600" key={idx}>
                        <div className="p-6 space-y-3">
                            <header className='flex justify-between border-gray-600 dark:text-black'>
                                <h2 className="text-[15px] font-normal ">Room Code</h2>
                                <div className="flex items-center justify-center gap-2">
                                    <span>
                                        <UsersRoundIcon className='h-4 w-4' />
                                    </span>
                                    <span className="text-[15px]">
                                        {room.users.length} active user
                                    </span>
                                </div>
                            </header>

                            <main className="space-y-4">
                                <div
                                    className="font-mono text-2xl tracking-wider font-bold border dark:border-gray-500 border-gray-600 dark:text-black text-white rounded p-1 text-center"
                                    aria-label={`Room code: ${room.id}`}
                                >
                                    {room.id}
                                </div>


                            </main>

                            <footer>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border border-black text-black w-full px-4 py-2 rounded-lg mb-3 placeholder:text-black"
                                />
                                <button
                                    className="w-full h-11 font-normal hover:bg-green-600 text-black bg-green-500 rounded-lg transition-colors focus:outline-none focus:ring-offset-2"
                                    onClick={() => handleJoinRoom(room.id)}
                                >
                                    Join Room
                                </button>
                            </footer>
                        </div>
                    </article>
                )) : <span>No Room Available</span>
            }
        </div>
    )
}