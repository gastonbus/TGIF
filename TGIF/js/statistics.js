var statistics = {
    democrats: [],
    republicans: [],
    independents: [],
    leastLoyalMembers: [],
    mostLoyalMembers: [],
    leastEngagedMembers: [],
    mostEngagedMembers:[],
    democratsAvgVotes: 0,
    republicansAvgVotes: 0,
    independentsAvgVotes: 0,
}
function separateMembersByParty(data) { //Separa los miembros por partido a partir del JSON original
    data.forEach(
        member => {
            if (member.party == "D") {
                statistics.democrats.push(member);
            } else if (member.party == "R") {
                statistics.republicans.push(member);
            } else if (member.party == "ID") {
                statistics.independents.push(member);
            }
        }
    );
}
var info = data.results[0].members;
separateMembersByParty(info);

// Pruebo en consola que los datos se esten obteniendo
console.log("Number of democrats: " + statistics.democrats.length);
console.log("Number of republicans: " + statistics.republicans.length);
console.log("Number of independents: " + statistics.independents.length);

// Vuelvo a vaciar los arrays de democrats, republicans e independents
statistics.democrats = [];
statistics.republicans = [];
statistics.independents = [];

// Verifico que se hayan vaciado
console.log("Number of democrats: " + statistics.democrats.length);
console.log("Number of republicans: " + statistics.republicans.length);
console.log("Number of independents: " + statistics.independents.length);

// Hago lo mismo que antes: separo por partido generando un array para cada uno, pero usando filter():
function whichParty(currentValue) {
    return currentValue.party == this;
}

statistics.democrats = info.filter(whichParty, "D");
statistics.republicans = info.filter(whichParty, "R");
statistics.independents = info.filter(whichParty, "ID");

// Pruebo en consola que los datos se esten obteniendo, pero ahora con filter()
console.log("Number of democrats: " + statistics.democrats.length);
console.log("Number of republicans: " + statistics.republicans.length);
console.log("Number of independents: " + statistics.independents.length);

// Average "Votes with Party" for Each Party
const sumPctVotes = (sum, value) => ({ //Constante necesaria para ejecutar la funcion reduce() que suma los votes_with_party_pct de cada partido
    votes_with_party_pct: sum.votes_with_party_pct + value.votes_with_party_pct //CORREGIR SEGUN VIDEO
});

function getAvgVotesWithParty(members) {
    let avgVotesWithParty = 0;
    avgVotesWithParty = members.reduce(sumPctVotes, {"votes_with_party_pct": 0}).votes_with_party_pct / (members.length == 0 ? 0 : members.length); //Uso de la constante sumPctVotes
    return avgVotesWithParty;
}

function setAvgVotesWithPartyValues() { //Funcion para ingresar los valores de promedios de votes_with_party_pct en el array statistics
    statistics.democratsAvgVotes = getAvgVotesWithParty(statistics.democrats);
    statistics.republicansAvgVotes = getAvgVotesWithParty(statistics.republicans);
    statistics.independentsAvgVotes = getAvgVotesWithParty(statistics.independents);
}

setAvgVotesWithPartyValues();

console.log("% votes with party democrats: " + statistics.democratsAvgVotes);
console.log("% votes with party republicans: " + statistics.republicansAvgVotes);
console.log("% votes with party independents: " + statistics.independentsAvgVotes);

//Identify the Members Who Least Often Vote with Their Party
function setMembersPct10(data) { //Funcion para ingresar los primeros 10% miembros en los array correspondientes dentro de statistics
    let pct10 = Math.ceil(0.1 * data.length);
    data.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct))
    for (let i = 0; i < pct10; i++) {
        statistics.leastLoyalMembers.push(data[i]);
    }
    data.sort((a, b) => (b.votes_with_party_pct - a.votes_with_party_pct))
    for (let i = 0; i < pct10; i++) {
        statistics.mostLoyalMembers.push(data[i]);
    }
    data.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct))
    for (let i = 0; i < pct10; i++) {
        statistics.leastEngagedMembers.push(data[i]);
    }
    data.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct))
    for (let i = 0; i < pct10; i++) {
        statistics.mostEngagedMembers.push(data[i]);
    }
}

setMembersPct10(info);

// console.log(statistics.leastLoyalMembers);
// console.log(statistics.mostLoyalMembers);
// console.log(statistics.leastEngagedMembers);
// console.log(statistics.mostEngagedMembers);

function createLoyalRows(array) { //Creacion del codigo HTML para las tablas de loyal
    let rows = "";
    for (let i = 0; i < array.length; i++) {
        row = `<tr>
                    <td><a href="${array[i].url}">${array[i].last_name}, ${array[i].first_name} ${array[i].middle_name || ''}</a></td>
                    <td>${array[i].total_votes}</td>
                    <td>${array[i].votes_with_party_pct}</td>
                </tr>`;
        rows += row;
    }
    return rows;
}
function createAttendanceRows(array) { //Creacion del codigo HTML para las tablas de attendance
    let rows = "";
    for (let i = 0; i < array.length; i++) {
        row =   `<tr>
                    <td><a href="${array[i].url}">${array[i].last_name}, ${array[i].first_name} ${array[i].middle_name || ''}</a></td>
                    <td>${array[i].missed_votes}</td>
                    <td>${array[i].missed_votes_pct}</td>
                </tr>`;
        rows += row;
    }
    return rows;
}

function fillTables() { // Relleno de tablas en el codigo HTML.
    //Tables At Glance
    document.getElementById("democrats-quantity").innerHTML = statistics.democrats.length;
    document.getElementById("republicans-quantity").innerHTML = statistics.republicans.length;
    document.getElementById("independents-quantity").innerHTML = statistics.independents.length;
    document.getElementById("democrats-votes-with-party").innerHTML = statistics.democratsAvgVotes.toFixed(2);
    document.getElementById("republicans-votes-with-party").innerHTML = statistics.republicansAvgVotes.toFixed(2);
    document.getElementById("independents-votes-with-party").innerHTML = statistics.independentsAvgVotes.toFixed(2);

    //Loyalty Tables
    if (document.getElementById("least-loyal")) {
        document.getElementById("least-loyal").innerHTML = createLoyalRows(statistics.leastLoyalMembers);
    }
    if (document.getElementById("most-loyal")) {
        document.getElementById("most-loyal").innerHTML = createLoyalRows(statistics.mostLoyalMembers);
    }

    //Attendance Tables
    if (document.getElementById("least-engaged")) {
        document.getElementById("least-engaged").innerHTML = createAttendanceRows(statistics.leastEngagedMembers);
    }
    if (document.getElementById("most-engaged")) {
        document.getElementById("most-engaged").innerHTML = createAttendanceRows(statistics.mostEngagedMembers);
    }
}

fillTables();