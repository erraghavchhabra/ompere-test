import CookiePolicyClient from "@/components/cookiePolicyComp/CookiePolicyClient";
import { API } from "@/lib/api";
import { getSettings } from "@/lib/getSettings";


async function getPage() {
  const response = await fetch(API.page("cookie-policy"), { cache: "no-store" });
  const result = await response.json();
  return result.data;
}

export default async function CookiePolicyPage() {
  const [page, settings] = await Promise.all([
    getPage(),
    getSettings(),
  ]);

  return <CookiePolicyClient page={page} settings={settings} />;
}