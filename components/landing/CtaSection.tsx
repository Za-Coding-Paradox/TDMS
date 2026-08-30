import { Button } from '@/components/ui/Button'

const CTA_IMG = 'https://www.figma.com/api/mcp/asset/b3598c23-1d3f-4a69-af2c-7d6d22aba76e.png'

export function CtaSection(): React.ReactElement {
  return (
    <section className="bg-[#2B2B2B] px-[50px] py-[100px] flex items-center justify-between gap-10">
      {/* Left */}
      <div className="flex flex-col gap-6 max-w-[500px]">
        <h2 className="text-[60px] font-semibold text-white leading-[90px]">
          Questions?{'\n'}Let&apos;s talk.
        </h2>
        <p className="text-[18px] text-white/40 leading-[32px] max-w-[400px]">
          Reach us at any time through our contact form.
          <br />
          We&apos;re always happy to help.
        </p>
        <Button href="/auth/register" variant="primary" size="md" className="w-fit">
          Get started
        </Button>
      </div>

      {/* Right — Figma illustration */}
      <div className="w-[500px] h-[400px] flex-shrink-0 rounded-[20px] overflow-hidden">
        <img src={CTA_IMG} alt="Get started illustration" className="w-full h-full object-cover" />
      </div>
    </section>
  )
}
