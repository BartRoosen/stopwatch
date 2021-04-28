"use strict";

// htmlHelper houdt zich uitsluitend bezig met het bewerken van de DOM

const htmlHelper = function () {
    let clearElement, getLapsDiv, createElementWithInnerText,
        setClock;

    getLapsDiv = function () {
        return document.getElementById('laps');
    };

    clearElement = function (element) {
        element.innerHTML = '';
    };

    createElementWithInnerText = function (tagName, text, classList = null) {
        let element = document.createElement(tagName);
        element.innerText = text;

        if (null !== classList || !Array.isArray(classList)) {
            classList.forEach((value) => {
                element.classList.add(value);
            });
        }

        return element;
    };

    setClock = function (time) {
        document.getElementById('clock').innerText = time
    };

    return {
        clearElement:               clearElement,
        getLapsDiv:                 getLapsDiv,
        createElementWithInnerText: createElementWithInnerText,
        setClock:                   setClock
    };
}();