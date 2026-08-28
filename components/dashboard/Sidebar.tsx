'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  companyName: string
}

interface NavItem {
  label: string
  href: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview',         href: '/dashboard',                  icon: '⊞' },
  { label: 'Projects',         href: '/dashboard/projects',         icon: '◈' },
  { label: 'Customers',        href: '/dashboard/customers',        icon: '◉' },
  { label: 'Company Profile',  href: '/dashboard/company',          icon: '◎' },
  { label: 'Audit Log',        href: '/dashboard/audit',            icon: '≡' },
]

export function Sidebar({ companyName }: SidebarProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className="flex h-full flex-col transition-all duration-200"
      style={{
        width: collapsed ? '60px' : '220px',
        backgroundColor: '#1a2332',
        borderRight: '1px solid #243044',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{ borderBottom: '1px solid #243044' }}
      >
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: '#C9A84C' }}>
              TDMS
            </p>
            <p className="text-xs truncate mt-0.5" style={{ color: '#6B8CAE' }}>
              {companyName}
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex-shrink-0 rounded p-1 transition-colors"
          style={{ color: '#6B8CAE' }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className="flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors"
              style={{
                backgroundColor: isActive ? '#243044' : 'transparent',
                color: isActive ? '#E8E0D0' : '#6B8CAE',
              }}
            >
              <span className="flex-shrink-0 text-base">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-2 py-3"
        style={{ borderTop: '1px solid #243044' }}
      >
        <Link
          href="/auth/login"
          className="flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors w-full"
          style={{ color: '#6B8CAE' }}
          title={collapsed ? 'Sign out' : undefined}
        >
          <span className="flex-shrink-0">⇥</span>
          {!collapsed && <span>Sign out</span>}
        </Link>
      </div>
    </aside>
  )
}
