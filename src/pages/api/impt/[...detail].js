import Import from "@/models/import";
import connectMongoDB from "@/utils/connect";

export default async function handler(req, res) {
    try {
        await connectMongoDB();
        const { detail } = req.query;
        console.log(detail);

        const date = `${detail[1]}/${detail[0]}/${detail[2]}`;

        const insertedImport = new Import({
            import_date: date,
            import_time: detail[3],
            part_code: detail[4],
            part_name: detail[5],
            amount: detail[6],
            employee: detail[7]
        });

        const result = await insertedImport.save();

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