"use client";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  Plus,
  TriangleAlert,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import OperatorHeader from "./components/header";
import OperatorSidebar from "./components/sidebar";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import MilkEntryForm from "@/app/components/MilkEntryForm";

const stats = [
  {
    label: "Today's milk (L)",
    value: "4,250",
    note: "+12% vs yesterday",
    noteClass: "text-emerald-600",
    icon: TrendingUp,
  },
  {
    label: "Farmers active today",
    value: "142",
    note: "Checked in today",
    noteClass: "text-[#6B7280]",
    icon: UserCheck,
  },
  {
    label: "Entries to verify",
    value: "18",
    note: "Requires attention",
    noteClass: "text-amber-500",
    icon: TriangleAlert,
  },
];

const statusStyles = {
  Accepted: "w-[109px] bg-[#D1FAE5] text-[#047857]",
  Hold: "w-[80px] bg-[#FEF3C7] text-[#B45309]",
  Rejected: "w-[91px] bg-[#FFDAD6] text-[#B42318]",
};

export default function OperatorDashboardPage() {
  const [showForm, setShowForm] = useState(false);

   const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:5000/api/milk-collections"
      );

      setEntries(res.data?.data || []);
    } catch (err) {
      setError("Failed to load entries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

   const handleSuccess = async () => {
    setShowForm(false);
    await fetchEntries(); 
  };
  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#141B2B]">
      <div className="flex min-h-screen min-w-[1280px]">
        <OperatorSidebar />

        <div className="w-[1020px] shrink-0">
          <OperatorHeader />

          <main className="w-full px-[25px] pb-0 pt-[26px]">
            <section className="mb-[20px] flex items-start justify-between">
              <div>
                <h1 className="text-[25px] font-bold leading-[30px] text-[#141B2B]">
                  Overview
                </h1>
                <p className="mt-[7px] text-[15px] leading-[20px] text-[#6B7280]">
                  Today's collection summary and recent farmer entries.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="inline-flex h-[34px] items-center justify-center gap-2 rounded-lg bg-[#00236F] px-[26px] text-[13px] font-medium text-white transition hover:bg-[#082f86]"
                >
                  <Plus size={15} />
                  <span>Quick Entry</span>
                </button>
                <button
                  type="button"
                  className="inline-flex h-[34px] items-center justify-center gap-2 rounded-lg border border-[#00236F] bg-[#F9F9FF] px-[19px] text-[13px] font-medium text-[#00236F] transition hover:bg-white"
                >
                  <Download size={14} strokeWidth={2.1} />
                  <span>Export</span>
                </button>
              </div>
            </section>

        <section className="mb-4 grid grid-cols-3 gap-[16px]">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="h-[118px] rounded-[10px] border border-[#E5E7EB] bg-white px-6 pb-5 pt-[18px]"
              >
                <p className="text-[12px] font-semibold uppercase leading-4 tracking-[0.04em] text-[#6B7280]">
                  {stat.label}
                </p>
                <p className="mt-[25px] text-[30px] font-bold leading-8 text-[#141B2B]">
                  {stat.value}
                </p>
                <p
                  className={`mt-[2px] inline-flex items-center gap-[7px] text-[14px] font-semibold leading-5 ${stat.noteClass}`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {stat.note}
                </p>
              </article>
            );
          })}
            </section>

            <section className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white">
          <div className="flex h-[61px] items-center justify-between border-b border-[#E5E7EB] bg-[#F9F9FF] px-6">
            <h2 className="text-[18px] font-bold leading-6 text-[#141B2B]">
              Latest Entries
            </h2>
            <button
              type="button"
              className="text-[14px] font-medium leading-5 text-[#00236F] transition hover:text-[#082f86]"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed text-left">
              <thead className="h-10 bg-[#F3F4F6] text-[12px] font-semibold uppercase leading-4 tracking-[0.04em] text-[#6B7280]">
                <tr>
                  <th className="w-[33%] px-6 py-3">Farmer Name</th>
                  <th className="w-[14%] px-4 py-3">ID</th>
                  <th className="w-[17%] px-4 py-3">Volume (L)</th>
                  <th className="w-[16%] px-4 py-3">Status</th>
                  <th className="w-[13%] px-4 py-3">Time</th>
                  <th className="w-[7%] px-4 py-3 text-center">Edit</th>
                </tr>
              </thead>
              <tbody className="text-[14px] leading-5">
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="h-[77px] border-t border-[#E5E7EB] first:border-t-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#DCE2F7] text-[14px] font-bold text-[#00236F]">
                          {entry.initial}
                        </span>
                        <span className="font-medium text-[#141B2B]">
                          {entry.farmer}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-normal text-[#444651]">
                      {entry.id}
                    </td>
                    <td className="px-4 py-4 font-medium text-[#141B2B]">
                      {entry.volume}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex h-9 items-center justify-center rounded-sm text-[13px] font-medium ${statusStyles[entry.status]}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-normal text-[#444651]">
                      {entry.time}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center text-[#444651] transition hover:text-[#00236F]"
                        aria-label={`Edit ${entry.farmer}`}
                      >
                        <Edit3 size={16} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex h-[42px] items-center justify-between border-t border-[#E5E7EB] bg-[#F9F9FF] px-6 text-[14px] leading-5 text-[#444651]">
            <span>1-4 of 142</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center transition hover:text-[#00236F]"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center transition hover:text-[#00236F]"
                aria-label="Next page"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
            </section>
          </main>
        </div>
      </div>
            {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-[520px] rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <MilkEntryForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}
