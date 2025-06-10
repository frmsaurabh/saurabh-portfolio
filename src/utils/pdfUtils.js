import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CorporateBrand from "../components/CorporateBrand";

export const generateCorporatePDF = ({
  name,
  age,
  gender,
  insurer,
  hospitalization,
  maternity,
  modules,
  model,
  paymentMethod,
  paymentDate,
  payableOnlineNow,
  payableViaSalaryNow,
}) => {
  const doc = new jsPDF();

  // Brand Header
 
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204);
  doc.text("Creative Prototype Pvt. Ltd.", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Insurance Plan Summary", 105, 30, { align: "center" });

  // User Details Table
  autoTable(doc, {
    startY: 40,
    head: [["Insured Person Details", ""]],
    body: [
      ["Name", name],
      ["Age", age],
      ["Gender", gender],
      ["Selected Insurer", insurer],
      ["Model", model],
      ["Payment Method", paymentMethod],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [220, 220, 220] },
  });

  // Cover Summary Table
  const moduleList = {
    hospitalization,
    ...(gender === "Female" && maternity?.si ? { maternity } : {}),
    ...Object.fromEntries(Object.entries(modules || {}).filter(([_, m]) => m?.si)),
  };

  const coverRows = Object.entries(moduleList).map(([key, mod]) => [
    key.toUpperCase(),
    `₹${parseInt(mod.si || mod.sumInsured).toLocaleString()}`,
    mod.frequency,
    mod.payment,
    calculateNextDue(paymentDate, mod.frequency),
  ]);

  autoTable(doc, {
    head: [["Module", "Sum Insured", "Frequency", "Payment Mode", "Next Due Date"]],
    body: coverRows,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 102, 204], textColor: 255 },
    startY: doc.previousAutoTable.finalY + 10,
  });

  // Payment Summary
  autoTable(doc, {
    head: [["Payment Breakdown", "Amount (INR)"]],
    body: [
      ["Paid Online", `₹${parseFloat(payableOnlineNow).toFixed(2)}`],
      ["To be Deducted from Salary", `₹${parseFloat(payableViaSalaryNow).toFixed(2)}`],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    startY: doc.previousAutoTable.finalY + 10,
  });

  // Notes
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(
    "Note: This document is electronically generated and does not require signature or stamp.",
    14,
    doc.previousAutoTable.finalY + 20
  );
  doc.text(
    "This is not an insurance policy. It is a payment receipt and summary for your selected covers.",
    14,
    doc.previousAutoTable.finalY + 26
  );

  // Save
  doc.save("CorporateInsuranceSummary.pdf");
};

// Helper for due date
function calculateNextDue(startDateStr, frequency) {
  const date = new Date(startDateStr);
  switch (frequency) {
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    default:
      date.setFullYear(date.getFullYear() + 1);
  }
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
