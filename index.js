const PORT = 3000;
const express = require('express');
const axios = require('axios'); 
const cheerio = require('cheerio');

const app = express();
const cors = require('cors')
app.use(cors()) 

app.use(express.static('src'))

const pairs = {
    'aries' : 1,
    'taurus' : 2,
    'gemini' : 3,
    'cancer' : 4,
    'leo' : 5,
    'virgo' : 6,
    'libra' : 7,
    'scorpio' : 8,
    'sagittarius' : 9,
    'capricorn' : 10,
    'aquarius' : 11,
    'pisces' : 12,
};


function scrape(sign){

    

    const horoscopesUrl = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=${pairs[sign]}`;
    const astrologyUrl = `https://www.astrology.com/horoscope/daily/${sign}.html`;
    const elleNum = pairs[sign] + 96;
    const elleUrl = `https://www.elle.com/horoscopes/daily/a${elleNum}/${sign}-daily-horoscope/`;
    //const astrologyAnswersUrl = `https://astrologyanswers.com/horoscopes/${sign}-daily-horoscope/`;
    //const astrologyiUrl = `https://www.astroyogi.com/horoscopes/daily/${sign}-free-horoscope.aspx`;
    const nypostURL = `https://nypost.com/horoscopes/${sign}/`;
    return Promise.all([
        

        axios(horoscopesUrl)
        .then(response =>{  //response is from axios. res is response to the server
            const html = response.data;
            const $ = cheerio.load(html);
            const hor = $('.main-horoscope > p',html).first().text();
            return {
                source: 'Horoscopes.com',
                text: hor
            };
        })
        .catch(err => {
            console.log('there was an error: ' + err);
        }),
    
        axios(astrologyUrl)
        .then(response => {  
            const html = response.data;
            const $ = cheerio.load(html);
            const hor = $('#content').text();
            return {
                source: 'Astrology.com',
                text: hor
            };
            
        })
        .catch(err => {
            console.log('there was an error: ' + err);
        }),

        axios(elleUrl)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const hor = elleUrl + '\n' + $('p').text()
            //console.log(hor);
            console.log('k');
            return {
                source: 'Elle.com',
                text: hor
            };
        })
        .catch(err => {
            console.log('there was an error: ' + err);
        }),
        /*
        axios(nypostURL)
        .then(response =>{
            const html = response.data;
            const $ = cheerio.load(html);
            const hor = $('body').text;
            console.log(hor);
            return {
                source: "nypost.com",
                text: hor
            }
        })
        .catch(err => {
            console.log('there was an error: ' + err);
        })
        */

    ]).then(results => {
        //console.log(results);
        return results;
    }).catch(error => {
        console.log('There was an error: '+error);
    })
}
app.get('/', (req, res) => {
    res.json('Home')
})
app.get('/aries', (req, res) => {
    scrape('aries')
    .then(array=>res.json(array))
})
app.get('/taurus', (req, res) => {
    scrape('taurus')
    .then(array => res.json(array))
})
app.get('/gemini', (req, res) => {
    scrape('gemini')
    .then(array=>res.json(array))
})
app.get('/cancer', (req, res) => {
    scrape('cancer')
    .then(array=>res.json(array))
})
app.get('/leo', (req, res) => {
    scrape('leo')
    .then(array=>res.json(array))
})
app.get('/virgo', (req, res) => {
    scrape('virgo')
    .then(array=>res.json(array))
})
app.get('/libra', (req, res) => {
    scrape('libra')
    .then(array=>res.json(array))
})
app.get('/scorpio', (req, res) => {
    scrape('scorpio')
    .then(array=>res.json(array))
})
app.get('/sagittarius', (req, res) => {
    scrape('sagittarius')
    .then(array=>res.json(array))
})

app.get('/capricorn', (req, res) => {
    scrape('capricorn')
    .then(array=>res.json(array))
})
app.get('/aquarius', (req, res) => {
    scrape('aquarius')
    .then(array=>res.json(array))
})
app.get('/pisces', (req, res) => {
    scrape('pisces')
    .then(array=>res.json(array))
})

app.listen(PORT, () => {
    console.log('server running on port '+ PORT);
});


/*



    axios(url4)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const site = 'elle';
        const hor = $('.body-text').first().text();
        res.write(hor);
        
    })
    .catch(err => {
        console.log('there was an error: ' + err);
    })
   


axios(url3)
    .then(res => {
        const html = res.data;
        const $ = cheerio.load(html);
        const hor = $('.mainContainer').text();
       console.log('\nFrom Huff Post: \n' + hor);
    })
    .catch(err => {
        console.log('there was an error: ' + err);
    })
*/

    
