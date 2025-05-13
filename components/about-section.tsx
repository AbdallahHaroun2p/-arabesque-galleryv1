import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Border Container */}
      <div className="absolute inset-0 z-0">
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-40 h-40">
          <Image
            src="/images/corner-top-left.png"
            alt="Top Left Decoration"
            fill
            className="object-contain"
          />
        </div>
        
        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-40 h-40 transform rotate-90">
          <Image
            src="/images/corner-top-left.png"
            alt="Top Right Decoration"
            fill
            className="object-contain"
          />
        </div>
        
        {/* Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-40 h-40 transform -rotate-90">
          <Image
            src="/images/corner-top-left.png"
            alt="Bottom Left Decoration"
            fill
            className="object-contain"
          />
        </div>
        
        {/* Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-40 h-40 transform rotate-180">
          <Image
            src="/images/corner-top-left.png"
            alt="Bottom Right Decoration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-amber-500">Reviving</span> the Artistry of the Fatimid Era
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              At Arabesque Gallery, we are dedicated to preserving and celebrating the rich artistic heritage of the
              Fatimid Caliphate. Our master craftsmen meticulously recreate the intricate geometric patterns, elegant
              arabesques, and ornate designs that defined this golden age of Islamic art and architecture.
            </p>
            <p className="text-gray-300 text-lg mb-8">
              Each piece in our collection is handcrafted using traditional techniques passed down through generations,
              ensuring authentic representation of this magnificent artistic tradition while bringing timeless beauty to
              contemporary spaces.
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-6">Learn Our Story</Button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image src="/images/hero-bg.jpeg" alt="Fatimid Architecture" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-amber-500">
              <Image src="/images/wooden-window.png" alt="Arabesque Craftsmanship" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
