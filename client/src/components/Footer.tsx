const Footer = () => {
  return (
    <footer className="relative z-20 bg-[#1E2542] py-8 px-6 w-full border-t border-[#151A30]/50 mt-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-montserrat font-bold text-white flex items-center mb-3">
              <div className="h-12 w-auto">
                <img src="/assets/LaconiX.png" alt="LaconiX" className="h-full w-auto object-contain max-w-none" />
              </div>
              <span className="text-xs ml-1 font-mono mt-1 opacity-70">CORPORATION</span>
            </div>
            <p className="text-[#E1E5ED] text-sm mb-3">
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
            <h4 className="text-white font-montserrat font-semibold mb-3">Products</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Digital Products</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Software Solutions</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Tech Gadgets</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Smart Devices</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-semibold mb-3">Services</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Video Production</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Web Development</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Digital Marketing</a></li>
              <li><a href="#" className="text-[#E1E5ED] hover:text-[#0066FF] transition-colors duration-300">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-semibold mb-3">Contact</h4>
            <ul className="space-y-1">
              <li className="text-[#E1E5ED] flex items-start">
                <i className="fas fa-map-marker-alt text-[#0066FF] mt-1 mr-2"></i>
                <span>***adress**</span>
              </li>
              <li className="text-[#E1E5ED] flex items-start">
                <i className="fas fa-phone text-[#0066FF] mt-1 mr-2"></i>
                <span>+880 1778011899</span>
              </li>
              <li className="text-[#E1E5ED] flex items-start">
                <i className="fas fa-envelope text-[#0066FF] mt-1 mr-2"></i>
                <span>laconixcorporation@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#151A30] mt-6 pt-6 text-[#E1E5ED] text-sm">
          <p className="text-left">&copy; {new Date().getFullYear()} LaconiX Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
