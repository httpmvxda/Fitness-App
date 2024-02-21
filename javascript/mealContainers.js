//@ts-check

/**
 * Wszystkie możliwe listy z wyborem jedzenia 
 * @type {NodeListOf<HTMLLIElement>} 
 */
const mealContainers = document.querySelectorAll(".main-meal")

//Obsługujemy każdą z nich
for(let i = 0; i < mealContainers.length; i++) {
    //Pobieramy przycisk z kontenera
    const mealButton = mealContainers[i].querySelector("button")

    //Dodajemy akcje klikniecia na przycisk
    mealButton?.addEventListener("click", handleButton.bind(null, mealContainers[i]))
} 

//Automatyczne zamykanie kiedy wcisniemy w bok
window.addEventListener("click", e => {
    //Petla po kontenerze
    for(let i = 0; i < mealContainers.length; i++) {
        //Pobieramy przycisk z kontenera
        const mealButton = mealContainers[i].querySelector("button")

        //Sprawdzenie czy istnieje przycisk
        if(mealButton == null) throw new Error("Nie ma przycisku")

        //Sprawdzanie czy klikniety element to przycisk
        if(e.target != mealButton) {
            //Wyciaganie listy
            const list = mealContainers[i].querySelector("ul")

            //Sprawdzanie czy lista jest zamknieta
            if(list?.classList.contains("hidden")) continue

            //Zamykanie listy
            list?.classList.add("hidden")

            //Zamiana minus na plus
            mealButton.innerHTML = "&plus;"
        }
    }
})

/**
 * Funkcja która się uruchamia po wciśnieciu jednego z przycisków
 * @param {unknown} mealContainer - Aktualna pozycja z listy z wyborem jedzenia
 * @returns {void}
 */
function handleButton(mealContainer) {
    //Sprawdzanie czy parametr jest zawierjaca dane dotyczacej listy
    if(!(mealContainer instanceof HTMLLIElement)) return alert("Parametr nie jest prawidłowy")
    
    /**
     * Wyciaganie listy wbudowanej z wyborem dań
     * @type {HTMLOListElement | null}
     */
    const list = mealContainer.querySelector(".foodcontainer")

    //Sprawdzanie czy dany element istnieje
    if(list == null) return alert("Pozycja listy w podanej przez ciebie parametrze nie istnieje!")

    /**
     * Wyciaganie przycisku 
     * @type {HTMLButtonElement | null}  
     */
    const btn = mealContainer.querySelector(".button-list")
    
    //Sprwdzanie czy taki element istnieje
    if(btn == null) return alert("Pozycja przycisku w podanej przez ciebie parametrze nie istnieje")

    //Sprawdzanie czy lista nie jest otwarta
    if(list.classList.contains("hidden")) {
        //Usuwanie klasy ukrytej
        list.classList.remove("hidden")

        //Zamiana plus na minus
        btn.innerHTML = "&minus;"

        //Zakonczenie funkcji
        return
    }

    //Dodawanie klasy ukrywającej
    list.classList.add("hidden")

    //Zmiana minus na plus
    btn.innerHTML = "&plus;"
    
}