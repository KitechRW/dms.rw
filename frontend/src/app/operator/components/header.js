"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaSearch, FaTh } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const notifications = [
  "18 entries require verification",
  "Jean Bosco delivery was accepted",
  "Export report is ready",
];

export default function OperatorHeader() {
  const router = useRouter();
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="flex min-h-14 items-center justify-between gap-3 border-b border-slate-200 bg-[#f7f8fc] px-4 py-3 sm:px-6">
      <div className="hidden text-lg font-extrabold text-[#082b73] lg:block">
        DMS.rw
      </div>

      <div className="relative w-full max-w-[320px] lg:ml-auto">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
        <input
          type="search"
          placeholder="Search farmer or ID"
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#082b73] focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((value) => !value);
              setProfileOpen(false);
            }}
            className="relative text-base text-slate-700 transition hover:text-[#082b73]"
            aria-label="Notifications"
          >
            <FaBell />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 z-50 mt-3 w-[260px] rounded border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-3 py-2 text-sm font-bold text-slate-950">
                Notifications
              </div>
              {notifications.map((item) => (
                <div
                  key={item}
                  className="border-b border-slate-100 px-3 py-2.5 text-xs font-medium text-slate-600 last:border-b-0"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="text-base text-slate-700 transition hover:text-[#082b73]"
          aria-label="Apps"
        >
          <FaTh />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((value) => !value);
              setNotificationsOpen(false);
            }}
            className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-white transition hover:ring-[#082b73]"
            aria-label="Operator account"
          >
            <img
              src="/operator-avatar.svg"
              alt="Operator profile"
              className="h-full w-full object-cover"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-36 rounded border border-slate-200 bg-white py-1.5 shadow-lg">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
