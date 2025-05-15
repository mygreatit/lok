import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { gsap } from "gsap";
import { productData } from "@/data/mockData";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// Define cart item type
type CartItem = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
};

// Ecommerce features data
const ecommerceFeatures = [
  {
    title: "Online Store Setup",
    description: "Complete setup with product listings, payment gateways, and custom design.",
    icon: "fas fa-store",
    price: "Starting at 15,000 BDT"
  },
  {
    title: "Payment Integrations",
    description: "Seamless payment processing with multiple gateways including local options.",
    icon: "fas fa-credit-card",
    price: "Starting at 5,000 BDT"
  },
  {
    title: "Inventory Management",
    description: "Automated stock tracking, alerts, and supplier integration.",
    icon: "fas fa-boxes",
    price: "Starting at 8,000 BDT"
  },
  {
    title: "Marketing Tools",
    description: "SEO optimization, email marketing, and social media integration.",
    icon: "fas fa-bullhorn",
    price: "Starting at 10,000 BDT"
  }
];

const EcommerceSection = () => {
  // State for cart items with quantities
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Calculate cart total whenever cartItems changes
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);
    setCartTotal(total);
    
    // Show cart if items exist
    if (cartItems.length > 0) {
      setIsCartOpen(true);
      
      // Animate cart opening
      if (cartRef.current) {
        gsap.fromTo(
          cartRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
        );
      }
    }
  }, [cartItems]);

  // Add product to cart with animation
  const addToCart = (productId: string) => {
    // Find the product
    const product = productData.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      // Increase quantity for existing item
      setCartItems(prev => 
        prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCartItems(prev => [
        ...prev, 
        { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          imageUrl: product.imageUrl,
          quantity: 1 
        }
      ]);
    }
    
    // Create add-to-cart animation
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (productCard) {
      // Find the image inside the card
      const image = productCard.querySelector('img');
      const button = productCard.querySelector('button');
      
      if (image && button) {
        // Create a clone of the image for animation
        const clone = image.cloneNode(true) as HTMLImageElement;
        clone.style.position = 'fixed';
        clone.style.top = `${image.getBoundingClientRect().top}px`;
        clone.style.left = `${image.getBoundingClientRect().left}px`;
        clone.style.width = `${image.getBoundingClientRect().width}px`;
        clone.style.height = `${image.getBoundingClientRect().height}px`;
        clone.style.zIndex = '1000';
        clone.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        clone.style.borderRadius = '8px';
        clone.style.filter = 'blur(1px)';
        
        // Add clone to body
        document.body.appendChild(clone);
        
        // Get cart button position
        const cartBox = document.querySelector('.cart-box');
        const cartIcon = document.querySelector('.cart-icon');
        const targetEl = isCartOpen ? cartBox : cartIcon;
        const targetRect = targetEl ? targetEl.getBoundingClientRect() : null;
        
        const cartX = targetRect ? targetRect.left + targetRect.width / 2 : window.innerWidth - 60;
        const cartY = targetRect ? targetRect.top + targetRect.height / 2 : window.innerHeight - 60;
        
        // Animate button with glitch effect
        gsap.to(button, {
          scale: 1.2,
          filter: 'blur(2px) hue-rotate(90deg)',
          duration: 0.2,
          ease: "back.out(1.5)",
          yoyo: true,
          repeat: 1
        });
        
        // Animate clone to cart position
        setTimeout(() => {
          clone.style.top = `${cartY}px`;
          clone.style.left = `${cartX}px`;
          clone.style.width = '40px';
          clone.style.height = '40px';
          clone.style.borderRadius = '50%';
          clone.style.opacity = '0.8';
          clone.style.transform = 'scale(0.5)';
          clone.style.filter = 'blur(2px) brightness(1.5)';
          
          // Remove clone after animation
          setTimeout(() => {
            document.body.removeChild(clone);
          }, 800);
        }, 10);
      }
    }
  };
  
  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Remove item completely
        return prev.filter(item => item.id !== productId);
      }
    });
  };
  
  // Generate Gmail order link
  const generateOrderLink = () => {
    const subject = "New Order from LaconiX Website";
    
    let body = "Hi LaconiX Team,\n\nI would like to place an order for the following items:\n\n";
    
    cartItems.forEach(item => {
      body += `${item.name} - $${item.price} x ${item.quantity}\n`;
    });
    
    body += `\nTotal: $${cartTotal.toFixed(2)}\n\nPlease contact me to complete my order.\n\nThank you!`;
    
    const mailtoLink = `mailto:laconixcorporation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink, "_blank");
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
    
    // Animate product cards
    if (productsRef.current) {
      const cards = productsRef.current.children;
      gsap.fromTo(
        cards, 
        { y: 100, opacity: 0, scale: 0.8 }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.15, 
          ease: "back.out(1.5)",
          delay: 0.5
        }
      );
    }
    
    // Animate feature cards
    if (featuresRef.current) {
      const cards = featuresRef.current.children;
      gsap.fromTo(
        cards, 
        { x: -50, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: "power2.out",
          delay: 0.5
        }
      );
    }
    
    // Animate chat container
    if (chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)", delay: 0.7 }
      );
    }
  }, []);

  return (
    <section 
      id="ecommerce" 
      ref={sectionRef}
      className="section bg-gradient-to-br from-black to-[#9945FF] relative scroll-smooth w-screen h-screen overflow-y-auto"
    >
      {/* Background elements - fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GridLines />
        <div ref={bgElementsRef} className="fixed inset-0">
          <div className="absolute top-[20%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-[#9945FF]/20 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[20vw] h-[20vw] rounded-full bg-[#f5dd42]/10 blur-3xl animate-float"></div>
          <div className="absolute top-[60%] right-[30%] w-[15vw] h-[15vw] rounded-full bg-purple-500/10 blur-3xl animate-float-fast"></div>
        </div>
      </div>

      {/* Cart icon - fixed position */}
      <div className="absolute top-5 right-5 z-50 flex items-center space-x-2">
        <div className="relative cart-icon">
          <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#f5dd42] text-black text-xs flex items-center justify-center transition-all ${cartItems.length ? 'scale-100' : 'scale-0'} shadow-[0_0_10px_#f5dd42]`}>
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </div>
          <button 
            className="bg-[#16c2f2] p-2 rounded-full shadow-lg hover:bg-[#00d7ff] transition-all hover:shadow-[0_0_15px_#00d7ff] group"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:filter group-hover:brightness-150 group-active:filter group-active:blur-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cart box */}
      {isCartOpen && (
        <div 
          ref={cartRef}
          className="cart-box absolute top-20 right-5 z-50 bg-black/80 backdrop-blur-lg rounded-xl shadow-[0_0_20px_rgba(22,194,242,0.5)] p-4 w-80 border border-[#16c2f2]/50"
        >
          <h3 className="text-[#f5dd42] font-semibold mb-4 drop-shadow-[0_0_4px_rgba(245,221,66,0.8)]">Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-cyan-300 text-center py-4 drop-shadow-[0_0_3px_rgba(0,215,255,0.7)]">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-[#16c2f2]/30 group hover:border-[#16c2f2]/70 transition-all">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium drop-shadow-[0_0_5px_rgba(0,215,255,0.5)]">{item.name}</h4>
                      <p className="text-[#f5dd42] text-sm drop-shadow-[0_0_3px_rgba(245,221,66,0.5)]">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-cyan-300 hover:text-white transition-colors hover:drop-shadow-[0_0_5px_rgba(0,215,255,0.7)] active:filter active:blur-[1px] active:brightness-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-white drop-shadow-[0_0_5px_rgba(0,215,255,0.3)]">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="text-cyan-300 hover:text-white transition-colors hover:drop-shadow-[0_0_5px_rgba(0,215,255,0.7)] active:filter active:blur-[1px] active:brightness-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#16c2f2]/30">
                <div className="flex justify-between text-white mb-4">
                  <span className="drop-shadow-[0_0_5px_rgba(0,215,255,0.5)]">Total:</span>
                  <span className="text-[#f5dd42] drop-shadow-[0_0_5px_rgba(245,221,66,0.5)]">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={generateOrderLink}
                  className="w-full bg-[#16c2f2] text-white py-2 rounded-lg hover:bg-[#00d7ff] transition-all shadow-[0_0_10px_rgba(22,194,242,0.5)] hover:shadow-[0_0_15px_rgba(0,215,255,0.7)] active:filter active:blur-[1px] active:brightness-150"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Scrollable content with footer */}
      <div className="scroll-container relative z-10 h-full">
        <div className="section-content">
          <div ref={headingRef} className="text-center mb-12">
            <h5 className="text-purple-300 text-lg md:text-xl mb-4 font-mono inline-block relative drop-shadow-[0_0_8px_rgba(153,69,255,0.7)]">
              Digital Commerce Solutions
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400/50"></span>
            </h5>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 glitch-effect text-[#f5dd42] drop-shadow-[0_0_15px_rgba(245,221,66,0.5)]">
              <span className="text-white drop-shadow-[0_0_10px_rgba(153,69,255,0.7)]">E-commerce</span> Solutions
            </h1>
            <p className="text-purple-200 max-w-2xl mx-auto text-lg drop-shadow-[0_0_8px_rgba(153,69,255,0.5)]">
              Launch your online store with our complete e-commerce solutions tailored for the Bangladesh market.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ChatBot placed in the top left */}
            <div className="lg:w-1/3 lg:sticky lg:top-5 lg:self-start">
              <div ref={chatContainerRef}>
                <ChatBot sectionType="ecommerce" />
              </div>
            </div>
            
            <div className="lg:w-2/3">
              {/* Product listings */}
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat drop-shadow-[0_0_8px_rgba(153,69,255,0.5)]">Featured Products</h2>
              <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {productData.map(product => (
                  <div 
                    key={product.id}
                    data-product-id={product.id}
                    className="product-card bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(153,69,255,0.3)] hover:shadow-[0_0_20px_rgba(153,69,255,0.5)] border border-[#9945FF]/30 gpu-accelerated group"
                  >
                    <div className="card-glow bg-gradient-to-b from-[#9945FF]/20 to-transparent"></div>
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <span className={`absolute top-2 right-2 ${product.badgeColor} text-white text-xs px-2 py-1 rounded-full shadow-lg`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-montserrat font-semibold mb-2 line-clamp-1 text-white drop-shadow-[0_0_5px_rgba(153,69,255,0.5)]">
                        {product.name}
                      </h3>
                      <p className="text-purple-200 text-sm mb-3 line-clamp-2 h-10 drop-shadow-[0_0_3px_rgba(153,69,255,0.3)]">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5dd42] font-bold drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">${product.price}</span>
                        <button 
                          onClick={() => addToCart(product.id)}
                          className="btn-glow bg-[#9945FF] hover:bg-[#8035EE] text-white px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(153,69,255,0.5)] hover:shadow-[0_0_15px_rgba(153,69,255,0.7)] transition-all duration-300 active:filter active:blur-[1px] active:brightness-150"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Features list */}
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat drop-shadow-[0_0_8px_rgba(153,69,255,0.5)]">Key Features</h2>
              <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {ecommerceFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="product-card bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(153,69,255,0.3)] hover:shadow-[0_0_20px_rgba(153,69,255,0.5)] border border-[#9945FF]/30 gpu-accelerated group"
                  >
                    <div className="card-glow bg-gradient-to-b from-[#9945FF]/20 to-transparent"></div>
                    <div className="p-6">
                      <div className="text-4xl mb-4 text-[#9945FF] drop-shadow-[0_0_5px_rgba(153,69,255,0.7)]">
                        <i className={feature.icon}></i>
                      </div>
                      <h3 className="text-lg font-montserrat font-semibold mb-2 line-clamp-1 text-white drop-shadow-[0_0_5px_rgba(153,69,255,0.5)]">
                        {feature.title}
                      </h3>
                      <p className="text-purple-200 text-sm mb-3 line-clamp-2 h-10 drop-shadow-[0_0_3px_rgba(153,69,255,0.3)]">
                        {feature.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5dd42] font-bold drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">{feature.price}</span>
                        <button className="btn-glow bg-[#9945FF] hover:bg-[#8035EE] text-white px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(153,69,255,0.5)] hover:shadow-[0_0_15px_rgba(153,69,255,0.7)] transition-all duration-300 active:filter active:blur-[1px] active:brightness-150">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact button */}
          <div className="flex justify-center mt-12 pb-16">
            <button className="btn-glow bg-black/50 backdrop-blur-sm hover:bg-black/70 text-[#f5dd42] border border-[#9945FF]/50 px-8 py-4 rounded-full shadow-[0_0_15px_rgba(153,69,255,0.3)] hover:shadow-[0_0_20px_rgba(153,69,255,0.5)] transition-all duration-300 flex items-center text-lg active:filter active:blur-[1px] active:brightness-150">
              <span className="drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">Contact Ecommerce Team</span>
              <i className="fas fa-arrow-right ml-3 text-purple-300 drop-shadow-[0_0_5px_rgba(153,69,255,0.7)]"></i>
            </button>
          </div>
        </div>
        
        {/* Include Footer at the bottom of scrollable content */}
        <Footer />
      </div>
    </section>
  );
};

export default EcommerceSection;
