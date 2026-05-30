"use client";

export default function AboutInfo({ data }: any) {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          dangerouslySetInnerHTML={{
            __html: data || "",
          }}
        />
      </div>
    </section>
  );
}