'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import React from 'react'
import type { CartItem } from '@/types'

export interface MissionOrderItem {
  menuItemId: string
  menuItemName: string
  sectorName: string
  sectorCode: string
  quantity: number
}

export interface MissionOrder {
  id: string
  items: MissionOrderItem[]
  totalItems: number
  timestamp: number
}

interface MissionLogState {
  orders: MissionOrder[]
}

type MissionLogAction =
  | { type: 'LOG_ORDER'; payload: MissionOrder }
  | { type: 'CLEAR_LOG' }
  | { type: 'RESTORE'; payload: MissionOrder[] }

const MAX_ORDERS = 20

function missionLogReducer(state: MissionLogState, action: MissionLogAction): MissionLogState {
  switch (action.type) {
    case 'LOG_ORDER': {
      const orders = [action.payload, ...state.orders].slice(0, MAX_ORDERS)
      return { ...state, orders }
    }
    case 'CLEAR_LOG':
      return { ...state, orders: [] }
    case 'RESTORE':
      return { ...state, orders: action.payload }
    default:
      return state
  }
}

interface MissionLogContextValue {
  orders: MissionOrder[]
  lastOrder: MissionOrder | null
  logOrder: (items: CartItem[]) => void
  clearLog: () => void
}

const MissionLogContext = createContext<MissionLogContextValue | null>(null)

const STORAGE_KEY = 'bakeanaut-mission-log'

export function MissionLogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(missionLogReducer, { orders: [] })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.orders && Array.isArray(parsed.orders) && parsed.orders.length > 0) {
          dispatch({ type: 'RESTORE', payload: parsed.orders })
        }
      }
    } catch {
      // Invalid data, ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ orders: state.orders }))
    } catch {
      // Storage full or unavailable
    }
  }, [state.orders])

  const logOrder = useCallback((items: CartItem[]) => {
    if (items.length === 0) return
    const order: MissionOrder = {
      id: `mission-${Date.now()}`,
      items: items.map((ci) => ({
        menuItemId: ci.menuItem.id,
        menuItemName: ci.menuItem.name,
        sectorName: ci.sectorName,
        sectorCode: ci.sectorCode,
        quantity: ci.quantity,
      })),
      totalItems: items.reduce((sum, ci) => sum + ci.quantity, 0),
      timestamp: Date.now(),
    }
    dispatch({ type: 'LOG_ORDER', payload: order })
  }, [])

  const clearLog = useCallback(() => {
    dispatch({ type: 'CLEAR_LOG' })
  }, [])

  const lastOrder = state.orders.length > 0 ? state.orders[0] : null

  return React.createElement(
    MissionLogContext.Provider,
    {
      value: {
        orders: state.orders,
        lastOrder,
        logOrder,
        clearLog,
      },
    },
    children
  )
}

export function useMissionLog(): MissionLogContextValue {
  const context = useContext(MissionLogContext)
  if (!context) {
    throw new Error('useMissionLog must be used within a MissionLogProvider')
  }
  return context
}
