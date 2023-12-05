import Employee from "@/models/employee";
import connectMongoDB from "@/utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                // https://next-auth.js.org/providers/credentials#options
                const { username, password } = credentials;

                try {

                    await connectMongoDB();
                    const employee = await Employee.findOne({ username, password }).exec();
                    console.log(employee ? employee : "Not found");

                    if (!employee) {
                        return null;
                    }

                    return {
                        name: { username: employee.username, first_name: employee.first_name, last_name: employee.last_name }
                    };

                } catch (error) {
                    console.log("Error: ", error);
                    throw new Error();
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);