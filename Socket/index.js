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

let messages = [];
let sockets_conectados = [];

io.on('connection', async(socket)  => {
    try{
        console.log(`Socket conectado: ${socket.id}`);
        sockets_conectados.push(socket.id);
        console.log(`Socket conectado: ${sockets_conectados}`);

        socket.emit('previousMessage', messages);

        const count2 = io.of("/").sockets.size;
        const count3 =  socket.rooms.size;

        if(count2<3){
            console.log(`rooms: ${count2}  ${count3} ${socket.rooms} `);
        }
        else{
            socket.disconnect();
            sockets_conectados.pop(socket.id);
            console.log(`Mais que 2 sockets! `);
        }
        //socket.join("room:" + count2);
        

        socket.on('sendMessage', data => {
            messages.push(data);
            //socket.to("room0").to("room1").emit('receivedMessage', data);
            //socket.broadcast.emit('receivedMessage', data);
            socket.broadcast.emit('teste', data);
            //socket.to("room:2").emit("teste");
        });
        

        //const projects = await fetchProjects(socket);
        
        //projects.forEach(project => socket.join("project:" + count2));
        

        // and then later
        //io.to("project:1").emit("teste");

        //socket.join("some room");
    }
    catch{
        console.log(`Erro na connection!`);
    }
    
    
});

//const count2 = io.of("/").sockets.size;

server.listen(3000);

/*
    Primeiro passo: limitar para duas telas e definir quais são os sockets conectados
    Segundo passo: ver como será definido o tamanho das telas
    Terceiro passo: transmitir um dos componentes para outra tela
*/