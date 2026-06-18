"use client";

import { useState } from "react";
import Link from "next/link";
import OperatorHeader from "../../components/header";
import OperatorSidebar from "../../components/sidebar";

function InputBox({ label, children, className = "", required = false, error }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-[10px] block text-[13px] font-semibold leading-4 text-[#444651]">
        {label}
        {required && <span className="ml-[6px] text-[#EF4444]">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-[5px] block text-[11px] font-medium leading-[13px] text-[#EF4444]">
          {error}
        </span>
      )}
    </label>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="239 274.24 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M255.6 292.24L249.3 285.94C248.8 286.34 248.225 286.657 247.575 286.89C246.925 287.124 246.233 287.24 245.5 287.24C243.683 287.24 242.146 286.611 240.888 285.353C239.629 284.094 239 282.557 239 280.74C239 278.924 239.629 277.386 240.888 276.128C242.146 274.869 243.683 274.24 245.5 274.24C247.317 274.24 248.854 274.869 250.113 276.128C251.371 277.386 252 278.924 252 280.74C252 281.474 251.883 282.165 251.65 282.815C251.417 283.465 251.1 284.04 250.7 284.54L257 290.84L255.6 292.24ZM245.5 285.24C246.75 285.24 247.812 284.803 248.688 283.928C249.562 283.053 250 281.99 250 280.74C250 279.49 249.562 278.428 248.688 277.553C247.812 276.678 246.75 276.24 245.5 276.24C244.25 276.24 243.188 276.678 242.312 277.553C241.438 278.428 241 279.49 241 280.74C241 281.99 241.438 283.053 242.312 283.928C243.188 284.803 244.25 285.24 245.5 285.24Z" />
    </svg>
  );
}

function StatusIcon({ path, viewBox, color }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6]">
      <svg
        aria-hidden="true"
        className="h-[18px] w-[18px]"
        fill={color}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} />
      </svg>
    </span>
  );
}

const statusOptions = [
  {
    label: "Accepted",
    icon: "M311.292 578.511L306.542 573.761L307.729 572.573L311.292 576.136L318.937 568.49L320.125 569.677L311.292 578.511Z",
    viewBox: "306.542 568.49 13.583 10.021",
    color: "#006C49",
  },
  {
    label: "Hold",
    icon: "M510.833 579.333V567.667H515.833V579.333H510.833ZM504.167 579.333V567.667H509.167V579.333H504.167ZM512.5 577.667H514.167V569.333H512.5V577.667ZM505.833 577.667H507.5V569.333H505.833V577.667ZM505.833 569.333V577.667V569.333ZM512.5 569.333V577.667V569.333Z",
    viewBox: "504.167 567.667 11.666 11.666",
    color: "#F59E0B",
  },
  {
    label: "Rejected",
    icon: "M702 579.333L700.833 578.167L705.5 573.5L700.833 568.833L702 567.667L706.667 572.333L711.333 567.667L712.5 568.833L707.833 573.5L712.5 578.167L711.333 579.333L706.667 574.667L702 579.333Z",
    viewBox: "700.833 567.667 11.667 11.666",
    color: "#EF4444",
  },
];

