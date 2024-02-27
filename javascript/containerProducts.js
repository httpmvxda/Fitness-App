/**
 * Definicja typu dla kontenera produktów
 * @typedef {{id: number, kcal: number, fat: number, protein: number, carbohydrates: number}} TProduct
 */

//klasa odpowiedzialna za oblicznie i przchowywanie wybranych produktów
class ListProducts {
    //Zmienna przchowujaca ilosc
    _size = 0

    /**
     * Zmienna przechowujaca produkty
     * @type {TProduct[]}
     */
    _products = []


    /**
     * Konstruktor klasy
     * @param {number} size - okresla maksymalną liczbę ilosci przchowywania produktów
     */
    constructor(size) {
        this._size = size
    }

    /**
     * Funkcja która przekazuje bład do wysietlenia
     * @param {string} message - Wiadomość do przekazania
     * @returns {ListProducts} Zwraca instancje tej klasy 
     */
    _showError(message) {
        //Wyswietl komunikat
        alert(message)

        //Zwróc instancje
        return this
    }

    /**
     * Funkcja która sprawdza czy product jest prawidłowy według okreslonego typu
     * @param {unknown} product - sprawdzany produkt
     * @returns {boolean}
     */
    _checkProduct(product) {
        //Sprawdzanie czy dana jest obiektem
        if(typeof product !== "object" || product == null) return false
        
        //Sprawdzanie pól czy istnieja
        if(!("id" in product)) return false
        if(!("kcal" in product)) return false
        if(!("fat" in product)) return false
        if(!("protein" in product)) return false
        if(!("carbohydrates" in product)) return false

        //Sprawdzenie typów danych
        if(typeof product.id !== "number") return false
        if(typeof product.kcal !== "number") return false
        if(typeof product.protein !== "number") return false
        if(typeof product.fat !== "number") return false
        if(typeof product.carbohydrates !== "number") return false
        
        //Prawidłowa walidacja
        return true
    }

    /**
     * Funkcja dodajaca element do listy 
     * @param {TProduct} product - nowy produkt
     * @returns {ListProducts} Zwraca instancje {wzorzec budowlanca} 
     */
    add(product) {
        //Sprawdzenie czy produckt jest prawidłowy
        if(!this._checkProduct(product)) {
            return this._showError("Nieprawidłowy produkt")
        }

        //Sprawdzanie czy lista jest pełna
        if(this._products.length >= this._size) {
            //Jak tak to wyrzuc komunikat
           return this._showError("Lista jest pełna")
        }

        //Dodaj dane do kontenera
        this._products = [...this._products, product]

        //Zwróc instancje
        return this
    }

    /** 
     * Funkcja która sprawdza czy dany produkt jest juz w liscie 
     * @param {unknown} id - Numer id produktu
     * @returns {boolean} - wynik czy zawiera czy nie
     */
    contains(id) {
        //Jezeli dana nie jest liczbą
        if(typeof id != "number") {
            //to zwróc komunikat
            alert("Id musi być liczbą")

            //Zwroć fałsz
            return false
        }

        //Przeszukiwanie id listy
        return this._products.filter(item => item.id == id).length > 0
    }

    /**
     * Funkcja która zamiena dane z listy na inne
     * @param {unknown} id - Numer id wymienianego produktu
     * @param {TProduct} product - nowy produkt
     * @returns {ListProducts} zwroc instancje 
     */
    replace(id, product) {
        //Sprawdzanie czy id jest liczbą
        if(typeof id != "number") {
            return this._showError("ID musi być liczbą")
        }

        //Sprawdzenie czy produckt jest prawidłowy
        if(!this._checkProduct(product)) {
            return this._showError("Nieprawidłowy produkt")
        }

        //Sprawdzenie czy dana istnije w liscie
        if(!this.contains(id)) {
            //Jak nie to zwróc kumunikat
            return this._showError("Nie ma takiego produktu!") 
        }

        //Zamiana danych
        this._products = this._products.map(productInArray => {
            if(productInArray.id == id) return product
            return productInArray
        })

        //Zwracanie instancji
        return this
    }

    //Funkcja developerska sprawdzająca zawartość kontenera
    toString() {
        return JSON.stringify(this._products)
    }
}


//Tworzenie listy produktów
const products = new ListProducts(5)