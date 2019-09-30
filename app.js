const getmeal=document.querySelector('#getmealbutton');
const randomapi="https://www.themealdb.com/api/json/v1/1/random.php";
const details=document.querySelector(".details");


async function getmealcall(){
    
const response=await fetch(randomapi)

const data=await response.json();

return data;

}

function updateUI(meal){


    const ingredients=[];

for(let i=1;i<20;i++)
{

    if(meal[`strIngredient${i}`])
{
    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
}
else{
    break;
}


}

console.log(getmeal);
 const newhtml=`

 
 <div class="container">
 
<div class='column1'>
<img src="${meal.strMealThumb}" alt="mealimage"/> 
${meal.strCategory?`<p><strong>Category:</strong>${meal.strCategory}</p>`:''}
${meal.strArea?`<p><strong>Area:</strong>${meal.strArea}</p>`:''}
${meal.strTags?`<p><strong>Tags:</strong>${meal.strTags}</p>`:''}
<h2>Ingredients</h2>
<ul>${ingredients.map(ingredient=>`<li>${ingredient}<\li>`).join('')}</ul>
</div>

<div class='column2'>
 <h2>${meal.strMeal}</h2>
 <p>${meal.strInstructions}</p>
</div>

${
    meal.strYoutube
        ? `
<div class="video">
   
    <div class="videoWrapper">
    <h3>Video Recipe</h3>
        <iframe
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
    </div>
</div>`
        : ''
}



</div>`;       




details.innerHTML=newhtml;



}



getmeal.addEventListener('click',(e)=>{

    
    
    getmealcall().then((data)=>{updateUI(data.meals[0])}).catch(()=>{console.log("Sorry some Error Occured")});


});