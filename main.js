// Creiamo un costruttore per il nostro plugin
function todoPlugin(className, dataSource) {
    // leggiamo i dati che l'utente vuole caricare, i dati potranno essere passati come url o come json interno
    this.dataSource = dataSource;
    let container = document.getElementsByClassName(className)
    if (this.dataSource != null) {
        try {
            //all'interno del nostro array di json abbiamo data che contiene una serie di json e ci accediamo con .data
            let data = this.dataSource.data;
            //se i nostri dati sono maggiori di 0 vuol dire che sono presenti dei dati
            if (data.length > 0) {
                // cicliamo tutti tutti json presenti all'interno del nostro array "data"
                for (let i = 0; i < data.length; i++) {
                    //console.log(data[i])
                    let jsonData = data[i]
                    createList(container[0], jsonData)
                }
                //creo la lista per aggiungere altre liste
                let listAppend = document.createElement("div");
                listAppend.className = "add-list";
                let titleAppend = document.createElement("div");
                titleAppend.classList.add("title", "editable");
                titleAppend.textContent = "Aggiungi lista"
                container[0].appendChild(listAppend);
                listAppend.appendChild(titleAppend)
            }
        } catch (error) {
            alert('Si è verificato un errore ' + error)
        }
    }
    // creiamo una funzione che avrà il compito di creare una lista
    function createList(container, object) {
        // vogliamo che il nostro container abbia la classe todo project

        // criamo un div per la lista
        let list = document.createElement("div");
        //creiamo un div per il titolo
        let title = document.createElement("div");
        //aggiungiamo il titolo che abbiamo preso dal json
        title.textContent = object.title;
        // aggiungo le classi che mi permetterano di modificare, cancellare il titolo della lista
        title.classList.add("title", "removable", "editable");
        // assegno un attributo personalizzato alla lista con un id che sia presente a db
        title.setAttribute("listId", object.id);
        list.className = "list";
        container.appendChild(list);
        list.appendChild(title);

        //creiamo anche il container per gli item
        let containerItem = document.createElement("div");
        containerItem.setAttribute("ondragover", "allowDrop(event)");
        containerItem.classList.add("content");
        list.appendChild(containerItem);
        // vuol dire che la lista ha degli item 
        if (object.item.length > 0) {
            for ($counter = 0; $counter < object.item.length; $counter++) {
                createItem(containerItem, object.item[$counter]);
            }
        }

    }
    //questa funzione crea un item 
    function createItem(container, object) {
        let item = document.createElement("div");
        item.classList.add("item", "removable", "editable");
        item.setAttribute("ondragstart", "drag(event)");
        item.setAttribute("ondragend", "dragEnd(event)");
        item.setAttribute("draggable", true)
        item.setAttribute("id", 'item-' + object.id)
        let title = document.createElement('div');
        title.textContent = object.title
        title.classList.add('title');
        item.appendChild(title)
        // mentre il titolo è richiesto nel nostro plugin la descrizione penso possa esser facoltativa
        if (object.description != null) {
            let description = document.createElement('div');
            description.classList.add("description");
            description.textContent = object.description
            item.appendChild(description)
        }
        if (object.icon != null) {
            let userIcon = document.createElement('img');
            userIcon.classList.add("profile-image");
            userIcon.src = object.icon;
            item.appendChild(userIcon)
        }
        container.appendChild(item)
    }
}

function allowDrop(ev) {
    let draggable = document.querySelector('.dragging');
    let container = ev.target.closest('.content');
    let afterElement = getDragAfterElement(container, ev.clientY)
    if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
}
//inizio del drag
function drag(ev) {
    ev.target.classList.add('dragging')
}
//fine del drag
function dragEnd(ev) {
    ev.target.classList.remove('dragging')
}
//ottenere l'elemento draggable più vicnino
function getDragAfterElement(container, y) {
    let draggableElements = [...container.querySelectorAll('[draggable=true]:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
      let box = child.getBoundingClientRect()
      let offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }