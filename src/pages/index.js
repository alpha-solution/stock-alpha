const getEmployee = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/employee", {
      method: "GET",
    })

    if (!res.ok) {
      throw new Error()
    }

    return res.json()

  } catch (e) {
    console.log("Error loading employee: ", e)
  }
}

export default async function Home() {
  const employee = await getEmployee()

  return (
    <>
      {employee.map((em) => (
        <div>
          {em.username}
        </div>
      ))}
    </>
  )
}