import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import CorporateBrand from "../components/CorporateBrand";
import SEO from "../components/SEO";  // <-- added import

const countryCodes = [
  { code: "+91", label: "🇮🇳 India" },
  { code: "+1", label: "🇺🇸 USA" },
  { code: "+44", label: "🇬🇧 UK" },
  { code: "+61", label: "🇦🇺 Australia" },
  { code: "+971", label: "🇦🇪 UAE" },
];

const CorporateUserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({});

  // Prefill logic when coming from "Change Details"
  useEffect(() => {
    if (location?.state?.from === "change-details") {
      const restored = location.state;
      setName(restored.name || "");
      setDob(restored.dob || "");
      setAge(restored.age || "");
      setGender(restored.gender || "");
      setCorporateEmail(restored.corporateEmail || "");
      setMobile((restored.mobile || "").replace(/^(\+\d+-)?/, ""));
      setCountryCode((restored.mobile || "").split("-")[0] || "+91");
      setSalary(restored.salary || "");
      setEmployeeId(restored.employeeId || "");
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
    if (!dob && (!age || parseInt(age) < 20 || parseInt(age) > 70)) {
      newErrors.age = "Enter valid DOB or Age between 20 and 70.";
    }
    if (corporateEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(corporateEmail.trim())) {
      newErrors.corporateEmail = "Invalid email format.";
    }
    if (mobile && !/^\d{6,14}$/.test(mobile.trim())) {
      newErrors.mobile = "Mobile must be 6–14 digits.";
    }
    if (!salary) {
      newErrors.salary = "Please select your salary range.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = () =>
    name.trim().length >= 3 &&
    gender &&
    (dob || (age && parseInt(age) >= 20 && parseInt(age) <= 70)) &&
    (!corporateEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(corporateEmail)) &&
    (!mobile || /^\d{6,14}$/.test(mobile)) &&
    salary;

  const handleProceed = () => {
    if (!validateFields()) return;

    navigate("/corporate-modular/builder-single", {
      state: {
        name,
        dob,
        age,
        gender,
        corporateEmail,
        mobile: countryCode + "-" + mobile,
        salary,
        employeeId,
        fromDetailsPage: true,
      },
    });
  };

  // SEO meta tags values
  const seoTitle = "Corporate User Details – Enter Employee Information";
  const seoDescription = "Fill in your details to build personalized insurance plans for corporate employees.";
  const seoUrl = "https://saurabhchandra.me/corporate-user-details";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="max-w-xl mx-auto mt-8 p-6 border rounded-xl shadow bg-white dark:bg-gray-900 dark:text-white">
        <CorporateBrand />
        <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.name ? "border-red-500" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateFields}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          {/* DOB or Age */}
          <div>
            <label className="block text-sm font-medium">
              Date of Birth (or Age) <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                className={`w-1/2 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.age ? "border-red-500" : ""}`}
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
                className={`w-1/2 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.age ? "border-red-500" : ""}`}
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

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.gender ? "border-red-500" : ""}`}
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

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium">
              Salary <span className="text-red-600">*</span>
            </label>
            <select
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.salary ? "border-red-500" : ""}`}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              onBlur={validateFields}
            >
              <option value="">Select Salary Range</option>
              <option value="20000-50000">₹20,000 – ₹50,000</option>
              <option value="50001-75000">₹50,001 – ₹75,000</option>
              <option value="75001-100000">₹75,001 – ₹1,00,000</option>
              <option value="100000+">₹1,00,000 and above</option>
            </select>
            {errors.salary && <p className="text-red-600 text-sm">{errors.salary}</p>}
          </div>

          {/* Corporate Email */}
          <div>
            <label className="block text-sm font-medium">Corporate Email (optional)</label>
            <input
              type="email"
              className={`w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.corporateEmail ? "border-red-500" : ""}`}
              value={corporateEmail}
              onChange={(e) => setCorporateEmail(e.target.value)}
              onBlur={validateFields}
            />
            {errors.corporateEmail && <p className="text-red-600 text-sm">{errors.corporateEmail}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium">Mobile (optional)</label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-1/3 border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={`w-2/3 border p-2 rounded dark:bg-gray-800 dark:border-gray-600 ${errors.mobile ? "border-red-500" : ""}`}
                placeholder="Enter number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
                onBlur={validateFields}
              />
            </div>
            {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium">Employee ID (optional)</label>
            <input
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleProceed}
            className={`mt-6 w-full p-3 rounded-xl ${
              isValid()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            disabled={!isValid()}
          >
            Continue to Select Plan
          </button>
        </div>
      </div>
    </>
  );
};

export default CorporateUserDetails;
