export default function CookiePolicyPage() {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50/40 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full bg-[#f07020]/10 px-5 py-2 text-sm font-medium text-[#f07020] mb-5">
            Legal Information
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5">
            Cookie Policy
          </h1>

          <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
            This Cookie Policy explains how Ompere uses cookies and similar
            technologies to improve your browsing experience and provide better
            services through our platform.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[32px] border border-orange-100 shadow-sm p-8 md:p-12 space-y-10">
          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              What Are Cookies?
            </h2>

            <p className="text-gray-600 leading-8">
              Cookies are small text files stored on your device when you visit
              a website. They help websites function properly, remember user
              preferences, improve performance, and provide a more personalized
              browsing experience.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              How We Use Cookies
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              Ompere uses cookies to:
            </p>

            <ul className="space-y-3 text-gray-600 leading-8 list-disc pl-6">
              <li>Ensure the website functions smoothly and securely.</li>
              <li>Remember your preferences and settings.</li>
              <li>Analyze website traffic and user behavior.</li>
              <li>Improve platform performance and user experience.</li>
              <li>
                Provide relevant content, updates, and service improvements.
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              <div className="border border-orange-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Essential Cookies
                </h3>

                <p className="text-gray-600 leading-7">
                  These cookies are necessary for the website to function
                  properly and cannot be disabled.
                </p>
              </div>

              <div className="border border-orange-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Performance Cookies
                </h3>

                <p className="text-gray-600 leading-7">
                  These cookies help us understand how visitors interact with
                  the website so we can improve performance and usability.
                </p>
              </div>

              <div className="border border-orange-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Functional Cookies
                </h3>

                <p className="text-gray-600 leading-7">
                  These cookies remember your preferences and settings to
                  provide a better browsing experience.
                </p>
              </div>
            </div>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Managing Cookies
            </h2>

            <p className="text-gray-600 leading-8">
              Most web browsers allow you to control or disable cookies through
              browser settings. Please note that disabling certain cookies may
              affect the functionality and user experience of the website.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Third-Party Services
            </h2>

            <p className="text-gray-600 leading-8">
              We may use trusted third-party analytics and service providers
              that utilize cookies to help us improve our platform and better
              understand user engagement.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Updates to This Policy
            </h2>

            <p className="text-gray-600 leading-8">
              Ompere may update this Cookie Policy from time to time to reflect
              changes in technology, legal requirements, or platform
              improvements. Updated versions will be posted on this page.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Contact Us
            </h2>

            <p className="text-gray-600 leading-8">
              If you have any questions regarding this Cookie Policy, please
              contact us at:
            </p>

            <div className="mt-5 space-y-2 text-gray-700">
              <p>Email: info@ompere.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}