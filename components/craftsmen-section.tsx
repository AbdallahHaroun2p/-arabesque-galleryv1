import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

const craftsmen = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Master Woodcarver",
    experience: "25+ years experience",
    image: "/images/craftsman1.jpeg",
  },
  {
    id: 2,
    name: "Layla Mahmoud",
    role: "Master Arabesque Artist",
    experience: "18 years experience",
    image: "/images/craftsman3.jpeg",
  },
  {
    id: 3,
    name: "Omar Farid",
    role: "Metalwork Specialist",
    experience: "20+ years experience",
    image: "/images/craftsman2.jpeg",
  },
]

export default function CraftsmenSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-amber-500">Master Craftsmen</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the skilled artisans who bring centuries-old traditions to life through their exceptional
              craftsmanship.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {craftsmen.map((craftsman, index) => (
            <ScrollReveal key={craftsman.id} delay={index * 150}>
              <Card className="bg-gray-900 border-gray-800 overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={craftsman.image || "/placeholder.svg"}
                    alt={craftsman.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                <CardContent className="relative mt-[-80px] pt-0 z-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-500">
                    <div className="relative w-full h-full">
                      <Image
                        src={craftsman.image || "/placeholder.svg"}
                        alt={craftsman.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{craftsman.name}</h3>
                  <p className="text-amber-500 font-medium mb-1">{craftsman.role}</p>
                  <p className="text-gray-400 text-sm">{craftsman.experience}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
