"use client"

import { useState, useRef, Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Loader2, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { Send } from "lucide-react"

// Custom loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-32 w-full">
    <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
  </div>
);

// Use a simple approach to detect if we're in a mobile context
const isMobileContext = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export default function CustomOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Determine if animations should be disabled for better performance
  useState(() => {
    setIsMobile(isMobileContext());
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('type', 'custom-order');
      
      // Append each file to formData with unique keys
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Clear form and files
      e.currentTarget.reset();
      setSelectedFiles([]);
      toast.success('Custom order request submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            <span className="text-white">Custom </span>
            <span className="text-amber-500">Orders</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay-1">
            Commission a bespoke arabesque piece tailored to your specific requirements
          </p>
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal disabled={isMobile}>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 transition-all duration-300 hover:border-amber-500/30">
                <h2 className="text-2xl font-bold mb-6">Request a Custom Order</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Enter your first name" 
                        className="bg-gray-800 border-gray-700 transition-all duration-300 focus:border-amber-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Enter your last name" 
                        className="bg-gray-800 border-gray-700 transition-all duration-300 focus:border-amber-500" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email" 
                        className="bg-gray-800 border-gray-700 transition-all duration-300 focus:border-amber-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Enter your phone number" 
                        className="bg-gray-800 border-gray-700 transition-all duration-300 focus:border-amber-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productType">Product Type</Label>
                    <Select name="productType" required>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wall-panel">Wall Panel</SelectItem>
                        <SelectItem value="screen">Screen</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (optional)</Label>
                    <Input 
                      id="dimensions"
                      name="dimensions"
                      placeholder="e.g., 24 x 36 inches" 
                      className="bg-gray-800 border-gray-700 transition-all duration-300 focus:border-amber-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      placeholder="Please describe your project in detail..."
                      className="bg-gray-800 border-gray-700 min-h-[150px] transition-all duration-300 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Reference Images (optional)</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        className="hidden"
                        aria-label="Upload reference images"
                        title="Choose files to upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Images
                      </Button>
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
                            <span className="text-sm truncate">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Custom Order
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            {/* Info */}
            <div>
              <ScrollReveal delay={200} disabled={isMobile}>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8 transition-all duration-300 hover:border-amber-500/30">
                  <h2 className="text-2xl font-bold mb-6">How It Works</h2>

                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Submit Your Request",
                        description: "Fill out the form with your requirements, preferences, and any reference images that might help our artisans understand your vision."
                      },
                      {
                        step: 2,
                        title: "Consultation",
                        description: "Our team will review your request and schedule a consultation to discuss details, materials, and finalize the design concept."
                      },
                      {
                        step: 3,
                        title: "Design & Quotation",
                        description: "We'll create detailed designs and provide a comprehensive quotation based on your requirements and chosen materials."
                      },
                      {
                        step: 4,
                        title: "Crafting Process",
                        description: "Once approved, our master artisans will begin crafting your bespoke piece, with regular updates on the progress."
                      },
                      {
                        step: 5,
                        title: "Delivery & Installation",
                        description: "We'll carefully package and deliver your finished piece, with installation services available for larger items."
                      }
                    ].map((item, index) => (
                      <div key={item.step} className="flex gap-4 group transition-all duration-300 hover:translate-x-2">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                          <span className="font-bold">{item.step}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <Suspense fallback={<LoadingFallback />}>
                <ScrollReveal disabled={isMobile}>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Custom Order Gallery</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative h-40 rounded-lg overflow-hidden">
                        <Image 
                          src="/images/wall-panel.jpeg" 
                          alt="Custom Wall Panel" 
                          fill 
                          className="object-cover" 
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="relative h-40 rounded-lg overflow-hidden">
                        <Image 
                          src="/images/room-divider.png" 
                          alt="Custom Room Divider" 
                          fill 
                          className="object-cover"
                          loading="lazy" 
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="relative h-40 rounded-lg overflow-hidden">
                        <Image 
                          src="/images/arabesque-door.png" 
                          alt="Custom Door" 
                          fill 
                          className="object-cover"
                          loading="lazy" 
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="relative h-40 rounded-lg overflow-hidden">
                        <Image 
                          src="/images/wooden-window.png" 
                          alt="Custom Window" 
                          fill 
                          className="object-cover"
                          loading="lazy" 
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
