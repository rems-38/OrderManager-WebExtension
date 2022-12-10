function removeChilds(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function modeChange(mode) {
    div_to_edit = document.querySelector('div.col-mode-edit');
    removeChilds(div_to_edit);

    title = document.createElement('h4');
    if (mode == "date") title.innerHTML = "Date de livraison";
    else if (mode == "time") title.innerHTML = "Heure de livraison";

    mainDiv = document.createElement('div');
    mainDiv.className = "input-group";

    dateHolderArray = ["DD", "MM", "YYYY"];
    timeHolderArray = ["DD", "hh", "mm"];
    for(i = 0; i < 3; i++) {
        div = document.createElement('div');
        div.className = "col-third";

        input = document.createElement('input');
        input.type = "text";
        if (mode == "date") input.placeholder = dateHolderArray[i];
        else if (mode == "time") input.placeholder = timeHolderArray[i];
        
        div.appendChild(input);
        mainDiv.appendChild(div);
    }

    div_to_edit.appendChild(title);
    div_to_edit.appendChild(mainDiv);
}