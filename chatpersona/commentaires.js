const message_id = localStorage.getItem('message_id');

//récupération des commentaires
const request = new XMLHttpRequest();
request.open('GET', "http://touiteur.cefim-formation.org/comments/list?message_id="+message_id, true);
request.addEventListener('readystatechange', function(){
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
    const backCall=JSON.parse(request.responseText);
    for(let touit of backCall.comments){
        addTouit(touit.name, touit.comment, touit.likes, touit.id, touit.ts);
    }
}
});
request.send();

//pour la génération aléatoire d'avatar

let haru = 'img/haru.jpg';
let ann = 'img/ann.jpg';
let makoto = 'img/makoto.jpg';
let mona = 'img/mona.jpg';
let yusuke ='img/yusuke.jpg';
let prot = "img/prot.jpg";
let ryuji = 'img/ryuji.jpg'; 
var album = [haru, ann, makoto, mona, yusuke, prot, ryuji];
//let avatar = album[Math.floor(Math.random() * album.length)];


function addTouit(name,comment,nbLike,id,ts){
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
    //allez, on s'occuper du reste:)
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
    p.textContent=comment;
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
    liste.appendChild(li);
    nbLikes.addEventListener('click', function(e){
        console.log(message_id)
        addLike(message_id)
    })
    disheart.addEventListener('click', function(e){
        dislike(message_id)
    })
    console.log(divT);
}

