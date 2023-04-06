const get = async () => {
    const tablular = document.getElementById('tablular')
    console.log("get data from mongo " + notes)
    const respon = await fetch(`${baseUrl}/getrequist`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await respon.json();
    data.forEach((element, i) => {
        if (element.Score == notes) {
            html += `
            <tr class="active_table">
            <th scope="row" class="">${i + 1}</th>
            <td>${element.name}</td>
            <td>IND</td>
            <td>${element.Score}</td>
            </tr>
            `
        } else {
            html += `
        <tr>
        <th scope="row" >${i + 1}</th>
        <td>${element.name}</td>
        <td>IND</td>
        <td>${element.Score}</td>
        </tr>
        `}
    })
    tablular.innerHTML = html
    html = "";
}
