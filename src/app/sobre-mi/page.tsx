import { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | AutoBlog",
  description: "Learn more about AutoBlog and our team of automotive experts.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <main className="flex-1 max-w-3xl min-w-0">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">About AutoBlog</h1>
          
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-10 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop"
              alt="AutoBlog Office"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-2xl text-muted-foreground mb-8">
              Welcome to AutoBlog, the premier destination for thorough, unbiased automotive reviews and news. 
            </p>
            <p>
              Founded in 2026, AutoBlog has quickly grown into one of the most trusted resources for car buyers and enthusiasts worldwide. Our team of experienced writers and testers put hundreds of vehicles through their paces every year to bring you the truth behind the marketing hype.
            </p>
            <h2 className="mt-10 mb-4 font-bold text-2xl tracking-tight text-foreground">Our Mission</h2>
            <p>
              We believe that buying a car is one of the most significant financial decisions people make. Our mission is to empower consumers with clear, accurate, and comprehensive information so they can make the best choice for their lifestyle and budget.
            </p>
            <h2 className="mt-10 mb-4 font-bold text-2xl tracking-tight text-foreground">The Team</h2>
            <p>
              Our growing editorial team comes from diverse backgrounds in mechanical engineering, professional racing, and technology journalism. We share a common passion: an uncompromising dedication to automotive excellence.
            </p>
          </div>
        </main>
        
        <Sidebar />
      </div>
    </div>
  );
}
