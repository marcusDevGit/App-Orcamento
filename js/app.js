class Despesas {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
            return false
            }
        }
        return true
    }
}

class Bd {

        constructor () {
            let id = localStorage.getItem('id')

            if(id === null){
                localStorage.setItem('id', 0)
            }
        }

        getProximoId () {
            let proximoId = localStorage.getItem('id') 
            return parseInt(proximoId) + 1
        }

        gravar(d) {
            let id = this.getProximoId()

            localStorage.setItem(id, JSON.stringify(d))

            localStorage.setItem('id', id)
        }

        recuperarRegistro(){

            //array das despesas
            let despesas = Array()

            let id = localStorage.getItem('id')

            //recuperar todas as despesas cadastradas em localStorage
            for(let i = 1; i <= id; i ++){

                //recuperar a despesa
                let despesa = JSON.parse(localStorage.getItem(i))

                //existe a possibilidade de ter indices que foram removidos
                if(despesa === null) {
                    continue
                }

                despesas.push(despesa)
            }


        }

}

let bd = new Bd()


function cadastarDespesas() {
    
    let ano =  document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')


    let despesa = new Despesas(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
        )

        if(despesa.validarDados()){
            bd.gravar(despesa)

            document.getElementById('modal_titulo').innerHTML = 'Despesa registrada'
            document.getElementById('modal_titulo_div').className = 'modal-header text-success'
            document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
            document.getElementById('modal_btn').innerHTML = 'Voltar'
            document.getElementById('modal_btn').className = 'btn btn-success'

            //dialogo de sucesso
            $('#registraDespesa').modal('show')

        } else {
            document.getElementById('modal_titulo').innerHTML = 'Erro na registro da Despesa'
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
            document.getElementById('modal_conteudo').innerHTML = 'Erro no registro da despesa, verifique se todos os campos estão preenchidos corretamente!'
            document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
            document.getElementById('modal_btn').className = 'btn btn-danger'

            //dialogo de erro
            $('#registraDespesa').modal('show')
        }
        
}

function carregaListaDespesas() {
    
    let despesas = Array()


    despesas = bd.recuperarRegistro()

        //selecionando o elemento tbody da tabela
    var listaDespesas = document.getElementById('listaDespesas')

    //percorrer o array despesas de forma dinamica
    despesas.forEach(function(d) {
        console.log(d)

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)

        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
        linha.insertCell(1)
        linha.insertCell(2)
        linha.insertCell(3)
        
    })
}


