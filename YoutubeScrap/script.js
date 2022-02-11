let apiKey = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCPK3X4WbZbpKi8bS7DwJw0AapL-UWA0js&type=video&part=snippet&maxResults=50&q=js"
let Videos = []
let next = document.querySelector(".next")
let prev = document.querySelector(".prev")
let body = document.querySelector("body")
let search = document.querySelector("input")
let x = 0;
let flag = 2;
async function getData(){
    let response = await fetch(apiKey)
    let data = await response.json()
    return data
}
async function getDatanext(token){
    let response = await fetch(apiKey+"&pageToken=" +token)
    let data = await response.json()
    return data
}
function displayVideos(idx){
    let returnVideos = Videos.items.slice(10*(idx-1),10*idx-1)
    return returnVideos;
}
function myData(){
    let promise = getData()
    promise.then(function(data){
    Videos = data
    console.log(Videos)
    build()
})
}
function build(){
    let cards = document.querySelectorAll(".card")
    for(let i = 0 ; i<cards.length ; i++){
        cards[i].remove()
    }
    let pagebtn = document.querySelectorAll(".mystyle")
    for(let i = 0 ; i<pagebtn.length ; i++){
        pagebtn[i].remove()
    }
    let pageContainer = document.createElement("div")
        pageContainer.classList.add("pageContainer");
        body.appendChild(pageContainer)
        let pageContainerSmall = document.createElement("div")
        pageContainerSmall.classList.add("pageContainerSmall");
        pageContainer.appendChild(pageContainerSmall)
    for( let count =x*5+1 ; count<(x+1)*5 +1 ; count++){
        let page = document.createElement("BUTTON")
        page.classList.add("mystyle");
        page.innerText = count
        pageContainerSmall.appendChild(page)
        page.addEventListener("click",function(){
            let cards = document.querySelectorAll(".card")
            for(let i = 0 ; i<cards.length ; i++){
                cards[i].remove()
            }
            var toDisplay = displayVideos(count%5)
            let videoContainer = document.createElement("div")
            videoContainer.classList.add("cont")
            body.appendChild(videoContainer)
            toDisplay.map((video)=>{
                let card = document.createElement("div")
                card.classList.add("card")
                videoContainer.appendChild(card)
                card.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="Avatar">
            <div class="container">
              <h4><b>${video.snippet.title}</b></h4>
              <p>${video.snippet.description}</p>
            </div>
                `
            })
        })
        
    }
    firstNine()
}
myData()
next.addEventListener("click",async function(){
    let lastPagecont = document.querySelector(".pageContainer")
    lastPagecont.remove()
    Videos = await getDatanext(Videos.nextPageToken)
    x++
    flag = 1
    build()
})
prev.addEventListener("click",async function(){
    let lastPagecont = document.querySelector(".pageContainer")
    lastPagecont.remove()
    if(Videos.prevPageToken){
        Videos = await getDatanext(Videos.prevPageToken)
        x--
        flag = 0
        build()
    }
    
})
search.addEventListener("input", function(e){
    let mySearch = e.target.value
    if(mySearch!=""){
        let searchVideos = Videos.items.filter((vid)=>{return vid.snippet.title.toUpperCase().includes(mySearch.toUpperCase())}) 
        console.log(searchVideos);
        let cards = document.querySelectorAll(".card")
    for(let i = 0 ; i<cards.length ; i++){
        cards[i].remove()
    }
    let pagebtn = document.querySelectorAll(".mystyle")
    for(let i = 0 ; i<pagebtn.length ; i++){
        pagebtn[i].remove()
    }
    let videoContainer = document.createElement("div")
            videoContainer.classList.add("cont")
            body.appendChild(videoContainer)
            searchVideos.map((video)=>{
                
                console.log(video)
                let card = document.createElement("div")
                card.classList.add("card")
                videoContainer.appendChild(card)
                card.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="Avatar">
            <div class="container">
              <h4><b>${video.snippet.title}</b></h4>
              <p>${video.snippet.description}</p>
            </div>
                `
            })
    }
    else{
        let lastPagecont = document.querySelector(".pageContainer")
        lastPagecont.remove()
        build()
    }
})
function firstNine(){
    let videoContainer = document.createElement("div")
            videoContainer.classList.add("cont")
            body.appendChild(videoContainer)
            let count = 1;
            let show = Videos.items.filter((vid)=>{if(count<=9){
                count++;
                return vid}})
            show.map((video)=>{
                let card = document.createElement("div")
                card.classList.add("card")
                videoContainer.appendChild(card)
                card.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="Avatar">
            <div class="container">
              <h4><b>${video.snippet.title}</b></h4>
              <p>${video.snippet.description}</p>
            </div>
                `
            })
}