import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getJobs, createJob } from '../lib/api';

export default function Fix403() {
  const { login, isAuthenticated, user } = useAuth();
  const [status, setStatus] = useState('Starting...');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fix403 = async () => {
      try {
        // Step 1: Login
        setStatus('🔑 Logging in...');
        const result =         await login({
          email: 'demo@example.com',
          password: 'demo123'
        });

        if (result.success) {
          setStatus('✅ Login successful! Testing API...');
          
          // Step 2: Test fetching jobs
          const jobsData = await getJobs();
          setJobs(jobsData);
          setStatus(`✅ SUCCESS! Found ${jobsData.length} jobs. 403 Error Fixed!`);
          
        } else {
          setStatus(`❌ Login failed: ${result.error}`);
        }
      } catch (error) {
        setStatus(`❌ Error: ${error.message}`);
      }
    };

    fix403();
  }, [login]);

  const testJobCreation = async () => {
    try {
      setStatus('Creating test job...');
      const newJob = await createJob({
        title: '403 Fix Test Job',
        description: 'This job was created to test that 403 errors are fixed',
        requirements: 'React, API, Authentication',
        deadline: '2025-12-31T23:59:59'
      });
      
      setStatus(`✅ Job created! ID: ${newJob.id}`);
      
      // Refresh jobs
      const jobsData = await getJobs();
      setJobs(jobsData);
    } catch (error) {
      setStatus(`❌ Job creation failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🔧 Fix 403 Forbidden Error</h1>
        
        <div className="bg-green-900 border border-green-600 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Problem Fixed!</h2>
          <p className="text-green-300 mb-4">
            The 403 Forbidden error was caused by the frontend making direct requests to 
            <code className="bg-gray-800 px-2 py-1 rounded">localhost:8080</code> instead of using the Next.js proxy.
          </p>
          <p className="text-green-300">
            <strong>Solution:</strong> Removed <code className="bg-gray-800 px-2 py-1 rounded">NEXT_PUBLIC_API_URL=http://localhost:8080/api</code> 
            from <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> to use the Next.js proxy at <code className="bg-gray-800 px-2 py-1 rounded">/api</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
            <div className="space-y-4">
              <div>
                <strong>Authentication:</strong> 
                <span className={`ml-2 ${isAuthenticated ? 'text-green-400' : 'text-red-400'}`}>
                  {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
                </span>
              </div>
              <div>
                <strong>User:</strong> 
                <span className="ml-2 text-blue-400">
                  {user ? `${user.firstName} ${user.lastName}` : 'Not logged in'}
                </span>
              </div>
              <div>
                <strong>API Status:</strong> 
                <span className="ml-2 text-yellow-400">{status}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Test Actions</h2>
            <div className="space-y-4">
              <button
                onClick={testJobCreation}
                disabled={!isAuthenticated}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
              >
                Create Test Job
              </button>
              
              <a
                href="/create-job"
                className="block w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-center"
              >
                Go to Job Creation Page
              </a>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {jobs.length > 0 && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Jobs ({jobs.length})</h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-gray-700 p-4 rounded">
                  <h3 className="text-lg font-semibold text-blue-400">{job.title}</h3>
                  <p className="text-gray-300">{job.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400">Status: {job.status}</span>
                    <span className="text-sm text-gray-400">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
