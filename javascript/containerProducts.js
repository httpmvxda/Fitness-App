/**
 * Definicja typu dla kontenera produktów
 * @typedef {{id: number, kcal: number, fat: number, protein: number, carbohydrates: number}} TProduct
 */

//klasa odpowiedzialna za oblicznie i przchowywanie wybranych produktów
class ListProducts {
    //Zmienna przchowujaca ilosc
    __size = 0

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
     * Funkcja dodajaca element do listy 
     * @param {TProduct} product - nowy produkt
     * @returns {ListProducts} Zwraca instancje {wzorzec budowlanca} 
     */
    add(product) {
        //Sprawdzanie czy lista jest pełna
        if(this._products.length >= this.__size) {
            //Jak tak to wyrzuc komunikat
            alert("Nie mozna dodac produktu. Lista jest pełna")

            //Zwróc instancje
            return this
        }

        //Dodaj dane do kontenera
        this._products = [...this._products, product]

        //Zwróc instancje
        return this
    }

    /** 
     * Funkcja która sprawdza czy dany produkt jest juz w liscie 
     * @param {number} id - Numer id produktu
     * @returns {boolean} - wynik czy zawiera czy nie
     */
    contains(id) {
        return this._products.filter(item => item.id == id).length > 0
    }

    /**
     * Funkcja która zamiena dane z listy na inne
     * @param {number} id - Numer id wymienianego produktu
     * @param {TProduct} product - nowy produkt
     * @returns {ListProducts} zwroc instancje 
     */
    replace(id, product) {
        if(!this.contains(id)) {
            alert("Nie można znalesc produktu")
            return this
        }
    }
}


//Tworzenie listy produktów
const products = new ListProducts(5)