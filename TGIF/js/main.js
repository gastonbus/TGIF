// function getRows(data) {
// 	var rows = "";
// 	for (let i = 0; i < data.length; i++) {
// 		var row =
// 			`<tr>
// 			<td><a href="${data[i].url}">${data[i].last_name}, ${data[i].first_name} ${data[i].middle_name || ''}</a></td>
// 			<td>${data[i].party}</td>
// 			<td>${data[i].state}</td>
// 			<td>${data[i].seniority}</td>
// 			<td>${data[i].votes_with_party_pct}</td>
// 		</tr>`
// 		rows += row; //Generacion de filas del listado
// 	}
// 	return rows;
// }
 
function startElements(data) {
    app.members = data.results[0].members
}