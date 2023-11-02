import { useEffect, useState } from "react";

const getEmployee = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/employee");
		const data = await res.json();
		return data;
	} catch (e) {
		console.log("Error loading employee: ", e);
		return null;
	}
};

export default function Home() {
	const [employeeData, setEmployeeData] = useState(null);

	useEffect(() => {
		const fetchEmployeeData = async () => {
			const employee = await getEmployee();
			if (employee) setEmployeeData(employee);
		};

		fetchEmployeeData();
	}, []);

	return (
		<div>
			<div>Hello World</div>
			{employeeData && (
				<div>
					{employeeData.map((em) => (
						<div key={em.id}>{em.username}</div>
					))}
				</div>
			)}
		</div>
	);
}
