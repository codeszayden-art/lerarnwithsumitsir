import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Rankers from '@/components/sections/Rankers';
import ExamsMarquee from '@/components/sections/ExamsMarquee';
import Courses from '@/components/sections/Courses';
import Centers from '@/components/sections/Centers';
import Experts from '@/components/sections/Experts';
import Achievers from '@/components/sections/Achievers';
import Champions from '@/components/sections/Champions';
import Books from '@/components/sections/Books';
import AppPromo from '@/components/sections/AppPromo';
import Updates from '@/components/sections/Updates';
import QualitiesTicker from '@/components/sections/QualitiesTicker';
import Reviews from '@/components/sections/Reviews';
import Enquiry from '@/components/sections/Enquiry';
import CtaBand from '@/components/sections/CtaBand';
import EnquiryPopup from '@/components/sections/EnquiryPopup';


/** Landing page: sections render in the same order as the original design. */
export default function Home() {
  return (
    <>
      <Hero />
       <EnquiryPopup />
      <About />
      <Rankers />
      <ExamsMarquee />
      <Courses />
      <Centers />
      <Experts />
      <Achievers />
      <Champions />
      <Books />
      <AppPromo />
      <Updates />
      <QualitiesTicker />
      <Reviews />
      <Enquiry />
     
      <CtaBand />
    </>
  );
}
