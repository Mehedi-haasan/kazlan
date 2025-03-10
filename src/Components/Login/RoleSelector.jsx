import { useState, useEffect } from "react";

const RoleSelector = ({ rules = [], onChange }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    setSelectedRoles(rules); // Set default selected roles from props
  }, [rules]);

  const handleCheckboxChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];

    setSelectedRoles(updatedRoles);
    onChange && onChange(updatedRoles); // Notify parent of change
  };

  const roles = ["User", "admin", "moderator", "superadmin"];

  return (
    <div className="">
      <h2 className="block text-white text-sm font-semibold mb-1">Select Roles for User</h2>

      <div className="flex justify-between gap-2">
        {roles.map((role) => (
          <label key={role} className={`flex items-center p-1 rounded-lg cursor-pointer transition ${selectedRoles.includes(role) ? "text-white" : "text-white"}`}>
            <input type="checkbox" value={role} checked={selectedRoles.includes(role)} onChange={() => handleCheckboxChange(role)} className="hidden" />
            <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center text-white mr-2 ${selectedRoles.includes(role) ? "border-blue-600 bg-blue-600" : "border-gray-500"}`}>
              {selectedRoles.includes(role) && (
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-white capitalize">{role}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
