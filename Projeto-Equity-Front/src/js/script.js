onload = function() {
    const fieldlogin = document.getElementById("exampleInputEmail1")
    const fieldpassword = document.getElementById("exampleInputPassword1")
    const fieldsavepsw = document.getElementById("exampleCheck1")
    
    if (window.localStorage.getItem("exampleCheck1")) {
        fieldlogin.value = window.localStorage.getItem("exampleInputEmail1")
        fieldpassword.value = window.localStorage.getItem("exampleInputPassword1")
        fieldsavepsw.checked = window.localStorage.getItem("exampleCheck1")
    }

    console.log("ONLOAD FEITO")
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

//Faz a requisição
function doGetRequest(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

//Faz a autenticação do usuário
function doURLAuthentication(login, senha) {
    var validuser
    var urlrequest

    urlrequest = "https://localhost:44397/api/Candidato/CheckarLogin/"
    urlrequest += login + "&" + senha

    validuser = doGetRequest(urlrequest)

    if (validuser == "true") {
        console.log("Login realizado com sucesso")
        //window.location.href = 'http://127.0.0.1:5500/index.html#'
        window.open('http://127.0.0.1:5500/index.html#', "_self", false)
        window.location.replace("http://127.0.0.1:5500/index.html#")
    } else {
        console.log("Login inválido")
    }
}

//Mostra ou oculta a senha
function showPass() {
    if (document.getElementById('exampleInputPassword1').type == "password") {
        document.getElementById('exampleInputPassword1').type = 'text';
        document.querySelector(".mostrarsenha").textContent = "Ocultar senha"
    } else {
        document.getElementById('exampleInputPassword1').type = 'password';
        document.querySelector(".mostrarsenha").textContent = "Mostrar senha"
    }
}

//Envia e-mail do HELP
function sendEmail() {
    var validuser
    var urlrequest
    const nome = document.getElementById("exampleFormControlInput1").value
    const email = document.getElementById("inlineFormInputGroup").value
    const mensagem = document.getElementById("exampleFormControlTextarea1").value

    urlrequest = "https://localhost:44397/api/Email/EnviarEmail/"
    urlrequest += nome + "&" + email + "&" + mensagem

    validuser = doGetRequest(urlrequest)

    if (validuser == "true") {
        console.log("E-mail enviado")
    } else {
        console.log("E-mail não foi enviado")
    }
}

//Envia e-mail para troca de senha
function sendEmailSenha() {
    var validuser
    var urlrequest
    const email = document.getElementById("emailinput").value
    urlrequest = "https://localhost:44397/api/Email/TrocadeSenha/"
    urlrequest += email

    validuser = doGetRequest(urlrequest)

    if (validuser == "true") {
        console.log("E-mail para recuperação de senha enviado")
    } else {
        console.log("E-mail para recuperação de senha não foi enviado")
    }
}

//Realiza a troca de senha
function changepass() {
    var senha = document.getElementById("inputsenha1").value
    var confirmesenha = document.getElementById("inputsenha2").value

    if (senha == confirmesenha){
        var urlchgsenha = window.location.href
        var chgsenha = urlchgsenha.substring(urlchgsenha.indexOf("_") + 1)
        console.log(chgsenha)
        urlrequest = "https://localhost:44397/api/Candidato/AlterarSenha/"
        urlrequest += chgsenha + "&" + senha

        validuser = doGetRequest(urlrequest)

        if (validuser == "true") {
            alert("Senha alterada com sucesso")
            //window.location.href = "http://127.0.0.1:5500/login-candidato.html"
        } else {
            alert("Senha não foi alterada")
        }
    } else {
        alert("Digite as duas senhas corretamente")
    }
}