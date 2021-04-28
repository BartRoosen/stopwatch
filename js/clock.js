"use strict";

// dit Clock object bevat alle functionaliteiten die deze stopwatch nodig heeft
// bij het aanroepen (new Clock()) worden default waarden gezet
// om de tijd bij te houden wordt het Date object gebruikt
// bij reset wordt een new Date(0) aangeroepen, bij elke interval worden 1000ms
// toegevoegd "setMilliseconds(1000)" oftewel 1 seconde
// getTime() geeft het totaal aantal ms van het Date object terug
// getMinutes en getSeconds geven minuten en seconden terug zodat je dat zelf niet
// moet gaan uitrekenen om uiteindelijk de tijd af te beelden op het scherm

class Clock {
    constructor() {
        this.resetClock(true);
    }

    resetClock(firstTime = false) {
        // reset de klok met alle default waarden
        // bij een eerste reset zal de klok nog niet lopende zijn
        // de check is wel belangrijk om te voorkomen dat setInterval niet opnieuw
        // wordt aangeroepen en allerlei rare effecten geeft
        // stopClock kijkt eerst of de klok lopende is of niet en kan hierdoor
        // aangeroepen worden zonder de status van de klok te kennen
        if (!firstTime) this.stopClock();
        this.time = '00:00';
        this.intervalId = 0;
        this.running = false;
        this.laps = [];
        this.date = new Date(0);
        this.showTime();
        htmlHelper.clearElement(htmlHelper.getLapsDiv());
    }

    showTime() {
        htmlHelper.setClock(this.time);
    }

    setLapTime() {
        // rondetijden kunnen alleen bewaard worden wanneer de klok loopt
        if (this.running) {
            this.laps.push(this.date.getTime());

            let lapsDiv = htmlHelper.getLapsDiv();
            htmlHelper.clearElement(lapsDiv);

            this.laps.forEach((value, key) => {
                let tempDate = new Date(0),
                    lapTime  = 0 === key ? value : value - this.laps[key - 1];

                tempDate.setMilliseconds(lapTime);

                // voeg de nieuwe rondetijd toe vooraan in de lijst
                // wanneer de snelste tijd bereikt wordt in de loop krijgt de div
                // de classe 'vet' mee waardoor deze er opvallend uit gaat zien op het scherm
                lapsDiv.prepend(
                    htmlHelper.createElementWithInnerText(
                        'div',
                        `Lap ${key + 1}: ${this.formatNumber(tempDate.getMinutes())}:${this.formatNumber(tempDate.getSeconds())}`,
                        lapTime === this.findFastestLap() ? ['vet'] : []
                    )
                );
                tempDate = null;
            });
        }
    }

    findFastestLap() {
        // geen rondetijden = geen snelste ronde dus null
        if (0 === this.laps.length) return null;


        if (1 === this.laps.length) {
            // slechts 1 rondetijd = altijd de snelste
            return this.laps[0];
        } else {
            // bij meerdere rondetijden "loopen" door de tijden
            let fastest = 0;
            this.laps.forEach((value, key) => {
                if (0 === key) {
                    // eerste element van de array kan niet vergeleken worden
                    // en wordt voorlopig de snelste tijd
                    fastest = value;
                } else {
                    // bij de volgende elementen steeds vergelijken met 'fastest'
                    // is de waarde kleiner => pas 'fastest' aan anders niet
                    let previousValue = this.laps[key - 1];
                    fastest = (value - previousValue) < fastest ?
                        value - previousValue :
                        fastest;
                }
            });

            return fastest;
        }
    }

    setInterValId(id) {
        this.intervalId = id;
    }

    getIntervalId() {
        return this.intervalId;
    }

    setRunning() {
        // hier wordt er 'getoggled' met de status van de klok
        // true of false
        // dit wordt gebruikt om te voorkomen dat setInterval niet meerdere
        // malen wordt aangeroepen
        this.running = !this.running;
    }

    formatNumber(number) {
        // elk getal moet 2 characters bevatten niet "1" maar "01" bijvoorbeeld
        // omzetting van number => string
        if (1 === number.toString().length) {
            return `0${number}`;
        }

        return number.toString();
    }

    setTime() {
        this.time = `${this.formatNumber(this.date.getMinutes())}:${this.formatNumber(this.date.getSeconds())}`;

        return this.time;
    }

    startClock() {
        if (!this.running) {
            this.setRunning();
            // setInterval functie geeft een id terug nodig om de inteval te stoppen
            // maak gebruik van () => {} notatie zodat je 'this' kan aanroepen
            this.setInterValId(setInterval(() => {
                this.date.setMilliseconds(1000);
                htmlHelper.setClock(this.setTime());
            }, 1000));
        }
    }

    stopClock() {
        if (this.running) {
            this.setRunning();
            // hier maak je gebruik van de interval id die in startClock() werd bepaald
            clearInterval(this.getIntervalId());
        }
    }
}
