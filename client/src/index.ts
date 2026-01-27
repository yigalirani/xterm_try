import { Terminal } from '@xterm/xterm';
function doit(){
  const term = new Terminal({cols:200,rows:40});

  term.open(document.getElementById('xterm-container')!); 
  term.write('*')
  term.onResize(({rows,cols})=>console.log(`resize ${rows} , ${cols}`))
  for (let i=0;i<40;i++){
    for (let j=0;j<i;j++)
      term.write('**0')
    term.write('\r\n')
  }
}
doit()