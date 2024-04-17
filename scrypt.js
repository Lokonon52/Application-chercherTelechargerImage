

const perPage=15;
let currentPage=1;
let imageWrapper=document.querySelector(".images");
let btnloader=document.querySelector(".btn");
let searchInput=document.querySelector("#recherche");
let seachTerm=null;
let apiKey="A2YWm38crIs6CFaSHDDwJie8GRWOsGTUVXgsTyNbpe18Dh7tTI1BgqqX ";
let langue=document.querySelector("#lang");
let taille=document.querySelector("#taille");
let lang;
let size;



   for (const codePays in countries) {
    let  defaut;
    if ( codePays=='fr-FR') {
        defaut="selected";
      
    }
    langue.innerHTML+=`<option value=${codePays} ${defaut}>${ countries[codePays]}</option>`;
         
     }
     lang=langue.value;
     size=taille.value;
    console.log(size);
 /*sectionner la langue */
langue.addEventListener('change',()=>{
    console.log(langue.value)
    lang=langue.value;
})
/*sectionner la taille */
taille.addEventListener('change',()=>{
    console.log(taille.value)
    size=taille.value;
    
})
//_______________________________________________________________________________________________________
const generateHTML=(images)=>{  
    /* 
 AVEC map
 */
 let TabImgLi=''; 
 
  TabImgLi=images.map(img=>{ return `<li  class="card" onclick='showLight("${img.photographer}","${img.src.large2x}")' > <img src="${img.src.large2x}" alt="">
    <div class="details">
       <div class="photographe">
       <i class="fa-solid fa-camera-retro"></i><span>${img.photographer}</span>
       </div>
   <button onclick='telecharger("${img.src.large2x}")'>Télecharger  <i class="fa-solid fa-upload"></i></button>
 </div>
 
 </li> ` 
 
 
 })
 imageWrapper.innerHTML=TabImgLi.join('');
 
 
 /* 
 AVEC forEach
     images.forEach(img=> {  
      imageWrapper.innerHTML += `<li  class="card"> <img src="${img.src.large2x}" alt="">
    <div class="details">
       <div class="photographe">
       <i class="fa-solid fa-camera-retro"></i><span>${img.photographer}</span>
       </div>
   <button><i class="fa-solid fa-upload"></i></button>
 </div>
 
 </li> `})
 */
 
 
    }
    //_______________________________________________________________________________________________________
function getImages(apiURL){  
fetch(apiURL,{ 
    headers:{ Authorization:apiKey}
}  ).then(res=>res.json()).then(data=>{generateHTML(data.photos)   /*Appel de la fonction  generateHTML */;}).catch(()=>{alert("Echec d'image ")})

}
//_______________________________________________________________________________________________________

const plusImage=()=>{  
    currentPage++; //Augmenter la page
    let apiUrl=`https://api.pexels.com/v1/curated?page=${currentPage}&size=${size}&per_page=${perPage}`
    apiUrl=seachTerm?`https://api.pexels.com/v1/search?query=${seachTerm}&locale=${lang}&size=${size}&page=${currentPage}&per_page=${perPage}`:apiUrl
    getImages(apiUrl);   //Appel de la fonction getImages dans plus Image

}
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&size=${size}&per_page=${perPage}`); //Appel de la fonction lors du chargement
btnloader.addEventListener('click',plusImage)// APPEL de fonction plusImage  avec button charger plus
//_______________________________________________________________________________________________________
const rechercheImage=(e)=>{  
// si on valide input vide
if (e.key ==='') { return seachTerm=null;
    
} 
    if (e.key ==='Enter') {
        console.log(lang);
        currentPage=1;
seachTerm=e.target.value;
getImages(`https://api.pexels.com/v1/search?query=${seachTerm}&locale=${lang}&size=${size}&page=${currentPage}&per_page=${perPage}`);
    }
    
   }
//_______________________________________________________________________________________________________
searchInput.addEventListener('keyup',rechercheImage );// APPEL de fonction rechercheImage   dans input 
//_______________________________________________________________________________________________________
const telecharger=(imgUrl)=>{
fetch(imgUrl).then(res=>res.blob()).then(blob=> {
    //Convertire l'image reçue par blob puis creer un lien de urlimage et click sur le lien par le biais du button *
   let a= document.createElement('a');

    a.href=URL.createObjectURL(blob);
    a.download=new Date().getTime();// enregistrer dans un fichier decider par utilisateur
    a.click();
 document.body.appendChild(a);
a.remove();
     }).catch(()=>alert('Erreur de télechargement'));
       
 
}  // appel  de fonction telecharger est au niveau de chaque   div .card 

//_______________________________________________________________________________________________________
//affichage de mod
 let lightbox=document.querySelector(".lightbox");
 const lightdownload=document.querySelector(".fa-upload")// btn telechargement de mod
console.log(lightbox);

 const showLight=(name,image)=>{
    lightbox.classList.add('showImage');
    lightbox.querySelector('img').src=image;
    lightbox.querySelector('span').innerText=name;
     lightdownload.setAttribute('data-img',image);// Pour dataset  voir ligne 157
    document.body.style.overflow='hidden';
   

 }
//fermer de mod
const lightclose=document.querySelector(".fa-xmark")
 lightclose.addEventListener("click",()=>{
    lightbox.classList.remove('showImage');
    document.body.style.overflow='auto';

 })

//télecharger  de mod


 
lightdownload.addEventListener("click",(e)=>{
 
 console.log(e.target.dataset.img);
 telecharger(e.target.dataset.img);// APPEL de foncvtion  telecharger  dans modale

 })

