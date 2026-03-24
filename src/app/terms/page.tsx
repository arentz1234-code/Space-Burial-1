"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";

export default function TermsOfServicePage() {
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
              Terms of Service
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
                Welcome to Spaceburial.com Corporation, a Delaware Corporation ("Spaceburial.com"). The following explains our terms and conditions of use ("Terms" or "Terms of Use"). Please carefully read these Terms of Use before using or obtaining any information, material, products or services through our website ("Website"). Accessing or using any data, content, materials, information, products or services provided by Spaceburial.com ("Our Service") binds you to our Terms of Use. If you do not agree to all of these Terms of Use, you may not use Our Service in any way. The terms "Spaceburial.com" or "our" or "us" or "we" refer to Spaceburial.com.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                We encourage you to regularly review the following Terms of Use as we may amend them from time to time.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">1. GENERAL</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">a.</strong> The content of the pages of our Website, and the products and services available through Our Service, are subject to change without notice. Continued use of Our Service constitutes acceptance of any changes to our Terms and other guidelines or policies governing Our Service.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">b.</strong> You may utilize Our Service only if you are over the age of eighteen (18) and are capable of entering into contracts. Individuals under the age of eighteen (18) may use Our Service only with the written consent of their legal parent or guardian.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">c.</strong> Use of Our Service shall not be for any illegal, harmful or otherwise inappropriate purpose, as is determined by us in our sole discretion, and such behavior is a material breach of our agreement with you and shall result in the immediate termination of your membership with and authorization to use Our Service.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                <strong className="text-cosmic-white">d.</strong> The language of these Terms of Use is not in any way intended to constitute an agency relationship, joint venture, or partnership for any purpose.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">2. USER ACCOUNT</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                It is your exclusive obligation to maintain and control passwords to your account. You are exclusively responsible for all activities that occur in connection with your username and password. You agree to immediately notify Spaceburial.com of any unauthorized uses of your username and password or any other breaches of security. Spaceburial.com will not be liable for any loss or damages of any kind, under any legal theory, caused by your failure to comply with the foregoing security obligations or caused by any person to whom you grant access to your account.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">3. LINKED SITES</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">a.</strong> Our Service provides links to other sites by allowing you to leave Our Service to access third-party material or by bringing third-party material into this Website via "inverse" hyperlinks and framing technology (a "Linked Site"). Spaceburial.com has no discretion to alter, update, or control the content on a Linked Site. The fact that Spaceburial.com has provided a link to a site is not an endorsement, authorization, sponsorship, or affiliation with respect to such site, its owners, or its providers and is intended for your convenience. There are inherent risks in relying upon, using or retrieving any information found on the Internet, and Spaceburial.com urges you to make sure you understand these risks before relying upon, using, or retrieving any such information on a Linked Site.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">b.</strong> All content, products and services on Our Service, or obtained from a Linked Site are provided to you "AS IS" without warranty of any kind either express or implied including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose, title, non-infringement, security or accuracy.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                <strong className="text-cosmic-white">c.</strong> Spaceburial.com does not endorse and is not responsible for (i) the accuracy or reliability of an opinion, advice or statement made through Our Service by any party other than Spaceburial.com, (ii) any content provided on Linked Sites or (iii) the capabilities or reliability of any product or service obtained from a Linked Site. Other than as required under applicable consumer protection law, under no circumstance will Spaceburial.com be liable for any loss or damage caused by your reliance on any information, product or service obtained through Our Service or a Linked Site. It is your responsibility to evaluate the accuracy, completeness or usefulness of any opinion, advice or other content available through Our Service, or obtained from a Linked Site. Please seek the advice of professionals, as appropriate, regarding the evaluation of any specific opinion, advice, product, service, or other content.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">4. TERMINATION, RESTRICTION & SUSPENSION</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                Spaceburial.com retains the right to terminate, restrict or suspend your use of Our Service at any time in its sole discretion without prior notice. Failure to comply with these Terms of Use, Privacy Policy or any other Spaceburial.com policy constitutes a breach that may result in the termination of your use of Our Service. Failure to address any said breach of you or another party does not waive our right to act on similar breaches.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">5. LIABILITY</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">a.</strong> Your use of any information or materials from Our Service is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through Our Service meet your specific requirements.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">b.</strong> The information, products and descriptions of services published on our Website or Linked Sites may include inaccuracies or typographical errors, and Spaceburial.com does disclaims any liability for such inaccuracies or errors. Spaceburial.com does not warrant or represent that the content on our Website is complete or up-to-date. Spaceburial.com is under no obligation to update the content on our Website. Spaceburial.com may change the content on our Website at any time without notice. Spaceburial.com may make improvements or changes to our Website at any time.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                <strong className="text-cosmic-white">c.</strong> You agree that Spaceburial.com, its affiliates and any of their respective officers, directors, employees, or agents will not be liable, whether in contract, tort, strict liability or otherwise, for any indirect, punitive, special, consequential, incidental or indirect damages (including without limitation lost profits, cost of procuring substitute service or lost opportunity) arising out of or in connection with the delay or inability to use our Website even if Spaceburial.com is made aware of the possibility of such damages. This limitation on liability includes, but is not limited to, the transmission of any viruses which may infect your equipment, failure of mechanical or electronic equipment or communication lines, telephone or interconnect problems (e.g., you cannot access your internet service provider), unauthorized access, theft, operator errors, strikes or other labor problems or any force majeure. Spaceburial.com cannot and does not guarantee continuous, uninterrupted or secure access to our Website.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">6. INTELLECTUAL PROPERTY</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">a.</strong> The trademarks, logos and service marks ("Marks") displayed through our Website are the property of Spaceburial.com and other parties. You are prohibited from using any Marks for any purpose including, but not limited to use as keywords, or metatags on other pages or Websites on the World Wide Web without the written permission of Spaceburial.com or such third party which may own the Marks. All information and content located on our Website is protected by copyright and your access to such information on our Website is strictly permitted through the limited non-exclusive license granted under these Terms. You are prohibited from modifying, copying, distributing, transmitting, displaying, publishing, selling, licensing, creating derivative works or using any content available on or through our Website for commercial or public purposes. Unauthorized use of our Website may give rise to a claim for damages and/or may constitute a criminal offense.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                <strong className="text-cosmic-white">b.</strong> Spaceburial.com respects the intellectual property rights of others. If you believe that the content and/or materials on our Website are infringing upon another's copyright, you may send a written notice to us at: info@spaceburial.com
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">7. PAYMENT</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                It is your responsibility to ensure that all personal, billing and payment information provided to us is up-to-date and accurate.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">8. SECURITIES INVESTMENT TERMS</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                The following terms apply specifically to investors who purchase securities in Spaceburial.com Corporation through our investor portal.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">a. Securities Offering.</strong> Any securities offered through our Website are offered pursuant to Rule 506(c) of Regulation D under the Securities Act of 1933, as amended. These securities have not been registered with the Securities and Exchange Commission or any state securities regulatory authority and are being offered only to verified accredited investors.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">b. No Investment Advice.</strong> Nothing on this Website constitutes investment, legal, or tax advice. You should consult with your own financial advisor, attorney, and accountant before making any investment decision. We do not provide recommendations regarding whether this investment is suitable for you.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">c. Risk of Loss.</strong> Investment in early-stage companies involves a high degree of risk. You should be prepared to lose your entire investment. Past performance is not indicative of future results. Forward-looking statements are subject to significant uncertainties and actual results may differ materially.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">d. Restricted Securities.</strong> The securities purchased are &quot;restricted securities&quot; under federal securities law. You may not sell, transfer, or otherwise dispose of the securities except in compliance with the registration requirements of the Securities Act and applicable state securities laws, or pursuant to an available exemption. The Company is not obligated to register these securities for resale.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">e. Illiquidity.</strong> There is no public market for the securities and none is expected to develop. You should be prepared to hold your investment for an indefinite period. The Company has no obligation to facilitate any liquidity event.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">f. Subscription Agreement.</strong> Your investment is governed by the Subscription Agreement and Operating Agreement, which contain additional terms, representations, and warranties. In the event of any conflict between these Terms of Service and the Subscription Agreement, the Subscription Agreement shall control.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-4">
                <strong className="text-cosmic-white">g. Dispute Resolution.</strong> Any dispute arising out of or relating to an investment in the Company&apos;s securities shall be resolved by binding arbitration administered by JAMS in accordance with its Comprehensive Arbitration Rules. The arbitration shall take place in Wilmington, Delaware. Each party shall bear its own costs, except the arbitrator may award attorney&apos;s fees to the prevailing party.
              </p>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                <strong className="text-cosmic-white">h. Investor Representations.</strong> By investing, you represent that: (i) you are an accredited investor as defined in Rule 501 of Regulation D; (ii) you have received and reviewed all offering materials; (iii) you understand the risks involved; (iv) you are acquiring the securities for your own account and not for resale; and (v) you have sufficient knowledge and experience to evaluate the merits and risks of the investment.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">9. ENFORCEABILITY</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                If any of the Terms or provisions contained herein are deemed to be invalid or unenforceable, the other Terms or remaining provisions shall remain valid and enforceable.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">10. GOVERNING LAW</h2>

              <p className="text-cosmic-white/70 leading-relaxed mb-8">
                Your use of our Website and Our Service and any dispute arising out of such use of our Website and Our Service is subject to the laws of the State of Delaware, United States of America and applicable federal law without regard to conflicts of laws principles. The prevailing party of any such action shall recover all expenses incurred in that action, including but not limited to attorney's fees and court costs. You further agree that any dispute arising out of these Terms of Use shall be resolved individually, apart from any form of class action lawsuit.
              </p>

              <h2 className="font-heading text-xl tracking-wider text-cosmic-white mb-4">11. FEEDBACK</h2>

              <p className="text-cosmic-white/70 leading-relaxed">
                While we encourage you to provide feedback, comments and questions, it is possible that we may not be able to respond to each one. You are responsible for messages, materials and the content of all submissions and it is your responsibility to ensure any said message is accurate, reliable, original and does not infringe upon the intellectual property rights of others.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
