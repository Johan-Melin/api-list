const target = document.getElementById("pasteHere")
const list = document.getElementById("list")
let currentApi = null;

const apiList = [
    {
        name: 'adviceslip',
        url: 'https://api.adviceslip.com/advice',
        path: 'slip.advice'
    },
    {
        name: 'fun fact',
        url: 'https://asli-fun-fact-api.herokuapp.com/',
        path: 'data.fact'
    },
    {
        name: 'geek jokes',
        url: 'https://geek-jokes.sameerkumar.website/api?format=json',
        path: 'joke'
    },
]

for(var i = 0; i < apiList.length; i++) {
    let opt = apiList[i].name;
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    list.add(el)
}

list.onchange = function () {
    const obj = apiList.find(api => api.name === this.value)
    currentApi = obj;
    getUrl(currentApi);
  }

function getUrl(api){
    axios.get(api.url)
    .then(function (response) {
        target.innerText = resolvePath(response.data, api) + "\n"
    })
}

const resolvePath = (object, api) => {
    const errorMsg = `sorry, couldn't find ${api.path}`;
    return api.path.split('.')
    .reduce((o, p) => o ? o[p] : errorMsg, object)
}
