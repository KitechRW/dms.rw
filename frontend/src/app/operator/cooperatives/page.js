"use client";

import { useMemo, useState } from "react";
import OperatorHeader from "../components/header";
import OperatorSidebar from "../components/sidebar";

const cooperatives = [
  {
    id: "KDC",
    name: "Gicumbi Dairy Union",
    code: "COP-001",
    manager: "Johnathan Miller",
    district: "Gasabo",
    farmers: 1240,
    volume: "1,240.50",
    status: "Active",
    tone: "blue",
  },
  {
    id: "MFC",
    name: "Nyagatare Milk Coop",
    code: "COP-002",
    manager: "Sarah Henderson",
    district: "Muhanga",
    farmers: 840,
    volume: "840.00",
    status: "Active",
    tone: "blue",
  },
  {
    id: "NDU",
    name: "Ruhango Farmers Org",
    code: "COP-003",
    manager: "David Chen",
    district: "Nyagatare",
    farmers: 450,
    volume: "450.25",
    status: "Pending",
    tone: "amber",
  },
  {
    id: "HDG",
    name: "Rubavu Dairy Collective",
    code: "COP-004",
    manager: "Elena Rodriguez",
    district: "Huye",
    farmers: 1890,
    volume: "1,890.00",
    status: "Inactive",
    tone: "red",
  },
  {
    id: "RBC",
    name: "Burera Milk Center",
    code: "COP-005",
    manager: "Thomas Wright",
    district: "Rubavu",
    farmers: 1120,
    volume: "1,120.40",
    status: "Active",
    tone: "blue",
  },
];

const statusStyles = {
  Active: "bg-[#D1FAE5] text-[#047857]",
  Pending: "bg-[#FEF3C7] text-[#B45309]",
  Inactive: "bg-[#FEE2E2] text-[#B42318]",
};

const avatarStyles = {
  blue: "bg-[#1E3A8A]/10 text-[#00236F]",
  amber: "bg-[#F59E0B]/10 text-[#F59E0B]",
  red: "bg-[#EF4444]/10 text-[#EF4444]",
};

function SearchIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.6 18L11.3 11.7C10.8 12.1 10.225 12.4167 9.575 12.65C8.925 12.8833 8.23333 13 7.5 13C5.68333 13 4.14583 12.3708 2.8875 11.1125C1.62917 9.85417 1 8.31667 1 6.5C1 4.68333 1.62917 3.14583 2.8875 1.8875C4.14583 0.629167 5.68333 0 7.5 0C9.31667 0 10.8542 0.629167 12.1125 1.8875C13.3708 3.14583 14 4.68333 14 6.5C14 7.23333 13.8833 7.925 13.65 8.575C13.4167 9.225 13.1 9.8 12.7 10.3L19 16.6L17.6 18ZM7.5 11C8.75 11 9.8125 10.5625 10.6875 9.6875C11.5625 8.8125 12 7.75 12 6.5C12 5.25 11.5625 4.1875 10.6875 3.3125C9.8125 2.4375 8.75 2 7.5 2C6.25 2 5.1875 2.4375 4.3125 3.3125C3.4375 4.1875 3 5.25 3 6.5C3 7.75 3.4375 8.8125 4.3125 9.6875C5.1875 10.5625 6.25 11 7.5 11Z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 12 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EyeIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="956.662 365.25 18.333 12.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M965.829 375.25C966.87 375.25 967.756 374.885 968.485 374.156C969.214 373.427 969.579 372.542 969.579 371.5C969.579 370.458 969.214 369.573 968.485 368.844C967.756 368.115 966.87 367.75 965.829 367.75C964.787 367.75 963.901 368.115 963.172 368.844C962.443 369.573 962.079 370.458 962.079 371.5C962.079 372.542 962.443 373.427 963.172 374.156C963.901 374.885 964.787 375.25 965.829 375.25ZM965.829 373.75C965.204 373.75 964.672 373.531 964.235 373.094C963.797 372.656 963.579 372.125 963.579 371.5C963.579 370.875 963.797 370.344 964.235 369.906C964.672 369.469 965.204 369.25 965.829 369.25C966.454 369.25 966.985 369.469 967.422 369.906C967.86 370.344 968.079 370.875 968.079 371.5C968.079 372.125 967.86 372.656 967.422 373.094C966.985 373.531 966.454 373.75 965.829 373.75ZM965.829 377.75C963.801 377.75 961.954 377.184 960.287 376.052C958.62 374.92 957.412 373.403 956.662 371.5C957.412 369.597 958.62 368.08 960.287 366.948C961.954 365.816 963.801 365.25 965.829 365.25C967.856 365.25 969.704 365.816 971.37 366.948C973.037 368.08 974.245 369.597 974.995 371.5C974.245 373.403 973.037 374.92 971.37 376.052C969.704 377.184 967.856 377.75 965.829 377.75ZM965.829 376.083C967.398 376.083 968.839 375.67 970.151 374.844C971.464 374.017 972.467 372.903 973.162 371.5C972.467 370.097 971.464 368.983 970.151 368.156C968.839 367.33 967.398 366.917 965.829 366.917C964.259 366.917 962.818 367.33 961.506 368.156C960.193 368.983 959.19 370.097 958.495 371.5C959.19 372.903 960.193 374.017 961.506 374.844C962.818 375.67 964.259 376.083 965.829 376.083Z" />
    </svg>
  );
}

function EditIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="925.662 364 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M927.329 377.333H928.516L936.662 369.188L935.474 368L927.329 376.146V377.333ZM925.662 379V375.458L936.662 364.479C936.829 364.326 937.013 364.208 937.214 364.125C937.415 364.042 937.627 364 937.849 364C938.072 364 938.287 364.042 938.495 364.125C938.704 364.208 938.884 364.333 939.037 364.5L940.183 365.667C940.349 365.819 940.471 366 940.547 366.208C940.624 366.417 940.662 366.625 940.662 366.833C940.662 367.056 940.624 367.267 940.547 367.469C940.471 367.67 940.349 367.854 940.183 368.021L929.204 379H925.662ZM938.995 366.833L937.829 365.667L938.995 366.833ZM936.058 368.604L935.474 368L936.662 369.188L936.058 368.604Z" />
    </svg>
  );
}

function ShopIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="49.505 364.75 15 13.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M63.7551 370.787V376.75C63.7551 377.163 63.6082 377.516 63.3144 377.809C63.0207 378.103 62.6676 378.25 62.2551 378.25H51.7551C51.3426 378.25 50.9894 378.103 50.6957 377.809C50.4019 377.516 50.2551 377.163 50.2551 376.75V370.787C49.9676 370.525 49.7457 370.188 49.5894 369.775C49.4332 369.363 49.4301 368.912 49.5801 368.425L50.3676 365.875C50.4676 365.55 50.6457 365.281 50.9019 365.069C51.1582 364.856 51.4551 364.75 51.7926 364.75H62.2176C62.5551 364.75 62.8488 364.853 63.0988 365.059C63.3488 365.266 63.5301 365.538 63.6426 365.875L64.4301 368.425C64.5801 368.912 64.5769 369.356 64.4207 369.756C64.2644 370.156 64.0426 370.5 63.7551 370.787ZM58.6551 370C58.9926 370 59.2488 369.884 59.4238 369.653C59.5988 369.422 59.6676 369.162 59.6301 368.875L59.2176 366.25H57.7551V369.025C57.7551 369.287 57.8426 369.516 58.0176 369.709C58.1926 369.903 58.4051 370 58.6551 370ZM55.2801 370C55.5676 370 55.8019 369.903 55.9832 369.709C56.1644 369.516 56.2551 369.287 56.2551 369.025V366.25H54.7926L54.3801 368.875C54.3301 369.175 54.3957 369.438 54.5769 369.662C54.7582 369.887 54.9926 370 55.2801 370ZM51.9426 370C52.1676 370 52.3644 369.919 52.5332 369.756C52.7019 369.594 52.8051 369.387 52.8426 369.137L53.2551 366.25H51.7926L51.0426 368.762C50.9676 369.012 51.0082 369.281 51.1644 369.569C51.3207 369.856 51.5801 370 51.9426 370ZM62.0676 370C62.4301 370 62.6926 369.856 62.8551 369.569C63.0176 369.281 63.0551 369.012 62.9676 368.762L62.1801 366.25H60.7551L61.1676 369.137C61.2051 369.387 61.3082 369.594 61.4769 369.756C61.6457 369.919 61.8426 370 62.0676 370ZM51.7551 376.75H62.2551V371.463C62.1926 371.488 62.1519 371.5 62.1332 371.5C62.1144 371.5 62.0926 371.5 62.0676 371.5C61.7301 371.5 61.4332 371.444 61.1769 371.331C60.9207 371.219 60.6676 371.037 60.4176 370.787C60.1926 371.012 59.9363 371.188 59.6488 371.312C59.3613 371.438 59.0551 371.5 58.7301 371.5C58.3926 371.5 58.0769 371.438 57.7832 371.312C57.4894 371.188 57.2301 371.012 57.0051 370.787C56.7926 371.012 56.5457 371.188 56.2644 371.312C55.9832 371.438 55.6801 371.5 55.3551 371.5C54.9926 371.5 54.6644 371.438 54.3707 371.312C54.0769 371.188 53.8176 371.012 53.5926 370.787C53.3301 371.05 53.0707 371.234 52.8144 371.341C52.5582 371.447 52.2676 371.5 51.9426 371.5C51.9176 371.5 51.8894 371.5 51.8582 371.5C51.8269 371.5 51.7926 371.488 51.7551 371.463V376.75ZM62.2551 376.75H51.7551C51.7926 376.75 51.8269 376.75 51.8582 376.75C51.8894 376.75 51.9176 376.75 51.9426 376.75C52.2676 376.75 52.5582 376.75 52.8144 376.75C53.0707 376.75 53.3301 376.75 53.5926 376.75C53.7051 376.75 53.8269 376.75 53.9582 376.75C54.0894 376.75 54.2301 376.75 54.3801 376.75C54.5301 376.75 54.6863 376.75 54.8488 376.75C55.0113 376.75 55.1801 376.75 55.3551 376.75C55.5176 376.75 55.6738 376.75 55.8238 376.75C55.9738 376.75 56.1207 376.75 56.2644 376.75C56.4082 376.75 56.5426 376.75 56.6676 376.75C56.7926 376.75 56.9051 376.75 57.0051 376.75C57.2301 376.75 57.4894 376.75 57.7832 376.75C58.0769 376.75 58.3926 376.75 58.7301 376.75C58.8926 376.75 59.0488 376.75 59.1988 376.75C59.3488 376.75 59.4957 376.75 59.6394 376.75C59.7832 376.75 59.9207 376.75 60.0519 376.75C60.1832 376.75 60.3051 376.75 60.4176 376.75C60.6676 376.75 60.9207 376.75 61.1769 376.75C61.4332 376.75 61.7301 376.75 62.0676 376.75C62.0926 376.75 62.1144 376.75 62.1332 376.75C62.1519 376.75 62.1926 376.75 62.2551 376.75Z" />
    </svg>
  );
}

