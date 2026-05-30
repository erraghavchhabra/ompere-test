"use client";

export default function StatsBar({ data }: any) {
  return (
    <section className="w-full bg-gradient-to-t from-orange-100/30 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          dangerouslySetInnerHTML={{
            __html: data || "",
          }}
        />

      </div>
    </section>
  );
}