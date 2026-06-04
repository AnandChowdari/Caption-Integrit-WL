import { GOOGLE_SCRIPT_URL } from '../config/api'

/**
 * Submit a waitlist entry to Google Sheets via Apps Script.
 * Uses text/plain to avoid CORS preflight while allowing reading the response.
 */
export const submitToGoogleSheets = async (formData) => {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured. Please set VITE_GOOGLE_SCRIPT_URL in your environment.')
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to connect to the waitlist server. Please try again.')
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to submit details.')
  }

  return result
}

/**
 * Fetch all waitlist users from Google Sheets via GET request.
 */
export const fetchUsers = async () => {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured.')
  }
  const response = await fetch(GOOGLE_SCRIPT_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch waitlist users.')
  }
  const data = await response.json()
  return data
}
