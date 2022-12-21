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
    dateNameArray = ["dateD", "dateM", "dateY"];
    timeHolderArray = ["DD", "hh", "mm"];
    timeNameArray = ["timeD", "timeH", "timeM"];
    
    for(i = 0; i < 3; i++) {
        div = document.createElement('div');
        div.className = "col-third";

        input = document.createElement('input');
        input.type = "text";
        input.autocomplete = "off";
        if (mode == "date") {
            input.placeholder = dateHolderArray[i];
            input.name = dateNameArray[i];
        }
        else if (mode == "time") {
            input.placeholder = timeHolderArray[i];
            input.name = timeNameArray[i];
        }
        
        div.appendChild(input);
        mainDiv.appendChild(div);
    }

    div_to_edit.appendChild(title);
    div_to_edit.appendChild(mainDiv);
}


if (window.location.href.includes("index.html")) {
    document.querySelector("input[name='url_for_php']").value = window.location.href;

    inputDate = document.querySelector("input[value='date']");
    inputTime = document.querySelector("input[value='time']");
    inputDate.addEventListener("click", () => modeChange("date"));
    inputTime.addEventListener("click", () => modeChange("time"));


    browser.storage.local.get("php_url", result => {
        if (result.php_url != undefined) {
            document.querySelector("form").action = result.php_url;
        }
    });
}
else if (window.location.href.includes("settings.html")) {
    btn = document.querySelector("button");
    btn.addEventListener("click", () => {
        browser.storage.local.set({php_url: document.querySelector("input[name='url']").value});
        window.history.go(-1);
    });


    browser.storage.local.get("php_url", result => {
        if (result.php_url != undefined) {
            document.querySelector("input[name='url']").value = result.php_url;
        }
    });
}
