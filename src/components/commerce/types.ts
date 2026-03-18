export type FulfillmentMode = 'pickup' | 'delivery'

export interface FlowState {
  quantity: number
  fulfillment: FulfillmentMode
  date: string
  time: string
  address: string
  notes: string
  name: string
  email: string
  phone: string
}