function FilterSelect({ value, onChange, options, width }) {
  return (
    <div className="relative shrink-0" style={{ width }}>
      <select
        className="h-[37px] w-full appearance-none rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] px-3 pr-8 text-[14px] font-medium leading-5 text-[#141B2B] outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2 text-[#6B7280]" />
    </div>
  );
}

export default function CooperativesPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "All Status",
    district: "All Districts",
  });

  const districtOptions = useMemo(
    () => ["All Districts", ...new Set(cooperatives.map((item) => item.district))],
    []
  );

  const filteredCooperatives = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return cooperatives.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.manager.toLowerCase().includes(query);
      const matchesStatus =
        filters.status === "All Status" || item.status === filters.status;
      const matchesDistrict =
        filters.district === "All Districts" || item.district === filters.district;

      return matchesSearch && matchesStatus && matchesDistrict;
    });
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", status: "All Status", district: "All Districts" });
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#141B2B]">
      <div className="flex min-h-screen min-w-[1280px]">
        <OperatorSidebar activeItem="Cooperatives" />

        <div className="w-[1020px] shrink-0">
          <OperatorHeader />

          <main className="h-[662px] w-full bg-[#F9F9FF] px-6 pt-[26px]">
            <section className="flex items-start justify-between">
              <div>
                <h1 className="text-[25px] font-bold leading-[30px] text-[#141B2B]">
                  Cooperatives
                </h1>
                <p className="mt-[8px] text-[14px] leading-5 text-[#444651]">
                  Manage cooperative network and performance across districts.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-9 w-[144px] items-center justify-center rounded-lg bg-[#00236F] text-[13px] font-semibold leading-[18px] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                Export Report
              </button>
            </section>

            <section className="mt-[36px] h-[100px] rounded-[10px] border border-[#E5E7EB] bg-white px-[25px] pt-[45px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-[17px]">
                <div className="relative w-[161px] shrink-0">
                  <SearchIcon className="absolute left-[14px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#444651]" />
                  <input
                    className="h-[37px] w-full rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] pl-[42px] pr-3 text-[14px] font-medium text-[#141B2B] outline-none placeholder:text-[#6B7280]"
                    placeholder="Search"
                    value={filters.search}
                    onChange={(event) => updateFilter("search", event.target.value)}
                  />
                </div>

                <FilterSelect
                  value={filters.status}
                  width={161}
                  onChange={(value) => updateFilter("status", value)}
                  options={["All Status", "Active", "Pending", "Inactive"]}
                />
                <FilterSelect
                  value={filters.district}
                  width={161}
                  onChange={(value) => updateFilter("district", value)}
                  options={districtOptions}
                />

                <button
                  type="button"
                  className="ml-auto h-[34px] w-[81px] rounded-lg bg-[#00236F] text-[13px] font-semibold leading-[18px] text-white"
                  onClick={() => setFilters((current) => ({ ...current }))}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="h-[33px] w-[81px] rounded-lg border border-[#E5E7EB] bg-white text-[13px] font-semibold leading-[18px] text-[#444651]"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </section>

            <section className="mt-6 h-[402px] overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white">
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="h-[41px] bg-[#F3F4F6] text-[12px] font-bold uppercase leading-4 text-[#141B2B]">
                    <th className="w-[29%] px-4">Cooperative Name</th>
                    <th className="w-[18%] px-4">Manager</th>
                    <th className="w-[13%] px-4 text-center">Farmers</th>
                    <th className="w-[16%] px-4 text-center">Volume (L)</th>
                    <th className="w-[14%] px-4 text-center">Status</th>
                    <th className="w-[10%] px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] leading-5">
                  {filteredCooperatives.map((coop, index) => (
                    <tr
                      key={coop.code}
                      className={`h-[61px] border-t border-[#E5E7EB] ${
                        index % 2 === 1 ? "bg-[#F3F4F6]/20" : "bg-white"
                      }`}
                    >
                      <td className="px-4">
                        <div className="flex items-center gap-[15px]">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-sm ${avatarStyles[coop.tone]}`}
                          >
                            <ShopIcon className="h-[17px] w-[17px]" />
                          </span>
                          <div>
                            <div className="text-[14px] font-semibold leading-[17px] text-[#141B2B]">
                              {coop.name}
                            </div>
                            <div className="mt-[2px] text-[12px] font-medium leading-[14px] text-[#6B7280]">
                              ID: {coop.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 font-medium text-[#141B2B]">
                        {coop.manager}
                      </td>
                      <td className="px-4 text-center  text-[#141B2B]">
                        {coop.farmers.toLocaleString()}
                      </td>
                      <td className="px-4 text-center  text-[#141B2B]">
                        {coop.volume}
                      </td>
                      <td className="px-4 text-center">
                        <span
                          className={`inline-flex h-5 min-w-[52px] items-center justify-center rounded-sm px-2 text-[11px] font-bold uppercase ${statusStyles[coop.status]}`}
                        >
                          {coop.status}
                        </span>
                      </td>
                      <td className="px-4">
                        <div className="flex items-center justify-center gap-[16px]">
                          <button
                            type="button"
                            className="inline-flex h-6 w-6 items-center justify-center text-[#00236F]"
                            aria-label={`Edit ${coop.name}`}
                          >
                            <EditIcon className="h-[15px] w-[15px]" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-6 w-6 items-center justify-center text-[#444651]"
                            aria-label={`View ${coop.name}`}
                          >
                            <EyeIcon className="h-[18px] w-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex h-[55px] items-center justify-between border-t border-[#E5E7EB] bg-white px-5 text-[13px] font-medium leading-5 text-[#444651]">
                <span>
                  Showing {filteredCooperatives.length ? 1 : 0} to{" "}
                  {filteredCooperatives.length} of {filteredCooperatives.length}
                </span>
                <div className="flex items-center gap-[10px]">
                  <button
                    type="button"
                    className="h-8 rounded border border-[#E5E7EB] px-3 text-[#6B7280]"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="h-8 w-8 rounded bg-[#00236F] text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="h-8 rounded border border-[#E5E7EB] px-3 text-[#6B7280]"
                  >
                    Next
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
