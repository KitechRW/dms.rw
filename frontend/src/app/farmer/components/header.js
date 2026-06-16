"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaCheck, FaTh } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const initialNotifications = [
  {
    id: "1",
    title: "Milk delivery accepted",
    message: "Your Oct 24 delivery of 42.0 L was accepted.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "Payment processing",
    message: "October Advance is being processed.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "3",
    title: "Statement ready",
    message: "September statement is ready to download.",
    time: "Yesterday",
    unread: false,
  },
];

export default function FarmerHeader() {
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => item.unread).length;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-[#f7f8fc] px-4 sm:px-5 lg:px-6">
      <h1 className="text-xl font-extrabold text-[#082b73]">DMS.rw</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((value) => !value);
              setOpen(false);
            }}
            className="relative text-base text-slate-700 transition hover:text-[#082b73]"
            aria-label="Notifications"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute -right-1.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 z-50 mt-3 w-[300px] rounded border border-slate-200 bg-white shadow-lg sm:w-[340px]">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-bold text-slate-950">
                  Notifications
                </p>
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-xs font-semibold text-[#082b73] hover:text-sky-700"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`border-b border-slate-100 px-4 py-3 last:border-b-0 ${
                      item.unread ? "bg-blue-50/60" : "bg-white"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          item.unread
                            ? "bg-[#082b73] text-white"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        <FaCheck className="text-xs" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {item.message}
                        </p>
                        <p className="mt-1 text-[11px] font-semibold text-slate-400">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              setOpen((value) => !value);
              setNotificationsOpen(false);
            }}
            className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-white transition hover:ring-[#082b73]"
            aria-label="Account"
          >
            <img
              src="/farmer-avatar.svg"
              alt="Farmer profile"
              className="h-full w-full object-cover"
            />
          </button>

          {open && (
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
