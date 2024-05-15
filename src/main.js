document.querySelector('#homeBtn');
document.querySelector('#blogBtn');
document.querySelector('#chiSiamoBtn');
document.querySelector('#qAndABtn');
document.querySelector('#donaBtn');
const navBtns = document.querySelectorAll('.navBtn');
const mainSections = document.querySelectorAll('.mainSection')

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