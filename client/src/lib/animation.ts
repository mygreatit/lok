import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize all animations
export function initializeAnimations() {
  // Clear any existing ScrollTrigger instances to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Setup main animations with a slight delay to ensure DOM is ready
  setTimeout(() => {
    setupProductCards();
    setupSectionAnimations();
    setupFadeAnimations();
    setupHoverEffects();
  }, 100);
}

// Handle smooth page transitions when navigating between sections
export function animatePageTransition(callback: () => void) {
  // Create a more dramatic transition effect
  const tl = gsap.timeline();
  
  tl.to("body", {
    filter: "blur(10px) brightness(1.2)",
    duration: 0.4, 
    ease: "power2.out"
  })
  .add(() => {
    callback(); // Execute navigation callback
  })
  .to("body", {
    filter: "blur(0px) brightness(1)",
    duration: 0.5,
    ease: "power2.inOut"
  });
}

// Setup product card animations and effects
function setupProductCards() {
  // Select all product cards
  const productCards = document.querySelectorAll(".product-card");

  if (productCards.length === 0) return;
  
  // Create entrance animations for each card
  gsap.fromTo(
    productCards, 
    { 
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    { 
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: "#ecommerce",
        start: "top 80%",
        once: false,
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Add hover effects
  productCards.forEach(card => {
    const cardElement = card as HTMLElement;
    const glowElement = card.querySelector(".card-glow") as HTMLElement;
    
    if (!glowElement) return;
    
    // Create hover animation
    card.addEventListener("mouseenter", () => {
      gsap.to(cardElement, { 
        y: -10, 
        scale: 1.03, 
        boxShadow: "0 10px 25px rgba(0, 102, 255, 0.2)",
        duration: 0.3 
      });
      gsap.to(glowElement, { opacity: 1, duration: 0.3 });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(cardElement, { 
        y: 0, 
        scale: 1, 
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.3 
      });
      gsap.to(glowElement, { opacity: 0, duration: 0.3 });
    });
  });
}

// Set up section-specific animations
function setupSectionAnimations() {
  // Ecommerce Section
  const ecommerceTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#ecommerce",
      start: "top 60%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });
  
  ecommerceTimeline
    .from("#ecommerce h1", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
    .from("#ecommerce h5", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.2)
    .from("#ecommerce p", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.3);
  
  // Video Section
  const videoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#video",
      start: "top 60%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });
  
  videoTimeline
    .from("#video h1", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
    .from("#video h5", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.2)
    .from("#video p", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.3)
    .from("#video .bg-card", { 
      opacity: 0, 
      y: 30, 
      stagger: 0.15, 
      duration: 0.8, 
      ease: "power3.out" 
    }, 0.4);

  // Development Section
  const devTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#development",
      start: "top 60%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });
  
  devTimeline
    .from("#development h1", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
    .from("#development h5", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.2)
    .from("#development p", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.3)
    .from("#development .template-card", { 
      opacity: 0, 
      y: 40, 
      stagger: 0.1, 
      duration: 0.7, 
      ease: "back.out(1.2)" 
    }, 0.4)
    .from("#development form", { 
      opacity: 0, 
      y: 30, 
      duration: 0.8, 
      ease: "power2.out" 
    }, 0.7);
}

// Set up fade animations for elements with data-fade attributes
function setupFadeAnimations() {
  const fadeElements = document.querySelectorAll("[data-fade]");
  
  fadeElements.forEach(element => {
    const delay = element.getAttribute("data-delay") || "0";
    const direction = element.getAttribute("data-fade") || "up";
    
    // Create initial animation state based on direction
    let fromVars: gsap.TweenVars = { opacity: 0 };
    
    // Add different starting positions based on fade direction
    switch(direction) {
      case "up":
        fromVars = { opacity: 0, y: 30 };
        break;
      case "down":
        fromVars = { opacity: 0, y: -30 };
        break;
      case "left":
        fromVars = { opacity: 0, x: 30 };
        break;
      case "right":
        fromVars = { opacity: 0, x: -30 };
        break;
      case "scale":
        fromVars = { opacity: 0, scale: 0.9 };
        break;
    }
    
    gsap.fromTo(
      element,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: parseFloat(delay),
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}

// Set up various hover effects throughout the site
function setupHoverEffects() {
  // Button hover effects
  const buttons = document.querySelectorAll(".btn-glow");
  
  buttons.forEach(button => {
    const btnElement = button as HTMLElement;
    
    button.addEventListener("mouseenter", () => {
      gsap.to(btnElement, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out"
      });
    });
    
    button.addEventListener("mouseleave", () => {
      gsap.to(btnElement, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out"
      });
    });
  });
  
  // Template card hover effects
  const templateCards = document.querySelectorAll(".template-card");
  
  templateCards.forEach(card => {
    const cardElement = card as HTMLElement;
    
    card.addEventListener("mouseenter", () => {
      gsap.to(cardElement, {
        y: -8,
        boxShadow: "0 15px 30px rgba(0, 204, 187, 0.2)",
        duration: 0.3
      });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(cardElement, {
        y: 0,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.3
      });
    });
  });
}
