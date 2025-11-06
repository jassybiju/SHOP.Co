import { adminAxiosInstance } from "@/lib/axios";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
export const getSalesReport = async (params) => {
	console.log(123);
	const res = await adminAxiosInstance.get("report", { params });
	console.log(res.data);
	return res.data;
};

export const getSalesReportDownloadable = async (params) => {
	const res = await adminAxiosInstance.get("report/download", { params });
	return res.data;
};

export const downloadSalesReportPDF = (orders, startDate, endDate) => {
    toast.success("Downloading PDF")
    console.log(orders)
	const doc = new jsPDF();

	doc.setFontSize(18);
	doc.setTextColor(33, 37, 41);
	doc.text("Sales Report", 14, 15);

	doc.setFontSize(12);
	doc.setTextColor(52, 73, 94);
	// doc.text(`From: ${new Date(startDate).toLocaleDateString()} To: ${new Date(endDate).toLocaleDateString()}`, 14, 25);

	const columns = ["ORDER ID", "Date", "Amount", "Payment Methods", "Payment Status", "Status", "Discount Applied"];

	const rows = orders.map((order) => [
		order._id,
		new Date(order.createdAt).toDateString(),
		order.total_amount,
		order.payment_method,
		order.payment_status,
		order.status_history.slice(-1)[0].status,
		order.discountApplied,
	]);

	autoTable(doc, {
		head: [columns],
		body: rows,
		startY: 20,
		theme: "striped",
		headStyles: { fillColor: [52, 152, 219] },
		columnStyles: {
			1: { cellWidth: 35 }, // Date column wider
			0: { cellWidth: 30 }, // ORDER ID
			2: { cellWidth: 25 }, // Amount
			3: { cellWidth: 25 }, // Payment Method
			4: { cellWidth: 30 }, // Payment Status
			5: { cellWidth: 30 }, // Status
			6: { cellWidth: 35 }, // Discount Applied
		},
        // didDrawPage : ()=>{	setTimeout(()=>doc.save(`order_report-${Date.now()}.pdf`,300));
		// toast.success("Downloaded Successfully");}
	});

    const pdfBlob = doc.output('blob')
    const blobUrl = URL.createObjectURL(pdfBlob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `order_report-${Date.now()}.pdf`
    link.click()

    setTimeout(()=>URL.revokeObjectURL(blobUrl),1000)

    toast.success("Download successfully")

	console.log(doc);
	// setTimeout(() => {
    //     toast.success("finished")
	// }, 200);
};

export const downloadSalesReportExcel = (orders, startDate, endDate) => {
	const header = [["Sales Report"], [], []];
// [`From ${new Date(startDate).toLocaleDateString()} To : ${new Date(endDate).toLocaleDateString()}`]
	const data = orders.map((order) => ({
		ORDER_ID: order._id,
		DATE: new Date(order.createdAt).toDateString(),
		TOTAL_AMOUNT: order.total_amount,
		PAYMENT_METHOD: order.payment_method,
		PAYMENT_STATUS: order.payment_status,
		STATUS: order.status_history.slice(-1)[0].status,
        DISCOUNT_APPLIED : order.discountApplied
	}));

	const wsHeader = XLSX.utils.aoa_to_sheet(header);

	XLSX.utils.sheet_add_json(wsHeader, data, { origin: "A4" });

	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, wsHeader, "Sales Report");

	const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
	saveAs(blob, "sales_report.xlsx");
};
