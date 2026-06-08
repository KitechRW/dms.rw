"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "admin",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // MOCK DATA (frontend only)
  const mockUsers = [
    {
      _id: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      role: "admin",
    },
    {
      _id: "2",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      role: "superadmin",
    },
  ];

  // Load users (mock)
  const fetchUsers = () => {
    setUsers(mockUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE USER (frontend only)
  const handleCreate = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error("All fields are required");
      return;
    }

    const newUser = {
      _id: Date.now().toString(),
      ...formData,
    };

    setUsers((prev) => [...prev, newUser]);

    toast.success("User created");

    setFormOpen(false);

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      role: "admin",
    });
  };

  // DELETE USER (frontend only)
  const handleDelete = (id) => {
    if (!confirm("Delete this user?")) return;

    setUsers((prev) => prev.filter((u) => u._id !== id));
    toast.success("User deleted");
  };

  // UPDATE USER (frontend only)
  const handleUpdate = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === editingUser._id ? editingUser : u
      )
    );

    toast.success("User updated");
    setEditingUser(null);
  };

  // SEARCH FILTER
  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();

    return (
      (u.first_name || "").toLowerCase().includes(term) ||
      (u.last_name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term) ||
      (u.role || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users List</h2>

        <button
          onClick={() => setFormOpen(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          + Create user
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 flex justify-center">
        <input
          placeholder="Search name, email or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 border px-3 py-2 rounded"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.first_name}</td>
                  <td className="p-3">{u.last_name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="p-1 rounded hover:bg-gray-200 text-gray-600 transition"
                    >
                      <FaTrash />
                    </button>

                    <button
                      onClick={() => setEditingUser(u)}
                      className="p-1 rounded hover:bg-gray-200 text-gray-600 transition"
                    >
                      <FaPencilAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create User</h3>

            <input
              placeholder="First Name"
              className="border p-2 w-full mb-2"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
            />

            <input
              placeholder="Last Name"
              className="border p-2 w-full mb-2"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="border p-2 w-full mb-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFormOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="bg-sky-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>

            <input
              className="border p-2 w-full mb-2"
              value={editingUser.first_name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  first_name: e.target.value,
                })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              value={editingUser.last_name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  last_name: e.target.value,
                })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: e.target.value,
                })
              }
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingUser(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-sky-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}