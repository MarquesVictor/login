function checkInput(input) {
    const validators = {
        'empty' : (value) => {
            isValid = value.length != 0
        },
        'cpf' : (value) => {
            isValid = TestaCPF(value.replace(/\D/gm,""))
        },
        'birth' : (value) => {
            isValid = moment(value, "DD-MM-YYYY")._isValid && value.length == 10
        },
        'email' : (value) => {
            isValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        },
        'telephone' : (value) => {
            isValid = value.length == 15
        }
    }

    if(input.type == 'checkbox') return isValid = input.checked ? true : false
    
    typeof validators[input.id] == 'function' ? validators[input.id](input.value) : validators.empty(input.value)

    validateInput(input, isValid)

    return isValid;
}

function validateInput(input, isValid) {
    if(isValid) {
        input.classList.remove('invalid')
        input.classList.add('valid')
    } else {
        input.classList.remove('valid')
        input.classList.add('invalid')
    }
}

function onSubmitHandler(e) {
    var validated = true
    form = document.querySelectorAll('input');
    form.forEach(input => {
        if(!checkInput(input)) validated = false
    })

    if(!validated){
        e.preventDefault() 
        M.toast({html: 'Verifique os dados e tente novamente.'})
    }
}

function TestaCPF(strCPF) {
    var Soma
    var Resto
    Soma = 0
  if (strCPF == "00000000000") return false
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i)
  Resto = (Soma * 10) % 11
   
    if ((Resto == 10) || (Resto == 11)) Resto = 0
    if (Resto != parseInt(strCPF.substring(9, 10))) return false
   
  Soma = 0
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)
    Resto = (Soma * 10) % 11
   
    if ((Resto == 10) || (Resto == 11)) Resto = 0
    if (Resto != parseInt(strCPF.substring(10, 11))) return false
    return true;
}