/**
 * Created by hzuellig on 04.06.20.
 */


/**
 * Hier allenfalls die Klassennamen anpassen
 */

let checkviewclass = ".checkview"; //Klasse der Elemente, die gecheckt werden sollen
let inviewclass = "isinview"; //Klasse die gesetzt wird, falls Element im viewport ist
/**
 * Ab hier nichts aendern!!
 */

const IsInView = el => {
    const boundsTop = el.getBoundingClientRect().top

    const viewport = {
        top: 0,
        bottom: window.innerHeight,
    }

    const bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight
    }


    return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
        || ( bounds.top  <= viewport.bottom && bounds.top >= viewport.top )
        || (bounds.top <= viewport.top && bounds.bottom >= viewport.bottom);
}




document.addEventListener( 'DOMContentLoaded', () => {

    const elements = document.querySelectorAll(checkviewclass)
    const handler = () => raf( () => {
        for (let i = 0; i < elements.length; i++)
            {
                if (IsInView(elements[i])) {
                    elements[i].classList.add(inviewclass)

                    //custom für detectscroll
                    if(elements[i].getAttribute('id') == "detectscroll"){
                        let viewtop= elements[i].getBoundingClientRect().top
                        if(viewtop < 0){
                            //console.log('ich bin über der animation')
                            document.getElementById("background").style.display = 'none';
                            document.getElementById("background").style.webkitAnimationPlayState = "paused";
                        }else{
                            document.getElementById("background").style.display = 'block';
                            document.getElementById("background").style.webkitAnimationPlayState = "running";
                        }
                    }



                }else{
                    elements[i].classList.remove(inviewclass)
                }


            }
    } )

handler()
window.addEventListener( 'scroll', handler )
} )

const raf =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    }
