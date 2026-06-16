"use client";

import {
  FaDownload,
  FaEdit,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";
import OperatorHeader from "./components/header";
import OperatorSidebar from "./components/sidebar";

const stats = [
  { label: "Today's milk (L)", value: "4,250", note: "+12% vs yesterday", tone: "success" },
  { label: "Farmers active today", value: "142", note: "Checked in today", tone: "neutral" },
  { label: "Entries to verify", value: "18", note: "Requires attention", tone: "warning" },
];

const entries = [
  { farmer: "Jean Bosco", initial: "J", id: "#FM-1042", volume: "45.5", status: "Accepted", time: "10:42 AM" },
  { farmer: "Marie Claire", initial: "M", id: "#FM-2931", volume: "120.0", status: "Accepted", time: "10:35 AM" },
  { farmer: "Emmanuel N.", initial: "E", id: "#FM-0844", volume: "32.2", status: "Hold", time: "10:15 AM" },
  { farmer: "Aline Uwera", initial: "A", id: "#FM-1102", volume: "15.0", status: "Rejected", time: "09:55 AM" },
];

const statusStyles = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Hold: "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function OperatorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <div className="flex">
        <OperatorSidebar />

        <div className="min-h-screen flex-1">
          <OperatorHeader />

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <section className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-950">
                  Overview
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Today's collections and recent activity.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#082b73] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b3a94]"
                >
                  <FaPlus className="text-xs" />
                  Quick Entry
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#082b73] bg-white px-4 text-sm font-bold text-[#082b73] transition hover:bg-blue-50"
                >
                  <FaDownload className="text-xs" />
                  Export
                </button>
              </div>
            </section>

            <section className="mb-5 grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    {stat.label}
                  </p>
                  <p className="mt-6 text-3xl font-extrabold text-slate-950">
                    {stat.value}
                  </p>
                  <p
                    className={`mt-1.5 text-sm font-bold ${
                      stat.tone === "success"
                        ? "text-emerald-700"
                        : stat.tone === "warning"
                          ? "text-orange-500"
                          : "text-slate-600"
                    }`}
                  >
                    {stat.tone === "warning" && (
                      <FaExclamationTriangle className="mr-1 inline text-xs" />
                    )}
                    {stat.note}
                  </p>
                </div>
              ))}
            </section>

            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-5">
                <h2 className="text-lg font-extrabold text-slate-950">
                  Latest Entries
                </h2>
                <button
                  type="button"
                  className="text-sm font-bold text-[#082b73] hover:text-sky-700"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Farmer Name</th>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Volume (L)</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-t border-slate-100">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2e8fb] text-sm font-extrabold text-[#082b73]">
                              {entry.initial}
                            </div>
                            <span className="text-sm font-medium text-slate-950">
                              {entry.farmer}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {entry.id}
                        </td>
                        <td className="px-5 py-4 text-sm font-bold text-slate-950">
                          {entry.volume}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex min-w-[78px] justify-center rounded px-2.5 py-1.5 text-xs font-bold ${statusStyles[entry.status]}`}
                          >
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {entry.time}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            className="text-base text-slate-600 transition hover:text-[#082b73]"
                            aria-label={`Edit ${entry.farmer}`}
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
                <span>1-4 of 142</span>
                <div className="flex gap-5 text-lg text-slate-700">
                  <button type="button" aria-label="Previous page">
                    &lt;
                  </button>
                  <button type="button" aria-label="Next page">
                    &gt;
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
