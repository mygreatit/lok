import { animatePageTransition } from "@/lib/animation";

type SectionIndicatorProps = {
  activeSection: string;
};

const SectionIndicator: React.FC<SectionIndicatorProps> = ({ activeSection }) => {
  const sections = [
    { id: "ecommerce", label: "Ecommerce" },
    { id: "video", label: "Video Production" },
    { id: "development", label: "Development" }
  ];

  const handleSectionClick = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
      // Apply transition animation
      animatePageTransition(() => {
        targetSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              activeSection === section.id
                ? "bg-[#0066FF] opacity-100"
                : "bg-white opacity-50 hover:opacity-100"
            }`}
            title={section.label}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionIndicator;
