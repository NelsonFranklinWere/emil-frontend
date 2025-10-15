import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createJob } from '../lib/api';

const initialState = {
  company_name: '',
  job_title: '',
  job_description: '',
  requirements: '',
  application_mode: 'link',
  application_email: '',
  report_emails: '',
  deadline: '',
  interview_time: '',
  interview_link: ''
};

export default function CreateJob() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Map frontend form to backend JobDTO fields
      const payload = {
        companyName: form.company_name,
        title: form.job_title,
        description: form.job_description,
        requirements: form.requirements,
        applicationMode: form.application_mode, // 'email' | 'link'
        applicationEmail: form.application_email,
        reportEmails: form.report_emails
          .split(',')
          .map(e => e.trim())
          .filter(Boolean),
        // Many Spring backends expect LocalDate (YYYY-MM-DD) and LocalDateTime (YYYY-MM-DDTHH:mm)
        deadline: form.deadline,
        interviewTime: form.interview_time || null,
        interviewLink: form.interview_link || null,
      };

      const data = await createJob(payload);
      const jobId = data.id || data.jobId || data.job_id;
      const applicationUrl = data.applicationUrl || data.application_url || '';
      router.push(`/confirmation?jobId=${encodeURIComponent(jobId || '')}&applicationUrl=${encodeURIComponent(applicationUrl)}&mode=${encodeURIComponent(form.application_mode)}&emails=${encodeURIComponent(form.report_emails)}`);
    } catch (error) {
      console.error(error);
      const backendMessage = error?.data?.message || error?.data?.error || error?.message;
      setErrorMsg(backendMessage || 'Network or server error');
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
          {errorMsg && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your company name"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description *</label>
              <textarea
                name="job_description"
                value={form.job_description}
                onChange={handleChange}
                required
                rows={6}
                className="form-input"
                placeholder="Describe the role, responsibilities, and company culture..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements & Skills</label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={4}
                className="form-input font-mono text-sm"
                placeholder="List required skills and experience..."
              />
            </div>

            {/* Application Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Application Mode *</label>
              <select
                name="application_mode"
                value={form.application_mode}
                onChange={handleChange}
                className="form-input"
              >
                <option value="email">Applications go to Company Email</option>
                <option value="link">Generate Application Link</option>
              </select>
            </div>

            {/* HR Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">HR Contact Email *</label>
              <input
                type="email"
                name="application_email"
                value={form.application_email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="hr@yourcompany.com"
              />
            </div>

            {/* Report Emails */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Report Emails *</label>
              <input
                type="text"
                name="report_emails"
                value={form.report_emails}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="manager1@company.com, manager2@company.com"
              />
              <p className="text-sm text-gray-500 mt-1">Separate multiple emails with commas</p>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Application Deadline *</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {/* Interview Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Interview Time (Optional)</label>
              <input
                type="datetime-local"
                name="interview_time"
                value={form.interview_time}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Interview Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Interview Link (Optional)</label>
              <input
                type="url"
                name="interview_link"
                value={form.interview_link}
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
        </div>
      </div>
    </div>
  );
}
