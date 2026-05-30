"use client";

export default function CoreValues({ data }: any) {
  return (
    <section className="w-full bg-white py-20">
      <div
        className="max-w-7xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}