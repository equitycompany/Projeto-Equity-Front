function click_modallogin() {

    if (window.localStorage.getItem("checkinputcandidato") == 'true') {        
        $("#PasswordCandidato").val(window.localStorage.getItem("PasswordCandidato"))
        $("#InputEmailCandidato").val(window.localStorage.getItem("InputEmailCandidato"))
        $("#checkinputcandidato").val(true)
        document.getElementById("checkinputcandidato").checked = true
    } else {
        //Deixa vazio na localStorage
        $("#PasswordCandidato").val("")
        $("#InputEmailCandidato").val("")
        $("#checkinputcandidato").val(false)
        document.getElementById("checkinputcandidato").checked = false
    }
    
    if (window.localStorage.getItem("checkinputempresa") == 'true') {
        $("#InputEmailEmpresa").val(window.localStorage.getItem("InputEmailEmpresa"))
        $("#PasswordEmpresa").val(window.localStorage.getItem("PasswordEmpresa"))
        $("#checkinputempresa").val(document.getElementById("checkinputempresa"))
        document.getElementById("checkinputempresa").checked = true
    } else {
        //Deixa vazio na localStorage
        $("#InputEmailEmpresa").val("")
        $("#PasswordEmpresa").val("")
        $("#checkinputempresa").val(document.getElementById("checkinputempresa"))
        document.getElementById("checkinputempresa").checked = false
    }
}

function doLoginCandidato() {   
    // Tipo nome = valor
    const fieldlogin = document.getElementById("InputEmailCandidato")
    const fieldpassword = document.getElementById("PasswordCandidato")
    const fieldsavepsw = document.getElementById("checkinputcandidato")

    const ischeckedsavepsw = fieldsavepsw.checked

    if (ischeckedsavepsw) {
        //Cria/Salva no localStorage
        window.localStorage.setItem("InputEmailCandidato",  fieldlogin.value)
        window.localStorage.setItem("PasswordCandidato",  fieldpassword.value)
        window.localStorage.setItem("checkinputcandidato",  true)
    } else {
        //Deixa vazio na localStorage
        window.localStorage.setItem("InputEmailCandidato", "")
        window.localStorage.setItem("PasswordCandidato", "")
        window.localStorage.setItem("checkinputcandidato", false)
    }

    doCandidatoAuth(fieldlogin.value, fieldpassword.value)
}

function doLoginEmpresa() {   
    // Tipo nome = valor
    const fieldlogin = document.getElementById("InputEmailEmpresa")
    const fieldpassword = document.getElementById("PasswordEmpresa")
    const fieldsavepsw = document.getElementById("checkinputempresa")

    const ischeckedsavepsw = fieldsavepsw.checked

    if (ischeckedsavepsw) {
        //Cria/Salva no localStorage
        window.localStorage.setItem("InputEmailEmpresa",  fieldlogin.value)
        window.localStorage.setItem("PasswordEmpresa",  fieldpassword.value)
        window.localStorage.setItem("checkinputempresa",  true)
    } else {
        //Deixa vazio na localStorage
        window.localStorage.setItem("InputEmailEmpresa", "")
        window.localStorage.setItem("PasswordEmpresa", "")
        window.localStorage.setItem("checkinputempresa", false)
    }

    doEmpresaAuth(fieldlogin.value, fieldpassword.value)
}

