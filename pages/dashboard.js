import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPublicJobs } from '../lib/api';

// Simple placeholder mapping in case backend fields differ
const mapJob = (j) => ({
  id: j.id || j.jobId || j.job_id,
  title: j.title || j.jobTitle,
  company: j.company || j.companyName,
  applicants: j.applicants || j.applicantCount || 0,
  deadline: j.deadline || j.closingDate || '',
  status: j.status || (j.active ? 'Active' : 'Closed'),
  shortlisted: j.shortlisted || 0,
  flagged: j.flagged || 0,
  rejected: j.rejected || 0,
});

export default function Dashboard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getPublicJobs();
        const list = Array.isArray(data) ? data : (data?.content || data?.items || []);
        if (mounted) setJobs(list.map(mapJob));
      } catch (err) {
        if (mounted) setError('Failed to load jobs');
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const viewReport = (job) => {
    setSelectedJob(job);
    setShowReport(true);
  };

  const downloadReport = () => {
    // Implement download functionality
    alert('Downloading report...');
  };

  const resendReport = () => {
    // Implement resend functionality
    alert('Report resent to HR emails');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-heading font-bold">E</span>
              </div>
              <span className="text-xl font-heading font-bold">Emil AI Dashboard</span>
            </div>
            <Link href="/create-job" className="btn-primary">
              + New Job
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Manage your job postings and view applicant reports.
          </p>
        </div>

        {/* Jobs Table */}
        <div className="card">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Your Job Postings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-heading font-bold text-gray-900">Job Title</th>
                  <th className="text-left py-3 font-heading font-bold text-gray-900">Applicants</th>
                  <th className="text-left py-3 font-heading font-bold text-gray-900">Deadline</th>
                  <th className="text-left py-3 font-heading font-bold text-gray-900">Status</th>
                  <th className="text-left py-3 font-heading font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-gray-900">{job.applicants}</span>
                      <span className="text-sm text-gray-500 ml-1">candidates</span>
                    </td>
                    <td className="py-4 text-gray-600">{job.deadline}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => viewReport(job)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!loading && jobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No job postings yet</div>
              <Link href="/create-job" className="btn-primary">
                Create Your First Job
              </Link>
            </div>
          )}
          {loading && (
            <div className="text-center py-12 text-gray-500">Loading jobs...</div>
          )}
          {error && (
            <div className="text-center py-12 text-red-600">{error}</div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReport && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-heading font-bold text-gray-900">
                  Candidate Report: {selectedJob.title}
                </h3>
                <button
                  onClick={() => setShowReport(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-heading font-bold text-blue-600">{selectedJob.applicants}</div>
                  <div className="text-blue-700 text-sm">Total Applicants</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-heading font-bold text-green-600">{selectedJob.shortlisted}</div>
                  <div className="text-green-700 text-sm">Shortlisted</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-heading font-bold text-yellow-600">{selectedJob.flagged}</div>
                  <div className="text-yellow-700 text-sm">Flagged</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-heading font-bold text-red-600">{selectedJob.rejected}</div>
                  <div className="text-red-700 text-sm">Rejected</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button onClick={downloadReport} className="btn-secondary">
                  Download JSON Report
                </button>
                <button onClick={downloadReport} className="btn-secondary">
                  Download PDF Report
                </button>
                <button onClick={resendReport} className="btn-primary">
                  Resend to HR
                </button>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-heading font-bold text-gray-900 mb-4">Candidate Breakdown</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-green-700">Shortlisted Candidates</span>
                      <span className="font-bold text-green-700">{selectedJob.shortlisted}</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(selectedJob.shortlisted / selectedJob.applicants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-yellow-700">Flagged for Review</span>
                      <span className="font-bold text-yellow-700">{selectedJob.flagged}</span>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${(selectedJob.flagged / selectedJob.applicants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-red-700">Rejected</span>
                      <span className="font-bold text-red-700">{selectedJob.rejected}</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(selectedJob.rejected / selectedJob.applicants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}