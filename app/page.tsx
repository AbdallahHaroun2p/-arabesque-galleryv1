import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import FeaturedProducts from "@/components/featured-products"
import CraftsmenSection from "@/components/craftsmen-section"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <FeaturedProducts />

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal direction="right">
        <CraftsmenSection />
      </ScrollReveal>

      <Footer />
    </main>
  )
}
