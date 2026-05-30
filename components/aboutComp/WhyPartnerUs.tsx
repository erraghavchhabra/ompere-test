"use client";

export default function WhyPartnerUs({ data }: any) {
  return (
    <section className="w-full bg-gradient-to-b from-orange-100/30 to-white py-20">
      <div
        className="max-w-6xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}