"use client";

import { useEffect, useState } from "react";

const frontendAdmins = [
  {
    _id: "1",
    email: "admin@dms.rw",
  },
  {
    _id: "2",
    email: "superadmin@dms.rw",
  },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = () => {
    setAdmins(frontendAdmins);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Admins</h2>

      {admins.map((a) => (
        <div key={a._id} className="border p-2 mb-2">
          {a.email}
        </div>
      ))}
    </div>
  );
}
