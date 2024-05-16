document.querySelector('#homeBtn');
document.querySelector('#blogBtn');
document.querySelector('#chiSiamoBtn');
document.querySelector('#qAndABtn');
document.querySelector('#donaBtn');
const navBtns = document.querySelectorAll('.navBtn');
const mainSections = document.querySelectorAll('.mainSection')

const counters = document.querySelectorAll('.counter-number')

let lastSection = 'Home'
const lastSectionStorage = localStorage.getItem('lastSection')
if (lastSectionStorage) lastSection = JSON.parse(lastSectionStorage)


let setLastSection = (lastSection) => {
    localStorage.setItem('lastSection', JSON.stringify(lastSection))
}

let showSection = (item) => {
        let lowerItem = item.toLowerCase()
        
        mainSections.forEach( (section) => {
            section.classList.add('hidden')
        })

        setLastSection(item)

        const section = document.querySelector(`#${lowerItem}`)
        section.classList.remove('hidden')
}

showSection(lastSection)



// Prepariamo le impostazioni per l'observer
let options = {
	root: null,
	rootMargin: '0px',
	threshold: 1
}

// Prepariamo la funzione che andrà eseguita quando l'elemento entra nella viewport
let callback = (entries, observer) => {
	objData = entries[0]; // Noi abbiamo un solo elemento da controllare, quindi sarà il primo della lista
	
	if (objData.isIntersecting) {
		// L'oggetto è entrato nella viewport
		startCounters(element);
		// Smettiamo di osservare l'oggetto (animazione solo la prima volta che viene visualizzato)
		observer.unobserve(objData.target);
	}
}

// Creiamo l'Observer vero e proprio
let observer = new IntersectionObserver(callback, options);

// Seleziona l'elemento che vuoi osservare
let element = document.getElementById('count2')

observer.observe(element);



  

// counters.forEach( (counter) => {

//     observer.observe(counter);
// })
    
let startCounters = (counter) => {

    let value = 0
    let end = parseInt(counter.dataset.to)
    let duration = parseInt(counter.dataset.duration)

    let step = duration / 100
    let fraction = end / 100
    
    let timer = setInterval( () => {
        value = value + fraction
        
        if (value >= end) {
            clearInterval(timer) 
            value = end
        }
        counter.innerHTML = Math.floor(value)

    }, step);
    
}
    
navBtns.forEach( (item) => {
    item.addEventListener('click', () => {
        let name = item.id.replace('Btn', '')
        navBtns.forEach( (btn) => {
            btn.style.color = 'var(--color-2)'
        })
        item.style.color = 'white'
        
        showSection(name)
    })
})