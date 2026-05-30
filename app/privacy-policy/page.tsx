"use client";

export default function PrivacyPolicy() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f07020]/10 text-[#f07020] text-sm font-semibold mb-5">
            Privacy Policy
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Your Privacy Matters at Ompere
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            We are committed to protecting your personal information and
            maintaining complete transparency in how your data is collected,
            used, and secured across our platform.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[32px] border border-orange-100 shadow-sm p-8 md:p-12 space-y-10">
          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              About Ompere
            </h2>

            <p className="text-gray-600 leading-8">
              Ompere is India’s trusted marketplace for buying and selling used
              diesel gensets and industrial machinery. Our mission is to bring
              transparency, professionalism, and fair market value to an
              industry that has traditionally lacked structure and clarity.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Information We Collect
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              We may collect personal and business-related information when you:
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>• Submit an inquiry or contact request</li>
              <li>• List machinery or gensets for sale</li>
              <li>• Request pricing or valuation support</li>
              <li>• Communicate with our support team</li>
              <li>• Use our website and digital services</li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              How We Use Your Information
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              The information collected is used strictly for operational and
              service-related purposes, including:
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>
                • Providing accurate machinery evaluations and quotations
              </li>
              <li>• Improving user experience and platform performance</li>
              <li>• Facilitating secure transactions and communication</li>
              <li>• Responding to customer inquiries and support requests</li>
              <li>
                • Sending important updates related to services and policies
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Data Security
            </h2>

            <p className="text-gray-600 leading-8">
              At Ompere, we implement appropriate security measures to protect
              your information from unauthorized access, misuse, disclosure, or
              alteration. We continuously review our systems and practices to
              maintain high standards of data protection.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Transparency & Fair Practices
            </h2>

            <p className="text-gray-600 leading-8">
              With over 25+ years of industry experience, our approach is built
              on fairness, clarity, and professionalism. Unlike traditional
              scrap-based pricing models, our platform evaluates equipment based
              on condition, performance, demand, and real market value.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Third-Party Sharing
            </h2>

            <p className="text-gray-600 leading-8">
              We do not sell or rent your personal information to third parties.
              Information may only be shared when necessary for operational
              purposes, legal compliance, or trusted service partnerships
              directly related to our business activities.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Contact Us
            </h2>

            <p className="text-gray-600 leading-8">
              If you have any questions regarding this Privacy Policy or how
              your information is handled, please contact the Ompere support
              team through our official contact channels.
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