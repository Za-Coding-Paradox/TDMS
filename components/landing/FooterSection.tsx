'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function FooterSection(): React.ReactElement {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-[#2B2B2B] relative px-[50px] py-[55px]">
      <div className="absolute top-0 left-[50px] right-[50px] h-px bg-white/20 rounded-full" />

      <div className="flex items-start justify-between gap-10">
        {/* Left — logo + links */}
        <div className="flex flex-col gap-6">
          <span className="text-[24px] font-semibold text-white leading-[24px]">TDMS</span>
          <div className="flex items-center gap-8 flex-wrap">
            {['© TDMS 2024', 'Privacy policy', 'Cookies policy', 'Terms of use'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[18px] font-semibold text-white hover:text-[#BFAFF2] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right — email signup */}
        <div className="flex flex-col gap-4 flex-shrink-0">
          <p className="text-[18px] text-white leading-[32px]">Updates right to your Inbox</p>
          <div className="flex items-center gap-4">
            <div className="bg-[#333] h-[50px] rounded-[15px] w-[301px] flex items-center px-[30px] overflow-hidden">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-[18px] text-white placeholder:text-white/40 outline-none w-full"
              />
            </div>
            <Button variant="secondary" size="md" className="w-[175px]">Send</Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
