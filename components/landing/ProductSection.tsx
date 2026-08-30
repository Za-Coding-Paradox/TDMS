export function ProductSection(): React.ReactElement {
  return (
    <section className="bg-[#2B2B2B] px-[50px] py-[100px]">
      <div className="mx-auto max-w-[1080px] rounded-[20px] bg-[#FDF5DF] overflow-hidden h-[500px] relative">
        {/* Simulated TDMS dashboard */}
        <div className="absolute inset-0 flex flex-col">
          {/* Chrome bar */}
          <div className="bg-[#2B2B2B] flex items-center gap-2 px-5 py-3 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF6250]" />
            <div className="w-3 h-3 rounded-full bg-[#F8D57E]" />
            <div className="w-3 h-3 rounded-full bg-[#009379]" />
            <span className="ml-4 text-[13px] text-white/40">TDMS — PKT-2024-041 · Container 1 (40ft LC)</span>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-[180px] flex-shrink-0 bg-[#333] flex flex-col gap-1 p-3">
              {['Overview','Projects','Customers','Company','Audit Log'].map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 rounded-[8px] text-[13px]"
                  style={{ background: item === 'Projects' ? '#3B3B3B' : 'transparent', color: item === 'Projects' ? '#fff' : 'rgba(255,255,255,0.4)' }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-8 flex flex-col gap-5 bg-[#FDF5DF]">
              <div className="flex items-center justify-between">
                <p className="text-[18px] font-semibold text-[#333]">Container 1 — LC Workflow</p>
                <span className="px-3 py-1 rounded-[8px] text-[12px] font-semibold text-[#333] bg-[#F8D57E]">67% Complete</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { doc: 'Sales Contract',     st: 'Complete',    bg: '#009379', fg: '#fff'  },
                  { doc: 'Proforma Invoice',   st: 'Complete',    bg: '#009379', fg: '#fff'  },
                  { doc: 'LC Scrutiny',        st: 'Complete',    bg: '#009379', fg: '#fff'  },
                  { doc: 'Packing List',       st: 'In Progress', bg: '#F8D57E', fg: '#333'  },
                  { doc: 'Commercial Invoice', st: 'Pending',     bg: '#3B3B3B', fg: 'rgba(255,255,255,0.4)' },
                  { doc: 'Bill of Lading',     st: 'Pending',     bg: '#3B3B3B', fg: 'rgba(255,255,255,0.4)' },
                ].map((item) => (
                  <div key={item.doc} className="rounded-[12px] p-4 flex flex-col gap-2" style={{ background: item.bg }}>
                    <span className="text-[12px] font-semibold" style={{ color: item.fg }}>{item.doc}</span>
                    <span className="text-[11px]" style={{ color: item.fg, opacity: 0.8 }}>{item.st}</span>
                  </div>
                ))}
              </div>

              {/* Discrepancy alert */}
              <div className="rounded-[12px] bg-[#FF6250]/10 border border-[#FF6250]/30 px-4 py-3 flex items-center gap-3">
                <span className="text-[#FF6250] text-[18px]">!</span>
                <p className="text-[13px] text-[#333]">
                  <span className="font-semibold">1 Critical discrepancy</span> — LC amount does not match Sales Contract. Resolve before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
