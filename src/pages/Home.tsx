import { useState } from 'react'; // Import useState
import Navbar from "../components/Navbar";
import HairBrandSlider from "../components/Header";
import ProductSlider from "../components/ProductSlider";
import HikkiyHairSection from "../components/BeforeAfterSlider";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import DiscountPopup from '../components/DiscountPopup'; // Import DiscountPopup
import FloatingDiscountBox from '../components/FloatingDiscountBox'; // Import FloatingDiscountBox
import FloatingWhatsAppBox from '../components/FloatingWhatsAppBox'; // Import FloatingWhatsAppBox
import SummerCollectionSlider from '../components/SummerCollectionSlider'; // Import SummerCollectionSlider

const Home = () => {
  // State to manage the visibility of the discount popup
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);

  // Replace with your actual WhatsApp link
  // You'll provide this link later, but for now, use a placeholder.
  const whatsappLink = "https://wa.me/2349099992343?text=Hello%20Hikkiy%20Hair!";

  return (
    // The relative class is important for positioning fixed children correctly within a bounded context if needed,
    // though for fixed elements relative to viewport, it's not strictly necessary on the parent.
    // However, it's good practice for general layout if you have other positioned elements.
    <div className="relative min-h-screen">
      <Navbar />
      <HairBrandSlider />
      <ProductSlider />
      <HikkiyHairSection />
      <SummerCollectionSlider />
      <WhyChooseUsSection />

      {/* Floating Discount Box - positioned at the bottom left */}
      <FloatingDiscountBox onOpenPopup={() => setShowDiscountPopup(true)} />

      {/* Floating WhatsApp Box - positioned at the bottom right */}
      <FloatingWhatsAppBox whatsappLink={whatsappLink} />

      {/* Discount Popup - rendered conditionally based on state */}
      <DiscountPopup
        show={showDiscountPopup}
        onClose={() => setShowDiscountPopup(false)}
      />
    </div>
  );
};

export default Home;