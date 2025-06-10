import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SEO from "../components/SEO";

const countryCodes = [
  { code: "+91", label: "🇮🇳 India" },
  { code: "+1", label: "🇺🇸 USA" },
  { code: "+44", label: "🇬🇧 UK" },
  { code: "+61", label: "🇦🇺 Australia" },
  { code: "+971", label: "🇦🇪 UAE" },
  { code: "+81", label: "🇯🇵 Japan" },
];

// SEO info from your table:
const seoTitle = "Modular Insurance Entry | Start Building Your Insurance Plan";
const seoDescription =
  "Enter your details to begin building a modular insurance plan. Choose between a single insurer or multi-insurer option.";
const seoUrl = "https://saurabhchandra.me/modular-insurance-entry";

const ModularInsuranceEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState({});

  // ✅ Restore data if redirected from builder-single or builder-multi
  useEffect(() => {
    const data = location?.state;
    if (data) {
      if (data.name) setName(data.name);
      if (data.age) setAge(data.age);
      if (data.gender) setGender(data.gender);
      if (data.email) setEmail(data.email);
      if (data.mobile) {
        const [cc, number] = data.mobile.split("-");
        if (cc) setCountryCode(cc);
        if (number) setMobile(number);
      }
    }
  }, [location]);

  useEffect(() => {
    if (dob && dob.split("-").length === 3) {
      const [dd, mm, yyyy] = dob.split("-");
      const birthDate = new Date(`${yyyy}-${mm}-${dd}`);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    }
  }, [dob]);

  const validateFields = () => {
    const newErrors = {};
    if (!name || name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    if (!gender) {
      newErrors.gender = "Please select your gender.";
    }
    if (!dob && (!age || parseInt(age) < 10)) {
      newErrors.age = "Please enter valid age ≥ 10 or DOB.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Invalid email format. Please enter like user@domain.com";
    }
    if (mobile && !/^\d{6,14}$/.test(mobile.trim())) {
      newErrors.mobile = "Mobile must be 6–14 digits without symbols.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () =>
    name.trim().length >= 3 &&
    gender &&
    (dob || (age && parseInt(age) >= 10)) &&
    (!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) &&
    (!mobile || /^\d{6,14}$/.test(mobile.trim()));

  const handleProceed = (model) => {
    if (!validateFields()) return;
    const userData = {
      name,
      age,
      gender,
      email,
      mobile: countryCode + "-" + mobile,
    };

    if (model === "single") {
      navigate("/builder-single", { state: { ...userData } });
    } else {
      navigate("/builder-multi", { state: { ...userData } });
    }
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="max-w-xl mx-auto mt-12 p-6 border rounded-xl shadow dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Start Building Your Insurance</h2>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name*</label>
            <input
              type="text"
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.name ? "border-red-500" : ""
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateFields}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">Gender*</label>
            <select
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.gender ? "border-red-500" : ""
              }`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              onBlur={validateFields}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
          </div>

          {/* DOB + Age */}
          <div>
            <label className="block text-sm font-medium">Date of Birth (or Age)*</label>
            <div className="flex gap-2">
              <input
                type="date"
                className={`w-1/2 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.age ? "border-red-500" : ""
                }`}
                value={
                  dob && dob.split("-").length === 3
                    ? `${dob.split("-")[2]}-${dob.split("-")[1]}-${dob.split("-")[0]}`
                    : ""
                }
                onChange={(e) => {
                  const [yyyy, mm, dd] = e.target.value.split("-");
                  if (yyyy && mm && dd) {
                    setDob(`${dd}-${mm}-${yyyy}`);
                  }
                }}
                onBlur={validateFields}
              />
              <input
                type="text"
                className={`w-1/2 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.age ? "border-red-500" : ""
                }`}
                placeholder="Or enter Age"
                value={dob ? "" : age}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
                  setAge(val);
                }}
                disabled={dob}
                onBlur={validateFields}
              />
            </div>
            {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email (optional)</label>
            <input
              type="email"
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateFields}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium">Mobile (optional, include country code)</label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-1/3 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={`w-2/3 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.mobile ? "border-red-500" : ""
                }`}
                placeholder="Enter number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
                onBlur={validateFields}
              />
            </div>
            {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleProceed("single")}
              className={`px-6 py-2 rounded ${
                isFormValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
            >
              Single Insurer Plan
            </button>
            <button
              onClick={() => handleProceed("multi")}
              className={`px-6 py-2 rounded ${
                isFormValid()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
            >
              Multi Insurer Plan
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center border-t pt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <span className="font-semibold">Note:</span> The "Single Insurer Plan" is a prototype
              for insurance companies. The "Multi Insurer Plan" showcases possibilities for
              aggregators, brokers, and marketplaces.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModularInsuranceEntry;
