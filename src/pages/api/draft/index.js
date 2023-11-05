/* export default async function handler(req, res) {
    try {
        await connectMongoDB();
        const employees = await Employee.find({});
        return res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
} */