const UpdateDataServer = async (emailValue, score) => {
    const respon = await fetch(`${baseUrl}/Update/${emailValue}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Score: score })
    })
    const data = await respon.json();
    console.log(data)
     get(emailValue)
}
