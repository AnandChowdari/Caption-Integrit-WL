// ─── Google Apps Script Deployment URL ───────────────────────────────────────
// 1. Open Google Sheets → Extensions → Apps Script
// 2. Paste the code from INTEGRIT_MASTER_PROMPT.md
// 3. Deploy → New Deployment → Web App
//    Execute as: Me | Access: Anyone
// 4. Copy the deployment URL and replace the string below

export const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycby28dFrqHkO53f-hL0y0qtQo4NiOlAic8xj8KLf0SAozKURlE1NAX7axqIm3PM9YMNFiQ/exec"
