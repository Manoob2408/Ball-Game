const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
})

// app.get('/screen',(request, response)=> {
//     response.sendFile(__dirname=>'/index.html')
// })
// app.get('/controller', (request, response)=> {
//     response.sendFile(__dirname=>'/nipple.html')
// })

let sockets_conectados = [];

io.on('connection', async(socket)  => {
    try{
        console.log(`Socket conectado: ${socket.id}`);
        sockets_conectados.push(socket.id);
         
        const count2 = io.of("/").sockets.size;

        console.log(`Sockets: ${sockets_conectados} ${count2}`);

        socket.emit('start', count2);

        if(count2>2){
            socket.disconnect();
            sockets_conectados.pop(socket.id);
        }

        //socket.join("room:" + count2);
        socket.on('disconnect', () => {
            console.log(`Socket desconectado: ${socket.id}`);
            sockets_conectados.pop(socket.id);
            //socket.disconnect();
        });

        socket.on('desenharScore', function(ball, y) {
            socket.broadcast.emit('mudarTela', ball, y);
        });


    }
    catch{
        console.log(`Erro na connection!`);
    }  
    
});

server.listen(3000);

/*
    Primeiro passo: limitar para duas telas e definir quais são os sockets conectados
    Segundo passo: ver como será definido o tamanho das telas
    Terceiro passo: transmitir um dos componentes para outra tela
    Quarto passo: quando a bola bate na parede manda para a outra tela no width 0
*/
