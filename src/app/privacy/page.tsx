"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";

export default function PrivacyPolicyPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              Legal
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-6">
              Privacy Policy
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 sm:p-10"
          >
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                Spaceburial.com Corporation (hereinafter known as "Spaceburial.com", "us", "we" or "our") currently owns and operates the website www.spaceburial.com ("Website"). To better protect your privacy, we provide this notice ("Privacy Policy" or "Policy") explaining our online information practices and the choices you can make about the way your information is collected and used. To make this notice easy to find, we make it available on our homepage and at every point where personally identifiable information may be requested. We are committed to protecting your privacy and committed to developing technology that gives you the most powerful and secure experience.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                This Privacy Policy applies to all Spaceburial.com-owned Websites. This Privacy Policy covers personally identifiable information, anonymous data collection and aggregate reporting. Personally identifiable information is any information that is associated with your name or personal identity.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                Please be advised that the practices described in this Privacy Policy apply only to information gathered through our Website. We reserve the right to change or modify our information collection, use and disclosure practices set forth in this Privacy Policy. We will use and disclose a user's or a customer's personally identifiable information in accordance with the Privacy Policy that was in effect when such information was collected.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">What We Collect</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                During the registration process, the types of personal information you provide to us may include, name, address, phone, fax, email address, date of birth, username and password, billing information, transaction, and credit card information.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                When you browse our Website, you do so anonymously. We do log your IP address (the Internet address of your phone and/or computer) to give us an idea of which part of our Website you visit and how long you spend there. We do not link your IP address to any personal information unless you have logged into our Website. Like many other commercial websites and applications, the Spaceburial.com may use a standard technology called a "cookie" to collect information about how you use the Website. Please see "Use of Cookies" below for more information.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Compliance with the Children's Online Privacy Policy Protection Act</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                Protecting the privacy of the very young is especially important. For that reason, we never collect or maintain information through our Website from those we actually know are under thirteen (13), and no part of Our Service is structured to attract anyone under thirteen (13).
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">How We Use It</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                We use your personal information for the following purposes:
              </p>

              <ul className="list-disc list-inside text-cosmic-white/70 space-y-2 mb-8 ml-4">
                <li>To make the Website easier for you to use by not making you enter your personal information more than once.</li>
                <li>To deliver services and products that you request or purchase.</li>
                <li>To help us create and publish content most relevant to you.</li>
                <li>To alert you of product upgrades, special offers, updated information and other new services provided from Spaceburial.com.</li>
                <li>To provide feedback.</li>
                <li>To send periodic e-mails.</li>
                <li>To participate in promotional offers (both from Spaceburial.com and from third parties).</li>
                <li>To respond to requests for assistance from our customer support team.</li>
                <li>To allow for secure payment online.</li>
              </ul>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Who We Share It With</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                We never sell or rent your personal information. Spaceburial.com may disclose your personal information if required to do so by law (for example, a subpoena) or regulation, or in good faith to (a) comply with legal processes, or (b) protect the rights and property of Spaceburial.com, or (c) where our records indicate fraudulent activity or other deceptive practices that a governmental agency should be made aware of, or (d) where your communication suggests possible harm to others.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                Spaceburial.com may transfer information about users if Spaceburial.com is acquired by or merged with another company. Spaceburial.com is not responsible for notifying user of such changes.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                When you register, Spaceburial.com will not share your information with third parties without your permission, other than for the limited exceptions already listed and it will only be used for the purposes stated above. We use personal information to reply to inquiries, handle complaints, provide operational notices, keep records up to date to notify you via periodic e-mails of technical service issues, specials, or other related product/service information. Your information may be shared with agents or contractors of Spaceburial.com for the purpose of performing services for Spaceburial.com, including but not limited to facilitating secure payment online.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Internet Commerce</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                The registration process through Spaceburial.com is designed to give you options concerning the privacy of your credit card information, name, address, e-mail and any other information you provide us. Spaceburial.com is committed to data security with respect to information collected through Our Service. We offer the industry standard security measures available through your browser called Secured Socket Layer technology or SSL encryption.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Security of Your Personal Information</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                Spaceburial.com strictly protects the security of your personal information. We carefully protect your data from loss, misuse, unauthorized access or disclosure, alteration, or destruction.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                Your personal information is never shared outside our Website without your permission, except under the conditions explained above. Payments through our Website are handled by third parties using only the highest industry standard security measures. Inside our Website, data is stored in password-controlled servers with limited access.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                You also have a significant role in protecting your information. No one can see or edit your personal information without knowing your username and password, so do not share these with others.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                This Website may contain links to other websites. We are not responsible for and shall not have any liability arising from the privacy practices or the content of other websites.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Access to Your Personal Information</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                We will provide you with the means to ensure that your personal information is correct and current. You may review and update this information at any time by logging into your account.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                To protect your privacy and security, we will also take reasonable steps to verify your identity, such as password and username, before granting access to your data.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Use of Cookies</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                Our website uses "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a Web page or application server. Cookies cannot be used to run programs or deliver viruses to your computer or phone. Cookies are uniquely assigned to you, and can only be read by a server in the domain that issued the cookie to you. You have the ability to accept or decline cookies. Most browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the website Spaceburial.com services you visit. Our Website does generate certain kinds of non-identifying Website usage data, such as number of hits and visits to our Website. This information is used for internal purposes only. The statistics contain no personal information and cannot be used to gather such information.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Affiliated Businesses We Do Not Control</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                We may use third-party companies and individuals to perform functions on our behalf. Examples include fulfilling orders, processing payments, hosting, data storage, sending postal mail and e-mail, removing repetitive information from customer lists, analyzing data, providing marketing assistance, providing search results and links (including paid listings and links), processing credit card payments, and providing customer service. We will provide such entities with access to certain information needed to perform their functions, but will take measures to ensure that they may not use it for other purposes. We share information only as described above and with third parties that are either subject to this Privacy Policy or to their own privacy policy that is at least as protective as this Privacy Policy.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Investor Information Privacy</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                If you apply to become an investor in Spaceburial.com Corporation, we collect additional information necessary to verify your accredited investor status and process your investment. This section applies specifically to prospective and current investors.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">Investor Information We Collect:</strong>
              </p>

              <ul className="list-disc list-inside text-cosmic-white/70 space-y-2 mb-6 ml-4">
                <li>Accreditation verification documents (tax returns, W-2s, bank statements, or third-party verification letters)</li>
                <li>Investment amounts and transaction history</li>
                <li>Subscription agreements and other investment documents you sign</li>
                <li>Identification documents for anti-money laundering (AML) compliance</li>
                <li>Social Security Number or Tax Identification Number for tax reporting</li>
              </ul>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">How We Use Investor Information:</strong>
              </p>

              <ul className="list-disc list-inside text-cosmic-white/70 space-y-2 mb-6 ml-4">
                <li>To verify your status as an accredited investor as required by SEC regulations</li>
                <li>To process and document your investment</li>
                <li>To provide you with required investor disclosures and updates</li>
                <li>To comply with federal and state securities laws</li>
                <li>To file required tax documents (such as Form K-1) with the IRS</li>
                <li>To maintain accurate capitalization records</li>
              </ul>

              <p className="text-cosmic-white/70 leading-relaxed mb-6">
                <strong className="text-cosmic-white">Investor Information Sharing:</strong> We may share your investor information with third-party service providers who assist with accreditation verification, securities law compliance, transfer agent services, and tax preparation. We may also disclose information as required by law, including to the SEC, state securities regulators, or the IRS. We will never sell your investor information.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                <strong className="text-cosmic-white">Retention of Investor Records:</strong> We retain investor records for the period required by applicable securities laws, which may be indefinitely for certain records related to securities offerings. Even if you cease to be an investor, we may be required to retain records of your investment for regulatory compliance purposes.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">Problems or Complaints with Space Burial's Privacy Policy</h2>

              <p className="text-cosmic-white/70 leading-relaxed">
                We value your comments and opinions. If you have questions, comments or a complaint about compliance with this Privacy Policy you may contact us at{" "}
                <a href="mailto:info@spaceburial.com" className="text-cosmic-gold hover:underline">
                  info@spaceburial.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
