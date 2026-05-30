import type { Metadata } from "next";
import AboutHeader from "@/components/aboutComp/aboutHeader";
import AboutInfo from "@/components/aboutComp/aboutInfo";
import StatsBar from "@/components/aboutComp/StatsBar";
import MissionVisionStory from "@/components/aboutComp/MissionVisionStory";
import CoreValues from "@/components/aboutComp/CoreValues";
import WhyPartnerUs from "@/components/aboutComp/WhyPartnerUs";
import { API } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company",
};

async function getPage() {
  const response = await fetch(API.page("about"), {
    cache: "no-store",
  });

  const result = await response.json();
  console.log("result",result);

  return result.data;
}

export default async function AboutPage() {
  const page = await getPage();

  return (
    <main className="bg-white text-gray-900">
 <AboutHeader/>
      {page.sections?.map((section: any) => {
        switch (section.section_type) {

          case "about_header":
            return (
              <AboutHeader/>
            );

          case "about_info":
            return (
              <AboutInfo
                key={section.id}
                data={section.section_data}
              />
            );

          case "stats_bar":
            return (
              <StatsBar
                key={section.id}
                data={section.section_data}
              />
            );

          case "mission_vision":
            return (
              <MissionVisionStory
                key={section.id}
                data={section.section_data}
              />
            );

          case "core_values":
            return (
              <CoreValues
                key={section.id}
                data={section.section_data}
              />
            );

          case "why_partner_us":
            return (
              <WhyPartnerUs
                key={section.id}
                data={section.section_data}
              />
            );

          default:
            return null;
        }
      })}

    </main>
  );
}