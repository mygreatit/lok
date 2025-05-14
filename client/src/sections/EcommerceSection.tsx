import { useEffect, useRef } from "react";
import GridLines from "@/components/GridLines";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { gsap } from "gsap";
import { productData } from "@/data/mockData";

const EcommerceSection = () => {
  const { fadeUpElements } = useAnimatedSection();
  const bgElementsRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="ecommerce" className="section bg-[#151A30] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0066FF]/5 to-[#151A30]/90"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GridLines />
        <div ref={bgElementsRef} className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#0066FF]/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#FF2E7E]/10 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16 h-full flex flex-col justify-center relative z-10">
        <div ref={el => fadeUpElements.current.push(el)} className="text-center mb-12" data-delay="0">
          <h5 className="text-[#0066FF] text-lg md:text-xl mb-2 font-mono">Digital Products Marketplace</h5>
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">Future-Ready <span className="text-[#0066FF]">Digital</span> Solutions</h1>
          <p className="text-[#E1E5ED] max-w-2xl mx-auto">
            Cutting-edge digital products designed to transform your workflow and elevate your digital experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {productData.map((product, index) => (
            <div 
              key={product.id}
              ref={el => fadeUpElements.current.push(el)} 
              className="product-card bg-[#1E2542] rounded-xl p-5 relative shadow-lg hover:shadow-glow-primary transition-all duration-300 hover:translate-y-[-8px]" 
              data-delay={0.1 + index * 0.1}
            >
              <div className="card-glow"></div>
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-lg mb-4" 
                />
                <div className={`absolute top-2 right-2 ${product.badgeColor} text-white text-xs py-1 px-2 rounded-full`}>
                  {product.badge}
                </div>
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-2">{product.name}</h3>
              <p className="text-[#E1E5ED] text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#0066FF] font-bold">${product.price}</span>
                <button className="btn-glow bg-[#0066FF] hover:bg-[#3385FF] text-white px-4 py-2 rounded-full text-sm shadow-glow-primary transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={el => fadeUpElements.current.push(el)} className="flex justify-center" data-delay="0.4">
          <button className="btn-glow bg-[#2A3353] hover:bg-[#1E2542] text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center">
            <span>Browse All Products</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
