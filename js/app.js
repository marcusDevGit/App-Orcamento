class Despesa {
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
            if(this[i] === null  || this[i] === '' || this[i] === undefined){
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
            return (parseInt(proximoId) + 1)
        }

        gravar(d) {
            let id = this.getProximoId()

            localStorage.setItem(id, JSON.stringify(d))

            localStorage.setItem('id', id)
        }

        recuperarRegistro(){

           //array de despesas recuperadas
		let despesas = Array()

        //só testando o valor de qtdDeId
		let id = localStorage.getItem('id')

		    //recuperar todas as despesas cadastradas em localStorage
            for(let i = 1; i <= id; i++) {

                //recuperar a despesa
                let despesa = JSON.parse(localStorage.getItem(i))

                //existe a possibilidade de haver índices que foram pulados/removidos
                //nestes casos nós vamos pular esses índices
                if(despesa === null) {
                    continue
                }

                //acrescenta o id dentro do obheto da despesas 
                despesa.id = i

                despesas.push(despesa)
            }

            return despesas
        }

        pesquisar(despesa){
        let despesasFiltradas = Array()

            despesasFiltradas =  this.recuperarRegistro()

            //ano
            if(despesa.ano != ''){
                despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
            }
            //mes
            if(despesa.mes != ''){
                despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
            }
            //dia
            if(despesa.dia != ''){
                despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
            }
            //tipo
            if(despesa.tipo != ''){
                despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
            }
            //descrição
            if(despesa.descricao != ''){
                despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
            }
            //valor
            if(despesa.valor != ''){
                despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
            } 

            return despesasFiltradas
        }

        remover(id){
            localStorage.removeItem(id)
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


    let despesa = new Despesa(
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

            // limpa os campos apos a gravação das despesas
            ano.value = ''
            mes.value = ''
            dia.value = ''
            tipo.value = ''
            descricao.value = ''
            valor.value = ''

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

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        //aqui eu recebo um array contendo em cada indice, o objeto com cada despesa
    despesas = bd.recuperarRegistro()
    }
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
        listaDespesas.innerHTML = ''

    //percorrer o array despesas de forma dinamica
    despesas.forEach(function(d) {
        
        //criando a linha (tr)
        let linha = listaDespesas.insertRow();

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajusta o tipo
        switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(2).innerHTML = d.valor
        
        //criar o botão de exclusao
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}` 
        btn.onclick = function() {
            //removeer a despesa
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)

            window.location.reload()
        }

        linha.insertCell(4).append(btn)
    })

}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor )

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
    
}


