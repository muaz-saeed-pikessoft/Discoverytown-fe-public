export type ContactFormState = {
  name: string
  email: string
  phone: string
  topic: 'general' | 'cafe-order' | 'catering' | 'party' | 'support'
  message: string
}
