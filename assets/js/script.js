const newsRow=document.querySelector(".news-row");
const loadMore=document.querySelector(".load-more")
let page=1
function item(){
    axios.get(`http://localhost:3000/data?_page=${page}&_limit=3`)
    .then(res => res.data)
    .then(data => {
        axios.get("http://localhost:3000/favorite/")
        .then(res => res.data)
        .then(datafav => {
            data.forEach( element => {
                ids= datafav.find(f => f.id === element.id)
                if(!ids){
                    newsRow.innerHTML+=`<div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card">
                        <div class="image">
                            <img src="${element.image}" alt="">
                            <div class="icon">
                                <i class="bi bi-rocket-takeoff"></i>
                            </div>
                        </div>
                        <div class="text">
                            <span>JUNE 13, 2017</span>
                            <p>${element.name}</p>
                        </div>
                        <div class="button">
                            <div class="favorite fav${element.id}" onclick="favFunc(${element.id})">
                                <i class="bi bi-heart"></i>
                            </div>
                            <a href="./detail.html?id=${element.id}">Details</a>
                            <a href="./add.html?id=${element.id}">Update</a>
                            <div class="delete" onclick="deleteFunc(${element.id})">Delete</div>
                        </div>
                    </div>
                </div>`
                }else{
                    newsRow.innerHTML+=`<div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card">
                        <div class="image">
                            <img src="https://demo.kaliumtheme.com/travel/wp-content/uploads/2017/06/giza-400x250.jpg" alt="">
                            <div class="icon">
                                <i class="bi bi-rocket-takeoff"></i>
                            </div>
                        </div>
                        <div class="text">
                            <span>JUNE 13, 2017</span>
                            <p>Discovering civilizations of the Middle East</p>
                        </div>
                        <div class="button">
                            <div class="favorite fav${element.id}" onclick="favFunc(${element.id})">
                                <i class="bi bi-heart-fill"></i>
                            </div>
                            <a href="./detail.html?id=${element.id}">Details</a>
                            <a href="./add.html?id=${element.id}">Update</a>
                            <div class="delete" onclick="deleteFunc(${element.id})">Delete</div>
                        </div>
                    </div>
                </div>`
                }
            })
        })
    })
}
item()

function deleteFunc(id){
    axios.delete("http://localhost:3000/data/"+ id)
    window.location.reload()
}

loadMore.addEventListener("click", () => {
    page++
    item()
    axios.get("")
})
function favFunc(id){
    const fav=document.querySelector(`.fav${id}`)
    axios.get(`http://localhost:3000/data/`+id)
    .then(res => res.data)
    .then(data => {
        axios.get("http://localhost:3000/favorite/")
        .then(res => res.data)
        .then(datafav => {
            ids= datafav.find(f => f.id === data.id)
            if(!ids){
                axios.post("http://localhost:3000/favorite/", data)
                fav.innerHTML=`<i class="bi bi-heart-fill"></i>`
            }else{
                axios.delete("http://localhost:3000/favorite/"+data.id)
                fav.innerHTML=`<i class="bi bi-heart"></i>`
            }
        })
    })
}