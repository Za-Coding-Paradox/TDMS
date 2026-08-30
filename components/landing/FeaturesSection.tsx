// Using Figma asset URLs directly — valid for 7 days from fetch
const ICON_DOC  = 'https://www.figma.com/api/mcp/asset/a481582d-c420-46f5-b87b-96e62fd52b51.svg'
const ICON_COIN = 'https://www.figma.com/api/mcp/asset/c9d4cc1c-5f02-4c50-ac26-f76c285d6131.svg'
const ICON_BAG  = 'https://www.figma.com/api/mcp/asset/631e466d-4849-44be-82ff-9861c9e12ce1.svg'

const FEATURES = [
  {
    icon: ICON_DOC,
    title: 'Enter data once',
    body:  'Fill in your Sales Contract one time. Every downstream document — Proforma Invoice, Packing List, Commercial Invoice — auto-populates from it.',
  },
  {
    icon: ICON_COIN,
    title: 'AI document analysis',
    body:  'Upload scanned returning documents. Vision AI reads them and auto-fills the review form. You check, correct, and confirm before any comparison runs.',
  },
  {
    icon: ICON_BAG,
    title: 'LC compliance engine',
    body:  'Field-by-field comparison between your LC and every document. Critical flags block progression. Nothing reaches the bank with an unresolved error.',
  },
]

export function FeaturesSection(): React.ReactElement {
  return (
    <section className="bg-[#2B2B2B] px-[50px] py-[80px]">
      <div className="flex justify-center gap-[50px] flex-wrap">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center gap-5 w-[311px]">
            <img src={f.icon} alt={f.title} className="w-[70px] h-[70px]" />
            <p className="text-[18px] font-semibold text-white leading-[32px]">{f.title}</p>
            <p className="text-[18px] text-white/40 leading-[32px] w-[255px]">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
