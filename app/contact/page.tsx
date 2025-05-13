"use client"

import { useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"

const faqs = [
  {
    question: "What makes Arabesque Gallery's pieces unique?",
    answer: "Each piece in our collection is handcrafted using traditional Fatimid-era techniques, ensuring authentic representation while bringing timeless beauty to contemporary spaces. Our master craftsmen meticulously recreate intricate geometric patterns and ornate designs."
  },
  {
    question: "Do you offer custom orders?",
    answer: "Yes, we specialize in custom orders! Our skilled artisans can create bespoke pieces tailored to your specific requirements, whether it's size, design, or material preferences."
  },
  {
    question: "What is your shipping policy?",
    answer: "We offer worldwide shipping with careful packaging to ensure your pieces arrive safely. Shipping times and costs vary by location. For detailed information, please contact our customer service."
  },
  {
    question: "How do I care for my Arabesque piece?",
    answer: "Each piece comes with specific care instructions. Generally, we recommend regular dusting with a soft cloth and avoiding harsh chemicals. For detailed care guidelines, please refer to the product manual or contact us."
  },
  {
    question: "Do you offer installation services?",
    answer: "Yes, we provide professional installation services for our larger pieces and architectural elements. Our team ensures proper mounting and placement for optimal display and safety."
  }
]

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [formRef.current, infoRef.current, mapRef.current, faqRef.current];
    elements.forEach((el) => el && observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <main>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-in {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .contact-info-item {
          transition: all 0.3s ease;
        }
        
        .contact-info-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .contact-icon-container {
          transition: all 0.3s ease;
        }
        
        .contact-info-item:hover .contact-icon-container {
          background-color: rgba(245, 158, 11, 0.4);
          transform: rotate(10deg);
        }
        
        .input-animate {
          transition: all 0.3s ease;
        }
        
        .input-animate:focus {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2);
        }
        
        .send-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .send-button:hover {
          transform: translateY(-3px);
        }
        
        .send-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          transition: 0.5s;
        }
        
        .send-button:hover::after {
          left: 100%;
        }
        
        .faq-item {
          transition: all 0.3s ease;
        }
        
        .faq-item:hover {
          transform: translateX(5px);
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            <span className="text-white">Contact </span>
            <span className="text-amber-500">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay-1">
            Get in touch with our team for inquiries, support, or to schedule a visit to our gallery
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div 
                ref={formRef} 
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 opacity-0"
                style={{ animationDelay: "0.1s" }}
              >
                {/* Decorative element */}
                <div className="mb-8 relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-xl"></div>
                  
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <h2 className="text-2xl font-bold">Send Us a Message</h2>
                    <p className="text-gray-400 mt-1">We'd love to hear from you</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-6">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-[98%]"></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">98% Response Rate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-[92%]"></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Typical reply within 2 hours</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    
                    try {
                      const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          type: 'contact',
                          name: formData.get('name'),
                          email: formData.get('email'),
                          subject: formData.get('subject'),
                          message: formData.get('message'),
                        }),
                      });

                      if (!response.ok) {
                        throw new Error('Failed to send message');
                      }

                      toast.success('Message sent successfully!');
                      e.currentTarget.reset();
                    } catch (error) {
                      console.error('Error sending message:', error);
                      toast.error('Failed to send message. Please try again.');
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          required
                          placeholder="Enter your name" 
                          className="bg-gray-800 border-gray-700 input-animate" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="Enter your email"
                          className="bg-gray-800 border-gray-700 input-animate"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        required
                        placeholder="Enter message subject" 
                        className="bg-gray-800 border-gray-700 input-animate" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Type your message here..."
                        className="bg-gray-800 border-gray-700 min-h-[200px] input-animate"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black text-lg py-6 send-button group">
                      <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden opacity-0 animate-in" style={{ animationDelay: "0.2s" }}>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500/20 absolute top-3 right-3">
                  <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
                  <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
                </svg>
                <p className="text-gray-300 italic mb-4 relative z-10">
                  "The team at Arabesque Gallery was incredibly responsive and helpful with our custom order. The craftsmanship exceeded our expectations!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mr-3 text-black font-bold">
                    SC
                  </div>
                  <div>
                    <p className="font-medium text-white">Sarah Campbell</p>
                    <p className="text-xs text-gray-400">Interior Designer, DC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div 
                ref={infoRef} 
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8 opacity-0"
                style={{ animationDelay: "0.3s" }}
              >
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex gap-4 contact-info-item p-4 rounded-lg transition-all">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 contact-icon-container">
                      <MapPin className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                      <p className="text-gray-400">
                        1234 Pennsylvania Avenue
                        <br />
                        Washington DC, USA
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 contact-info-item p-4 rounded-lg transition-all">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 contact-icon-container">
                      <Mail className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                      <p className="text-gray-400">
                        info@arabesquegallery.com
                        <br />
                        sales@arabesquegallery.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 contact-info-item p-4 rounded-lg transition-all">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 contact-icon-container">
                      <Phone className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                      <p className="text-gray-400">
                        +1 (202) 555-0123
                        <br />
                        +1 (202) 555-0124
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 contact-info-item p-4 rounded-lg transition-all">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 contact-icon-container">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
                      <p className="text-gray-400">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div 
                ref={mapRef}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8 opacity-0"
                style={{ animationDelay: "0.5s" }}
              >
                <h2 className="text-2xl font-bold mb-6">Find Us</h2>
                <div className="h-[300px] bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-500">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49799.51904071356!2d-77.0562669!3d38.8954381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="mt-4 text-gray-400">
                  Our gallery is conveniently located in downtown Washington DC, easily accessible by public
                  transportation and with parking available nearby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div 
        ref={faqRef}
        className="container mx-auto px-4 py-16 opacity-0"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-800 rounded-lg overflow-hidden faq-item"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-gray-200 hover:text-amber-500 group">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-amber-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-90" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Footer />
    </main>
  )
}
