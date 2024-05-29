// ^ Elementi
const navBtns = document.querySelectorAll('.navBtn');
const mainSections = document.querySelectorAll('.mainSection')
const counters = document.querySelectorAll('.counter')
const modelBtn = document.querySelector('#modelBtn')
const modalBg = document.querySelector('.modalBg')
const closeBtn = document.querySelector('#closeBtn')

let lastSection = 'home'
const lastSectionStorage = localStorage.getItem('lastSection')
if (lastSectionStorage) lastSection = JSON.parse(lastSectionStorage)



// ^ Funzioni
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

// L'observer
let options = {
	root: null,
	rootMargin: '0px',
	threshold: 1,
}

let callback = (entries, observer) => {
	objData = entries[0];
	
	if (objData.isIntersecting) {
        counters.forEach( (element) => {
            startCounters(element);
        })

		observer.unobserve(objData.target);
	}
}

let observer = new IntersectionObserver(callback, options);

counters.forEach( (element) => {
    observer.observe(element);
})

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
        
        let response = ''

        switch (counter.id) {
            case 'people':
                response = Math.floor(value)
                break;

            case 'money':
                response = '€' + Math.floor(value / 100) + '.' + Math.floor(value % 100)
                break;
        
            case 'percentage':
                response = Math.floor(value) + '%'
                break;
        
            default:
                break;
        }

        counter.innerHTML = response

    }, step);
    
}

document.querySelector('#' + lastSection + 'Btn').style.color = 'white'



// ^ Eventi
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

modelBtn.addEventListener('click', () => {
    modalBg.classList.remove('hidden')
})

closeBtn.addEventListener('click', () => {
    modalBg.classList.add('hidden')
})