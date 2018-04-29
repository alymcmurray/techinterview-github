const app = document.getElementById('main');
const container = document.createElement('div');
container.setAttribute('class', 'container1');
app.appendChild(container);
var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/events', true);
request.onload = function () {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
		data.forEach(event => {
			const card = document.createElement('div');
			card.setAttribute('class', 'card1');
			
			//create html elements
			const usr = document.createElement('p');
			const usr2 = document.createElement('p');
			const type = document.createElement('p');
			const type2 = document.createElement('p');
			const repo = document.createElement('p');
			const repo2 = document.createElement('p');
			const aTag = document.createElement('a');
			const modal = document.createElement('div');
			const modalContent = document.createElement('div');
			const avatar = document.createElement('img');
			const usrLink = document.createElement('a');
			const repoLink = document.createElement('a');
			const created = document.createElement('p');
			const banner = document.createElement('div');
			
			// fill html elements
			//// start with the basic card that goes on the main page, set it to trigger a modal
			usr.textContent = "User: "+event.actor.login;
			usr2.textContent = event.actor.login;
			type.textContent = "Type: "+event.type;
			type2.textContent = "Type: "+event.type;
			repo.textContent = "Repo: "+event.repo.name;
			repo2.textContent = "Repo: "+event.repo.name;
			aTag.setAttribute("class", "modal-trigger");
			aTag.setAttribute("href", "#modal"+event.id);
			container.appendChild(aTag);
			aTag.appendChild(card);
			card.appendChild(usr);
			card.appendChild(type);
			card.appendChild(repo);
			
			//// now set up the modal that will be triggered upon clicking the previous card
			avatar.setAttribute("src", event.actor.avatar_url);
			banner.appendChild(avatar);
			banner.appendChild(usrLink);
			usrLink.appendChild(usr2);
			usrLink.setAttribute("href", event.actor.url);
			repoLink.setAttribute("href", event.repo.url);
			created.textContent = "Created: "+event.created_at;
			banner.setAttribute("class", "header");
			modal.setAttribute("id", "modal"+event.id);
			modal.setAttribute("class", "modal");
			modalContent.setAttribute("class", "modal-content");
			modal.appendChild(modalContent);
			modalContent.appendChild(banner);
			modalContent.appendChild(type2);
			modalContent.appendChild(repoLink);
			repoLink.appendChild(repo2);
			modalContent.appendChild(created);
			container.appendChild(modal);
			
			$("#modal"+event.id).modal();
		});
		} else {
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = 'FAILURE';
		app.appendChild(errorMessage);
	}
}

request.send();
