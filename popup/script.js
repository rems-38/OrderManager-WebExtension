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

    var subButton = document.querySelector("button");
    browser.storage.local.get("php_url", result => {
        if (result.php_url == undefined || result.php_url == "") {
            subButton.disabled = true;
            subButton.style.cursor = "not-allowed";
            subButton.title = "Veuillez renseigner l'URL du serveur dans les paramètres";

            subButton.addEventListener("mouseover", () => {
                subButton.style.backgroundColor = "red";
                subButton.style.border = "red 3px solid";
            });
            subButton.addEventListener("mouseout", () => {
                subButton.style.backgroundColor = "#fff";
                subButton.style.border = "#f0a500 3px solid";
            });
        }
        else {
            subButton.disabled = false;
            subButton.style.cursor = "pointer";
            subButton.title = "";
        }
    });

    var form = document.querySelector("form")
    form.addEventListener("submit", event => {
        event.preventDefault();

        const user = form.elements.user.value;
        const service = form.elements.service.value;
        const description = form.elements.description.value;
        const platform = form.elements.platform.value;
        const price = form.elements.price.value;
        var date;
        if (inputDate.checked) {
            date = form.elements.dateD.value + "-" + form.elements.dateM.value + "-" + form.elements.dateY;
        }
        else if (inputTime.checked) {
            date = form.elements.timeD.value + "-" + form.elements.timeH.value + ":" + form.elements.timeM.value;
        }

        // Envoie de la requête au serveur
        var xhr = new XMLHttpRequest();
        browser.storage.local.get("php_url").then(result => {
            if (result.php_url) {
              xhr.open("POST", result.php_url, true);
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              xhr.send("user=" + user + "&service=" + service + "&description=" + description + "&platform=" + platform + "&price=" + price + "&date=" + date);
            }

            bigTitle = document.querySelector("h1");
            
            bigTitle.innerHTML = "Commande envoyée !";
            bigTitle.style.color = "green";
            
            const timeoutID = setTimeout(() => {
              bigTitle.innerHTML = "OrderManager";
              bigTitle.style.color = "#b9b9b9";
            }, 6000);
          });
          
    });

}
else if (window.location.href.includes("settings.html")) {
    btn = document.querySelector("button");
    btn.addEventListener("click", () => {
        browser.storage.local.set({php_url: document.querySelector("input[name='url']").value});
        location.reload();
    });


    browser.storage.local.get("php_url", result => {
        if (result.php_url != undefined) {
            document.querySelector("input[name='url']").value = result.php_url;
        }
    });
}
