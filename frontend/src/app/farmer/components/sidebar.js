"use client";

import { FaGripHorizontal, FaMoneyBillWave, FaRegFileAlt } from "react-icons/fa";

const navItems = [
  { label: "Dashboard", icon: FaGripHorizontal, active: true },
  { label: "Milk records", icon: FaRegFileAlt, active: false },
  { label: "Payments", icon: FaMoneyBillWave, active: false },
];

export default function FarmerSidebar() {
  return (
    <aside className="hidden min-h-screen w-[230px] border-r border-slate-200 bg-[#f7f8fc] px-3 py-5 lg:block">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-[#14347c] text-lg font-bold text-white">
          D
        </div>
        <div>
          <h2 className="text-xl font-extrabold leading-6 text-[#082b73]">
            DMS.rw
          </h2>
          <p className="text-xs font-medium text-slate-600">
            Dairy Management System
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex h-11 w-full items-center gap-3 rounded px-3 text-left text-sm font-semibold transition ${
                item.active
                  ? "border-r-4 border-[#0b327c] bg-[#e6eafa] text-[#082b73]"
                  : "text-slate-600 hover:bg-white hover:text-[#082b73]"
              }`}
            >
              <Icon className="text-base" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
