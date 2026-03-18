export type LoginFormValues = {
  email: string
  password: string
}

export type RegisterFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  agreeToTerms: boolean
}

export type DropInChildInfoValues = {
  childName: string
  childAge: string
  parentName: string
  parentPhone: string
  emergencyContact: string
  allergies: string
  waiverAccepted: boolean
}

export type PartyBookingValues = {
  packageId: string
  date: string
  startTime: string
  selectedAddOnIds: string[]
  birthdayChildName: string
  birthdayChildAge: string
  contactFirstName: string
  contactLastName: string
  contactEmail: string
  contactPhone: string
  guestCount: string
  specialRequests: string
}

export type ProfileEditValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
}
