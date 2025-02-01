import{a as g,S as f,i as n}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(r){if(r.ep)return;r.ep=!0;const l=s(r);fetch(r.href,l)}})();const m="46102534-3e9989b221503d0d2c214f5a1",b="https://pixabay.com/api/",p=async(o,t=1,s=15)=>{try{return(await g.get(`${b}?key=${m}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${s}`)).data}catch(e){throw console.error("Error fetching images:",e),new Error("Sorry, there are no images matching your search query. Please try again!")}};async function h(o){const t=document.querySelector(".gallery"),s=o.map(e=>`  <li class="gallery-item">
            <a href="${e.largeImageURL}">
              <img src="${e.webformatURL}" alt="${e.tags}" height="152" width="360"/>
            </a>
            <ul class="info">
             <li>
               <p class="headers">Likes</p>
               <p class="details">${e.likes}</p>
             </li>
             <li>
               <p class="headers">Views</p>
               <p class="details">${e.views}</p>
             </li>
             <li>
               <p class="headers">Comments</p>
               <p class="details">${e.comments}</p>
             </li>
             <li>
               <p class="headers">Downloads</p>
               <p class="details">${e.downloads}</p>
             </li>
            </ul>
          </li>`).join("");t.insertAdjacentHTML("beforeend",s)}function q(){const o=document.querySelector(".gallery");o.innerHTML=""}const L=document.querySelector(".search-form");document.querySelector(".gallery");const a=document.querySelector(".btn-load");document.querySelector(".loader");let y=new f(".gallery a"),i=1,u=15,c="";L.addEventListener("submit",async o=>{if(o.preventDefault(),c=o.target.elements.query.value.trim(),c===""){n.error({message:"Please enter a search term",position:"topRight"});return}q(),y.refresh(),i=1,o.target.elements.query.value="",a.style.display="none";const t=document.querySelector(".loader-search");t.style.display="block";try{const{hits:s,totalHits:e}=await p(c,i);t.style.display="none",!s||s.length===0?n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(h(s),y.refresh(),a.style.display="block",(s.length<u||s.length>=e)&&(a.style.display="none",n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})))}catch{t.style.display="none",n.error({title:"Error",message:"Failed to fetch images"})}});a.addEventListener("click",async()=>{const o=document.querySelector(".loader-load");o.style.display="block",i+=1;try{const{hits:t,totalHits:s}=await p(c,i,u);if(o.style.display="none",h(t),y.refresh(),t.length>0){const e=document.querySelector(".gallery .gallery-item");if(e){const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}t.length===0||i*u>=s?(a.style.display="none",n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):a.textContent="Load more"}catch(t){console.log(t),o.style.display="none"}});
//# sourceMappingURL=index.js.map