//Faz a requisição
function doGetRequest(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

//Faz a requisição
function doPostRequest(url, dados) {
    let request = new XMLHttpRequest()
    request.open("POST", url, false)
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(dados)
    console.log(request.responseText)
    return request.responseText
}

//Faz a autenticação do usuário
function doCandidatoAuth(login, senha) {
    var validuser
    var urlrequest

    urlrequest = "https://localhost:44397/api/Candidato/CheckarLogin/"
    urlrequest += login + "&" + senha

    validuser = doGetRequest(urlrequest)

    if (validuser == "true") {
        console.log("Login realizado com sucesso")
        alert("Login realizado com sucesso")
    } else {
        console.log("Login inválido")
        alert("Login inválido")
    }
}

//Faz a autenticação da empresa
function doEmpresaAuth(login, senha) {
    var validuser
    var urlrequest

    urlrequest = "https://localhost:44397/api/Empresa/CheckarLogin/"
    urlrequest += login + "&" + senha

    validuser = doGetRequest(urlrequest)

    if (validuser == "true") {
        console.log("Login realizado com sucesso")
        alert("Login realizado com sucesso")
        //window.location.href = 'http://127.0.0.1:5500/index.html#'
        window.open('http://127.0.0.1:5500/index.html#', "_self", false)
        window.location.replace("http://127.0.0.1:5500/index.html#")
    } else {
        console.log("Login inválido")
        alert("Login inválido")
    }
}

//Mostra ou oculta a senha | Candidato
function showPassCand() {
    if (document.getElementById('PasswordCandidato').type == "password") {
        document.getElementById('PasswordCandidato').type = 'text';
        document.querySelector(".mostrarsenha").textContent = "Ocultar senha"
    } else {
        document.getElementById('PasswordCandidato').type = 'password';
        document.querySelector(".mostrarsenha").textContent = "Mostrar senha"
    }
}

//Mostra ou oculta a senha | Empresa
function showPassEmp() {
    if (document.getElementById('PasswordEmpresa').type == "password") {
        document.getElementById('PasswordEmpresa').type = 'text';
        document.querySelector(".mostrarsenha").textContent = "Ocultar senha"
    } else {
        document.getElementById('PasswordEmpresa').type = 'password';
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
        alert("E-mail enviado")
    } else {
        console.log("E-mail não foi enviado")
        alert("E-mail não foi enviado")
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
        alert("E-mail para recuperação de senha enviado, verifique o seu e-mail")
        $('#modal-esquecisenha').modal('hide')
    } else {
        alert("E-mail para recuperação de senha não foi enviado")
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

function GetCandByEmail() {
    var candidato
    var urlrequest
    const email = window.localStorage.getItem("InputEmailCandidato")

    urlrequest = "https://localhost:44397/api/Candidato/GetCandidatoByEmail/"
    urlrequest += email

    candidato = doGetRequest(urlrequest)

    return candidato
}

function cadastrarCandidato() {
    var validuser
    var urlrequest
    var dados

    if (document.getElementById("ColocarEmail").value.indexOf("@") != -1 ) {
        urlrequest = "https://localhost:44397/api/Candidato/CadastrarCandidato/"

        dados = JSON.stringify({
            "cpf": document.getElementById("ColocarCPF").value,
            "nome": document.getElementById("ColocarNomeCompleto").value,
            "email": document.getElementById("ColocarEmail").value,
            "senha": document.getElementById("ColocarSenha").value
        })

        validuser = doPostRequest(urlrequest, dados)
        console.log(validuser)

        if (validuser == "Candidato cadastrado com sucesso!") {
            console.log("Cadastro realizado")
            alert("Cadastro realizado")
        } else {
            console.log("Cadastro não foi realizado")
            alert("Cadastro não foi realizado")
        }
    } else {
        alert("digite o e-mail corretamente")
        }
}

function cadastrarEmpresa() {
    var validemp
    var urlrequest
    var dados

    if (document.getElementById("ColocarEmail").value.indexOf("@") != -1 ) {
        urlrequest = "https://localhost:44397/api/Empresa/CadastrarEmpresa/"

        dados = JSON.stringify({
            "cnpj": document.getElementById("ColocarCNPJ").value,
            "nome": document.getElementById("ColocarNomeEmpresa").value,
            "email": document.getElementById("ColocarEmail").value,
            "senha": document.getElementById("ColocarSenha").value
        })


        validemp = doPostRequest(urlrequest, dados)
        console.log(validuser)

        if (validemp == "Empresa cadastrado com sucesso!") {
            console.log("Cadastro realizado")
            alert("Cadastro realizado")
        } else {
            console.log("Cadastro não foi realizado")
            alert("Cadastro não foi realizado")
        }
    } else {
        alert("digite o e-mail corretamente")
        }
}

function cadastrarVaga() {
    var validvaga
    var urlrequest
    var dados

    urlrequest = "https://localhost:44397/api/Vaga/CadastrarVaga/"

    dados = JSON.stringify({
        "nome": document.getElementById("nomevaga").value,
        "sobre": document.getElementById("sobre").value,
        "habilidades": document.getElementById("habilidades").value,
        "descricao": document.getElementById("descricao").value
    })

    validvaga = doGetRequest(urlrequest)
    console.log(validvaga)

    if (validvaga == "Vaga cadastrada com sucesso!") {
        console.log("Cadastro realizado")
        alert("Cadastro realizado")
    } else {
        console.log("Cadastro não foi realizado")
        alert("Cadastro não foi realizado")
    }
}

function cadastrarCurriculo() {
    var validcur
    var urlrequest
    var dados
    var candidato

    urlrequest = "https://localhost:44397/api/Candidato/CadastrarCurriculo/"

    candidato = GetCandByEmail()

    candidato = JSON.parse(candidato)
    console.log(candidato.nome)
    console.log(candidato.email)

    dados = JSON.stringify({
        "cpf": candidato.cpf,
        "nome": candidato.nome,
        "grauescolar": document.getElementById("grau").value,
        "experiencia": document.getElementById("experiencia").value,
        "cursos": document.getElementById("cursos").value,
        "sobre": document.getElementById("sobre").value
    })

    validcur = doPostRequest(urlrequest, dados)
    console.log(validcur)

    if (validcur == "Curriculo cadastrado com sucesso!") {
        console.log("Cadastro realizado")
        alert("Cadastro realizado")
    } else {
        console.log("Cadastro não foi realizado")
        alert("Cadastro não foi realizado")
    }
}
function carregarVagas() {
    var validcur
    var urlrequest
    var dados
    var vagas

    urlrequest = "https://localhost:44397/api/Vaga/ListarVagas/"

    vagas = doGetRequest(urlrequest)

    vagas = JSON.parse(vagas)
    console.log(vagas)

    return vagas
}

function checkInputs(inputs) {

    var filled = true;

    inputs.forEach(function(input) {
    if(input.value === "") {
        filled = false;
    }

    });

    return filled;
}

async function obterNomeVaga(tipo) {
    var vagas
    
    vagas = carregarVagas()

    resultado.json() 
    .then(produtos => {
       document.getElementById('idprodutos').replaceChildren();
       listarProdutos(produtos)
     });     
}