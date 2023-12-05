import { getCurrentDate } from "./datetime";

class StockManager {

    static async updateTotalAmount(partCode, updatedTotalAmt) {
        if (!partCode || !updatedTotalAmt) {
            throw new Error("partCode and updatedTotalAmt are undefined");
        }

        const result = await fetch(`http://localhost:3000/api/stock/${partCode}/${updatedTotalAmt}/${getCurrentDate()}`, {
            method: "PUT"
        });

        if (result.ok) {
            return true;
        } else {
            return false;
        }
    }

    static async getTotalAmount(partCode) {
        if (!partCode) {
            throw new Error("partCode is undefined");
        }

        const res = await fetch(`http://localhost:3000/api/stock/${partCode}`, {
            method: "GET"
        });

        if (res.ok) {
            const stock = await res.json();
            return stock.total_amount;
        } else {
            throw new Error("Something went wrong with getting total amount");
        }
    }
}

export default StockManager;