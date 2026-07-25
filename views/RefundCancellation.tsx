'use client';

import React from 'react';

export const RefundCancellation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl mt-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Effective Date: January 01, 2026</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
          <p>
            At Optimantix Global Pvt. Ltd. ("Company", "we", "our", or "us"), we strive to provide high-quality
            digital services tailored to our clients' business needs. This Cancellation &amp; Refund Policy outlines
            the terms governing cancellations, refunds, and service termination.
          </p>
          <p>By purchasing or using our services, you agree to this Policy.</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. General Policy</h2>
            <p>
              Our services involve professional consultation, custom development, digital marketing, software
              implementation, and ongoing account management. Since these services require dedicated time, expertise,
              and resource allocation, refunds are limited and subject to the conditions below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Project Cancellation by the Client
            </h2>
            <p className="mb-4">
              Clients may request cancellation of a project by providing written notice via email. Cancellation
              requests will be processed based on the stage of the project.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Before Work Begins</h3>
            <p className="mb-4">
              If cancellation is requested before any work has commenced, any refund will be determined after
              deducting applicable administrative, consultation, payment processing, and other non-recoverable costs.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">After Work Has Started</h3>
            <p className="mb-2">
              Once work has begun, payments made for completed work, allocated resources, consultations, research,
              design, development, content creation, or campaign setup are generally non-refundable.
            </p>
            <p>
              If only part of the agreed work has been completed, we may, at our sole discretion, issue a partial
              refund for the unperformed portion after deducting charges for work already completed and any
              non-recoverable expenses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Website &amp; Software Development
            </h2>
            <p className="mb-2">
              Payments made for the following are generally non-refundable once work has commenced:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Website design</li>
              <li>UI/UX design</li>
              <li>Front-end development</li>
              <li>Back-end development</li>
              <li>Mobile application development</li>
              <li>API integrations</li>
              <li>Custom software development</li>
              <li>SaaS development</li>
              <li>Testing and deployment</li>
            </ul>
            <p className="mb-2">
              If a project is cancelled after development has started, clients remain responsible for payment for
              work completed up to the cancellation date.
            </p>
            <p>
              Upon settlement of all outstanding payments, completed work may be delivered at our discretion and
              subject to the terms of the applicable agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Digital Marketing Services
            </h2>
            <p className="mb-2">This includes:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Search Engine Optimization (SEO)</li>
              <li>Local SEO</li>
              <li>Google Ads Management</li>
              <li>Meta Ads Management</li>
              <li>Performance Marketing</li>
              <li>Social Media Marketing</li>
              <li>Content Marketing</li>
              <li>Email Marketing</li>
            </ul>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fees paid for services already rendered are non-refundable.</li>
              <li>
                Campaign setup fees, strategy development, account audits, keyword research, content creation, and
                optimization work are non-refundable once completed.
              </li>
              <li>
                Advertising spend paid directly to advertising platforms is governed by the policies of those
                platforms and is not refundable by Optimantix Global Pvt. Ltd.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Marketplace Management Services
            </h2>
            <p className="mb-2">
              For services relating to Amazon, Flipkart, Meesho, Myntra, Nykaa, Tira, Jiomart, and other
              marketplaces, management fees become non-refundable once services have commenced, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Account onboarding</li>
              <li>Product listing</li>
              <li>Catalog optimization</li>
              <li>Content creation</li>
              <li>Advertising setup</li>
              <li>Inventory coordination</li>
              <li>Performance reporting</li>
              <li>Marketplace optimization</li>
            </ul>
            <p>
              Any third-party marketplace charges remain subject to the respective marketplace's policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Subscription and Retainer Services
            </h2>
            <p className="mb-2">For recurring monthly, quarterly, or annual service plans:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Clients may cancel future renewals by providing written notice before the next billing cycle.</li>
              <li>Cancellation will stop future billing where applicable.</li>
              <li>Payments already made for the current billing period are generally non-refundable.</li>
              <li>
                Services will continue until the end of the paid billing period unless otherwise agreed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Delay Due to Client
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                If a client fails to provide required content, approvals, credentials, or other necessary information
                for an extended period, the project may be placed on hold.
              </li>
              <li>Project delays caused by the client do not entitle the client to a refund.</li>
              <li>
                Projects remaining inactive for an extended period may require revised timelines, updated quotations,
                or additional charges before work resumes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Cancellation by Optimantix Global Pvt. Ltd.
            </h2>
            <p className="mb-2">We reserve the right to suspend or terminate services if:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Required payments are not received.</li>
              <li>Fraudulent activity is suspected.</li>
              <li>The client violates our Terms &amp; Conditions.</li>
              <li>The client requests unlawful, unethical, or prohibited activities.</li>
              <li>Abuse, harassment, or threatening behavior toward our staff occurs.</li>
            </ul>
            <p>
              Where appropriate, any refund will be determined after deducting charges for work completed,
              non-recoverable costs, and other applicable expenses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Non-Refundable Items</h2>
            <p className="mb-2">
              The following are generally non-refundable once purchased, initiated, or delivered:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Consultation fees &amp; strategy sessions</li>
              <li>Website planning &amp; custom design work</li>
              <li>Logo and branding work</li>
              <li>SEO audits &amp; website audits</li>
              <li>Paid software licenses, premium themes &amp; premium plugins</li>
              <li>Domain registrations &amp; hosting services</li>
              <li>SSL certificates &amp; third-party subscriptions</li>
              <li>API usage charges</li>
              <li>Advertising spend &amp; marketplace fees</li>
              <li>Payment gateway charges</li>
              <li>Government fees and statutory charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Refund Processing</h2>
            <p className="mb-2">Where a refund is approved:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Refunds will be processed using the original payment method where reasonably possible.</li>
              <li>
                Processing times may vary depending on the payment provider and financial institution.
              </li>
              <li>Bank processing delays are outside our control.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. No Guarantee of Business Results
            </h2>
            <p className="mb-2">We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Search engine rankings</li>
              <li>Sales or revenue</li>
              <li>Lead generation volume</li>
              <li>Advertising performance</li>
              <li>Marketplace rankings</li>
              <li>Return on investment (ROI) or Return on Ad Spend (ROAS)</li>
            </ul>
            <p>
              Variations in business performance do not constitute grounds for cancellation or refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Dispute Resolution</h2>
            <p>
              If you believe you are entitled to a refund or wish to dispute a charge, please contact us first. We
              will review the matter in good faith and work toward a fair resolution in accordance with this Policy
              and applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Changes to This Policy</h2>
            <p>
              We may revise this Cancellation &amp; Refund Policy from time to time. Updated versions will be posted
              on our website with the revised effective date. Continued use of our services after changes become
              effective constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14. Contact Us</h2>
            <p className="mb-4">
              For cancellation requests or refund-related questions, please contact:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Optimantix Global Pvt. Ltd.</p>
              <p>
                Email:{' '}
                <a href="mailto:info@optimantix.com" className="text-primary hover:underline">
                  info@optimantix.com
                </a>
              </p>
              <p>
                Website:{' '}
                <a href="https://optimantix.com" className="text-primary hover:underline">
                  https://optimantix.com
                </a>
              </p>
              <p>Business Hours: Monday – Saturday, 10:00 AM – 7:00 PM (IST)</p>
            </div>
          </section>

          <p className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
            By purchasing or using our services, you acknowledge that you have read, understood, and agree to this
            Cancellation &amp; Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
