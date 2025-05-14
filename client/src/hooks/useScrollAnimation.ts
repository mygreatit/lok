import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP plugins are registered in animation.ts

type ScrollAnimationOptions = {
  trigger?: string | Element;
  start?: string;
  end?: string;
  markers?: boolean;
  scrub?: boolean | number;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
};

export function useScrollAnimation(
  animateFrom: gsap.TweenVars,
  animateTo: gsap.TweenVars,
  options: ScrollAnimationOptions = {}
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<Element | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Default options
    const defaultOptions = {
      trigger: triggerRef.current || elementRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options
    };

    if (elementRef.current) {
      // Create the animation
      const animation = gsap.fromTo(
        elementRef.current,
        animateFrom,
        animateTo
      );

      // Create the scroll trigger
      scrollTriggerRef.current = ScrollTrigger.create({
        ...defaultOptions,
        animation
      });
    }

    return () => {
      // Clean up
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [animateFrom, animateTo, options]);

  return { elementRef, triggerRef };
}
