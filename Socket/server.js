const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/screenleft', (req, res) => {
    res.render('index.html');
})
app.use('/screenright', (req, res) => {
    res.render('index.html');
})
app.use('/controller', (req, res) => {
    res.render('controller.html');
})
// app.use('/nipple', (req, res) => {
//     res.render('nipple.html');
// })
// app.get('/screenleft',(request, response)=> {
//     response.sendFile(__dirname=>'/index.html')
// });
// app.get('/screenright',(request, response)=> {
//     response.sendFile(__dirname=>'/index.html')
// });
// app.get('/controller', (request, response)=> {
//     response.sendFile(__dirname=>'/controller.html')
// })

let sockets_conectados = [];


io.on('connection', async(socket)  => {
    try{
        console.log(`Socket conectado: ${socket.id}`);
        sockets_conectados.push(socket.id);
         
        const count = io.of("/").sockets.size;

        //função que mostra o número da tela
        socket.emit('start', count);
        //função para desconectar quando entrar mais que 3 sockets
        if(count>3){           
            socket.disconnect();
            sockets_conectados.pop(socket.id);  
        }        
        //função que mostra no console quando um socket é desconectado
        socket.on('disconnect', () => {
            console.log(`Socket desconectado: ${socket.id}`);
            sockets_conectados.pop(socket.id);
        });
        //função que atualiza as outas abas
        socket.on('update', function(sc1, sc2,x,y,dx,dy,paddleX,a,b,da,db,paddle2X,totalBricks) {
            socket.broadcast.emit('mudarTela', sc1, sc2,x,y,dx,dy,paddleX,a,b,da,db,paddle2X,totalBricks);
        });
        //função que atualiza os blocos nas outras abas
        socket.on('destroyBricks', function(c,r){
            socket.broadcast.emit('destroyBrick', c,r);
        });
        socket.on('startPause', s => {
            console.log(`start or pause`);
            socket.broadcast.emit('play', s);
        });
        socket.on('movePaddle', function(left, right){
            socket.broadcast.emit('controladorseta', left, right);
        });
        socket.on('movePaddle2', function(left, right){
            socket.broadcast.emit('controladorbtn', left, right);
        });
    }
    catch{
        console.log(`Erro na connection!`);
    }  
    
});
server.listen(3000);
