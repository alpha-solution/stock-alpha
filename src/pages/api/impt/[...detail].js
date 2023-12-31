import Import from "@/models/import";
import connectMongoDB from "@/utils/database";

export default async function handler(req, res) {

    try {

        await connectMongoDB();
        const { detail } = req.query;
        console.log(detail);

        switch (req.method) {

            case "POST":
                const date = `${detail[1]}/${detail[0]}/${detail[2]}`;
                const insertedImport = new Import({
                    import_date: date,
                    import_time: detail[3],
                    part_code: detail[4],
                    part_name: detail[5],
                    amount: detail[6],
                    employee: detail[7]
                });

                const resultPost = await insertedImport.save();

                if (resultPost) {
                    return res.status(200).json({ success: true, insertedId: resultPost._id });
                } else {
                    return res.status(500).json({ success: false });
                }

            case "DELETE":
                const id = detail[0];
                const resultDelete = await Import.deleteOne({ _id: id });

                if (resultDelete) {
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