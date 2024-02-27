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
        foodListLi[j]?.addEventListener("click", liHandler.bind(null, foodListLi[j], choosenOption, i))
    }

}

/** 
 * Funkcja obsługująca wciśnienie produktu
 * @param {unknown} target - Pokazuje aktualną klikniętą pozycję
 * @param {unknown} chooseOption - Wyswietlanie wybranego produktu
 * @param {unknown} id - Id aktualnego kontenera wyboru jedzenia 
 * @returns {void}
 */
function liHandler(target, chooseOption, id) {
    
    //Sprawdzanie parametru, z którego brane są dane
    if(!(target instanceof HTMLLIElement)) return alert("Podany parametr, który pokazuje wcisniętą pozycję, jest nieprawidlowy")
    
    //Sprawdzanie parametru wyjscia
    if(!(chooseOption instanceof HTMLDivElement)) return alert("Podany parametr, który pokazuje wynik, jest nieprawidlowy")
    
    //Sprawdzanie czy id jest liczba
    if(typeof id !== "number") return alert("Id musi być liczbą!")

    //Sprawdzanie czy zawiera okreslone dane
    for(let i = 0; i < dataKeys.length; i++) {
        if(!isNumberAndInScope(target.dataset[dataKeys[i]], 1000)) return alert("Podane dane są nieprawidłowe albo nie istnieją w podanym przez ciebie parametrze");
    }

    //Wcyiaganie danych z parametru wejscia
    const text = target.innerText?.trim() ?? ""
    
    //Wyciganie danych z danych napisanych w wybranym produkcie
    const { fat, kcal, protein, carbohydrates } = target.dataset
    
    //Tworzenie nowego produktu
    const newProduct = { 
        carbohydrates: Number(carbohydrates).valueOf(),
        protein: Number(protein).valueOf(), 
        kcal: Number(kcal).valueOf(), 
        fat: Number(fat).valueOf(), 
        id: id, 
     }

    //Zapis danych w paramatrze wyjscia
    setTimeout(() => {
        chooseOption.innerText = text.length > 28 ? text.slice(0, 28).trim() + "..." : text
    }, 50) 

    //Sprawdzanie czy dane istnieją w kontenerze
    if(products.contains(id)) {
        //Jak tak to zamien produkt
        products.replace(id, newProduct)
        return
    }

    //Dodanie nowego produktu do listy
    products.add(newProduct)
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