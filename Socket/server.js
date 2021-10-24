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

app.get('/screenleft',(request, response)=> {
    response.sendFile(__dirname=>'/index.html')
});
app.get('/screenright',(request, response)=> {
    response.sendFile(__dirname=>'/index.html')
});
// app.get('/controller', (request, response)=> {
//     response.sendFile(__dirname=>'/nipple.html')
// })

let sockets_conectados = [];


io.on('connection', async(socket)  => {
    try{
        console.log(`Socket conectado: ${socket.id}`);
        sockets_conectados.push(socket.id);
         
        const count2 = io.of("/").sockets.size;
        //console.log(`Sockets: ${sockets_conectados} ${count2}`);

        socket.emit('start', count2);

        if(count2>2){
            socket.disconnect();
            sockets_conectados.pop(socket.id);
        }

        socket.on('disconnect', () => {
            console.log(`Socket desconectado: ${socket.id}`);
            sockets_conectados.pop(socket.id);
        });

        socket.on('update', function(sc1, sc2,x,y,dx,dy,paddleX,a,b,da,db,paddle2X,totalBricks) {
            socket.broadcast.emit('mudarTela', sc1, sc2,x,y,dx,dy,paddleX,a,b,da,db,paddle2X,totalBricks);
        });

        socket.on('destroyBricks', function(c,r){
            socket.broadcast.emit('destroyBrick', c,r);
        });

    }
    catch{
        console.log(`Erro na connection!`);
    }  
    
});
server.listen(3000);
