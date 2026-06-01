"use client";

export default function FinalCTA({ data }: any) {
  return (
    <section className="w-full py-20">
      <div
        className="max-w-6xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}