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
import type { MenuItem, CartItem } from '@/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; sectorName: string; sectorCode: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'RESTORE'; payload: CartItem[] }

interface CartState {
  items: CartItem[]
  addCount: number
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.menuItem.id === action.payload.menuItem.id
      )
      if (existing) {
        return {
          ...state,
          addCount: state.addCount + 1,
          items: state.items.map((item) =>
            item.menuItem.id === action.payload.menuItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        ...state,
        addCount: state.addCount + 1,
        items: [
          ...state.items,
          {
            menuItem: action.payload.menuItem,
            sectorName: action.payload.sectorName,
            sectorCode: action.payload.sectorCode,
            quantity: 1,
          },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.menuItem.id !== action.payload.id),
      }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.menuItem.id !== action.payload.id
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.menuItem.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'RESTORE':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  addItem: (menuItem: MenuItem, sectorName: string, sectorCode: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  addCount: number
  generateWhatsAppUrl: () => string
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'bakeanaut-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], addCount: 0 })

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'RESTORE', payload: parsed })
        }
      }
    } catch {
      // Invalid data, ignore
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // Storage full or unavailable
    }
  }, [state.items])

  const addItem = useCallback(
    (menuItem: MenuItem, sectorName: string, sectorCode: string) => {
      dispatch({ type: 'ADD_ITEM', payload: { menuItem, sectorName, sectorCode } })
    },
    []
  )

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const generateWhatsAppUrl = useCallback(() => {
    return buildWhatsAppUrl(state.items)
  }, [state.items])

  return React.createElement(
    CartContext.Provider,
    {
      value: {
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        addCount: state.addCount,
        generateWhatsAppUrl,
      },
    },
    children
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
