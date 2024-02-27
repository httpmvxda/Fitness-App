
//Definicja klucza bazy danych
const KEY_DB = "products"

/**
 * Definicja typu dla kontenera produktów
 * @typedef {{id: number, kcal: number, fat: number, protein: number, carbohydrates: number, uuid: string, date: string}} TProduct
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

        //Pobieranie danych z bazy
        const productsFromDatabase = localStorage.getItem(KEY_DB) 
        
        //Sprawdzanie czy sa dane w bazie
        if(productsFromDatabase) {
            this._load(productsFromDatabase)
        }
    }

    //Funkcja która oblicza zapelnienie paska
    _calculate() {
        console.log("is")
    }

    /**
     * Funckja która odczytuje stan listy z bazy danych
     * @param {string} data - dane pobrane z bazy
    */
    _load(data) {
        if(!this.validateArray(data)) {
            alert("Dane z bazy są nieprawidłowe, następuje reset bazy!")
            localStorage.removeItem(KEY_DB)
        }

        //Zapis tych produktów do listy
        this._products = JSON.parse(data).filter(i => {
            //Pobieranie aktualnej daty i daty stworzenia obiektu
            const currentDate = new Date()
            const date = new Date(i.date)

            //Filtrowanie danych na podstawie dnia
            return date.getFullYear() == currentDate.getFullYear() &&
                date.getMonth() == currentDate.getMonth() &&
                date.getDate() == currentDate.getDate()
        })
        
        //Sprawdzanie czy dana jest pusta
        if(this._products.length <= 0) {
            localStorage.removeItem(KEY_DB)
            return
        }

        //Zapis danych
        this._save()

        //Oblicz dane
        this._calculate()
    }

    //Funkcja która zapisuje stan listy do bazy
    _save() {
        localStorage.setItem(KEY_DB, JSON.stringify(this._products))
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
        if(!("uuid" in product)) return false
        if(!("date" in product)) return false
       

        //Sprawdzenie typów danych
        if(typeof product.id !== "number") return false
        if(typeof product.kcal !== "number") return false
        if(typeof product.protein !== "number") return false
        if(typeof product.fat !== "number") return false
        if(typeof product.carbohydrates !== "number") return false
        if(typeof product.uuid !== "string") return false
        if(typeof product.date !== "string") return false
        
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

        //Zapisz liste
        this._save()

        //Oblicz dane
        this._calculate()

        //Zwróc instancje
        return this
    }

    /**
     * Sprawdzanie tablicy produktów
     * @param {unknown} data - dane do walidacji
     * @returns {boolean}
     */
    validateArray(data) {
        try {
            if(typeof data !== "string") throw "Nieprawidłowe dane"

            //Zamiana danych
            const convertedData = JSON.parse(data)

            //Validacja danych
            if(!Array.isArray(convertedData)) throw "Dane nie są kontenerem"

            //Badanie konretnych wartości w bazie danych
            for(let i = 0; i < convertedData.length; i++) {
                if(!this._checkProduct(convertedData[i])) throw "Dane w produkcie są nieprawidłowe!"
            }

            //Prawidłowa walidacja
            return true

        }

        catch(e) {
            //Informacja dla dewelopera
            // console.error(e)

            //Bład w walidacji
            return false
        }
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

        //Sprawdzanie czy nie wybrano tej samej opcji
        if(this._products.find(item => item.uuid == product.uuid)) return this

        //Zamiana danych
        this._products = this._products.map(productInArray => {
            if(productInArray.id == id) return product
            return productInArray
        })

        //Zapisz liste
        this._save()

        //Oblicz dane
        this._calculate()

        //Zwracanie instancji
        return this
    }

    //Funkcja developerska sprawdzająca zawartość kontenera
    // toString() {
    //     return JSON.stringify(this._products)
    // }
}


//Tworzenie listy produktów
const products = new ListProducts(5)