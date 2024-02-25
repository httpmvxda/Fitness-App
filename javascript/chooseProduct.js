//@ts-check

//Dane zawierające klucze do danych
const dataKeys = Object.freeze(["fat", "protein", "carbohydrates", "kcal"])

/**
 * Wyciaganie wszystki list produktów wraz z juz wybranymi opcjami
 * @type {NodeListOf<HTMLDivElement>}
 */
const foodLists = document.querySelectorAll(".foodlist")

//Petla dodająca akcję wyboru produktów
for(let i = 0; i < foodLists.length; i++) {
    //Wyciaganie wszystkich elementów listy 
    const foodListLi = foodLists[i].querySelectorAll("li")

    /**
     * Wyciaganie elementu wybranego
     * @type {HTMLDivElement | null}
     */
    const choosenOption = foodLists[i].querySelector(".choosen")

    //Sprawdzanie czy ten element istnieje
    if(choosenOption == null) {
        alert("Nie ma elemntu odpowiedzialnego za przechowywanie wybranej wartosci")
        break
    } 

    //Pętla po produktach
    for(let j = 0; j < foodListLi.length; j++) {
        //Dodawanie akcji przycisku
        foodListLi[j]?.addEventListener("click", liHandler.bind(null, foodListLi[j], choosenOption))
    }

}

/** 
 * Funkcja obsługująca wciśnienie produktu
 * @param {unknown} target - Pokazuje aktualną klikniętą pozycję
 * @param {unknown} chooseOption - Wyswietlanie wybranego produktu
 * @returns {void}
 */
function liHandler(target, chooseOption) {
    //Sprawdzanie parametru, z którego brane są dane
    if(!(target instanceof HTMLLIElement)) return alert("Podany parametr, który pokazuje wcisniętą pozycję, jest nieprawidlowy")

    //Sprawdzanie czy zawiera okreslone dane
    for(let i = 0; i < dataKeys.length; i++) {
        if(!isNumberAndInScope(target.dataset[dataKeys[i]], 1000)) return alert("Podane dane są nieprawidłowe albo nie istnieją w podanym przez ciebie parametrze");
    }

    //Sprawdzanie parametru wyjscia
    if(!(chooseOption instanceof HTMLDivElement)) return alert("Podany parametr, który pokazuje wynik, jest nieprawidlowy")
    
}

/**
 * Funkcja która sprawdza czy dane istnieją oraz czy są liczbami
 * @param {unknown} data - dana wejsciowa do sprawdzania
 * @param {number} maxSize - Oznacza maksymalną wartośc jaką może otrzymac
 * @returns {boolean} - wynik koncowy sprawdzania
 */
function isNumberAndInScope(data, maxSize) {
    //Sprawdzanie czy dana istnieje
    if(data == null) return false

    //Zamiana tego parametru w ciag znaków
    const strData = String(data)

    //Sprawzdanie czy daana to liczba na podstawie wzorca
    if(!strData.match(/^[\d]+$/)) return false;

    //Zamiana ciag znaków na liczbę
    const nrData = Number(strData)

    //Sprawdzanie czy miesci się w zakresie od 0 do maxSize
    if(nrData < 0) return false
    if(nrData > maxSize) return false

    //Prawidłowa walidacja
    return true
}