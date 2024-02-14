const locationForm = document.querySelector('#location')
const submit = document.querySelector("button")
const container = document.querySelector(".container-javascript")
const containerGIF = document.querySelector('.container-gif')

async function getAPI(loc){
    console.log('1')
    try {
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=de50363333804682a37152215241302&q=${loc}&aqi=no`);
        const data = await res.json();
        return data
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}


async function getGifAPI(gif){
    console.log('2')
    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=BUnCfX0Pb4bHwVOKQDHHhheXojRXRdAv&q=${gif}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        const data = await res.json();
        return data
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

let apiDATA = null

async function fetchAPI(datas){
   await getAPI(datas)
            .then(data => {
                apiDATA = data.current.condition.text;
                console.log('ss'.apiDATA)
                container.innerHTML = `
                <div class='inside-container'>
                    <h1 class="element">Country: ${data.location.country}</h1>
                    <h2 class="element">City: ${data.location.name}</h2>
                    <p class="element">${data.current.feelslike_c} C</p>
                    <p class="element">${data.current.condition.text}</p>
                </div>
                `
                return apiDATA
            })
            .catch(error => {
                console.error("Error:", error)
            })

}

function fetchAPI2(gif){
    getGifAPI(gif)
        .then(data => {
            console.log(data.data[0].images.original.url)
            containerGIF.innerHTML = `
                <img src="${data.data[0].images.original.url}"/>
            `
        })
        .catch(error => {
            console.error("Erorr:", error)
        })
}
   



const makeUPPER = (n) => {
    const f = n.slice(0).charAt(0).toUpperCase()
    n = n.slice(1)
    return f + n
    
}

submit.addEventListener('click', async (e) => {
    e.preventDefault()
    await fetchAPI(makeUPPER(locationForm.value))
    fetchAPI2(apiDATA)
})