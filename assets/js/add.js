const id = new URLSearchParams(window.location.search).get("id")
const img=document.querySelector(".img")
const name=document.querySelector("#name")
const file=document.querySelector("#file")
const save=document.querySelector(".save")
const close=document.querySelector(".close")

if(id){
    axios.get("http://localhost:3000/data/"+id)
    .then(res => res.data)
    .then(data=>{
        img.src=data.image
        name.value=data.name
    })
}
file.addEventListener("input", ()=>{
    let image=file.files[0];
    if(image){
        let reader=new FileReader
        reader.readAsDataURL(image)
        reader.addEventListener("load",() => {
            img.src=reader.result
        })
    }
})

save.addEventListener("click", ()=>{
    if(id){
        axios.put("http://localhost:3000/data/"+id, {
            image:img.src,
            name:name.value
        })
    
    }else{
        axios.post("http://localhost:3000/data/", {
            image:img.src,
            name:name.value
        })
    }
    window.location="./index.html"
})