import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const initialState = {
  companyName: '',
  jobTitle: '',
  jobDescription: '',
  requirements: '',
  applicationMode: 'link',
  hrEmail: '',
  reportEmails: '',
  applicationDeadline: '',
  interviewTime: '',
  interviewLink: ''
};

export default function CreateJob() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/job/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push(`/confirmation?jobId=${data.jobId}&applicationUrl=${data.applicationUrl}&mode=${form.applicationMode}&emails=${form.reportEmails}`);
      } else {
        alert('Error creating job posting');
      }
    } catch (error) {
      alert('Error creating job posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
            Create Job Posting
          </h1>
          <p className="text-white/60">
            Fill in your job details and let Emil AI handle the rest
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your company name"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                name="jobDescription"
                value={form.jobDescription}
                onChange={handleChange}
                required
                rows={6}
                className="form-input"
                placeholder="Describe the role, responsibilities, and company culture..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements & Skills
              </label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={4}
                className="form-input font-mono text-sm"
                placeholder="List required skills and experience...
• 3+ years in JavaScript
• Experience with React/Next.js
• Bachelor's degree in CS or related
• Strong communication skills"
              />
            </div>

            {/* Application Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Mode *
              </label>
              <select
                name="applicationMode"
                value={form.applicationMode}
                onChange={handleChange}
                className="form-input"
              >
                <option value="email">Applications go to Company Email</option>
                <option value="link">Generate Application Link</option>
              </select>
            </div>

            {/* HR Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                HR Contact Email *
              </label>
              <input
                type="email"
                name="hrEmail"
                value={form.hrEmail}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="hr@yourcompany.com"
              />
            </div>

            {/* Report Emails */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Report Emails *
              </label>
              <input
                type="text"
                name="reportEmails"
                value={form.reportEmails}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="manager1@company.com, manager2@company.com"
              />
              <p className="text-sm text-gray-500 mt-1">Separate multiple emails with commas</p>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={form.applicationDeadline}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {/* Interview Time (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Interview Time (Optional)
              </label>
              <input
                type="datetime-local"
                name="interviewTime"
                value={form.interviewTime}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Interview Link (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interview Link (Optional)
              </label>
              <input
                type="url"
                name="interviewLink"
                value={form.interviewLink}
                onChange={handleChange}
                className="form-input"
                placeholder="https://meet.google.com/your-meeting"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Creating Job...
                </div>
              ) : (
                'Create Job Posting'
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-white">🔒</span>
              </div>
              <div>
                <p className="text-blue-800 font-medium">Your data is secure</p>
                <p className="text-blue-700 text-sm mt-1">
                  All applicant data is encrypted and processed securely. We comply with global data protection standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}