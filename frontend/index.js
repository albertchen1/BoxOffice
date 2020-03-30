import { grossing_bubble } from '../app/grossing';
import { scatter_bubble } from "../app/scatter";


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("sliderContainer").style.display = "none";

    document.getElementsByClassName("button")[0].addEventListener('click', () => {
        document.getElementById("sliderContainer").style.display = "none";




        let element = document.getElementById("container");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }


        var svg = document.createElement('div')
        svg.setAttribute("id", "bubble-chart")
        document.getElementById("container").appendChild(svg)
        grossing_bubble();
    })

    document.getElementsByClassName("button2")[0].addEventListener('click', () => {
        document.getElementById("sliderContainer").style.display = "none";




        let element = document.getElementById("container");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }


        var svg = document.createElement('div')
        svg.setAttribute("id", "chart");
        document.getElementById("container").appendChild(svg)
        scatter_bubble();
    })



})
