import React from 'react';
import { useApp } from '../context/AppContext';

export const ImpactStatsBanner: React.FC = () => {
  const { impactStats } = useApp();

  return (
    <section className="bg-[#F4EFEA] border-y border-[#E5DFD4] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E2D9CC]">
          
          {/* Pillar 1 */}
          <div className="pt-4 sm:pt-0 sm:px-4 first:pt-0 first:pl-0">
            <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1E3023] mb-1">
              01 Every purchase has a story
            </h3>
            <p className="text-sm text-[#5C6E60]">
              Direct from {impactStats.villageCollectives} village collectives
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1E3023] mb-1">
              Fair income
            </h3>
            <p className="text-sm text-[#5C6E60]">
              More value stays with makers
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1E3023] mb-1">
              Waste reused
            </h3>
            <p className="text-sm text-[#5C6E60]">
              {impactStats.wasteReusedKg.toLocaleString()} kg kept in the loop
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="pt-4 sm:pt-0 sm:px-4 last:pr-0">
            <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1E3023] mb-1">
              Local first
            </h3>
            <p className="text-sm text-[#5C6E60]">
              Delivering across rural India
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
