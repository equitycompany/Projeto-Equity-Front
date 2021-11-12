onload = function() {
    if (window.localStorage.getItem("loginsuccess") == "true") {
        window.location.href = 'http://127.0.0.1:5500/index.html#'
        console.log("ONLOAD FEITO LOGIN SUCESSO")
    } else{
        const fieldlogin = document.getElementById("exampleInputEmail1")
        const fieldpassword = document.getElementById("exampleInputPassword1")
        const fieldsavepsw = document.getElementById("exampleCheck1")
        
        if (window.localStorage.getItem("exampleCheck1")) {
            fieldlogin.value = window.localStorage.getItem("exampleInputEmail1")
            fieldpassword.value = window.localStorage.getItem("exampleInputPassword1")
            fieldsavepsw.checked = window.localStorage.getItem("exampleCheck1")
        }

        console.log("ONLOAD FEITO LOGIN FALHO")
    }
    
    window.localStorage.setItem("loginsuccess",  false)
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
        window.localStorage.setItem("exampleCheck1",  true)
    } else {
        //Deixa vazio na localStorage
        window.localStorage.setItem("exampleInputEmail1", "")
        window.localStorage.setItem("exampleInputPassword1", "")
        window.localStorage.setItem("exampleCheck1", "")
    }

    doURLAuthentication(fieldlogin.value, fieldpassword.value)
}

//teste
function doGetRequest(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
  
function doURLAuthentication(login, senha) {
    var validuser
    var urlrequest

    urlrequest = "https://localhost:44397/api/Candidato/CheckarLogin/"
    urlrequest += login + "&" + senha

    validuser = doGetRequest(urlrequest)

    if (validuser == "true") {
        console.log("Login realizado com sucesso")
        window.localStorage.setItem("loginsuccess",  true)
        // window.open('http://127.0.0.1:5500/index.html#')
        window.location.href = 'http://127.0.0.1:5500/index.html#'
    } else {
        console.log("Login inválido")
        window.localStorage.setItem("loginsuccess",  false)
    }
}

function showPass() {

    if (document.getElementById('exampleInputPassword1').type == "password") {
        document.getElementById('exampleInputPassword1').type = 'text';
        document.querySelector(".mostrarsenha").textContent = "Ocultar senha"
    } else {
        document.getElementById('exampleInputPassword1').type = 'password';
        document.querySelector(".mostrarsenha").textContent = "Mostrar senha"
    }
}