// Creiamo un costruttore per il nostro plugin
function todoPlugin(dataSource){
    // vogliamo che il nostro container abbia la classe todo project
    let container = document.getElementsByClassName('todo-project');
    // leggiamo i dati che l'utente vuole caricare, i dati potranno essere passati come url o come json interno
    this.dataSource = dataSource;
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
               }
           }
           // controlliamo che l'oggetto non sia vuoto
          }
          catch (error) {
            alert ('Si è verificato un errore ' + error)
          }
    }
    // creiamo una funzione che avrà il compito di creare una lista
    this.createList = function (){
        
    }
}
