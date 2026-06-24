import TermsConditionsClient from "@/components/termsConditionsComp/TermsConditionsClient";
import { API } from "@/lib/api";
import { getSettings } from "@/lib/getSettings";


async function getPage() {
  const response = await fetch(API.page("terms-and-conditions"), { cache: "no-store" });
  const result = await response.json();
  return result.data;
}

export default async function TermsConditions() {
  const [page, settings] = await Promise.all([
    getPage(),
    getSettings(),
  ]);

  return <TermsConditionsClient page={page} settings={settings} />;
}