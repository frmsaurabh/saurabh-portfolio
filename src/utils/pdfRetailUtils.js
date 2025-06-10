import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateRetailPDF = ({
  name,
  age,
  gender,
  insurer,
  selectedModules,
  maternity,
  premium,
  model,
  email,
  mobile,
  datePaid,
}) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Insurance Plan Summary", 105, 20, { align: "center" });

  doc.setFontSize(11);
  doc.text(`Name: ${name || ""}`, 14, 35);
  doc.text(`Age: ${age || ""}`, 105, 35);
  doc.text(`Gender: ${gender || ""}`, 14, 42);
  if (email) doc.text(`Email: ${email}`, 105, 42);
  if (mobile) doc.text(`Mobile: ${mobile}`, 14, 49);
  if (insurer && model === "single") doc.text(`Insurer: ${insurer}`, 105, 49);

  // Build module entries with insurer column
  const moduleEntries = [];

  if (gender === "Female" && maternity?.si) {
    const dueDate = new Date(datePaid || new Date());
    const freq = maternity.frequency || "Monthly";
    if (freq === "Monthly") dueDate.setMonth(dueDate.getMonth() + 1);
    else if (freq === "Quarterly") dueDate.setMonth(dueDate.getMonth() + 3);
    else dueDate.setFullYear(dueDate.getFullYear() + 1);

    moduleEntries.push([
      "Maternity Benefit",
      `₹${maternity.si}`,
      freq,
      // Add insurer for maternity (handle multi vs single)
      model === "single" ? insurer || "" : maternity.insurer || "",
      dueDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    ]);
  }

  Object.entries(selectedModules || {}).forEach(([moduleName, moduleData]) => {
    const si = moduleData.sumInsured || moduleData.si || "";
    const freq = moduleData.frequency || "Monthly";
    const dueDate = new Date(datePaid || new Date());
    if (freq === "Monthly") dueDate.setMonth(dueDate.getMonth() + 1);
    else if (freq === "Quarterly") dueDate.setMonth(dueDate.getMonth() + 3);
    else dueDate.setFullYear(dueDate.getFullYear() + 1);

    moduleEntries.push([
      moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
      `₹${si}`,
      freq,
      // insurer column: single insurer for single model, per module insurer for multi
      model === "single" ? insurer || "" : moduleData.insurer || "",
      dueDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    ]);
  });

  doc.autoTable({
    startY: 60,
    head: [["Module", "Sum Insured", "Frequency", "Insurer", "Next Due Date"]],
    body: moduleEntries,
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Total Annual Premium", "Paid Today"]],
    body: [[`₹${premium?.total || 0}`, `₹${premium?.payableNow || premium?.dueNow || 0}`]],
  });

  doc.setFontSize(10);
  doc.text(
    "Note: This is a confirmation summary. Official policy documents will follow separately.",
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.save("Insurance_Plan_Summary.pdf");
};
