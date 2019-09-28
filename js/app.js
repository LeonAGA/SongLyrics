import * as UI from './interfaz.js';
import {API} from './api.js';

UI.seekerForm.addEventListener('submit', (e)=>{

    //Obtainig data from the form.
    const artist = document.querySelector('#artist').value;
    const song  =  document.querySelector('#song').value;

    //Verify if some of the inputs are empty.
    if(artist === '' || song === ''){

        if(artist === '' ){
            document.querySelector('#artist').focus();
        }else{
            document.querySelector('#song').focus();
        }
       UI.divMessages.innerHTML = 'Error... Fill all the fields.';
       UI.divMessages.classList.add('error');
       setTimeout(()=>{
        UI.divMessages.innerHTML= '';
        if (UI.divMessages.className == 'error'){
            UI.divMessages.classList.remove('error');
        }
      
       },3000);
       
    }else{
        
        // An instance of API class.
        const api = new API(artist, song);

        api.consultApi()
        .then(data =>{
            if(data.response.lyrics){
              //The song has been found.
                const lyric = data.response.lyrics;
                UI.divResult.textContent = lyric;
                console.log(lyric);

            }else{
                //The song hasn't been found.
                UI.divMessages.innerHTML = 'Error... The song hasn\'t been found';
                UI.divMessages.classList.add('error');
                setTimeout(()=>{
                 UI.divMessages.innerHTML= '';
                 if (UI.divMessages.className == 'error'){
                     UI.divMessages.classList.remove('error');
                 }
                },3000);
                
            }
        });


    }
  
});