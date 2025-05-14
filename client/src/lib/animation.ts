import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function initializeAnimations() {
  // Make sure animations are initialized properly
  
  // Initialize fade-in-up animations
  initializeFadeInUpAnimations();
  
  // Initialize product card hover effects
  initializeProductCardEffects();
  
  // Initialize scroll-based animations for sections
  initializeSectionAnimations();
}

export function animatePageTransition(callback: () => void) {
  // Apply blur effect to transition
  gsap.to("body", {
    filter: "blur(5px)",
    duration: 0.3,
    onComplete: () => {
      // Execute the callback (typically navigation)
      callback();
      
      // Remove blur effect
      gsap.to("body", {
        filter: "blur(0px)",
        duration: 0.3
      });
    }
  });
}

function initializeFadeInUpAnimations() {
  // Select all elements with fade-in-up class
  const fadeElements = document.querySelectorAll(".fade-in-up");
  
  fadeElements.forEach(element => {
    const delay = element.getAttribute("data-delay") || 0;
    
    gsap.fromTo(
      element,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: parseFloat(delay.toString()), 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true
        }
      }
    );
  });
}

function initializeProductCardEffects() {
  // Add hover effects to product cards
  const productCards = document.querySelectorAll(".product-card");
  
  productCards.forEach(card => {
    const cardGlow = card.querySelector(".card-glow");
    
    if (cardGlow) {
      card.addEventListener("mouseenter", () => {
        gsap.to(cardGlow, {
          opacity: 1,
          duration: 0.3
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(cardGlow, {
          opacity: 0,
          duration: 0.3
        });
      });
    }
  });
}

function initializeSectionAnimations() {
  // Set up animations for each section
  const sections = document.querySelectorAll(".section");
  
  sections.forEach(section => {
    // Create a timeline for each section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });
    
    // Add section-specific animations to the timeline
    const sectionId = section.id;
    
    if (sectionId === "ecommerce") {
      // Ecommerce section animations
      tl.from(`#${sectionId} h1`, { y: 30, opacity: 0, duration: 0.8 }, 0);
      tl.from(`#${sectionId} .product-card`, { y: 50, opacity: 0, stagger: 0.2, duration: 0.8 }, 0.3);
    } 
    else if (sectionId === "video") {
      // Video section animations
      tl.from(`#${sectionId} h1`, { y: 30, opacity: 0, duration: 0.8 }, 0);
      tl.from(`#${sectionId} .bg-card`, { scale: 0.95, opacity: 0, stagger: 0.2, duration: 0.8 }, 0.3);
    } 
    else if (sectionId === "development") {
      // Development section animations
      tl.from(`#${sectionId} h1`, { y: 30, opacity: 0, duration: 0.8 }, 0);
      tl.from(`#${sectionId} .template-card`, { y: 50, opacity: 0, stagger: 0.2, duration: 0.8 }, 0.3);
      tl.from(`#${sectionId} form`, { y: 30, opacity: 0, duration: 0.8 }, 0.6);
    }
  });
}
