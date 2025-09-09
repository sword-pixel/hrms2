import crypto from 'crypto'

function generateKey(){
  const key = crypto.randomBytes(32).toString('base64');
  return key;

}

// console.log(generateKey());
generateKey()
