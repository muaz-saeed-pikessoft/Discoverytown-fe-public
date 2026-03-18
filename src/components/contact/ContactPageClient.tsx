'use client'

import type { ContactFormState } from './types'

import { useState } from 'react'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1.5px solid #E2E8F0',
  borderRadius: 12,
  padding: '11px 12px',
  fontSize: 14,
  color: '#1E293B',
  outline: 'none',
}

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    topic: 'general',
    message: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#EEF5FC', fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 300 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/play/backimg3.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(120deg, rgba(10,20,50,0.92) 0%, rgba(10,20,50,0.70) 56%, rgba(10,20,50,0.35) 100%)',
          }}
        />

        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '62px 28px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: '#FF5A4E' }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#FF5A4E',
              }}
            >
              Contact Us
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#fff',
              fontSize: 'clamp(2rem,4.2vw,3.1rem)',
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Full Contact & Support Center
          </h1>
          <p style={{ marginTop: 12, maxWidth: 680, color: 'rgba(255,255,255,0.9)', fontSize: 15, lineHeight: 1.7 }}>
            Questions, bookings, catering, cafe orders, and event requests. Share your details and our team can respond
            with exact next steps.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 16,
          }}
          className='contact-grid'
        >
          <section
            style={{
              background: '#fff',
              borderRadius: 22,
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 8px 26px rgba(15,31,61,0.06)',
            }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 800,
                color: '#FF5A4E',
              }}
            >
              Send Message
            </p>
            <h2
              style={{
                marginTop: 6,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 28,
                color: '#0F1F3D',
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Tell us what you need
            </h2>

            <form onSubmit={handleSubmit} style={{ marginTop: 14, display: 'grid', gap: 10 }}>
              <input
                style={inputStyle}
                placeholder='Full Name'
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                style={inputStyle}
                type='email'
                placeholder='Email Address'
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <input
                style={inputStyle}
                placeholder='Phone Number'
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
              <select
                style={inputStyle}
                value={form.topic}
                onChange={e => setForm(prev => ({ ...prev, topic: e.target.value as ContactFormState['topic'] }))}
              >
                <option value='general'>General Question</option>
                <option value='cafe-order'>Cafe Order</option>
                <option value='catering'>Catering</option>
                <option value='party'>Birthday/Party Booking</option>
                <option value='support'>Account Support</option>
              </select>
              <textarea
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120, fontFamily: 'inherit' }}
                placeholder='Your request, timeline, quantity, and any notes...'
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                required
              />

              <button
                type='submit'
                style={{
                  border: 'none',
                  background: '#00C49A',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '12px 16px',
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Submit Contact Request
              </button>

              {submitted && (
                <div
                  style={{
                    borderRadius: 12,
                    padding: '10px 12px',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    color: '#065F46',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Request captured. Next step: connect this form to your API/email endpoint.
                </div>
              )}
            </form>
          </section>

          <section style={{ display: 'grid', gap: 14 }}>
            <article
              style={{
                borderRadius: 22,
                border: '1px solid #E2E8F0',
                background: '#fff',
                padding: '22px',
                boxShadow: '0 8px 24px rgba(15,31,61,0.05)',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#0F1F3D',
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                Direct Contact
              </h3>
              <div style={{ marginTop: 12, display: 'grid', gap: 8, color: '#334155', fontSize: 14 }}>
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Email:</strong> hello@discoverytown.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Discovery Lane, Suite 100
                </p>
                <p>
                  <strong>Hours:</strong> Mon-Fri 9am-7pm · Sat-Sun 9am-6pm
                </p>
              </div>
            </article>

            <article
              style={{
                borderRadius: 22,
                border: '1px solid #E2E8F0',
                background: '#fff',
                padding: '22px',
                boxShadow: '0 8px 24px rgba(15,31,61,0.05)',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#0F1F3D',
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                Quick Links
              </h3>
              <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                <Link href='/book' style={linkStyle}>
                  Book Play Session
                </Link>
                <Link href='/cafeAndfood' style={linkStyle}>
                  Open Cafe Menu
                </Link>
                <Link href='/play' style={linkStyle}>
                  Play Programs
                </Link>
                <Link href='/events' style={linkStyle}>
                  Events & Parties
                </Link>
              </div>
            </article>

            <article
              style={{
                borderRadius: 22,
                border: '1px solid #CDEBFF',
                background: 'linear-gradient(140deg, #EAF6FF 0%, #FFFFFF 100%)',
                padding: '22px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#0F1F3D',
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                Response SLA
              </h3>
              <p style={{ marginTop: 8, color: '#334155', fontSize: 14, lineHeight: 1.7 }}>
                General support responses are usually within 1 business day. Same-day responses for active cafe orders,
                delivery, and catering requests.
              </p>
            </article>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 10,
  border: '1px solid #E2E8F0',
  padding: '9px 11px',
  fontSize: 13,
  fontWeight: 700,
  textDecoration: 'none',
  color: '#2563EB',
  background: '#fff',
}
