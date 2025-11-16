import { useWebSocket } from '@vueuse/core'
import { watch, onUnmounted } from 'vue'

type WebSocketMessageType = 'round' | 'factors' | 'last-results' | undefined

interface WebSocketMessage<T = unknown> {
  type: WebSocketMessageType
  data: T
}

type EventType = 'WS_ROUND' | 'WS_FACTORS' | 'WS_LAST_RESULTS'

interface EmittedEvent {
  type: EventType
  data: unknown
}

// Инициализация WebSocket
const { status, data, send, open, close } = useWebSocket('wss://buleto.com/ws', {
  autoReconnect: true,
  onConnected: (ws: WebSocket) => {
    console.log('ws connected')
  },
  onError: (ws: WebSocket, event: Event) => {
    console.log('ws error: ', event)
  },
  onDisconnected: (ws: WebSocket, event: Event) => {
    console.log('ws closing')
  },
})

const emitEvent = (type: EventType, data: unknown): void => {
  const event: EmittedEvent = { type, data }
  console.log(event)
}

const handleWebSocketMessages = () => {
  watch(data, (newData: string | null) => {
    if (!newData) return

    try {
      const message: WebSocketMessage = JSON.parse(newData)
      if (!message) return

      const { type, data: messageData } = message

      switch (type) {
        case 'round':
          emitEvent('WS_ROUND', messageData)
          break
        case 'factors':
          emitEvent('WS_FACTORS', messageData)
          break
        case 'last-results':
          emitEvent('WS_LAST_RESULTS', messageData)
          break
        default:
          if (!type) console.log('message', message)
      }
    } catch (e: unknown) {
      console.error('Error processing WebSocket message:', e instanceof Error ? e.message : e)
    }
  })
}
handleWebSocketMessages()
onUnmounted(() => {
  close()
  console.log('ws off')
})

