import { Order } from "../../models/order.model.js";
import { AdminDashboardService } from "../../services/admin/adminDashboard.service.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";

export const dashboardController = async (req, res, next) => {
	try {
        const chartData = await AdminDashboardService.getChartData()
		return res.status(HTTP_RES.OK).json({ data: { chart: chartData }  , status :"success",});
	} catch (error) {
		next(error);
	}
};
