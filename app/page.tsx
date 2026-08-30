import { TopBar }            from '@/components/landing/TopBar'
import { HeroSection }       from '@/components/landing/HeroSection'
import { LogoStrip }         from '@/components/landing/LogoStrip'
import { ProductSection }    from '@/components/landing/ProductSection'
import { FeaturesSection }   from '@/components/landing/FeaturesSection'
import { TestimonialSection } from '@/components/landing/TestimonialSection'
import { CtaSection }        from '@/components/landing/CtaSection'
import { FooterSection }     from '@/components/landing/FooterSection'

export default function LandingPage(): React.ReactElement {
  return (
    <main className="bg-[#2B2B2B] min-h-screen">
      <TopBar />
      <HeroSection />
      <LogoStrip />
      <ProductSection />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
      <FooterSection />
    </main>
  )
}
