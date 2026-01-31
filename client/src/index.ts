import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
let top_addon:FitAddon
let top_term:Terminal
function top_call_fit(){
  const rows_before=top_term.rows
  top_addon.fit()
  const rows_after=top_term.rows
  //term.refresh(0,1000)
  const rows_after_refresh=top_term.rows
  console.log({rows_before,rows_after,rows_after_refresh})
}
function create_terminal(selector:string,asterix:string){
 
  const term = new Terminal();
  top_term=term
  const fitAddon = new FitAddon();
  top_addon=fitAddon
  function call_fit(){
    const rows_before=term.rows
    //fitAddon.fit()
    const rows_after=term.rows
    term.refresh(0,1000)
    const rows_after_refresh=term.rows
    console.log({rows_before,rows_after,rows_after_refresh})
  }
  term.loadAddon(fitAddon);

  const container = document.querySelector<HTMLElement>(selector)!;
  term.open(container); 
  
  // Fit the terminal to its container
  //fitAddon.fit();
  
  // Print initial size
  const initialSize = term.cols && term.rows ? {cols: term.cols, rows: term.rows} : null;
  if (initialSize) {
    term.write(`\r\nTerminal size: ${initialSize.cols} cols x ${initialSize.rows} rows\r\n`);
  }
  
  // Refit on window resize
  window.addEventListener('resize', call_fit)
  
  setInterval(call_fit,1000)
  const resizeObserver = new ResizeObserver(call_fit)
    resizeObserver.observe(container);
  
  term.write('*')
  term.onResize(({rows,cols})=>{
    console.log(`resize ${rows} , ${cols}`);
    term.write(`\r\n[Resize] New size: ${cols} cols x ${rows} rows\r\n`);
  })
  for (let i=0;i<40;i++){
    for (let j=0;j<i;j++)
      term.write(`${asterix}${asterix}`)
    term.write('\r\n')
  }
}
function make_toggle(id:string){
  return function(){
    const element = document.body.querySelector<HTMLElement>(`#xterm${id}`);
    if (!element) return;
    const current = window.getComputedStyle(element).display;
    element.style.display = (current === 'none') ? 'flex' : 'none';
  }
}
function doit(){
  document.getElementById('1')?.addEventListener('click',make_toggle('1'))
  document.getElementById('2')?.addEventListener('click',make_toggle('2'))
  document.getElementById('fit')?.addEventListener('click',top_call_fit)

  create_terminal('#xterm1','1')
  //create_terminal('#xterm2','2')

}
doit()