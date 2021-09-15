function move() {
    var elem = document.getElementById("myBar2");
    var percElem = document.getElementById("percentual2").innerHTML;
    var lay = document.getElementById("layers2").innerHTML;
    percentual = parseFloat(percElem);
    layers = parseInt(lay);



    if(layers >= 9)
    {
        percentual = percentual-12.5;
        document.getElementById("percentual2").innerHTML = percentual;

        console.log(percentual);          	    
            
        var layer = document.getElementById("layer-" + layers);
        layer.style.backgroundColor = '#ff3333';
        document.getElementById("layers2").innerHTML = layers-1;

        if(percentual == 0)
        {
        alert("Você venceu!");
        }
    }

    
    
}

function isInt(n) {
   return n % 1 === 0;
}


