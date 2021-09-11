const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let photosArray=[];

//unsplash api
const count=5;
const apiKey='rAbE-MjZn7mdZ5Ecdtd3RYPJLTFudJD48WA-2iiiqz0'
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`



//helper function to set atteibuted on dom elements
function  setAttributes(element,attributes){
for(const key in attributes){
    element.setAttribute(key,attributes[key])
}
}
//create elements for Links & photos,Add to dom
function displayPhotos(){
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash website
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);// according to api we add href
        // item.setAttribute('target','_blank')
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })
        // create image for photo
        const img=document.createElement('img')
        // img.setAttribute('src',photo.urls.regular)
        // img.setAttribute('alt',photo.alt_description)
        // img.setAttribute('title',photo.alt_description)
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        //put img inside a element put both inside of our image container element
        item.appendChild(img)
        imageContainer.appendChild(item)

    })
}
// get photos from unsplash api
async function getPhotos(){
   try {
       const res=await fetch(apiUrl);
       const data=await res.json()
      photosArray=data;
      console.log(data)
    // displayPhotos()
       
   } catch (error) {
       console.log(error)
       
   }
}
// on load
getPhotos()