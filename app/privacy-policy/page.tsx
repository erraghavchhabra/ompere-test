import PrivacyPolicyClient from "@/components/privacyPolicyComp/PrivacyPolicyClient";
import { API } from "@/lib/api";
import { getSettings } from "@/lib/getSettings";


async function getPage() {
  const response = await fetch(API.page("privacy-policy"), { cache: "no-store" });
  const result = await response.json();
  return result.data;
}

export default async function PrivacyPolicy() {
  const [page, settings] = await Promise.all([
    getPage(),
    getSettings(),
  ]);

  return <PrivacyPolicyClient page={page} settings={settings} />;
}