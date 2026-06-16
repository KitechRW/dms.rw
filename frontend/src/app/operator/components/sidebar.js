"use client";

import {
  FaCog,
  FaGripHorizontal,
  FaMoneyBillWave,
  FaPlus,
  FaRegCircle,
  FaRegUser,
  FaUsers,
} from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

const navItems = [
  { label: "Dashboard", icon: FaGripHorizontal, active: true },
  { label: "Milk Collection", icon: FaRegFileAlt, active: false },
  { label: "Cooperatives", icon: FaRegCircle, active: false },
  { label: "Farmers", icon: FaRegUser, active: false },
  { label: "Payments", icon: FaMoneyBillWave, active: false },
  { label: "Settings", icon: FaCog, active: false },
];

export default function OperatorSidebar() {
  return (
    <aside className="flex min-h-screen w-[210px] shrink-0 flex-col border-r border-slate-200 bg-[#f7f8fc] sm:w-[235px]">
      <div className="flex items-center gap-3 px-4 py-5 sm:px-5 sm:py-6">
        <img
          src="/dms-logo-mark.svg"
          alt="DMS.rw"
          className="h-10 w-10 rounded-xl sm:h-11 sm:w-11"
        />
        <div>
          <h2 className="text-xl font-extrabold leading-6 text-[#082b73] sm:text-2xl sm:leading-7">
            DMS.rw
          </h2>
          <p className="text-xs font-medium leading-4 text-slate-600 sm:text-sm">
            Dairy Management System
          </p>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-1.5 sm:mt-5 sm:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex h-10 w-full items-center gap-3 px-4 text-left text-xs font-medium transition sm:h-11 sm:px-5 sm:text-sm ${
                item.active
                  ? "border-r-4 border-[#082b73] bg-[#e6eafa] text-[#082b73]"
                  : "text-slate-600 hover:bg-white hover:text-[#082b73]"
              }`}
            >
              <Icon className="text-base" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-3 py-4">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#082b73] bg-white text-sm font-semibold text-[#082b73] transition hover:bg-blue-50"
        >
          <FaPlus className="text-xs" />
          Quick Entry
        </button>
      </div>
    </aside>
  );
}
