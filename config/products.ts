export interface Product {
  id: string
  name: string
  category: string
  image: string
  description?: string
  patternStyle?: string
  details: string[]
  dimensions?: string
  materials?: string[]
}

export const products: Product[] = [
  // Kitchen Doors (درفه مطبخ) - 10 products
  {
    id: "PROD001",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product1.jpg",
    description: "Kitchen door with hexagonal arabesque pattern",
    patternStyle: "Hexagonal Pattern",
    details: [
      "Traditional hexagonal arabesque design",
      "Premium craftsmanship",
      "Custom installation available",
      "Durable finish",
      "Modern functionality"
    ],
    materials: ["Premium wood", "High-quality finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD002",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product2.jpg",
    description: "Kitchen door with Kanayes pattern",
    patternStyle: "Church-inspired Pattern",
    details: [
      "Traditional Kanayes design",
      "Intricate pattern work",
      "Professional installation",
      "Customizable options",
      "Long-lasting durability"
    ],
    materials: ["Premium wood", "Quality finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD003",
    name: "Decorative Door",
    category: "Doors",
    image: "/images/product3.jpg",
    description: "Beech wood door with security glass",
    patternStyle: "Mixed Style: Church-inspired, Solid Cross, Hexagonal",
    details: [
      "Beech wood construction",
      "Security glass panels",
      "Multiple arabesque patterns",
      "Professional installation",
      "Premium hardware"
    ],
    materials: ["Beech wood", "Security glass", "Premium hardware"],
    dimensions: "Standard door size (custom dimensions available)"
  },
  {
    id: "PROD004",
    name: "Room Divider",
    category: "Room Dividers",
    image: "/images/product4.jpg",
    description: "3-panel beech wood room divider",
    patternStyle: "Mixed Style: Maymuni, Hexagonal, Hollow Cross, Church-inspired with Mother of Pearl",
    details: [
      "Three-panel configuration",
      "Beech wood construction",
      "Multiple arabesque patterns",
      "Mother of pearl inlays",
      "Versatile placement"
    ],
    materials: ["Beech wood", "Mother of pearl inlays", "Premium hinges"],
    dimensions: "Three panels (custom dimensions available)"
  },
  {
    id: "PROD005",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product5.jpg",
    description: "Kitchen door with hollow cross pattern",
    patternStyle: "Hollow Cross Pattern",
    details: [
      "Elegant hollow cross design",
      "Premium materials",
      "Professional installation",
      "Custom sizing available",
      "Quality finish"
    ],
    materials: ["Premium wood", "Quality finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD006",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product6.jpg",
    description: "Kitchen door with carved texture design",
    patternStyle: "Textured Carved Pattern",
    details: [
      "Unique textured design",
      "Hand-carved details",
      "Expert craftsmanship",
      "Custom options",
      "Durable finish"
    ],
    materials: ["Premium wood", "Carved texture finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD007",
    name: "Decorative Door",
    category: "Doors",
    image: "/images/product7.jpg",
    description: "Beech wood door with mixed patterns",
    patternStyle: "Mixed Style: Hexagonal, Hollow Cross, Textured",
    details: [
      "Beech wood construction",
      "Multiple pattern combination",
      "Premium craftsmanship",
      "Custom sizing available",
      "Quality hardware"
    ],
    materials: ["Beech wood", "Premium hardware"],
    dimensions: "Standard door size (custom dimensions available)"
  },
  {
    id: "PROD008",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product8.jpg",
    description: "Kitchen door with solid cross pattern",
    patternStyle: "Solid Cross Pattern",
    details: [
      "Traditional solid cross design",
      "Premium materials",
      "Expert installation",
      "Customizable features",
      "Durable construction"
    ],
    materials: ["Premium wood", "Professional finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD009",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product9.jpg",
    description: "Kitchen door with carved relief design",
    patternStyle: "Relief Carved Pattern",
    details: [
      "Intricate relief carving",
      "Traditional craftsmanship",
      "Professional installation",
      "Custom options",
      "Premium finish"
    ],
    materials: ["Premium wood", "Relief carved finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD010",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product10.jpg",
    description: "Kitchen door with Maymuni pattern",
    patternStyle: "Maymuni Pattern",
    details: [
      "Traditional Maymuni design",
      "Premium construction",
      "Expert installation",
      "Custom sizing",
      "Quality finish"
    ],
    materials: ["Premium wood", "Professional finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD011",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product11.jpg",
    description: "Kitchen door with Mamluk linear pattern",
    patternStyle: "Linear Mamluk Pattern",
    details: [
      "Mamluk-style linear design",
      "Traditional pattern",
      "Professional installation",
      "Custom options",
      "Durable construction"
    ],
    materials: ["Premium wood", "Quality finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD012",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product12.jpg",
    description: "Kitchen door with hexagonal linear pattern",
    patternStyle: "Linear Hexagonal Pattern",
    details: [
      "Linear hexagonal design",
      "Modern interpretation",
      "Expert installation",
      "Customizable features",
      "Premium finish"
    ],
    materials: ["Premium wood", "Professional finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  },
  {
    id: "PROD013",
    name: "Kitchen Cabinet Door",
    category: "Kitchen Doors",
    image: "/images/product13.jpg",
    description: "Kitchen door with linear hollow cross pattern",
    patternStyle: "Linear Hollow Cross Pattern",
    details: [
      "Linear hollow cross design",
      "Contemporary style",
      "Professional installation",
      "Custom sizing available",
      "Quality construction"
    ],
    materials: ["Premium wood", "Quality finish"],
    dimensions: "Standard kitchen door size (custom dimensions available)"
  }
]; 