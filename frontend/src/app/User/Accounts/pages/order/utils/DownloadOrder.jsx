import {jsPDF} from "jspdf";
import React from "react";
import toast from "react-hot-toast";
const DownloadOrder = ({order}) => {

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        console.log(order._id)
console.log(order)
        doc.setFontSize(18)
        doc.text("Invoice", 90, 20)

        doc.setFontSize(12)
        doc.text(`Order ID : ${order._id}`,10,50)

            doc.save(`invoice_${order._id}.pdf`);
            console.log('downloaded successfully')
        toast.success("Invoice Downloaded successfuly")
    }

  return <button onClick={handleDownloadInvoice}>DowloadOrder</button>;
};
export default DownloadOrder;
