export const detectConnexion = (sessionStorage) =>{
  console.log(sessionStorage.connecter)
    if(sessionStorage.connecter != "true"){
      window.location.href = '/'
    }
  }