import { useState, useEffect, useRef } from 'react';
import { WebSocketMessage } from '../hooks/useWebSocket';
import { toast } from 'sonner';
import { CopyIcon } from 'lucide-react';
import { useUserId } from '../hooks/useUserId';

interface ChatRoomProps {
    roomId: string;
    connectionStatus: string;
    lastMessage: WebSocketMessage | null;
    onSendMessage: (message: string) => void;
}

interface Message {
    username: string;
    message: string;
    user_id: string;
}

export default function ChatRoom({ roomId, connectionStatus, lastMessage, onSendMessage }: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const { userId } = useUserId();

    useEffect(() => {
        if (lastMessage && lastMessage.type === 'chat') {
            setMessages((prevMessages) => [...prevMessages, lastMessage.payload]);
        }
    }, [lastMessage]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() && connectionStatus === 'connected') {
            onSendMessage(inputMessage.trim());
            setInputMessage('');
        }
    };

    if (connectionStatus !== 'connected') {
        return <div>Connecting to chat room...</div>;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomId);
        toast.success("Room Code Copied successfully");
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="w-full flex justify-between items-center px-4 py-2 rounded-lg border cursor-pointer">
                <h2 className="">Room Code: {roomId}</h2>
                <span onClick={copyToClipboard}><CopyIcon className='h-4 w-4 hover:scale-110' /></span>
            </div>
            <div className="pt-6">
                <div
                    className="mb-4 h-[60vh] flex flex-col pb-2 overflow-y-auto overflow-x-hidden"
                    ref={chatBoxRef}
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex flex-col mb-2 ${userId === msg.user_id ? 'items-end' : 'items-start'}`}>
                            <span className={`text-xs ${userId === msg.user_id ? 'mr-1' : 'mr-0'}`}>{msg.username}</span>
                            <span className='bg-white break-words dark:bg-black dark:text-white w-fit px-4 mr-1 rounded-xl h-fit p-2 mt-1 text-black'>
                                {msg.message}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full border border-gray-300 bg-black text-white dark:bg-white dark:text-black dark:border-gray-700 h-10 px-5 rounded-lg text-sm focus:outline-none"
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
    );
}
