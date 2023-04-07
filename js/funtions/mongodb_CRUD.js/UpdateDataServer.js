const UpdateDataServer = async (emailValue,score) => {
    console.log("update data to mongo")
    // const respon = await fetch(`https://scsdffsdfg.onrender.com/getUser/${emailValue}`, {
    const respon = await fetch(`${baseUrl}/Update/${emailValue}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({Score:score})
    })
    const data = await respon.json();
    console.log(data)
    await get(emailValue)
}
