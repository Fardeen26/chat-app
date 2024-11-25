import { useState, useEffect } from 'react'
import { WebSocketMessage } from '../hooks/useWebSocket'

interface ChatRoomProps {
    roomId: string
    connectionStatus: string
    lastMessage: WebSocketMessage | null
    onSendMessage: (message: string) => void
}

interface Message {
    userId: string
    message: string
}

export default function ChatRoom({ roomId, connectionStatus, lastMessage, onSendMessage }: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState('')

    useEffect(() => {
        if (lastMessage && lastMessage.type === 'chat') {
            setMessages((prevMessages) => [...prevMessages, lastMessage.payload])
        }
    }, [lastMessage])

    const handleSendMessage = () => {
        if (inputMessage.trim() && connectionStatus === 'connected') {
            onSendMessage(inputMessage.trim())
            setInputMessage('')
        }
    }

    if (connectionStatus !== 'connected') {
        return <div>Connecting to chat room...</div>
    }

    return (
        <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Room: {roomId}</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 h-64 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-bold">{msg.userId}: </span>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

