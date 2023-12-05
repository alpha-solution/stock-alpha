import { toast } from "react-toastify";
import { getCurrentDate, getCurrentTime } from "./datetime";
import PartManager, { ActionType } from "./part";
import StockManager from "./stock";

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

                    const currentTotalAmount = Number(partAmt) + await StockManager.getTotalAmount(partCode);
                    const isUpdatedTotalAmt = await StockManager.updateTotalAmount(partCode, currentTotalAmount);

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