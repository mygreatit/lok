const Footer = () => {
  return (
    <footer className="bg-[#1E2542] py-12 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-montserrat font-bold text-white flex items-center mb-4">
              <span className="text-[#3385FF]">Laconi</span>
              <span className="text-[#FF2E7E]">X</span>
              <span className="text-xs ml-1 font-mono mt-1 opacity-70">CORP</span>
            </div>
            <p className="text-[#E1E5ED] text-sm mb-4">
              Transforming the digital landscape with innovative solutions and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#0066FF] transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#0066FF] transition-colors duration-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white hover:text-[#0066FF] transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#0066FF] transition-colors duration-300">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Digital Products</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Software Solutions</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Tech Gadgets</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Smart Devices</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Video Production</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Web Development</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Digital Marketing</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-[#E1E5ED] flex items-start">
                <i className="fas fa-map-marker-alt text-[#0066FF] mt-1 mr-2"></i>
                <span>1234 Innovation Drive, Tech City, TC 98765</span>
              </li>
              <li className="text-[#E1E5ED] flex items-start">
                <i className="fas fa-phone text-[#0066FF] mt-1 mr-2"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-[#E1E5ED] flex items-start">
                <i className="fas fa-envelope text-[#0066FF] mt-1 mr-2"></i>
                <span>info@laconixcorp.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#151A30] mt-8 pt-8 text-center text-[#E1E5ED] text-sm">
          <p>&copy; {new Date().getFullYear()} LaconiX Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
