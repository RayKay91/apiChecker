const axios = require( 'axios' )
const fs = require( 'fs/promises' )
const apiUrl = `https://wise-web.org/wp-json/v2/mobile-app-prayer-times2`;
const seconds = ( num ) => num * 1000;
const interval = seconds( 300 );


async function apiChecker( apiUrl ) {
  const d = new Date();
  const hours = d.getHours()
  const mins = d.getMinutes()
  let date = d.getDate();

  date = `2021-04-0${ date }`;

  if ( hours < 23 || hours > 1 ) return

  if ( mins > 20 && mins < 50 ) return

  let resp = await axios.get( apiUrl );
  resp = resp.data;


  if ( resp[ 0 ][ 0 ].GregDate !== date ) {
    try {
      await fs.writeFile( './times.txt', `new times fetched -> ${ d.toUTCString() }`, { flag: 'a' } )

    } catch {
      await fs.writeFile( 'times.txt', 'error ' + error, { flag: 'a' } )
    }
    clearInterval( x );
    return;
  }
  const obj = {
    dateFromApi: resp[ 0 ][ 0 ].GregDate,
    currDate: d.toUTCString()
  }
  try {

    await fs.writeFile( './times.txt', `${ JSON.stringify( obj, null, 2 ) } \n`, { flag: 'a' } )


  } catch ( error ) {
    await fs.writeFile( 'times.txt', 'error ' + error, { flag: 'a' } )
  }
}

const x = setInterval( () => apiChecker( apiUrl ), interval );

