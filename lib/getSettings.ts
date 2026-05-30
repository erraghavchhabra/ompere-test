import { API } from "@/lib/api";

export const getSettings = async () => {
  try {

    const response = await fetch(API.settings, {
      cache: "no-store",
    });

    const result = await response.json();

    return result.data || {};

  } catch (error) {

    console.log(error);
    return {};
  }
  
};