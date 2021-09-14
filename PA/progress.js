function move() {
    var elem = document.getElementById("myBar");
    var percElem = document.getElementById("percentual");
    var layers = 8;
    var percentual = 100;
    var id = setInterval(frame, 10);

    function frame() {
        if (layers <  1) {
            clearInterval(id);
        } else {
        	    if (layers <= 8) {
                    percentual = Math.round((percentual - 0.1) * 100) / 100
                    percElem.innerHTML = percentual;
            }
            
        	    if (isInt(percentual/12.5)) {
            	    console.log(percentual);
            	    
            
                    var layer = document.getElementById("layer-" + layers);
                    layer.style.backgroundColor = '#ff3333';
                    layers--;

            }
        }
    }
}

function isInt(n) {
   return n % 1 === 0;
}


