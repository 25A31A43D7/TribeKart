import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkerJob } from '../types';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Users,
  Send,
  Truck,
  Camera,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const WorkerPortalPage: React.FC = () => {
  const { jobs, applyForJob, currentUser, switchRole, language, addToast } = useApp();
  const [selectedJob, setSelectedJob] = useState<WorkerJob | null>(null);
  const [applicantNotes, setApplicantNotes] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyClick = (job: WorkerJob) => {
    setSelectedJob(job);
    setIsApplying(true);
    setApplicantNotes('Available immediately. Familiar with handloom fabric checking and local Telugu dialect.');
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    applyForJob(selectedJob.id, applicantNotes);
    setIsApplying(false);
    setSelectedJob(null);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase mb-1.5">
            {language === 'te' ? 'గ్రామీణ ఉపాధి కేంద్రం' : 'RURAL EMPLOYMENT & COMMUNITY LOGISTICS'}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023] mb-2">
            Work With Us: Village Hubs & Field Jobs
          </h1>
          <p className="text-sm text-[#5C6E60] max-w-2xl">
            Empowering rural youth and women's self-help groups through fair-wage employment in collection, quality checking, catalog photography, and last-mile cluster logistics.
          </p>
        </div>

        {/* Worker Persona Quick Switch */}
        <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DFD4] flex items-center gap-4 text-xs">
          <div>
            <span className="text-[#849487] block text-[11px]">Logged in as Worker</span>
            <span className="font-semibold text-[#1E3023]">{currentUser.name}</span>
          </div>
          <button
            onClick={() => switchRole('worker')}
            className="px-3 py-1.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg font-medium cursor-pointer"
          >
            Switch to Worker View
          </button>
        </div>
      </div>

      {/* Shared Collection Centre Model Banner */}
      <div className="bg-[#24392B] text-white rounded-2xl p-6 sm:p-8 mb-10 border border-[#35513D]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs uppercase font-semibold text-[#DDA76A] tracking-wider">
              FUTURE-READY RURAL LOGISTICS ARCHITECTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4DEBA]">
              Shared Village Collection Depots & Milk-Run Van Routing
            </h2>
            <p className="text-xs sm:text-sm text-[#BAC8BD] leading-relaxed">
              Instead of high individual parcel pickups, TribeKart aggregates products from 27 artisan hamlets into 5 centralized rural hubs. Local workers inspect quality, pack in biodegradable cartons, and hand off bulk shipments to postal networks — slashing freight costs by 45%.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-center">
            <div className="bg-[#1C2C20] p-4 rounded-xl border border-[#35513D]">
              <span className="font-mono text-2xl font-bold text-[#F4DEBA] block tabular-nums">158</span>
              <span className="text-[11px] text-[#A2B3A4] uppercase">Local Jobs Created</span>
            </div>
            <div className="bg-[#1C2C20] p-4 rounded-xl border border-[#35513D]">
              <span className="font-mono text-2xl font-bold text-[#9FE2A7] block tabular-nums">₹650</span>
              <span className="text-[11px] text-[#A2B3A4] uppercase">Avg Daily Payout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-normal text-[#1E3023]">
            Open Community Roles & Daily Wage Shifts ({jobs.length})
          </h3>
          <span className="text-xs text-[#6F8273]">
            Updated for Telangana & Andhra Pradesh Rural Clusters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => {
            const isApplied = job.status === 'applied';

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border border-[#E5DFD4] shadow-xs flex flex-col justify-between hover:border-[#C4BAA9] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="text-xs font-semibold text-[#7A5B35] uppercase tracking-wider">
                      {job.jobType}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#2C6E3D] bg-[#EAF5ED] px-2.5 py-1 rounded-sm tabular-nums">
                      {job.payout}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[#1E3023] mb-1">
                    {language === 'te' && job.titleTelugu ? job.titleTelugu : job.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-[#6F8273] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#7A5B35]" />
                    <span>{job.hubLocation}</span>
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5 text-[#7A5B35]" />
                    <span>{job.schedule}</span>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1.5 mb-6">
                    <p className="text-[11px] uppercase font-semibold text-[#8C9C8F]">Task Responsibilities:</p>
                    <ul className="text-xs text-[#4A5D4F] space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E3D] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EDE7DD] flex items-center justify-between">
                  <span className="text-xs text-[#6F8273]">
                    {job.slotsAvailable} vacancies available
                  </span>

                  {isApplied ? (
                    <span className="px-4 py-2 bg-[#E8F2EA] text-[#2C6E3D] text-xs font-semibold rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Application Under Review
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-4 py-2 bg-[#2C4A34] hover:bg-[#1E3324] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#E4C59E]" />
                      <span>Apply for Shift</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Modal */}
      {isApplying && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#DDD5C7] shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase text-[#7A5B35]">SUBMIT APPLICATION</p>
                <h3 className="font-serif text-xl font-semibold text-[#1E3023]">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-[#6F8273]">{selectedJob.hubLocation}</p>
              </div>
              <span className="font-mono text-sm font-bold text-[#2C6E3D] bg-[#EAF5ED] px-2.5 py-1 rounded-sm">
                {selectedJob.payout}
              </span>
            </div>

            <form onSubmit={handleConfirmApplication} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1E3023] mb-1">Applicant Name</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.name}
                  className="w-full p-2.5 bg-[#F6F2EB] rounded-lg border border-[#DDD5C7] text-[#1E3023]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E3023] mb-1">Mobile Contact (for WhatsApp Dispatch Alerts)</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.phone}
                  className="w-full p-2.5 bg-[#F6F2EB] rounded-lg border border-[#DDD5C7] text-[#1E3023]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E3023] mb-1">
                  Availability & Relevant Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  value={applicantNotes}
                  onChange={(e) => setApplicantNotes(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                  placeholder="e.g. Previous experience in handloom sorting, two-wheeler available..."
                />
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8E1D5] text-[11px] text-[#5D6F61] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2C6E3D] shrink-0 mt-0.5" />
                <span>
                  Payments are credited directly to worker Aadhaar-linked bank account within 24 hours of shift completion.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="px-4 py-2 text-xs text-[#5D6F61] hover:text-[#1E3023]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white font-medium rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#E4C59E]" />
                  <span>Submit & Receive SMS Pass</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
