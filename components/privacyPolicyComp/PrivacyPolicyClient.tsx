"use client";

export default function PrivacyPolicyClient({ page, settings }: { page: any; settings: any }) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f07020]/10 text-[#f07020] text-sm font-semibold mb-5">
            {page?.title || "Privacy Policy"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            {page?.title || "Privacy Policy"}
          </h1>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated:{" "}
            {page?.updated_at
              ? new Date(page.updated_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        <div className="bg-white rounded-[32px] border border-orange-100 shadow-sm p-3 md:p-12 space-y-10">
          {page?.sections?.length > 0 ? (
            page.sections
              .sort((a: any, b: any) => a.sort_order - b.sort_order)
              .map((section: any) => (
                <div key={section.id}>
                  {section.section_type === "content" && (
                    <div
                      className="policy-div prose prose-gray max-w-none
                        prose-headings:text-[#1a1a1a] prose-headings:font-bold
                        prose-h2:text-2xl prose-h3:text-xl
                        prose-p:text-gray-600 prose-p:leading-8
                        prose-li:text-gray-600 prose-li:leading-8
                        prose-strong:text-[#1a1a1a]
                        prose-a:text-[#f07020]"
                      dangerouslySetInnerHTML={{ __html: section.section_data }}
                    />
                  )}
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-center">No content available.</p>
          )}

          {/* Contact */}
          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-5">Contact Us</h2>
            <div className="space-y-3 text-gray-700 leading-7">
              <p><strong>Ompere</strong></p>
              <p>
                Plot No. 213, Sector D, Scheme No. 71<br />
                Indore, Madhya Pradesh – 452009<br />
                India
              </p>
              <p><strong>Email:</strong> {settings?.email || ""}</p>
              <p><strong>Phone:</strong> {settings?.phone || "+91-91111-60460"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}