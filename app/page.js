'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SplineScene = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@0.9.518/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0"
      data-animation-type="spline"
      data-spline-url="https://prod.spline.design/1UjZlPEUBkIEmBpR/scene.splinecode"
    >
      <spline-viewer
        url="https://prod.spline.design/1UjZlPEUBkIEmBpR/scene.splinecode"
        class="w-full h-full"
      ></spline-viewer>
    </div>
  );
};

export default function Home() {
  return (
    <>
    
  
    <div className="relative overflow-hidden bg-white">
      <SplineScene />
      <div className="relative z-10 flex flex-col items-center justify-start px-6">
        {/* Logo and Nav */}
        <div className="w-full max-w-7xl flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-md">
          <div className="text-xl font-bold">🔳 SarVam AI</div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <span className="cursor-pointer">Features</span>
            <span className="cursor-pointer">Pricing</span>
            <span className="cursor-pointer">Documentation</span>
            <span className="cursor-pointer">Solutions</span>
            <span className="cursor-pointer">Resources</span>
          </div>
          <div className="flex gap-2">
            <Button className="text-sm">
              <Link href={'https://github.com/Rahul12gaming'}>View Creator Profile</Link>
            </Button>
           
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mt-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-black">
            Supercharge your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              Call Operations
            </span>{" "}
            with Voice AI
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
            Discover the new way to build, test, deploy, and monitor
            production-ready AI voice agents at scale.
          </p>
           <div className="text-center mt-10">
          <Image src={'/demo.png'} alt="Demo" width={1000} height={800}/>
        </div>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="text-sm"><Link href={'/flow'}>Take Free Demo!</Link></Button>
            
          </div>
        </div>

      

       


       
      </div>


    </div>
     <footer className="mt-20 bg-[#0f0f0f] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
        {/* Newsletter */}
        <div className="md:col-span-2">
          <h2 className="text-white text-lg font-semibold mb-2">🔳 SarVam AI</h2>
          <p className="text-sm mb-4">Subscribe to our newsletter for our product updates</p>
          <div className="flex items-center gap-2">
            <Input placeholder="Your email" className="rounded-full px-4 py-2 bg-transparent border border-gray-500 placeholder:text-gray-400 text-sm" />
            <Button variant={"outline"} className={"text-black"}>Submit</Button>
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Launch YC</li>
            <li>Product Hunt</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">USE CASES</h4>
          <ul className="space-y-2 text-sm">
            <li>Healthcare</li>
            <li>Finance Services</li>
            <li>Insurance</li>
            <li>Home Services</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">ECOSYSTEM</h4>
          <ul className="space-y-2 text-sm">
            <li>Certified Partners</li>
            <li>Creator Partners</li>
            <li>APP Partners</li>
          </ul>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-10 flex justify-end gap-4 text-gray-400">
        <i className="ri-discord-line text-xl"></i>
        <i className="ri-twitter-x-line text-xl"></i>
        <i className="ri-linkedin-box-line text-xl"></i>
        <i className="ri-youtube-line text-xl"></i>
      </div>
    </footer>
      </>
  );
}
