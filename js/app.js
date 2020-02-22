function onClickSubmit() {
    var summonerName = document.getElementById("search").value;
    if(summonerName == ''){
        alert("Insert a valid Summoner Name");
    }else{
        getProfile(summonerName);
    }
}

function getProfile(summonerName){
    var url = 'https://cors-anywhere.herokuapp.com/https://www.leagueofgraphs.com/summoner/euw/'+summonerName;
    fetch(url,
        {
          method: 'GET'
        })
            .then(function(response) {
                // When the page is loaded convert it to text
                return response.text()
            })
            .then(function(html) {
                // Initialize the DOM parser
                var parser = new DOMParser();

                // Parse the text
                var doc = parser.parseFromString(html, "text/html");
                var divs = doc.getElementsByTagName('div');
                var spans = doc.getElementsByTagName('span');
                var title = doc.getElementsByTagName('title')[0].innerHTML;

                if(!title.includes('Not Found')){
                    var User = {summonerName:'',elo:'',lp:'',wins:'',loses:'',winRate:'',icon:'',champ:''};

                User.summonerName = title.split('(')[0];

                for (let i = 0; i < divs.length; i++) {
                    if (divs[i].getAttribute('class') == 'leagueTier') {
                        User.elo = divs[i].innerHTML.trim();
                    }

                    if (divs[i].getAttribute('class') == 'league-points') {
                        User.lp = divs[i].childNodes[1].innerHTML;
                    }

                    if(divs[i].getAttribute('id') == 'graphDD6'){
                        User.winRate = divs[i].innerHTML.trim();
                    }

                    if(divs[i].getAttribute('class') == 'img'){
                        var str = divs[i].childNodes[1].src;
                        var res = str.replace("file:", "https:");
                        User.icon = res;
                    }

                    if(divs[i].getAttribute('class') == 'pageBanner img-align-block'){
                        User.champ = 'https:'+divs[i].style.backgroundImage.split('url("')[1].split('")')[0];
                    }
                }

                for (let i = 0; i < spans.length; i++) {
                    if (spans[i].getAttribute('class') == 'leaguePoints') {
                        User.lp = spans[i].innerHTML;
                    }
                }
                for (let i = 0; i < spans.length; i++) {
                    if (spans[i].getAttribute('class') == 'winsNumber') {
                        User.wins = spans[i].innerHTML;
                        break;
                    }
                }

                for (let i = 0; i < spans.length; i++) {
                    if (spans[i].getAttribute('class') == 'lossesNumber') {
                        User.loses = spans[i].innerHTML;
                        break;
                    }
                }

                console.log(User);
                
                }else{
                    console.log("Summoner not found");
                    process.exit();
                }

            })
            .catch(function(err) {
                console.log('Failed to fetch page: ', err);
            });
}

document.getElementById("submit").addEventListener("click", onClickSubmit);
