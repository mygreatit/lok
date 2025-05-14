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

// Enhanced page transitions with zoom and motion blur
export function animatePageTransition(callback: () => void) {
  // Create a more dramatic transition effect with zoom
  const tl = gsap.timeline();
  
  // Apply a zoom-in effect with motion blur
  tl.to("body", {
    filter: "blur(15px) brightness(1.3)",
    transform: "scale(1.1)",
    duration: 0.5, 
    ease: "power2.out"
  })
  .add(() => {
    callback(); // Execute navigation callback
  })
  // Zoom out effect as we reveal the new section
  .to("body", {
    filter: "blur(0px) brightness(1)",
    transform: "scale(1)",
    duration: 0.6,
    ease: "power3.out"
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

// Set up section-specific animations for horizontal layout
function setupSectionAnimations() {
  // Animation helpers - reusable animations
  const createSectionTimeline = (sectionId: string) => {
    // Clear any previous animations if they exist
    ScrollTrigger.getAll()
      .filter(st => st.vars.trigger && st.vars.trigger.toString().includes(sectionId))
      .forEach(st => st.kill());
      
    return gsap.timeline();
  };
  
  // Generic function to animate section entrance
  const animateSectionEntrance = (timeline: gsap.core.Timeline, sectionId: string) => {
    // Common base animations
    timeline
      .fromTo(`#${sectionId}`, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: "power2.inOut" }, 0
      )
      .fromTo(`#${sectionId} h1`, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 0.2
      )
      .fromTo(`#${sectionId} h5`, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4
      )
      .fromTo(`#${sectionId} p`, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.5
      );
    
    return timeline;
  };
  
  // Ecommerce Section - Dramatic entrance with scale effects
  const ecommerceTimeline = createSectionTimeline("ecommerce");
  animateSectionEntrance(ecommerceTimeline, "ecommerce")
    .fromTo("#ecommerce .container", 
      { scale: 0.95, opacity: 0.5 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, 0.3
    )
    .fromTo("#ecommerce .product-card", 
      { y: 60, opacity: 0, scale: 0.9 }, 
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.08, 
        duration: 0.7, 
        ease: "back.out(1.2)"
      }, 0.5
    );
  
  // Video Section - Slide in animations for chat elements
  const videoTimeline = createSectionTimeline("video");
  animateSectionEntrance(videoTimeline, "video")
    .fromTo("#video .container", 
      { x: -30, opacity: 0.5 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3
    )
    .fromTo("#video .bg-card", 
      { x: -30, opacity: 0, stagger: 0.1 }, 
      { x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }, 0.6
    );
    
  // Development Section - Cool template reveal animations
  const devTimeline = createSectionTimeline("development");
  animateSectionEntrance(devTimeline, "development")
    .fromTo("#development .container", 
      { x: 30, opacity: 0.5 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3
    )
    .fromTo("#development .template-card", 
      { y: 40, opacity: 0, scale: 0.95, rotation: -2, stagger: 0.1 }, 
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        stagger: 0.1, 
        duration: 0.8, 
        ease: "back.out(1.4)"
      }, 0.5
    )
    .fromTo("#development form", 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.9
    );
  
  // Add background parallax effects to all sections
  gsap.utils.toArray<HTMLElement>(".section").forEach(section => {
    const bgElements = section.querySelectorAll(".absolute");
    
    if (bgElements.length) {
      gsap.to(bgElements, {
        y: "20%",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  });
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
