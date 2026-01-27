import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
function create_terminal(selector:string){
 
  const term = new Terminal();
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);

  const container = document.querySelector<HTMLElement>(selector)!;
  term.open(container); 
  
  // Fit the terminal to its container
  fitAddon.fit();
  
  // Print initial size
  const initialSize = term.cols && term.rows ? {cols: term.cols, rows: term.rows} : null;
  if (initialSize) {
    term.write(`\r\nTerminal size: ${initialSize.cols} cols x ${initialSize.rows} rows\r\n`);
  }
  
  // Refit on window resize
  window.addEventListener('resize', () => {
    fitAddon.fit();
  });
  
  term.write('*')
  term.onResize(({rows,cols})=>{
    console.log(`resize ${rows} , ${cols}`);
    term.write(`\r\n[Resize] New size: ${cols} cols x ${rows} rows\r\n`);
  })
  for (let i=0;i<40;i++){
    for (let j=0;j<i;j++)
      term.write('**0')
    term.write('\r\n')
  }
}
function doit(){
  create_terminal('#xterm1')
  create_terminal('#xterm2')
}
doit()