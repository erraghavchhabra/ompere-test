"use client";

export default function CookiePolicyClient({ page, settings }: { page: any; settings: any }) {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50/40 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full bg-[#f07020]/10 px-5 py-2 text-sm font-medium text-[#f07020] mb-5">
            Legal Information
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5">
            {page?.title || "Cookie Policy"}
          </h1>

          <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
            This Cookie Policy explains how Ompere ("we," "us," "our") uses
            cookies and similar technologies on our website. By continuing to
            use the Website, you agree to the use of cookies as described in
            this policy.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Last Updated:{" "}
            {page?.updated_at
              ? new Date(page.updated_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "June, 2026"}
          </p>
        </div>

        {/* Dynamic Sections */}
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
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-5">
              Contact Us
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              If you have any questions about this Cookie Policy, please contact us at:
            </p>

            <div className="space-y-3 text-gray-700 leading-7">
              <p><strong>Ompere</strong></p>
              <p>
                Plot No. 213, Sector D, Scheme No. 71<br />
                Indore, Madhya Pradesh – 452009<br />
                India
              </p>
              <p><strong>Email:</strong> {settings?.email || ""}</p>
              <p><strong>Phone:</strong> {settings?.phone || "+91-9111160460"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}