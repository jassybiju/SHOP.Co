import useConfirmationModal from "@/app/Admin/hooks/useConfirmationModal";
import { useRestokeProduct } from "@/app/Admin/hooks/useStockManagement";
import React, { useState } from "react";
const RestokeInput = ({row}) => {
    const [restoke, setRestoke] = useState(0);
    const { mutate: restokeProduct, status } = useRestokeProduct();
    const showConfirmation = useConfirmationModal();
    return (
        <div className="flex gap-5 min-w">
            {" "}
            <input
                type="number"
                className="w-15 h-10 rounded border-2 p-1"
                placeholder="00"
                value={restoke}
                onChange={(e) => setRestoke(e.target.value)}
            />
            <button
                disabled={status === "pending"}
                className="bg-amber-500 disabled:bg-amber-800 px-4 rounded"
                onClick={() =>
                    showConfirmation(() =>
                        restokeProduct({ id: row._id, quantity: restoke })
                    )
                }
            >
                Restock
            </button>
        </div>
    );
};
export default RestokeInput;
