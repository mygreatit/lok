import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { gsap } from "gsap";
import { templateData } from "@/data/mockData";

// Define project feature types
type ProjectFeature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

// Project features and capabilities
const developmentFeatures: ProjectFeature[] = [
  {
    id: "responsive",
    title: "Responsive Design",
    description: "Websites that work perfectly on all devices - mobile, tablet, and desktop.",
    icon: "fas fa-mobile-alt"
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Lightning-fast load times and smooth user experiences.",
    icon: "fas fa-bolt"
  },
  {
    id: "security",
    title: "Advanced Security",
    description: "Enterprise-grade security measures to protect your data and users.",
    icon: "fas fa-shield-alt"
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Built-in features to help your site rank higher in search results.",
    icon: "fas fa-search"
  }
];

const DevelopmentSection = () => {
  // State management
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  // References for animations
  const sectionRef = useRef<HTMLElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Handle project template preview
  const handleTemplatePreview = (templateId: string) => {
    setSelectedTemplate(prev => prev === templateId ? null : templateId);
    
    // Animate selection
    const card = document.querySelector(`[data-template-id="${templateId}"]`);
    if (card) {
      gsap.to(card, {
        scale: selectedTemplate === templateId ? 1 : 1.05,
        boxShadow: selectedTemplate === templateId 
          ? "0 0 0 rgba(0, 204, 187, 0)" 
          : "0 0 30px rgba(0, 204, 187, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (simple validation for demo)
    if (!formData.name || !formData.email || !formData.project || !formData.message) {
      alert("Please fill out all fields");
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Show success message after delay (simulating API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        project: "",
        message: ""
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    }, 1500);
  };

  useEffect(() => {
    // Set up entrance animations when section becomes visible
    if (!sectionRef.current) return;
    
    // Initialize background animations
    if (bgElementsRef.current) {
      gsap.from(bgElementsRef.current.children, {
        opacity: 0,
        scale: 0.7,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out"
      });
    }
    
    // Animate heading elements
    if (headingRef.current) {
      const elements = headingRef.current.children;
      gsap.fromTo(
        elements, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
    
    // Animate template cards
    if (templatesRef.current) {
      const cards = templatesRef.current.children;
      gsap.fromTo(
        cards, 
        { y: 50, opacity: 0, rotationY: 15 }, 
        { 
          y: 0, 
          opacity: 1, 
          rotationY: 0,
          duration: 0.8, 
          stagger: 0.1, 
          ease: "back.out(1.2)",
          delay: 0.4
        }
      );
    }
    
    // Animate feature cards with a staggered entrance
    if (featuresRef.current) {
      const features = featuresRef.current.children;
      gsap.fromTo(
        features,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.6
        }
      );
    }
    
    // Animate form entrance
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );
    }
  }, []);

  return (
    <section 
      id="development" 
      ref={sectionRef}
      className="section bg-[#151A30] relative flex items-center"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GridLines color="#004d47" />
        <div ref={bgElementsRef} className="absolute inset-0">
          <div className="absolute top-[15%] left-[20%] w-[20vw] h-[20vw] rounded-full bg-[#00CCBB]/10 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[20%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-[#008F81]/10 blur-3xl animate-float"></div>
          <div className="absolute top-[60%] left-[40%] w-[15vw] h-[15vw] rounded-full bg-[#005F56]/10 blur-3xl animate-float-fast"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h5 className="text-[#00CCBB] text-lg md:text-xl mb-4 font-mono inline-block relative">
            Expert Web Solutions
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00CCBB]/30"></span>
          </h5>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
            Custom <span className="text-[#00CCBB]">Development</span> Solutions
          </h1>
          <p className="text-[#E1E5ED] max-w-2xl mx-auto text-lg">
            Transform your digital presence with our cutting-edge development services and premium web templates.
          </p>
        </div>
        
        {/* Development Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-montserrat text-center">
            Our Development Capabilities
          </h2>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentFeatures.map((feature) => (
              <div 
                key={feature.id}
                className="bg-[#1E2542] rounded-xl p-6 shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#00CCBB]/10 flex items-center justify-center mb-4">
                  <i className={`${feature.icon} text-[#00CCBB] text-xl`}></i>
                </div>
                <h3 className="text-lg font-montserrat font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#E1E5ED] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Premium Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-montserrat text-center">
            Premium Website Templates
          </h2>
          <div ref={templatesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templateData.map((template) => (
              <div 
                key={template.id}
                data-template-id={template.id}
                className="template-card bg-[#1E2542] rounded-xl overflow-hidden shadow-lg gpu-accelerated"
              >
                <div className="relative">
                  <img 
                    src={template.imageUrl} 
                    alt={template.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#00CCBB] text-white text-xs py-1 px-3 rounded-full shadow-md font-semibold">
                    {template.id.includes("ecom") ? "E-commerce" : template.id.includes("corp") ? "Business" : "Portfolio"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-2">{template.name}</h3>
                  <p className="text-[#E1E5ED] text-sm mb-4 line-clamp-2 h-10">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#00CCBB] font-bold text-xl">${template.price}</span>
                    <button 
                      onClick={() => handleTemplatePreview(template.id)}
                      className="btn-glow bg-[#00CCBB] hover:bg-[#00E5D2] text-white px-4 py-2 rounded-full shadow-glow-tertiary transition-all duration-300"
                    >
                      Preview Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-[#1E2542] rounded-xl p-8 shadow-xl border border-[#00CCBB]/10">
          <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-6 text-center">
            Request Custom Development
          </h2>
          
          {formSuccess ? (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 rounded-full bg-[#00CCBB]/20 mx-auto flex items-center justify-center mb-4">
                <i className="fas fa-check text-[#00CCBB] text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
              <p className="text-[#E1E5ED]">
                Thanks for reaching out. Our development team will contact you shortly.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[#E1E5ED] text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A3353] border border-[#3A466B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00CCBB] transition-colors" 
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[#E1E5ED] text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A3353] border border-[#3A466B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00CCBB] transition-colors" 
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="project" className="text-[#E1E5ED] text-sm font-medium">Project Type</label>
                <select 
                  id="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A3353] border border-[#3A466B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00CCBB] transition-colors"
                >
                  <option value="">Select project type</option>
                  <option value="website">Website</option>
                  <option value="app">Mobile App</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="text-[#E1E5ED] text-sm font-medium">Project Details</label>
                <textarea 
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-[#2A3353] border border-[#3A466B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00CCBB] transition-colors resize-none" 
                  placeholder="Describe your project requirements..."
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glow bg-[#00CCBB] hover:bg-[#00E5D2] text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <i className="fas fa-arrow-right ml-3"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentSection;
