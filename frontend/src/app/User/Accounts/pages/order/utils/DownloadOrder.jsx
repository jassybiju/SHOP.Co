import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

const DownloadOrder = ({ order }) => {
	const handleDownloadInvoice = () => {
		if (!order) {
			toast.error("Order data missing");
			return;
		}
        console.log('started')
		const doc = new jsPDF();
		let y = 20;

		// Title
		doc.setFontSize(18);
		doc.text("INVOICE", 90, y);
		y += 10;

		doc.setFontSize(12);
		doc.text(`Order ID: ${order._id}`, 14, y);
		y += 6;
		doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, y);
		y += 6;
		doc.text(`Status: ${order.status_history?.slice(-1)[0]?.status || "N/A"}`, 14, y);
		y += 10;

		// Shipping Info
		const addr = order.shipping_address_id;
		if (addr) {
			doc.setFontSize(14);
			doc.text("Shipping Address:", 14, y);
			y += 6;

			doc.setFontSize(11);
			doc.text(`${addr.first_name} ${addr.last_name}`, 14, y);
			y += 5;
			doc.text(`${addr.address}, ${addr.place}, ${addr.state}`, 14, y);
			y += 5;
			doc.text(`Pincode: ${addr.pincode}`, 14, y);
			y += 5;
			doc.text(`Phone: ${addr.phone}`, 14, y);
			y += 10;
		}

		// Order Items Table
		const items = order.items || [];
        console.log(items)
		if (items.length > 0) {
			const tableRows = items.map((x, i) => [
				i + 1,
				x.name,
				x.size,
				x.color,
				x.quantity,
				`$${x.price}`,
				`$${(x.price * x.quantity * (1 - (x.discount || 0) / 100)).toFixed(2)}`
			]);

			autoTable(doc,{
				startY: y,
				head: [["#", "Product", "Size", "Color", "Qty", "Price", "Total"]],
				body: tableRows,
				styles: { fontSize: 10 },
				headStyles: { fillColor: [80, 80, 200] },
			});
			y = doc.lastAutoTable.finalY + 10;
		}

		// Totals
		doc.setFontSize(12);
		doc.text(`Subtotal: $${order.subtotal?.toFixed(2) || "0.00"}`, 14, y);
		y += 6;
		doc.text(`Discount: -$${order.discountApplied?.toFixed(2) || "0.00"}`, 14, y);
		y += 6;
		doc.text(`Coupon Discount: -$${order.couponDiscountApplied?.toFixed(2) || "0.00"}`, 14, y);
		y += 6;
		doc.text(`Total: $${order.total_amount?.toFixed(2) || "0.00"}`, 14, y);
		y += 10;

		doc.text(`Payment Method: ${order.payment_method || "N/A"}`, 14, y);
		y += 6;
		doc.text(`Payment Status: ${order.payment_status || "N/A"}`, 14, y);

		// Footer
		y += 15;
		doc.setFontSize(10);
		doc.text("Thank you for shopping with us!", 75, y);

		// Download
		doc.save(`invoice_${order._id}.pdf`);
		toast.success("Invoice downloaded successfully!");
	};

	return (
		<button
			onClick={handleDownloadInvoice}
			className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-2 rounded-lg"
		>
			Download Invoice
		</button>
	);
};

export default DownloadOrder;
