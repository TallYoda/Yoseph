import type { FormEvent } from 'react'
import { useRef, useState } from 'react'
import { sendContactForm } from '../../utils/emailjs'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  )
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formRef.current) return

    setStatus('sending')
    setFeedback('')
    try {
      await sendContactForm(formRef.current)
      setStatus('success')
      setFeedback('Message sent. Thank you for reaching out.')
      formRef.current.reset()
    } catch (error) {
      setStatus('error')
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Unable to send right now. Please try again soon.'
      )
    }
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="user_name" required />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="user_email" required />
      </label>
      <label className="full">
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <div className="form-actions">
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        {feedback && <p className={`form-feedback ${status}`}>{feedback}</p>}
      </div>
    </form>
  )
}

