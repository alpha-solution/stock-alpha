import Stock from "@/models/stock";
import connectMongoDB from "@/utils/connect";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await connectMongoDB();
            const { stock } = req.query;
            console.log(stock);

            const date = `${stock[4]}/${stock[3]}/${stock[5]}`;

            const insertedStock = new Stock({
                part_code: stock[0],
                part_name: stock[1],
                total_amount: stock[2],
                last_update: date
            });

            const result = await insertedStock.save();

            if (result) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ success: false });
            }

        } catch (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (req.method === "GET") {
        try {
            await connectMongoDB();
            const { stock } = req.query;
            console.log(stock);

            const part_code = stock[0];
            const part_name = stock[1];

            const foundStock = await Stock.findOne({ part_code, part_name }).exec();
            console.log(foundStock ? foundStock : "Not found");

            return res.status(200).json(foundStock);
        } catch (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (req.method === "PUT") {
        try {
            await connectMongoDB();
            const { stock } = req.query;
            console.log(stock);

            const partCode = stock[0];
            const updatedTotalAmt = stock[1];

            const result = await Stock.updateOne({ part_code: partCode }, { total_amount: updatedTotalAmt });

            if (result.modifiedCount) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ success: false });
            }

        } catch (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}