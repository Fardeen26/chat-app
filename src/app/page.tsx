/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import ChatRoom from './components/ChatRoom'
import JoinCreate from './components/JoinCreate'
import { useWebSocket } from './hooks/useWebSocket'
import { toast } from 'sonner'
import { MessagesSquare } from 'lucide-react'
export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null)
  const { connectionStatus, lastMessage, sendMessage } = useWebSocket()

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'roomJoined') {
        setRoomId(lastMessage.payload.roomId)
      }
      else if (lastMessage.type === 'error') {
        toast.error(`Error: ${lastMessage.payload.message}`)
        console.log('Error:', lastMessage.payload.message)
      }
    }
  }, [lastMessage])

  const handleCreateRoom = () => {
    sendMessage({ type: 'create', payload: {} })
  }

  // const handleLeaveRoom = () => {
  //   setRoomId(null)
  //   sendMessage({ type: 'leave', payload: {} })
  // }

  const handleSendMessage = (message: string) => {
    if (roomId) {
      sendMessage({ type: 'chat', payload: { message, roomId } })
    }
  }

  return (
    <main className="flex min-h-[90vh] flex-col  items-center justify-center p-0 max-sm:p-4 dark:text-black">
      <h1 className="text-4xl font-bold mb-8 flex space-x-3 items-center">
        <span><MessagesSquare className='h-8 w-8' /></span>
        <span>The Chat Haven</span>
      </h1>
      {roomId ? (
        <>
          <ChatRoom
            roomId={roomId}
            connectionStatus={connectionStatus}
            lastMessage={lastMessage}
            onSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <JoinCreate
          connectionStatus={connectionStatus}
          onCreateRoom={handleCreateRoom}
          sendMessage={sendMessage}
        />
      )}
    </main>
  )
}

