onload = function() {
    const fieldlogin = document.getElementById("exampleInputEmail1")
    const fieldpassword = document.getElementById("exampleInputPassword1")
    const fieldsavepsw = document.getElementById("exampleCheck1")
    
    if (window.localStorage.getItem("exampleCheck1")) {
        fieldlogin.value = window.localStorage.getItem("exampleInputEmail1")
        fieldpassword.value = window.localStorage.getItem("exampleInputPassword1")
        fieldsavepsw.checked = window.localStorage.getItem("exampleCheck1")
    }
}

function doLogin() {   
    // Tipo nome = valor
    const fieldlogin = document.getElementById("exampleInputEmail1")
    const fieldpassword = document.getElementById("exampleInputPassword1")
    const fieldsavepsw = document.getElementById("exampleCheck1")

    const ischeckedsavepsw = fieldsavepsw.checked

    if (ischeckedsavepsw) {
        //Cria/Salva no localStorage
        window.localStorage.setItem("exampleInputEmail1",  fieldlogin.value)
        window.localStorage.setItem("exampleInputPassword1",  fieldpassword.value)
        window.localStorage.setItem("exampleCheck1",  fieldpassword.checked)
    } else {
        //Remove do localStorage
        window.localStorage.removeItem("exampleInputEmail1")
        window.localStorage.removeItem("exampleInputPassword1")
        window.localStorage.removeItem("exampleCheck1")
    }
}