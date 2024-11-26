/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRoomId } from './useRoomId'
import { toast } from 'sonner'

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected'

export interface WebSocketMessage {
    type: string
    payload: any
}

export function useWebSocket() {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting')
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
    const ws = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const { setCurrentRoomId } = useRoomId();

    const connect = useCallback(() => {
        console.log('Attempting to connect to WebSocket')
        ws.current = new WebSocket('ws://localhost:8080')

        ws.current.onopen = () => {
            console.log('WebSocket connected')
            setConnectionStatus('connected')
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current)
                reconnectTimeoutRef.current = null
            }
        }

        ws.current.onclose = () => {
            console.log('WebSocket disconnected')
            setConnectionStatus('disconnected')
            reconnectTimeoutRef.current = setTimeout(connect, 3000)
        }

        ws.current.onerror = (error) => {
            console.log('WebSocket error:', error)
            setConnectionStatus('disconnected')
        }

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if (message.type == 'roomCreated') {
                toast.success('Room Created Successfully')
                setCurrentRoomId(message.payload.roomId);
            }
            console.log(message)
            if (message.type == 'roomJoined') {
                toast.success('Room Joined Successfully')
            }

            setLastMessage(message)
        }
    }, [])

    useEffect(() => {
        connect()
        return () => {
            if (ws.current) {
                console.log('Closing WebSocket connection')
                ws.current.close()
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current)
            }
        }
    }, [connect])

    const sendMessage = useCallback((message: WebSocketMessage) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            console.log('Sending message:', message)
            if (message.type == 'leave') {
                setCurrentRoomId('');
            }
            ws.current.send(JSON.stringify(message))
        } else {
            toast.error(`WebSocket is not open. Current state: ${ws.current?.readyState}`)
            console.log('WebSocket is not open. Current state:', ws.current?.readyState)
        }
    }, [])

    return { connectionStatus, lastMessage, sendMessage }
}

