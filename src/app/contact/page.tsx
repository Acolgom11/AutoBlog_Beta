import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | AutoBlog",
  description: "Get in touch with the AutoBlog team for inquiries, partnerships, or feedback.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center">Contact Us</h1>
      <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
        Have a question, feedback, or a partnership proposal? We'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-brand/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-brand" />
          </div>
          <h3 className="font-bold text-xl mb-2">Email Us</h3>
          <p className="text-muted-foreground mb-4">For general inquiries and support.</p>
          <a href="mailto:hello@autoblog.com" className="text-brand font-medium hover:underline">hello@autoblog.com</a>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-brand/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <MapPin className="h-8 w-8 text-brand" />
          </div>
          <h3 className="font-bold text-xl mb-2">Visit Us</h3>
          <p className="text-muted-foreground mb-4">Our main editorial office.</p>
          <address className="not-italic text-foreground font-medium">
            123 Automotive Way<br />
            Detroit, MI 48201
          </address>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-brand/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Phone className="h-8 w-8 text-brand" />
          </div>
          <h3 className="font-bold text-xl mb-2">Call Us</h3>
          <p className="text-muted-foreground mb-4">Mon-Fri from 9am to 6pm EST.</p>
          <a href="tel:+15551234567" className="text-brand font-medium hover:underline">+1 (555) 123-4567</a>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-sm">
        <h2 className="text-3xl font-bold mb-8 text-center">Send a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input type="text" id="name" className="w-full flex h-12 rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <input type="email" id="email" className="w-full flex h-12 rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
             <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input type="text" id="subject" className="w-full flex h-12 rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" rows={6} className="w-full flex min-h-[140px] rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" placeholder="Write your message here..."></textarea>
          </div>
          <button type="button" className="w-full h-12 inline-flex items-center justify-center rounded-md text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-brand text-white hover:bg-brand-hover shadow-sm mt-4">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
