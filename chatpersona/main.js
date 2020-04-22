
//récupération des messages
const request = new XMLHttpRequest();
request.open('GET', "url premier point d'api", true);
request.addEventListener('readystatechange', function(){
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
    const backCall=JSON.parse(request.responseText);
    for(let touit of backCall.messages){
        addTouit(touit.name, touit.message, touit.likes, touit.comments_count, touit.id, touit.ts);
    }
}
});

request.send();

//récupération des urls des images pour faire un tableau prérempli pour la génération aléatoire d'avatar

    let haru = 'img/haru.jpg';
    let ann = 'img/ann.jpg';
    let makoto = 'img/makoto.jpg';
    let mona = 'img/mona.jpg';
    let yusuke ='img/yusuke.jpg';
    let prot = "img/prot.jpg";
    let ryuji = 'img/ryuji.jpg'; 
    var album = [haru, ann, makoto, mona, yusuke, prot, ryuji];
    //let avatar = album[Math.floor(Math.random() * album.length)];
    

//ajout d'un touit

function addTouit(name,message,nbLike,comments_count,id,ts){
    //fonction pour convertir la date - on est fou, addTouit fera 3km de long^^
    //petit tableau des mois
    var months_arr = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sep','Oct','Nov','Dec'];
    //on convertit en mls
    var date = new Date(ts*1000);
    //on recup l'année
    var year = date.getFullYear();
    //du coup avec le mois c'est mieux
    var month = months_arr[date.getMonth()];
    //soyons jeunes soyons fous, récupérons aussi jours, heures et min
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    let whatTime = day + '-' + month+'-'+'-'+year+' '+hours + ':' + minutes.substr(-2);
    

    const message_id = id;
    let liste = document.getElementById('chat');
    let li = document.createElement('li');
    let divBubble = document.createElement('div');
    divBubble.className="bubble";
    let divPortrait = document.createElement('div');
    divPortrait.className="portrait";
    let divPortFrame = document.createElement('div');
    divPortFrame.className="portframe";
    let divPortImg = document.createElement('div')
    divPortImg.className="portimg";
    let img = document.createElement('img'); 
    //on choisit une image aléatoirement dans l'array initialisée avant la fonction
    img.src = album[Math.floor(Math.random() * album.length)];
    let divName=document.createElement('div');
    divName.className="bubble-name";
    let divPseudo=document.createElement('span');
    divPseudo.id="pseudo";
    divPseudo.textContent=name;
    let divT=document.createElement('span');
    divT.id="date";
    divT.textContent=JSON.stringify(whatTime);
    //console.log(divT.textContent)
    let divMessage=document.createElement('div');
    divMessage.className="bubble-body";
    divMessage.id="message";
    //divMessage.textContent=message;
    let bubbleImg = document.createElement('div')
    bubbleImg.className="bubbleimg";
    bubbleImg.id="bubbleimg";
    let nbLikes = document.createElement('span');
    nbLikes.id="nbLikes";
    let nbComs = document.createElement('span');
    nbComs.id = "nbComs";
    nbComs.textContent=comments_count + " Commentaire(s)";
    if(nbLike == 0){
        nbLikes.textContent = "000";
    }
    else if (nbLike >= 10 && nbLike < 100){
        nbLikes.textContent = "0"+nbLike;
    }
    else if(nbLike > 0 && nbLike < 10){
        nbLikes.textContent = "00"+nbLike;
    }
    else{
        nbLikes.textContent = nbLike;
    }

    let coeur = document.createElement('img');
    coeur.src= 'img/heart2.png';
    coeur.id="coeur";
    let disheart = document.createElement('img');
    disheart.src="img/disheartfinal.png";
    disheart.id="disheart";
    let commBubble = document.createElement('img');
    commBubble.id="commBubble";
    commBubble.src="img/commbubble.png";
    let p = document.createElement('p')
    p.id="messageP";
    p.textContent=message;
    li.appendChild(divBubble);
    divBubble.appendChild(divPortrait);
    divPortrait.appendChild(divPortFrame);
    divPortrait.appendChild(divPortImg);
    divPortImg.appendChild(img);
    divBubble.appendChild(divName);
    divName.appendChild(divPseudo);
    divBubble.appendChild(divMessage);
    divBubble.appendChild(divT);
    bubbleImg.appendChild(coeur);
    bubbleImg.appendChild(disheart);
    bubbleImg.appendChild(nbLikes);
    divMessage.appendChild(bubbleImg);
    divMessage.appendChild(p);
    divMessage.appendChild(nbLikes);
    liste.appendChild(li);
    li.appendChild(commBubble);
    li.appendChild(nbComs);
    nbLikes.addEventListener('click', function(e){
        console.log(message_id)
        addLike(message_id)
    })
    disheart.addEventListener('click', function(e){
        dislike(message_id)
    })
    console.log(divT);
    // à améliorer pour permettre de proposer d'ouvrir la page d'envoie de commentaire
    //Ajouter une animation sur le bouton quand on clique dessus. CF css pour ajouter un effet d'enfoncement&inverse lors du keydown et keyup
    if(comments_count == 0){
        nbComs.addEventListener('click', function(e){
            alert("ce message n\'a pas reçu de commentaires")
        })
        
    }
    else{
        nbComs.addEventListener('click', function(e){
            localStorage.clear();
            localStorage.setItem('message_id', message_id);
            window.open("commentaires.html","commentaires","menubar=no, status=no, width=500px, height=500px");
            console.log(localStorage.getItem('message_id'))
        })
    }

}


//envoyer un touit
const btn = document.getElementById('btn');
const elTouit = document.getElementById('eltouit');
const nickName = document.getElementById('nickname');

const sendRequest = new XMLHttpRequest();
sendRequest.open("POST", "url second point dapi", true);
sendRequest.addEventListener("readystatechange", function() {
    if (sendRequest.readyState === XMLHttpRequest.DONE && sendRequest.status === 200) {
        console.log(sendRequest.responseText);
    }
});


function envoieTouit(){
    newPseudo = [];
    newMess = [];
    newPseudo += nickName.value;
    newMess += elTouit.value;
    sendRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    sendRequest.send("name=" + newPseudo + "&message=" + newMess);
    event.preventDefault();
}
    
btn.addEventListener('click', envoieTouit);

//ajouter un like
function addLike(message_id){
    let requeteLike = new XMLHttpRequest();
    requeteLike.open('PUT', 'url troisieme point dapi', true);
    requeteLike.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requeteLike.addEventListener('readystatechange', function(){
        if(requeteLike.readyState === XMLHttpRequest.DONE && requeteLike.status == 200){
            console.log(requeteLike.response);
        }
    });
    requeteLike.send("message_id=" + message_id);
}
//enlever un like. Pas de sécurité pour bloquer l'envoi ou le retrait de like. 
function dislike(message_id){
    let requeteDislike = new XMLHttpRequest();
    requeteDislike.open('DELETE', 'url dernier point dapi', true);
    requeteDislike.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requeteDislike.addEventListener('readystatechange', function(){
        if(requeteDislike.readyState === XMLHttpRequest.DONE && requeteDislike.status == 200){
            console.log(requeteDislike.response);
        }
    });
    requeteDislike.send("message_id=" + message_id);
}

//refresh de la page
/*
setTimeout(function(){
    window.location.reload(1);
 }, 5000);
*/
/*
const ajoutLike = document.getElementById('nbLikes');
ajoutLike.addEventListener('click', function(e){
    console.log(essais);
    addLike(e.target.parentNode.id);
})
*/


//liker un message 


//récupération des commentaires

