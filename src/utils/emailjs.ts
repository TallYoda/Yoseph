import emailjs from '@emailjs/browser'

/* EmailJS public credentials — safe to ship in client code.
   Env vars (VITE_EMAILJS_*) override these when set. */
const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_1hpnxn6'
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_9xls194'
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'XjMQQIkNM3oBVf0P0'

let initialized = false

export async function sendContactForm(form: HTMLFormElement) {
  if (!initialized) {
    emailjs.init(PUBLIC_KEY)
    initialized = true
  }
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
    publicKey: PUBLIC_KEY,
  })
}
