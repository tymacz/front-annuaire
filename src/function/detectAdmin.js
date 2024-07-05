export const detectAdmin = (sessionStorage) =>{
    console.log(sessionStorage.admin)
      if(sessionStorage.admin != "true"){
        window.location.href = '/home'
      }
    }