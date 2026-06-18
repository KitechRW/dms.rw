"use client";

import {
  FaCheck,
  FaDownload,
  FaGripHorizontal,
  FaHistory,
  FaMoneyBillWave,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRegTimesCircle,
  FaSyncAlt,
  FaTint,
  FaTruck,
} from "react-icons/fa";
import FarmerHeader from "./components/header";
import FarmerSidebar from "./components/sidebar";

const records = [
  { id: "REF-1024", date: "Oct 24, 06:30 AM", volume: "42.0", status: "Accepted", tone: "accepted" },
  { id: "REF-1023", date: "Oct 23, 06:45 AM", volume: "45.5", status: "Accepted", tone: "accepted" },
  { id: "REF-1022", date: "Oct 22, 07:00 AM", volume: "48.0", status: "Under Review", tone: "review" },
  { id: "REF-1021", date: "Oct 21, 06:20 AM", volume: "38.0", status: "Rejected", tone: "rejected" },
];

const payments = [
  { title: "October Advance", date: "Est. Oct 28", amount: "150,000 RWF", status: "Processing", tone: "processing" },
  { title: "September Final", date: "Paid Oct 5", amount: "210,400 RWF", status: "Paid via MoMo", tone: "paid" },
  { title: "September Advance", date: "Paid Sep 15", amount: "120,000 RWF", status: "Paid via MoMo", tone: "paid" },
];

const mobileNavItems = [
  { label: "Dashboard", icon: FaGripHorizontal, active: true },
  { label: "Milk records", icon: FaRegFileAlt, active: false },
  { label: "Payments", icon: FaMoneyBillWave, active: false },
];

const statusStyles = {
  accepted: "bg-emerald-100 text-emerald-700",
  review: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

function RecordStatus({ record }) {
  const Icon =
    record.tone === "accepted"
      ? FaRegCheckCircle
      : record.tone === "rejected"
        ? FaRegTimesCircle
        : FaHistory;

  return (
    <span
      className={`inline-flex min-w-[104px] items-center gap-1.5 rounded px-2 py-1 text-[11px] font-bold uppercase ${statusStyles[record.tone]}`}
    >
      <Icon />
      {record.status}
    </span>
  );
}

export default function FarmerDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <div className="flex">
        <FarmerSidebar />

        <div className="min-h-screen flex-1">
          <FarmerHeader />

          <main className="px-3 py-4 sm:px-5 lg:px-6 lg:py-6">
            <nav className="mb-4 grid grid-cols-3 gap-2 lg:hidden">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`flex min-h-10 items-center justify-center gap-2 rounded border px-2 text-xs font-semibold transition ${
                      item.active
                        ? "border-[#cfd7f2] bg-[#e6eafa] text-[#082b73]"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <section className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  My Dashboard
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Your milk records and payments at a glance.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                <FaDownload className="text-xs" />
                Download Statement
              </button>
            </section>

            <section className="mb-5 grid gap-4 md:grid-cols-2">
              <div className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-6 flex items-start justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    This month's milk
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-[#ecf1fb] text-base text-[#082b73]">
                    <FaTint />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-extrabold text-slate-950">
                    1,240.5
                  </p>
                  <p className="pb-1 text-sm text-slate-600">Liters</p>
                </div>
                <p className="mt-2 text-xs font-bold text-emerald-700">
                  +5.2% vs last month
                </p>
              </div>

              <div className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-6 flex items-start justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Last delivery
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-emerald-100 text-base text-emerald-700">
                    <FaTruck />
                  </div>
                </div>
                <p className="text-xl font-extrabold text-slate-950">
                  Oct 24, 2023
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  42.0 L - <span className="text-emerald-700">Accepted</span>
                </p>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,380px)]">
              <div className="rounded border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                  <h3 className="text-lg font-bold text-slate-950">
                    Recent Records
                  </h3>
                  <button
                    type="button"
                    className="text-sm font-bold text-[#082b73] transition hover:text-sky-700"
                  >
                    View all
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <tr>
                        <th className="px-4 py-3">Date & Time</th>
                        <th className="px-4 py-3">Volume (L)</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Reference ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record) => (
                        <tr key={record.id} className="border-t border-slate-100">
                          <td className="px-4 py-3 text-sm text-slate-900">
                            {record.date}
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-slate-900">
                            {record.volume}
                          </td>
                          <td className="px-4 py-3">
                            <RecordStatus record={record} />
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            #{record.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-950">
                    Payments
                  </h3>
                  <FaHistory className="text-lg text-slate-600" />
                </div>

                {payments.map((payment) => (
                  <div
                    key={payment.title}
                    className="flex gap-3 border-b border-slate-100 py-4 last:border-b-0"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm ${
                        payment.tone === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {payment.tone === "paid" ? <FaCheck /> : <FaSyncAlt />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-950">
                            {payment.title}
                          </p>
                          <p className="mt-1 text-xs font-medium text-slate-600">
                            {payment.date}
                          </p>
                        </div>
                        <p className="max-w-[110px] text-right text-sm font-extrabold text-slate-950">
                          {payment.amount}
                        </p>
                      </div>
                      <p
                        className={`mt-1 text-right text-[11px] font-extrabold uppercase ${
                          payment.tone === "paid"
                            ? "text-emerald-700"
                            : "text-orange-700"
                        }`}
                      >
                        {payment.status}
                      </p>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-4 h-10 w-full rounded border border-slate-200 bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Download Statement
                </button>
              </aside>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
