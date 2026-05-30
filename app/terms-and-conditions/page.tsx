"use client";

export default function TermsConditions() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f07020]/10 text-[#f07020] text-sm font-semibold mb-5">
            Terms & Conditions
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Terms of Use for Ompere
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            By accessing or using the Ompere platform, you agree to comply with
            the following terms and conditions governing our services,
            marketplace operations, and user responsibilities.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[32px] border border-orange-100 shadow-sm p-8 md:p-12 space-y-10">
          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Acceptance of Terms
            </h2>

            <p className="text-gray-600 leading-8">
              By using the Ompere website, services, or platform, you confirm
              that you have read, understood, and agreed to these Terms &
              Conditions. If you do not agree, you should discontinue use of
              the platform immediately.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              About Our Services
            </h2>

            <p className="text-gray-600 leading-8">
              Ompere provides a professional marketplace for buying and selling
              used diesel gensets and industrial machinery. Our evaluations are
              based on equipment condition, market demand, operational
              performance, and industry standards.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              User Responsibilities
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              Users are responsible for ensuring that all information provided
              to Ompere is accurate, complete, and up to date.
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>• Provide genuine ownership documentation</li>
              <li>• Share accurate equipment specifications</li>
              <li>• Avoid misleading or false representations</li>
              <li>• Cooperate during inspections and evaluations</li>
              <li>• Comply with all applicable legal requirements</li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Valuation & Pricing
            </h2>

            <p className="text-gray-600 leading-8">
              Machinery valuations provided by Ompere are based on market
              trends, equipment condition, age, operational efficiency, and
              current demand. Final pricing may vary depending on inspection
              findings and supporting documentation.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Payments & Transactions
            </h2>

            <p className="text-gray-600 leading-8">
              Ompere aims to ensure secure and transparent transactions.
              Payments are processed only after successful verification and
              completion of agreed procedures. Delays caused by incomplete
              documentation or third-party verification are beyond our direct
              control.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Intellectual Property
            </h2>

            <p className="text-gray-600 leading-8">
              All website content, branding, designs, graphics, text, and
              platform materials are the intellectual property of Ompere and
              may not be copied, reproduced, or distributed without written
              permission.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Limitation of Liability
            </h2>

            <p className="text-gray-600 leading-8">
              Ompere shall not be held liable for indirect losses, damages, or
              disputes arising from inaccurate user information, third-party
              actions, operational interruptions, or unforeseen market changes.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Policy Updates
            </h2>

            <p className="text-gray-600 leading-8">
              Ompere reserves the right to update or modify these Terms &
              Conditions at any time without prior notice. Continued use of the
              platform after updates constitutes acceptance of the revised
              terms.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Contact Information
            </h2>

            <p className="text-gray-600 leading-8">
              For any questions related to these Terms & Conditions, users may
              contact the Ompere support team through the official communication
              channels provided on the website.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}