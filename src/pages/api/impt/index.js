import Import from "@/models/import";
import connectMongoDB from "@/utils/database";

export default async function handler(req, res) {
    try {
        await connectMongoDB();
        const imports = await Import.find({});
        return res.status(200).json(imports);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}