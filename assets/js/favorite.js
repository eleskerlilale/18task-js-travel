const newsRow=document.querySelector(".news-row")
axios.get("http://localhost:3000/favorite/")
        .then(res => res.data)
        .then(data => {
                data.forEach( element => {
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
            })
