import Stock from "@/models/stock";
import connectMongoDB from "@/utils/database";

export default async function handler(req, res) {

    try {

        await connectMongoDB();
        const { stock } = req.query;
        console.log(stock);

        switch (req.method) {

            case "POST":
                const date = `${stock[4]}/${stock[3]}/${stock[5]}`;
                const insertedStock = new Stock({
                    part_code: stock[0],
                    part_name: stock[1],
                    total_amount: stock[2],
                    last_update: date
                });

                const resultPost = await insertedStock.save();

                if (resultPost) {
                    return res.status(200).json({ success: true });
                } else {
                    return res.status(500).json({ success: false });
                }

            case "GET":
                const part_code = stock[0];
                const part_name = stock[1];
                const foundStock = await Stock.findOne({ part_code, part_name }).exec();
                console.log(foundStock ? foundStock : "Not found");
                return res.status(200).json(foundStock);

            case "PUT":
                const updatedDate = `${stock[3]}/${stock[2]}/${stock[4]}`;
                const partCode = stock[0];
                const updatedTotalAmt = stock[1];
                const resultPut = await Stock.updateOne({ part_code: partCode }, { total_amount: updatedTotalAmt, last_update: updatedDate });

                if (resultPut.modifiedCount) {
                    return res.status(200).json({ success: true });
                } else {
                    return res.status(500).json({ success: false });
                }

            default:
                return res.status(405).json({ error: "Method Not Allowed" });
        }

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}