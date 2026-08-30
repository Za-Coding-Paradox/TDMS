import { Button } from '@/components/ui/Button'

const PIPELINE_STAGES = [
  { label: 'Sales Contract',    status: 'Complete',    color: '#009379' },
  { label: 'Proforma Invoice',  status: 'Complete',    color: '#009379' },
  { label: 'LC Scrutiny',       status: 'Complete',    color: '#009379' },
  { label: 'Packing List',      status: 'In Progress', color: '#F8D57E' },
  { label: 'Commercial Invoice',status: 'Pending',     color: 'rgba(255,255,255,0.2)' },
  { label: 'Bill of Lading',    status: 'Pending',     color: 'rgba(255,255,255,0.2)' },
  { label: 'Bank Package',      status: 'Pending',     color: 'rgba(255,255,255,0.2)' },
]

export function HeroSection(): React.ReactElement {
  return (
    <section className="bg-[#2B2B2B] px-[50px] py-[80px] flex items-center justify-between gap-10 min-h-[600px]">
      {/* Left */}
      <div className="flex flex-col gap-8 max-w-[465px] flex-shrink-0">
        <h1 className="text-[60px] font-semibold text-white leading-[90px]">
          Trade docs,<br />on autopilot.
        </h1>
        <p className="text-[18px] text-white/40 leading-[32px] max-w-[461px]">
          From Sales Contract to bank submission package — every document
          generated, verified, and print-ready. Built for Pakistani textile exporters.
        </p>
        <Button href="/auth/register" variant="primary" size="md" className="w-fit">
          Get started
        </Button>
      </div>

      {/* Right — TDMS pipeline preview */}
      <div className="bg-[#333] rounded-[20px] w-[500px] h-[446px] flex-shrink-0 flex flex-col justify-center px-8 gap-3">
        <p className="text-[12px] font-semibold text-white/40 uppercase tracking-widest mb-2">
          LC Workflow · Container 1
        </p>
        {PIPELINE_STAGES.map((stage) => (
          <div
            key={stage.label}
            className="flex items-center justify-between px-5 py-3 rounded-[10px] bg-white/5"
          >
            <span className="text-[15px] text-white">{stage.label}</span>
            <span className="text-[13px] font-semibold" style={{ color: stage.color }}>
              {stage.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
