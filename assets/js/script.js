const newsRow=document.querySelector(".news-row");
const loadMore=document.querySelector(".load-more");
const count=document.querySelector(".count");
const search=document.querySelector(".news input");
const select=document.querySelector("select");
const menu=document.querySelector(".menu-icon")
const menuList=document.querySelector(".menu-list")
const x=document.querySelector(".x")

menu.addEventListener("click" , () => {
    menuList.style.display='flex'
    x.addEventListener("click", () => {
        menuList.style.display='none'
    })
})
let page=1
function item(){
    axios.get(`http://localhost:3000/data/?_page=${page}&_limit=3`)
    .then(res => res.data)
    .then(data => {
        axios.get("http://localhost:3000/favorite/")
        .then(res => res.data)
        .then(datafav => {
            count.innerText=`${datafav.length}`
            data.forEach( element => {
                ids= datafav.find(f => f.id === element.id)
                if(!ids){
                    console.log("data")
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
                    console.log("fav")

                    newsRow.innerHTML+=`<div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card">
                        <div class="image">
                            <img src=${element.image} alt="">
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
search.addEventListener("input" ,() => {
    newsRow.innerHTML=``
    axios.get(`http://localhost:3000/data/`)
    .then(res => res.data)
    .then(data => {
        axios.get("http://localhost:3000/favorite/")
        .then(res => res.data)
        .then(datafav => {
            data.forEach( element => {
                ids = datafav.find(f => f.id === element.id)
                if(element.name.toLowerCase().includes(search.value.toLowerCase())){
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
                                <img src=${element.image} alt="">
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
                                    <i class="bi bi-heart-fill"></i>
                                </div>
                                <a href="./detail.html?id=${element.id}">Details</a>
                                <a href="./add.html?id=${element.id}">Update</a>
                                <div class="delete" onclick="deleteFunc(${element.id})">Delete</div>
                            </div>
                        </div>
                    </div>`
                    }
                }
            })
        })
    })
})
loadMore.addEventListener("click", () => {
    page++
    item()
    axios.get("http://localhost:3000/data/")
    .then(res => res.data)
    .then(data => {
        if(data.length <=page*3){
            loadMore.remove()
        }
    })
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
                count.innerText=`${Number(count.innerText)+1}`
                axios.post("http://localhost:3000/favorite/", data)

                fav.innerHTML=`<i class="bi bi-heart-fill"></i>`
            }else{
                count.innerText=`${Number(count.innerText)-1}`
                axios.delete("http://localhost:3000/favorite/"+data.id)
                fav.innerHTML=`<i class="bi bi-heart"></i>`
            }
        })
    })
}
select.addEventListener("click" , () => {
    loadMore.remove()
    newsRow.innerHTML=``
    axios.get("http://localhost:3000/data/")
    .then(res => res.data)
    .then(data => {
        info = [...data]
        if(select.value=="a"){
            infodata = info.sort((a,b)=>a.name.localeCompare(b.name))
        }else if(select.value=="z"){
            infodata = info.sort((a,b)=>b.name.localeCompare(a.name))
        }
        else{
            infodata=data
        }
        console.log(data)
        axios.get("http://localhost:3000/favorite/")
        .then(res => res.data)
        .then(datafav => {
            infodata.forEach( element => {
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
                            <img src=${element.image} alt="">
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
})