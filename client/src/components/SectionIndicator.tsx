import { gsap } from "gsap";

type SectionIndicatorProps = {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
};

const SectionIndicator: React.FC<SectionIndicatorProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: "ecommerce", label: "Ecommerce" },
    { id: "video", label: "Video Production" },
    { id: "development", label: "Development" }
  ];

  const handleSectionClick = (sectionId: string) => {
    // Use the callback for navigation
    onSectionChange(sectionId);
  };

  // For a horizontal layout, position the indicators horizontally along the bottom
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex flex-row space-x-6 bg-[#151A30]/30 backdrop-blur-sm rounded-full py-3 px-6 shadow-lg">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleSectionClick(section.id)}
          >
            <div 
              className={`w-4 h-4 rounded-full transition-all duration-500 shadow-lg ${
                activeSection === section.id
                  ? "bg-[#0066FF] animate-pulse-glow"
                  : "bg-white/50 group-hover:bg-white/80"
              }`}
            />
            <div className={`text-xs font-medium mt-1 transition-all duration-300 ${
              activeSection === section.id
                ? "text-[#0066FF]"
                : "text-white/70 group-hover:text-white"
            }`}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionIndicator;
