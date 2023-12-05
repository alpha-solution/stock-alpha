import { toast } from "react-toastify";
import { getCurrentDate } from "./datetime";

export const ActionType = {
    RETURN_TOAST: "RETURN_TOAST", RETURN_BOOLEAN: "RETURN_BOOLEAN"
};

class PartManager {

    static async isExist(partCode) {
        if (!partCode) {
            throw new Error("partCode is undefined");
        }

        const res = await fetch(`http://localhost:3000/api/exist-part/${partCode}`);

        if (res.ok) {
            return await res.json();
        } else {
            toast.error("Error 404");
            throw new Error("Something went wrong with checking existed part");
        }
    }

    static async addToStock(partCode, partName) {
        if (!partCode || !partName) {
            throw new Error("partCode and partName are undefined");
        }

        const result = await fetch(`http://localhost:3000/api/stock/${partCode}/${partName}/0/${getCurrentDate()}`, {
            method: "POST"
        });

        if (result.ok) {
            return true;
        } else {
            return false;
        }
    }

    static async add(partCode, partName, actionType) {
        if (!partCode || !partName || !actionType) {
            throw new Error("partCode, partName, and actionType are undefined");
        } else if (!Object.values(ActionType).includes(actionType)) {
            throw new Error("Invaild action type");
        }

        const isExist = await PartManager.isExist(partCode);

        if (isExist) {

            if (actionType === ActionType.RETURN_BOOLEAN) {
                return true;
            } else {
                toast.warn("Already existed in database");
            }

        } else {

            const result = await fetch(`http://localhost:3000/api/part/${partCode}/${partName}`, {
                method: "POST"
            });

            if (result.ok) {

                const isAddToStock = await PartManager.addToStock(partCode, partName);

                if (isAddToStock) {

                    if (actionType === ActionType.RETURN_BOOLEAN) {
                        return true;
                    } else {
                        toast.success("Part added successfully");
                    }

                } else {

                    const result = await fetch(`http://localhost:3000/api/part/${partCode}`, {
                        method: "DELETE"
                    });

                    if (result.ok) {

                        if (actionType === ActionType.RETURN_BOOLEAN) {
                            return false;
                        } else {
                            toast.error("Failed adding new part");
                        }

                    } else {
                        toast.error("Error 404");
                        throw new Error("Something went wrong with removing part");
                    }

                }

            } else {
                toast.error("Failed adding new part");
            }
        }
    }

    static async getAll() {
        const res = await fetch("http://localhost:3000/api/part");

        if (res.ok) {
            return await res.json();
        } else {
            return null;
        }
    }
}

export default PartManager;