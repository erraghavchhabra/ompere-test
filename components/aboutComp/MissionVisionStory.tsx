"use client";

export default function MissionVisionStory({ data }: any) {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-24">
      <div
        className="max-w-7xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}