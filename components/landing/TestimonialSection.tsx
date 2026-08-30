const STAR = 'https://www.figma.com/api/mcp/asset/6c7865c5-8d68-40c8-9d55-f7b9cea8e71b.svg'

export function TestimonialSection(): React.ReactElement {
  return (
    <section className="bg-[#2B2B2B] px-[50px] py-[80px]">
      <div className="mx-auto max-w-[1080px] rounded-[20px] bg-[#BFAFF2] px-[100px] py-[80px]">
        <blockquote className="text-[24px] font-semibold text-[#2B2B2B] leading-[40px] mb-10 max-w-[756px]">
          &ldquo;Before TDMS we were copying the same data into 12 different Word files
          for every shipment. One wrong figure in the Commercial Invoice cost us three
          weeks of delays at the bank. Now the system catches every mismatch before
          we print anything.&rdquo;
        </blockquote>

        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="w-[60px] h-[60px] rounded-full bg-[#2B2B2B] flex items-center justify-center text-[24px] font-semibold text-[#BFAFF2] flex-shrink-0">
            A
          </div>
          <div>
            <p className="text-[18px] text-[#2B2B2B]/60 leading-[32px]">Ahmed Raza — Export Manager, Karachi</p>
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map((i) => (
                <img key={i} src={STAR} alt="star" className="w-[20px] h-[20px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