export default function NewMilkCollectionPage() {
  const [values, setValues] = useState({
    farmer: "",
    volume: "",
    status: "Accepted",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const updateValue = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validateField = (key, value) => {
    setErrors((current) => {
      const next = { ...current };

      if (key === "farmer") {
        if (!value.trim()) {
          next.farmer = "Farmer is required";
        } else {
          delete next.farmer;
        }
      }

      if (key === "volume") {
        const volume = Number(value);
        if (!value || Number.isNaN(volume) || volume <= 0) {
          next.volume = "Enter volume greater than 0";
        } else {
          delete next.volume;
        }
      }

      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!values.farmer.trim()) {
      nextErrors.farmer = "Farmer is required";
    }

    const volume = Number(values.volume);
    if (!values.volume || Number.isNaN(volume) || volume <= 0) {
      nextErrors.volume = "Enter volume greater than 0";
    }

    setErrors(nextErrors);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#141B2B]">
      <div className="flex min-h-screen min-w-[1280px]">
        <OperatorSidebar activeItem="Milk Collection" />

        <div className="w-[1020px] shrink-0">
          <OperatorHeader />

          <main className="relative h-[960px] w-full overflow-hidden bg-[#F9F9FF]">
            <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.03)_0,rgba(30,58,138,0)_24%)]" />

            <section className="relative mx-auto mt-[36px] h-[887px] w-[672px] rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0_4px_12px_rgba(17,24,39,0.08)]">
              <div className="absolute left-[50px] top-[50px]">
                <h1 className="text-[24px] font-bold leading-[29px] text-[#00236F]">
                  Record Milk Collection
                </h1>
                <p className="mt-[11px] text-[14px] font-normal leading-[20px] text-[#444651]">
                  Enter today&apos;s collection details for farmer delivery.
                </p>
              </div>

              <form className="absolute inset-0" noValidate onSubmit={handleSubmit}>
                <InputBox
                  label="Farmer"
                  required
                  error={errors.farmer}
                  className="absolute left-[49px] top-[132px] w-[573px]"
                >
                  <div className="relative">
                    <SearchIcon className="absolute left-[15px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#444651]" />
                    <input
                      className={`h-12 w-full rounded border bg-[#F9F9FF] pl-[44px] pr-4 text-[14px] font-medium leading-5 text-[#141B2B] outline-none placeholder:text-[#6B7280] ${
                        errors.farmer ? "border-[#EF4444]" : "border-[#E5E7EB]"
                      }`}
                      list="operator-farmers"
                      placeholder="Search by name or ID..."
                      value={values.farmer}
                      onChange={(event) => updateValue("farmer", event.target.value)}
                      onBlur={(event) => validateField("farmer", event.target.value)}
                    />
                    <datalist id="operator-farmers">
                      <option value="Johnathan Miller #FR-8921" />
                      <option value="Sarah Henderson #FR-4412" />
                      <option value="David Chen #FR-3119" />
                    </datalist>
                  </div>
                </InputBox>

                <InputBox
                  label="Volume (L)"
                  required
                  className="absolute left-[49px] top-[265px] w-[573px]"
                >
                  <div
                    className={`flex h-[65px] items-center rounded border bg-[#F3F4F6] px-4 ${
                      errors.volume ? "border-[#EF4444]" : "border-[#E5E7EB]"
                    }`}
                  >
                    <input
                      className="h-full flex-1 bg-transparent text-right text-[28px] font-bold leading-8 text-[#141B2B] outline-none placeholder:text-[#6B7280]"
                      placeholder="0.0"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={values.volume}
                      onChange={(event) => updateValue("volume", event.target.value)}
                      onBlur={(event) => validateField("volume", event.target.value)}
                    />
                    <span className="ml-[16px] text-[16px] font-semibold leading-5 text-[#444651]">
                      L
                    </span>
                  </div>
                  <div className="mt-[6px] flex items-center justify-between text-[11px] font-medium leading-[13px]">
                    <span className="text-[#444651]">Use liters only.</span>
                    {errors.volume && (
                      <span className="text-[#EF4444]">{errors.volume}</span>
                    )}
                  </div>
                </InputBox>

                <div className="absolute left-[49px] top-[411px] text-[13px] font-semibold leading-4 text-[#141B2B]">
                  Status <span className="ml-[3px] text-[#EF4444]">*</span>
                </div>

                <div className="absolute left-[49px] top-[435px] grid w-[573px] grid-cols-3 gap-[14px]">
                  {statusOptions.map((status) => {
                    const isActive = values.status === status.label;

                    return (
                    <button
                      key={status.label}
                      type="button"
                      aria-pressed={isActive}
                      className={`flex h-[83px] flex-col items-center rounded border bg-white pt-[15px] transition ${
                        isActive
                          ? "border-[#1E3A8A] shadow-[0_0_0_1px_#1E3A8A]"
                          : "border-[#E5E7EB]"
                      }`}
                      onClick={() => updateValue("status", status.label)}
                    >
                      <StatusIcon
                        color={status.color}
                        path={status.icon}
                        viewBox={status.viewBox}
                      />
                      <span className="mt-[10px] text-center text-[14px] font-medium leading-5 text-[#141B2B]">
                        {status.label}
                      </span>
                    </button>
                    );
                  })}
                </div>

                <label className="absolute left-[49px] top-[548px] block w-[573px]">
                  <span className="mb-[9px] block text-[13px] font-semibold leading-4 text-[#141B2B]">
                    Notes <span className="font-normal text-[#6B7280]">(Optional)</span>
                  </span>
                  <textarea
                    className="h-[64px] w-full resize-none rounded border border-[#E5E7EB] bg-[#F9F9FF] px-[17px] py-[14px] text-[14px] leading-5 text-[#141B2B] outline-none placeholder:text-[#8A8F9C]"
                    placeholder="Add any relevant observations regarding transport, container condition, etc."
                    value={values.notes}
                    onChange={(event) => updateValue("notes", event.target.value)}
                  />
                </label>

                <div className="absolute left-[49px] top-[728px] h-px w-[574px] bg-[#E5E7EB]" />

                <Link
                  href="/operator/milk-collection"
                  className="absolute bottom-[89px] left-[327px] inline-flex h-[45px] w-[82px] items-center justify-center rounded border border-[#E5E7EB] bg-white text-[14px] font-semibold leading-5 text-[#444651]"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="absolute bottom-[89px] left-[425px] inline-flex h-[46px] w-[198px] items-center justify-center rounded bg-[#00236F] text-[14px] font-semibold leading-5 text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  Save Collection
                </button>
              </form>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
