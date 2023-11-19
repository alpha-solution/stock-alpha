import Stock from "@/models/stock";
import connectMongoDB from "@/utils/connect";

export default async function handler(req, res) {
    try {
        await connectMongoDB();
        const stocks = await Stock.find({});
        return res.status(200).json(stocks);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}