
function func() {

    fetch('https://fakerapi.it/api/v1/persons')
    .then(function(response){
        response.json()
        .then(function(finaldata){
            console.log(finaldata);
        })
    })
}

func()