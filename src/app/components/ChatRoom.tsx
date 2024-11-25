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
        <div className="w-full h-full max-w-2xl">
            <h2 className="mb-4 border py-2 px-4 rounded-lg">Room Code: {roomId}</h2>
            <div className="pt-6">
                <div className="mb-4 h-[60vh] flex flex-col pb-2 overflow-y-auto">
                    {messages.map((msg, index) => (
                        // <div key={index} className="mb-2">
                        <span key={index} className='bg-white w-fit px-4 mr-1 rounded-xl h-fit p-2 mt-2 text-black'>{msg.message}</span>

                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full border border-gray-300 bg-black h-10 px-5 rounded-lg text-sm focus:outline-none"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="hover:bg-[#1E41B2] bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

