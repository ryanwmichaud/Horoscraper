const content = document.getElementById('content');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
//const four = document.getElementById('four');

const selector = document.getElementById('signs');

let currentSign = selector.value;
getContent(currentSign);

  
selector.addEventListener('change', () =>{
    currentSign = selector.value;
    getContent(currentSign);
   
})


function getContent(currentSign){
    fetch(`http://localhost:3000/${currentSign}`)
    .then((res) => res.json())
    .then((data) => {
        one.innerHTML= data[0].text + '<br><br>-' + data[0].source;
        two.innerHTML=data[1].text + '<br><br>-' + data[1].source;
        three.innerHTML=data[2].text + '<br><br>-' + data[2].source;
        //four.innerHTML=data[3].text + '<br><br>-' + data[3].source;
        /*
        data.forEach(hor => {
            content.insertAdjacentHTML('afterbegin','<p>'+hor.text+'<br><br>- '+hor.source+'</p>')
        });
        */
    })
    .catch((error)=>{
        console.log(error);
        if(error == 'net::ERR_CONNECTION_RESET'){ //delete or fix
            one.innerHTML= 'refresh';
            two.innerHTML= 'refresh';
            three.innerHTML= 'refresh';
        }
        else{
            one.innerHTML= 'something went wrong :(';
            two.innerHTML= 'something went wrong :(';
            three.innerHTML= 'something went wrong :(';
        }
        
    })
}


    
   /*
        fetch('http://localhost:3000/results')
            .then((res) => res.json())
            .then((data) => {
                horoscopes.insertAdjacentHTML('beforeEnd', data[0]);
                astrology.insertAdjacentHTML('beforeEnd', data[1]);
                elle.insertAdjacentHTML('beforeEnd', data[2]);
            });
    */
                
            