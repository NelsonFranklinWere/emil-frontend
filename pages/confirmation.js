import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function Confirmation() {
  const router = useRouter();
  const { jobId, applicationUrl, mode, emails } = router.query;
  const resolvedMode = (mode === 'email' || mode === 'link') ? mode : 'link';
  const [copied, setCopied] = useState(false);

  // Debug logging
  console.log('Confirmation page params:', { jobId, applicationUrl, mode, emails, resolvedMode });

  const copyToClipboard = async () => {
    if (applicationUrl) {
      await navigator.clipboard.writeText(applicationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            ✅ Job Created Successfully!
          </h1>
          
          <p className="text-gray-600 mb-8 text-lg">
            Your job posting is now live and ready to receive applications.
          </p>

          {/* Application Link - Only for Link Mode */}
          {resolvedMode === 'link' && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-heading font-bold text-gray-900 mb-3">Application Link</h3>
              {applicationUrl ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                      type="text"
                      readOnly
                      value={applicationUrl}
                      className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors whitespace-nowrap"
                    >
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Share this link with applicants. Our webhook system will automatically process and filter applications submitted through this link.
                  </p>
                </>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    Application link is being generated. Please refresh the page in a moment or check your dashboard.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Email Mode Information */}
          {resolvedMode === 'email' && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-heading font-bold text-blue-900 mb-2">Email Mode Activated</h3>
              <p className="text-blue-700">
                Applicants will send their resumes directly to your company email address. 
                No webhook link is generated as applications will be handled via email.
              </p>
            </div>
          )}

          {/* Report Emails */}
          <div className="mb-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <h3 className="font-heading font-bold text-yellow-900 mb-2">Reports Destination</h3>
            <p className="text-yellow-700">
              AI screening reports will be sent to: <strong>{emails}</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link href="/dashboard" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow transition-all duration-200 transform hover:scale-105 text-center">
              View Dashboard
            </Link>
            <Link href="/create-job" className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 font-bold py-3 rounded-lg shadow transition-all duration-200 text-center">
              Post Another Job
            </Link>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-heading font-bold text-gray-900 mb-4">What happens next?</h4>
            <div className="space-y-3 text-sm text-gray-600 text-left">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-black text-xs font-bold">1</span>
                </div>
                <span>Applicants start applying via your chosen method</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-black text-xs font-bold">2</span>
                </div>
                <span>Emil AI automatically screens and scores each candidate</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-black text-xs font-bold">3</span>
                </div>
                <span>Receive detailed reports in your inbox with candidate rankings</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-black text-xs font-bold">4</span>
                </div>
                <span>Schedule interviews with top candidates seamlessly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}