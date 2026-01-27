import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

function doit(){
  const term = new Terminal();
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);

  const container = document.getElementById('xterm-container')!;
  term.open(container); 
  
  // Fit the terminal to its container
  fitAddon.fit();
  
  // Refit on window resize
  window.addEventListener('resize', () => {
    fitAddon.fit();
  });
  
  term.write('*')
  term.onResize(({rows,cols})=>console.log(`resize ${rows} , ${cols}`))
  for (let i=0;i<40;i++){
    for (let j=0;j<i;j++)
      term.write('**0')
    term.write('\r\n')
  }
}
doit()