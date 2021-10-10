//Esta parte é da sidebar
let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function () {
    sidebar.classList.toggle("active");
}
//Fim da sidebar

//Exibir formulário de edicao
function toggleToEditar() {
    hideItem(home); //Esconder a div Home
    hideItem(cadastro); //Esconder a div cadastro
    showItem(edicao); //Mostrar atalho para acessar conta
}
//Exibir formulário de cadastro
function toggleToCadastro() {
    hideItem(home); //Esconder a div Home
    hideItem(edicao); //Esconder a div Edicao
    showItem(cadastro); //Mostrar atalho para acessar conta
}
//Exibir formulário Home
function toggleToHome() {
    hideItem(cadastro); //Esconder a div Home
    hideItem(edicao); //Esconder a div Edicao
    showItem(home); //Mostrar atalho para acessar conta
}

//Simplifica a exibição de elementos da página
function showItem(element) {
    element.style.display = 'block';
}

//Simplifica a remoção de elementos da página
function hideItem(element) {
    element.style.display = 'none';
}


/***********Funções abaixo para manipulação dos formularios***************/


//Limpar o formulário de cadastro
function Limpar() {
    document.getElementById("cadastra_pergunta").reset();
}

//Limpar o formulário de pesquisa
function LimparPesquisa() {
    document.getElementById("pesquisa").reset();
    hideItem(retorno_negativo);
    const limpa_respostas = document.getElementById("questoes");
    limpa_respostas.innerHTML = '';
}

//Função para eliminar uma questao
function eliminar(id,uid) {
    var el = document.getElementById(id);
    el.remove(); // Remove a div inteira.
    alert('A questão '+id+' foi removida.');
    //Logica para deletar
}


//Funcao para verificar se os campos da edição estao preenchidos
function validaEdicao(id) {
    var UID = document.getElementById('q_UID_' + id).value;
    var fields = ["q_CAT_" + id, "q_PER_" + id, "q_COR_" + id, "q_WRO1_" + id, "q_WRO2_" + id, "q_WRO3_" + id]

    var i, l = fields.length;
    var fieldname;
    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (document.forms["questao_" + id][fieldname].value === "") {
            alert("Nenhum dos campos pode ser deixado em branco ou estar vazio para concluir o cadastro. \nVerifique todos os campos!");
            return false;
        }
    }

    alert('Edição Realizada na questão ' + id);
    ////////Funcao para realizar a edição no banco de dados.

    return true;
}





/* Movido para o arquivo crud.js por motivos de encapsulamento da api de requisições para o backend
//Funcao Cadastrar
function Cadastrar() {
    if (validaCadastro()) {
        var categoria = document.getElementById("categoria").value; //Recupera a Categoria da pergunta
        var questao = document.getElementById("questao").value; //Recupera a Questão
        var correta = document.getElementById("correct").value; //Recupera a resposta correta
        var errada_1 = document.getElementById("errada_1").value; //Recupera a resposta correta
        var errada_2 = document.getElementById("errada_2").value; //Recupera a resposta correta
        var errada_3 = document.getElementById("errada_3").value; //Recupera a resposta correta    
        alert("Categoria: " + categoria + "\nQuestão: " + questao + "\nCorreta: " + correta + "\nErrada 1: " + errada_1 + "\nErrada 2: " + errada_2 + "\nErrada 3:" + errada_3);
    }
}
*/


