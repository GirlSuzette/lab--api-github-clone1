var request = superagent;
var API_URL = "https://api.github.com/users/";
var API_TOKEN = "?access_token=2631fced71e645906e921e922f29793d00f240fb"
var API_ENDPOINT = "";
var API_REPOS = '/repos' + API_TOKEN


var img = document.querySelector(".info__photo__img");
var userName = document.querySelector(".info__userName");
var userGit = document.querySelector(".info__user-github");
var btn = document.querySelector(".info__button");
var work = document.querySelector(".info__work");
var city = document.querySelector('.info__location');
var email = document.querySelector(".info__email");
var web = document.querySelector(".info__web");
var repo = document.querySelector(".repo")
var img2 = document.querySelector(".fa-img");
var input = document.querySelector(".navegation__search");

//User static

var url = 'https://api.github.com/users/GirlSuzette'

request
    .get(url)
    .then(function (info) {
        // console.log(info.body);
        img.src = info.body.avatar_url;
        img2.src = info.body.avatar_url;
        userName.textContent = info.body.name;
        userGit.textContent = info.body.login;
        work.textContent = info.body.company;
        city.textContent = info.body.location;
        email.textContent = info.body.email;
        web.textContent = info.body.blog;
    })

var urlrepo = 'https://api.github.com/users/GirlSuzette/repos'
// console.log(urlrepo);
request
    .get(urlrepo)
    .then(function (info) {
        var repos = info.body;
        console.log(repos)
        var article = "";

        repos.forEach(function (repoArt) {

            article += `<article class="repo__container">
                                <h3 class="repo__container__title"><a class="repo__container__title__linkRepo" href="' ${repoArt.svn_url}"> ${repoArt.name}</a></h3>
                                <p class="repo__container__description">${repoArt.description}</p>
                                <div class="repo__container__details">
                                    <p class="repo__container__language">${repoArt.language}</p>
                                    <p class="repo__container__forks"><i class="fas fa-code-branch"></i>${repoArt.stargazers_count}</p>
                                    <p class="repo__container__date">"Updated at" ${repoArt.updated_at}</p>
                                </div>
                            </article>`;
        })
        repo.innerHTML = article;
    })

//Event Keypress

input.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    var inputUser = "";
    if (key === 13) {
        inputUser = e.target.value;
        API_ENDPOINT = API_URL + inputUser + API_TOKEN
        API_REPO = API_URL + inputUser + API_REPOS

        request
            .get(API_ENDPOINT)
            .then(function (response) {
                // console.log(respose.body);
                img.src = response.body.avatar_url;
                img2.src = response.body.avatar_url;
                userName.textContent = response.body.name;
                userGit.textContent = response.body.login;
                work.textContent = response.body.company;
                city.textContent = response.body.location;
                email.textContent = response.body.email;
                web.textContent = response.body.blog;
            })
        // console.log(API_REPO);
        request
            .get(API_REPO)
            .then(function (response) {
                var allRepo = response.body;
                var article = "";

                allRepo.forEach(function (repoArt) {

                    article += `<article class="repo__container">
                                <h3 class="repo__container__title"><a class="repo__container__title__linkRepo" href="' ${repoArt.svn_url}"> ${repoArt.name}</a></h3>
                                <p class="repo__container__description">${repoArt.description}</p>
                                <div class="repo__container__details">
                                    <p class="repo__container__language">${repoArt.language}</p>
                                    <p class="repo__container__forks"><i class="fas fa-code-branch"></i>${repoArt.stargazers_count}</p>
                                    <p class="repo__container__date">"Updated at" ${repoArt.updated_at}</p>
                                </div>
                            </article>`;
                })
                repo.innerHTML = article;
            })
    }
});