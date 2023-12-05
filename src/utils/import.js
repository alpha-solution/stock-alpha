import { toast } from "react-toastify";
import { getCurrentDate, getCurrentTime } from "./datetime";
import PartManager, { ActionType } from "./part";

class ImportManager {

    static async add(partCode, partName, partAmt, userName) {
        if (!partCode || !partName ||
            !partAmt || !userName) {
            throw new Error("partCode, partName, partAmt, and userName are undefined");
        }

        const isPartAdded = await PartManager.add(partCode, partName, ActionType.RETURN_BOOLEAN);

        if (isPartAdded) {

            const result = await fetch(`http://localhost:3000/api/impt/${getCurrentDate()}/${getCurrentTime()}/${partCode}/${partName}/${partAmt}/${userName}`, {
                method: "POST"
            });
            const { insertedId } = await result.json();

            if (result.ok) {

                try {

                    const currentTotalAmount = Number(partAmt) + await ImportManager.getTotalAmount(partCode);
                    const isUpdatedTotalAmt = await ImportManager.updateTotalAmount(partCode, currentTotalAmount);

                    if (isUpdatedTotalAmt) {
                        toast.success("Import added successfully");
                    } else {
                        toast.error("Failed updating total amount in stock");
                    }

                } catch (e) {
                    console.log("Error: ", e);
                    const isStockDeleted = await ImportManager.deleteById(insertedId);
                    toast.error("Error 404");

                    if (!isStockDeleted) {
                        throw new Error("Something went wrong with removing import");
                    }
                }

            } else {
                toast.error("Failed adding new import");
            }

        } else {
            toast.error("Failed adding new part automatically");
            toast.warn("Please try adding part manually first");
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

    static async deleteById(id) {
        if (!id) {
            throw new Error("id is undefined");
        }

        const result = await fetch(`http://localhost:3000/api/impt/${id}`, {
            method: "DELETE"
        });

        if (result.ok) {
            return true;
        } else {
            return false;
        }
    }

    static async getAll() {
        const res = await fetch("http://localhost:3000/api/impt");

        if (res.ok) {
            return await res.json();
        } else {
            return null;
        }
    }
}

export default ImportManager;