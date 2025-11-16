import { AdminDashboardService } from "../../services/admin/adminDashboard.service.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";

export const dashboardController = async (req, res, next) => {
	try {

        const chartData = await AdminDashboardService.getChartData(['monthly','weekly','daily'].includes(req.query?.type) ? req.query.type : 'daily')
        const topData = await AdminDashboardService.topThreeData()
		return res.status(HTTP_RES.OK).json({ data: { topData , chartData : chartData }  , status :"success",});
	} catch (error) {
		next(error);
	}
};
