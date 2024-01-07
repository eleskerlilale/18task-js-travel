const id=new URLSearchParams(window.location.search).get("id")
const newsRow=document.querySelector(".news-row")
axios.get("http://localhost:3000/data/"+id)
        .then(res => res.data)
        .then(element => {
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
                    </div>
                </div>`
            })