//Funcao Pesquisar
function pesquisar() {
    var categoria_pesq = document.getElementById("categoria_pesquisa").value; //Recupera a Categoria a pesquisar
    var termo_pesq = document.getElementById("termo_pesq").value; //Recupera o valor do termo a pesquisar
    alert("Categoria :" + categoria_pesq + "\nTermo Pesquisa:" + termo_pesq);

    var repeticao = prompt('Quantas questões vocês quer ver para testar : ');

    if (termo_pesq == 'Maradona') { //Incluir a lógica quando nada for encontrado no banco de dados
        showItem(retorno_negativo);
    } else { //Encontramos registros e vamos escrever as questões.
        showItem(retorno_positivo);


        var id_banco = 1; //Controla o id
        var uid_banco = 08785458; //Recupera o uid do banco de dados
        var categoria_banco = 'Esporte e lazer'; //Recupera a categoria da questao no banco
        var texto_questao = 'Onde foi realizada a copa do mundo de 1994 ?'; //Recupera a questão do banco de dados
        var alternativa_correta = 'Estados Unidos';
        var alternativa_incorreta_1 = 'Brasil';
        var alternativa_incorreta_2 = 'Espanha';
        var alternativa_incorreta_3 = 'Uruguai';


        //Apenas para teste
        while (id_banco <= repeticao) {
            var questao_retornada = document.createElement("div"); //Cria uma nova div para inserir a questao. 
            questao_retornada.setAttribute("id", id_banco);

            var concatena = '<fieldset><legend>'; //Concatena o HTML para exibir

            concatena += 'Questão ' + id_banco + ' </legend>'; //Concatena o número da questão.
            concatena += '<form id="questao_' + id_banco + '">';

            //UID
            concatena += '<label>UID : <input type="text" id="q_UID_' + id_banco + '" value ="' + uid_banco + '" style="width:unset" disabled></label>';

            //CATEGORIA
            concatena += '<label for="q_CAT_' + id_banco + '"><span>Categoria : </span><select id="q_CAT_' + id_banco + '">';
            const categorias_possiveis = ["Mundo", "Arte e Entretenimento", "Sociedade", "Ciencia e tecnologia", "Esporte e Lazer", "Variedade"];
            for (var i = 0, len = categorias_possiveis.length; i < len; i++) {
                if (categorias_possiveis[i] === categoria_banco) {
                    concatena += '<option selected="selected" value="' + categorias_possiveis[i] + '">' + categorias_possiveis[i] + '</option>';
                } else {
                    concatena += '<option value="' + categorias_possiveis[i] + '">' + categorias_possiveis[i] + '</option>';
                }
            }
            concatena += '</select></label>';

            //QUESTAO
            concatena += '<label for="q_PER_' + id_banco + '"><span>Questão:</span></label>';
            concatena += '<textarea id="q_PER_' + id_banco + '" rows="3" cols="50" >' + texto_questao + '</textarea>';

            //ALTERNATIVA CORRETA
            concatena += '<label><span>Alternativa correta: </span><input type="text" id="q_COR_' + id_banco + '" value="' + alternativa_correta + '" class="resp_correta"></label>';


            //ALTERNATIVA INCORRETA 1
            concatena += '<label><span>Alternativa incorreta 1: </span><input type="text" name="" id="q_WRO1_' + id_banco + '" value="' + alternativa_incorreta_1 + '" class="resp_incorreta"></label>';

            //ALTERNATIVA INCORRETA 2
            concatena += '<label><span>Alternativa incorreta 2: </span><input type="text" name="" id="q_WRO2_' + id_banco + '" value="' + alternativa_incorreta_2 + '" class="resp_incorreta"></label>';


            //ALTERNATIVA INCORRETA 3
            concatena += '<label><span>Alternativa incorreta 3: </span><input type="text" name="" id="q_WRO3_' + id_banco + '" value="' + alternativa_incorreta_3 + '" class="resp_incorreta"></label>';


            //BOTOES DE CONTROLE
            concatena += '<div class="controles"><button class="btn" type="button" onclick="validaEdicao(' + id_banco + ');">Editar</button>';
            concatena += '<button class="btn" type="button" onclick="eliminar(' + id_banco + ','+uid_banco+');">Eliminar</button>';
            concatena += '</div></form></fieldset>';



            questao_retornada.innerHTML = concatena;



            document.getElementById("questoes").appendChild(questao_retornada); //Insere a questao dentro do HTML
            document.getElementById("questoes").appendChild(questao_retornada);
            concatena = '';
            id_banco++;
        }
    }
}
