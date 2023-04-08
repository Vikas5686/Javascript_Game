const UpdateDataServer = async (emailValue,score) => {
    let notes1 =localStorage.getItem("javascript")
    const respon = await fetch(`${baseUrl}/Update/${emailValue}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({Score:notes1})
    })
    const data = await respon.json();
    console.log(data)
    await get(emailValue)
}
