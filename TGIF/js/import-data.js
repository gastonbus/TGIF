var app = new Vue({
	el: '#app',
	data: {
		members: null,
		democrats: null,
		republicans: null,
		independents: null,
		leastLoyalMembers: null,
		mostLoyalMembers: null,
		leastEngagedMembers: null,
		mostEngagedMembers: null,
		democratsAvgVotes: null,
		republicansAvgVotes: null,
		independentsAvgVotes: null,
	}
})

const url = 'https://api.propublica.org/congress/v1/113/' + (document.title.includes("Senate") ? "senate" : "house") + '/members.json';
const init = {
	method: 'GET',
	headers: {
		'X-API-Key': 'eC9UG7CdvTuoGV8P1XgN2ONrGf7OuLIBwgCEqG94'
	},
}

fetch(url, init)
	.then(response => response.json())
	.then(data => startElements(data))
	.catch(error => console.log(error));