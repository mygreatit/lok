import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { gsap } from "gsap";
import { productData } from "@/data/mockData";

// Define cart item type
type CartItem = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
};

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

  // Calculate cart total whenever cartItems changes
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);
    setCartTotal(total);
    
    // Show cart if items exist
    if (cartItems.length > 0 && !isCartOpen) {
      setIsCartOpen(true);
      
      // Animate cart opening
      if (cartRef.current) {
        gsap.fromTo(
          cartRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
        );
      }
    } else if (cartItems.length === 0 && isCartOpen) {
      // Hide cart when empty
      if (cartRef.current) {
        gsap.to(cartRef.current, {
          y: 100, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power1.in",
          onComplete: () => setIsCartOpen(false)
        });
      }
    }
  }, [cartItems, isCartOpen]);

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
        
        // Add clone to body
        document.body.appendChild(clone);
        
        // Get cart button position
        const cartBox = document.querySelector('.cart-box');
        const cartRect = cartBox ? cartBox.getBoundingClientRect() : null;
        
        const cartX = cartRect ? cartRect.left + cartRect.width / 2 : window.innerWidth - 60;
        const cartY = cartRect ? cartRect.top + cartRect.height / 2 : window.innerHeight - 60;
        
        // Animate button
        gsap.to(button, {
          scale: 1.2,
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
  }, []);

  return (
    <section 
      id="ecommerce" 
      ref={sectionRef}
      className="section bg-[#151A30] relative"
    >
      {/* Cart icon with counter */}
      <div className="fixed top-5 right-5 z-50 flex items-center space-x-2">
        <div className="relative">
          <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF2E7E] text-white text-xs flex items-center justify-center transition-all ${cartItems.length ? 'scale-100' : 'scale-0'}`}>
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </div>
          <button 
            onClick={() => setIsCartOpen(prevState => !prevState)}
            className="w-10 h-10 rounded-full bg-[#1E2542] text-white flex items-center justify-center shadow-lg hover:bg-[#2A3353] transition-colors duration-300"
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
      
      {/* Cart Box at bottom of screen */}
      {isCartOpen && (
        <div 
          ref={cartRef}
          className="cart-box fixed bottom-0 left-0 w-full bg-[#1E2542] shadow-lg z-40 border-t border-[#0066FF]/20"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-semibold text-lg flex items-center">
                <i className="fas fa-shopping-cart mr-2 text-[#0066FF]"></i>
                Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
              </h3>
              <button 
                onClick={() => {
                  if (cartRef.current) {
                    gsap.to(cartRef.current, {
                      y: 100, opacity: 0, duration: 0.3, ease: "power1.in",
                      onComplete: () => setIsCartOpen(false)
                    });
                  }
                }}
                className="text-white/70 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Cart items list */}
            <div className="max-h-[30vh] overflow-y-auto mb-3 cart-items">
              {cartItems.length === 0 ? (
                <p className="text-white/70 text-center py-4">Your cart is empty</p>
              ) : (
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between bg-[#2A3353] p-2 rounded-lg"
                    >
                      <div className="flex items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-md mr-3"
                        />
                        <div>
                          <h4 className="text-white text-sm font-medium">{item.name}</h4>
                          <p className="text-[#0066FF] text-xs">${item.price} × {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-[#1E2542] rounded-full transition-colors"
                        >
                          <i className="fas fa-minus text-[#FF2E7E] text-xs"></i>
                        </button>
                        <button 
                          onClick={() => addToCart(item.id)}
                          className="p-1 hover:bg-[#1E2542] rounded-full transition-colors"
                        >
                          <i className="fas fa-plus text-[#0066FF] text-xs"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Cart total and checkout button */}
            <div className="flex justify-between items-center border-t border-[#0066FF]/20 pt-3">
              <div>
                <p className="text-white text-sm">Total: <span className="font-bold text-lg text-[#0066FF]">${cartTotal.toFixed(2)}</span></p>
              </div>
              <button 
                onClick={generateOrderLink}
                disabled={cartItems.length === 0}
                className={`btn-glow bg-[#0066FF] text-white px-6 py-2 rounded-full flex items-center transition-all duration-300 ${
                  cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3385FF]'
                }`}
              >
                <span>Order Now</span>
                <i className="fas fa-envelope ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GridLines />
        <div ref={bgElementsRef} className="absolute inset-0">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[#0066FF]/10 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-[#FF2E7E]/10 blur-3xl animate-float"></div>
          <div className="absolute top-[60%] left-[50%] w-[15vw] h-[15vw] rounded-full bg-[#00CCBB]/10 blur-3xl animate-float-fast"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 pt-6 pb-16 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h5 className="text-[#0066FF] text-lg md:text-xl mb-4 font-mono inline-block relative">
            Digital Products Marketplace
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0066FF]/30"></span>
          </h5>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 glitch-effect">
            Future-Ready <span className="text-[#0066FF]">Digital</span> Solutions
          </h1>
          <p className="text-[#E1E5ED] max-w-2xl mx-auto text-lg">
            Cutting-edge digital products designed to transform your workflow and elevate your digital experience.
          </p>
        </div>
        
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {productData.map((product) => (
            <div 
              key={product.id}
              data-product-id={product.id}
              className="product-card bg-[#1E2542] rounded-xl overflow-hidden shadow-lg gpu-accelerated"
            >
              <div className="card-glow"></div>
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-52 object-cover"
                />
                <div className={`absolute top-3 right-3 ${product.badgeColor} text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md`}>
                  {product.badge}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-semibold mb-3 line-clamp-1">{product.name}</h3>
                <p className="text-[#E1E5ED] text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0066FF] font-bold text-xl">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="btn-glow bg-[#0066FF] hover:bg-[#3385FF] text-white px-4 py-2 rounded-full shadow-glow-primary transition-all duration-300 flex items-center"
                  >
                    <i className="fas fa-cart-plus mr-2"></i>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <button className="btn-glow bg-[#2A3353] hover:bg-[#1E2542] text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center text-lg">
            <span>Browse All Products</span>
            <i className="fas fa-arrow-right ml-3"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
