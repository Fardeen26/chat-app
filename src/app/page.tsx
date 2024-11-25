'use client'

import { useState, useEffect } from 'react'
import ChatRoom from './components/ChatRoom'
import JoinCreate from './components/JoinCreate'
import { useWebSocket } from './hooks/useWebSocket'
import { toast } from 'sonner'

export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null)
  const { connectionStatus, lastMessage, sendMessage } = useWebSocket()

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'roomJoined') {
        setRoomId(lastMessage.payload.roomId)
      } else if (lastMessage.type === 'error') {
        toast.error(`Error: ${lastMessage.payload.message}`)
        console.log('Error:', lastMessage.payload.message)
      }
    }
  }, [lastMessage])

  const handleCreateRoom = () => {
    sendMessage({ type: 'create', payload: {} })
  }

  const handleJoinRoom = (roomCode: string) => {
    sendMessage({ type: 'join', payload: { roomId: roomCode } })
  }

  const handleLeaveRoom = () => {
    setRoomId(null)
    sendMessage({ type: 'leave', payload: {} })
  }

  const handleSendMessage = (message: string) => {
    if (roomId) {
      sendMessage({ type: 'chat', payload: { message, roomId } })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 max-sm:p-4">
      <h1 className="text-5xl max-sm:text-4xl font-bold mb-8">Chat Application</h1>
      {roomId ? (
        <>
          <ChatRoom
            roomId={roomId}
            connectionStatus={connectionStatus}
            lastMessage={lastMessage}
            onSendMessage={handleSendMessage}
          />
          <button
            onClick={handleLeaveRoom}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Leave Room
          </button>
        </>
      ) : (
        <JoinCreate
          connectionStatus={connectionStatus}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
        />
      )}
    </main>
  )
}

