function findRecipes(ingredients, app_id, app_key) {
    var url = "https://api.edamam.com/search?q=" + encodeURIComponent(ingredients) + "&app_id=" + app_id + "&app_key=" + app_key;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to retrieve recipes.");
            }
            return response.json();
        })
        .then(data => {
            if (data.hits.length > 0) {
                showRecipes(data.hits);
            } else {
                throw new Error("No recipes found.");
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

function showRecipes(recipes) {
    var recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous content

    recipes.forEach((recipe, index) => {
        var recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        var recipeImg = document.createElement('img');
        recipeImg.src = recipe.recipe.image;
        recipeImg.alt = recipe.recipe.label;
        recipeImg.onclick = function() {
            window.open(recipe.recipe.url, "_blank");
        };

        var recipeName = document.createElement('h3');
        recipeName.textContent = recipe.recipe.label;

        recipeDiv.appendChild(recipeImg);
        recipeDiv.appendChild(recipeName);

        recipeList.appendChild(recipeDiv);
    });
}


function searchRecipes(event) {
    event.preventDefault(); // Prevent form submission
    var ingredients = document.getElementById('ingredients').value.trim();
    if (ingredients !== '') {
        document.getElementById('search-form').style.display = 'none';
        document.getElementById('recipes').style.display = 'block';
        findRecipes(ingredients, "b4a4fdaf", "e28dfd910c4829be83307da8ecddfb17");
    } else {
        alert('Please enter ingredients');
    }
}

function redirectToExternalLink() {
    var externalWindow = window.open("https://docs.google.com/forms/d/e/1FAIpQLSfNxQMWKpxId1Vn3HwqoSg0asg9UEXWZAkjzpksuLf0UX10sw/viewform?usp=sf_linkhttps://docs.google.com/forms/d/e/1FAIpQLSfNxQMWKpxId1Vn3HwqoSg0asg9UEXWZAkjzpksuLf0UX10sw/viewform?usp=sf_link", "_blank");

    var checkFormSubmitted = setInterval(function() {
        if (externalWindow.closed) {
            clearInterval(checkFormSubmitted);
            redirectToSearchPage();
        }
    }, 1000);
}

function redirectToSearchPage() {
    window.location.href = "search.html";
}
