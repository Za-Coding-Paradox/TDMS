const DOCS = [
  'Sales Contract',
  'Proforma Invoice',
  'Commercial Invoice',
  'Packing List',
  'Bill of Lading',
  'Certificate of Origin',
  'Shipping Bill',
  'Bill of Exchange',
]

export function LogoStrip(): React.ReactElement {
  return (
    <section className="bg-[#2B2B2B] relative px-[50px] py-[30px]">
      <div className="absolute top-0 left-[100px] right-[100px] h-px bg-white/20 rounded-full" />
      <div className="absolute bottom-0 left-[100px] right-[100px] h-px bg-white/20 rounded-full" />
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {DOCS.map((doc) => (
          <span key={doc} className="text-[15px] font-semibold text-white/40 whitespace-nowrap">
            {doc}
          </span>
        ))}
      </div>
    </section>
  )
}
