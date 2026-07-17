"use client";

export default function FinalCTA({ data }: any) {
  return (
    <section >
      <div
       
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}
