import Accordion from "../components/HomepageComponents/Accordition";
import Contact from "../components/HomepageComponents/ContactUs";
import Features from "../components/HomepageComponents/Features";
import Hero from "../components/HomepageComponents/Hero";

export default function Homepage() {
    return (
        <div>
         <Hero />
         <Features />
         <Accordion />
         <Contact />
        </div>
    )
} 