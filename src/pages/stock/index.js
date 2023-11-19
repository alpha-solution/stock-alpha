import DataTable from "@/components/DataTable";
import { useEffect, useState } from "react";

const getStocks = async () => {
    const res = await fetch("http://localhost:3000/api/stock");

    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
};

export default function Stock() {
    const [stocks, setStocks] = useState();

    useEffect(() => {
        const fetchStocks = async () => {
            const stocksData = await getStocks();

            if (stocksData) {
                setStocks(stocksData);
            }
        };

        fetchStocks();
    }, []);

    const columnTableName = ["Part Code", "Part Name", "Total Amount", "Last Update"];
    const columnModelName = ["part_code", "part_name", "total_amount", "last_update"];

    return (
        <div className="container mx-auto mt-8 max-w-4xl">
            <DataTable actionButton={false} columnTable={columnTableName} columnModel={columnModelName} data={stocks} />
        </div>
    );
}