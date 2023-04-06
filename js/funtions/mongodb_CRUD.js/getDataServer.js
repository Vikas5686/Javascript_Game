const get = async () => {
    console.log("get data from mongo")
    const respon = await fetch('https://scsdffsdfg.onrender.com/getrequist', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await respon.json();
    data.forEach((element, i) => {
        html += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${element.name}</td>
        <td>${element.country}</td>
        <td>${element.score}</td>
        </tr>
        `
    })
    const tablular = document.getElementById('tablular')
    tablular.innerHTML = html
}
