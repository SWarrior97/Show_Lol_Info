var user = JSON.parse(localStorage.getItem('User'));
console.log(user);


document.getElementById("champIcon").src=user.champ;
document.getElementById("icon").src=user.icon;
document.getElementById("header").innerHTML="&nbsp;&nbsp;&nbsp;"+user.summonerName+"&nbsp;&nbsp;&nbsp;"+user.lvl;
//&nbsp;&nbsp;&nbsp;SupremeWarrior&nbsp;&nbsp;&nbsp;Lvl:35