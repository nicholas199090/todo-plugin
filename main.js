// Creiamo un costruttore per il nostro plugin
function todoPlugin(className,dataSource){
    // leggiamo i dati che l'utente vuole caricare, i dati potranno essere passati come url o come json interno
    this.dataSource = dataSource;
    let container = document.getElementsByClassName(className)
    if(this.dataSource != null){
        try {
            //all'interno del nostro array di json abbiamo data che contiene una serie di json e ci accediamo con .data
           let data = this.dataSource.data;
           //se i nostri dati sono maggiori di 0 vuol dire che sono presenti dei dati
           if(data.length > 0){
               // cicliamo tutti tutti json presenti all'interno del nostro array "data"
               for(let i=0; i < data.length; i++){
                //console.log(data[i])
                   let jsonData = data[i]
                   createList(container[0],jsonData)
               }
               //creo la lista per aggiungere altre liste
               let listAppend = document.createElement("div");
               listAppend.className= "add-list";
               let titleAppend = document.createElement("div");
               titleAppend.classList.add("title","editable");
               titleAppend.textContent= "Aggiungi lista"
               container[0].appendChild(listAppend);
               listAppend.appendChild(titleAppend)
           }
          }
          catch (error) {
            alert ('Si è verificato un errore ' + error)
          }
    }
    // creiamo una funzione che avrà il compito di creare una lista
     function createList (container,object){
        // vogliamo che il nostro container abbia la classe todo project
       
        // criamo un div per la lista
        let list = document.createElement("div");
        //creiamo un div per il titolo
        let title = document.createElement("div");
        //aggiungiamo il titolo che abbiamo preso dal json
        title.textContent = object.title;
        // aggiungo le classi che mi permetterano di modificare, cancellare il titolo della lista
        title.classList.add("title","removable","editable");
        // assegno un attributo personalizzato alla lista con un id che sia presente a db
        title.setAttribute("listId", object.id);
        list.className = "list";
        container.appendChild(list);
        list.appendChild(title);
       
    }
    //questa funzione crea un item 
    this.createItem = function (){

    }
}
