import type { Metadata } from "next";
import { API } from "@/lib/api";

import HowHeader from "@/components/HowComp/HowHeader";
import Steps from "@/components/HowComp/Steps";
import WhyProcess from "@/components/HowComp/WhyProcess";
import FAQ from "@/components/HowComp/FAQ";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand how our process works step by step",
};

async function getPage() {
  const response = await fetch(API.page("how-it-work"), {
    cache: "no-store",
  });

  const result = await response.json();

  return result.data;
}

export default async function HowItWorksPage() {
  const page = await getPage();

  return (
    <main className="bg-white text-gray-900">
  <HowHeader/>
      {page.sections?.map((section: any) => {
        switch (section.section_type) {

          case "steps":
            return (
              <Steps
                key={section.id}
                data={section.section_data}
              />
            );

          case "why_process1":
            return (
              <WhyProcess
              
              />
            );

          case "faq1":
            return (
              <FAQ
              />
            );

          case "final_cta1":
            return (
              <FinalCTA
               
              />
            );

          default:
            return null;
        }
      })}

 <WhyProcess/>
       <FAQ
              />

        <FinalCTA
        title="Ready to Get Started?"
        desc="Join hundreds of satisfied sellers. Get your instant price estimate now!"
        primaryText="Calculate Price →"
        secondaryText="Talk to Expert"
        primaryLink="/calculator"
        secondaryLink="/contact"
      />

    </main>
  );
}