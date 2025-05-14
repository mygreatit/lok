import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { gsap } from "gsap";
import { templateData } from "@/data/mockData";

const DevelopmentSection = () => {
  const { fadeUpElements } = useAnimatedSection();
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "E-commerce Website",
    details: ""
  });

  useEffect(() => {
    if (bgElementsRef.current) {
      // Animate background elements
      gsap.from(bgElementsRef.current.children, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a server
    // For now, we'll just log it to the console
    console.log("Form submitted with:", {
      ...formData,
      selectedTemplate
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      projectType: "E-commerce Website",
      details: ""
    });
    setSelectedTemplate(null);
    
    // Show success message (in a real app you'd use a toast or modal)
    alert("Your development request has been submitted successfully!");
  };

  return (
    <section id="development" className="section bg-[#151A30] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00CCBB]/5 to-[#151A30]/90"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GridLines />
        <div ref={bgElementsRef} className="absolute inset-0">
          <div className="absolute top-20 right-40 w-64 h-64 rounded-full bg-[#00CCBB]/10 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-[#0066FF]/10 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16 h-full flex flex-col justify-center relative z-10">
        <div ref={el => fadeUpElements.current.push(el)} className="text-center mb-12" data-delay="0">
          <h5 className="text-[#00CCBB] text-lg md:text-xl mb-2 font-mono">Web Development</h5>
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">Custom <span className="text-[#00CCBB]">Web</span> Solutions</h1>
          <p className="text-[#E1E5ED] max-w-2xl mx-auto">
            Browse our premium templates or request a custom website built to your exact specifications.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 ref={el => fadeUpElements.current.push(el)} className="text-xl font-montserrat font-semibold mb-6 text-center" data-delay="0.1">Select a Template</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateData.map((template, index) => (
              <div 
                key={template.id}
                ref={el => fadeUpElements.current.push(el)}
                className={`template-card bg-[#1E2542] rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition-all duration-300 ${
                  selectedTemplate === template.id ? "shadow-[0_0_0_3px_#00CCBB,_0_0_15px_rgba(0,204,187,0.5)]" : ""
                }`}
                data-delay={0.2 + index * 0.1}
              >
                <img 
                  src={template.imageUrl} 
                  alt={template.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-montserrat font-semibold text-white">{template.name}</h4>
                  <p className="text-[#E1E5ED] text-sm mt-1">{template.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[#00CCBB]">${template.price}</span>
                    <button 
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`template-select-btn ${
                        selectedTemplate === template.id
                          ? "bg-[#00CCBB] text-white"
                          : "bg-[#2A3353] hover:bg-[#00CCBB] text-white"
                      } px-4 py-2 rounded-lg text-sm transition-colors duration-300`}
                    >
                      {selectedTemplate === template.id ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Development Order Form */}
        <div ref={el => fadeUpElements.current.push(el)} className="max-w-2xl mx-auto bg-[#1E2542] rounded-xl shadow-lg overflow-hidden" data-delay="0.5">
          <div className="bg-[#2A3353] py-3 px-4 border-b border-[#151A30]">
            <h3 className="font-montserrat text-lg font-semibold text-white">Request Development Services</h3>
          </div>
          
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#E1E5ED] text-sm mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A3353] border border-[#2A3353] focus:border-[#00CCBB] rounded py-2 px-3 text-white focus:outline-none" 
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-[#E1E5ED] text-sm mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A3353] border border-[#2A3353] focus:border-[#00CCBB] rounded py-2 px-3 text-white focus:outline-none" 
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[#E1E5ED] text-sm mb-1">Project Type</label>
              <select 
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-[#2A3353] border border-[#2A3353] focus:border-[#00CCBB] rounded py-2 px-3 text-white focus:outline-none"
              >
                <option>E-commerce Website</option>
                <option>Corporate Website</option>
                <option>Portfolio Website</option>
                <option>Custom Web Application</option>
                <option>Mobile Application</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#E1E5ED] text-sm mb-1">Project Details</label>
              <textarea 
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full bg-[#2A3353] border border-[#2A3353] focus:border-[#00CCBB] rounded py-2 px-3 text-white focus:outline-none h-24" 
                placeholder="Describe your project requirements..."
                required
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                className="btn-glow bg-[#00CCBB] hover:bg-[#33D6C8] text-white w-full py-3 rounded-lg shadow-glow-accent transition-all duration-300 font-semibold"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentSection;
