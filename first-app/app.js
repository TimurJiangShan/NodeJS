const EventEmitter = require('events');

// fs.readdir('$', function(err, files){
//   if(err) 
//     console.log(`Error: ${err}`);
//   else 
//     console.log(`Result: ${files}`);
// });

const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', function(){
  console.log('Listener called');
});

// Raise an event
emitter.emit('messageLogged');
