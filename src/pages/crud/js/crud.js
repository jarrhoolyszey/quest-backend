(function (w, d, qns) {

    w.addEventListener('load', () => {
        qns.verifyToken();  
    });

    // Referencia dos elementos no DOM
    // Cadastro
    const logoutBtn = d.getElementById('logout-btn');
    const cadastrarBtn = d.getElementById('cadastrar-btn');
    const pesquisarBtn = d.getElementById('pesquisar-btn');

    //Evento de Logout
    logoutBtn.addEventListener('click', () => {
        qns.logout();
    })

    // Evento para botões de editar
    d.addEventListener('click', async e => {
        if( e.target.classList.contains('edit-question-btn')) {
            const id = e.target.dataset.id;
            
            if( validaEdicao(id) )
                await updateQuestion(id);
        }

        if( e.target.classList.contains('delete-question-btn')) {
            const id = e.target.dataset.id;
            
            await deleteQuestion(id);
        }
    })

    //--------------- Funções de CRUD --------------------------------

    // Cadastrar perguntas no BD    
    cadastrarBtn.addEventListener('click', async (e) => {
        e.preventDefault();
    
        if (validaCadastro()) {
            let questao = d.getElementById("questao").value; //Recupera a Questão
            let correta = d.getElementById("correct").value; //Recupera a resposta correta
            let errada_1 = d.getElementById("errada_1").value; //Recupera a resposta correta
            let errada_2 = d.getElementById("errada_2").value; //Recupera a resposta correta
            let errada_3 = d.getElementById("errada_3").value; //Recupera a resposta correta    
            let categoria = d.getElementById("categoria").value; //Recupera a Categoria da pergunta
            alert("Categoria: " + categoria + "\nQuestão: " + questao + "\nCorreta: " + correta + "\nErrada 1: " + errada_1 + "\nErrada 2: " + errada_2 + "\nErrada 3:" + errada_3);
            
            try {
                const response = await qns.api.post('/questions', {
                    question: questao,
                    correct: correta,
                    wrong_1: errada_1,
                    wrong_2: errada_2,
                    wrong_3: errada_3,
                    category: categoria,
                });
                
                if (response.status == 200) {
                    alert('Pergunta cadastrada com sucesso! =)')
                    document.getElementById("cadastra_pergunta").reset();
                }
                
            } catch (err) {
                console.log(err);
            }
        }
    });

    // Pesquisar questões
    pesquisarBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        let categoria = d.getElementById('categoria_pesquisa').value;
        let termo = d.getElementById('termo_pesq').value;
        alert("Categoria :" + categoria + "\nTermo Pesquisa:" + termo);

        try {
            const response = await qns.api.get('/questions', {
                params: {
                    category: categoria,
                    term: termo,
                }
            });

            if(response.status == 200) {
                const perguntas = response.data;

                // Caso não retorne nenhum item na pesquisa, apresenta mensagem de "erro" e sai da função
                if(perguntas.length == 0) {
                    showItem(retorno_negativo);
                    return;
                }

                // Caso exista pelo menos um item no retorno da pesquisa ...
                LimparPesquisa();
                //let cat = d.getElementById('categoria_pesquisa').value;
                perguntas.map((pergunta, index) => createItem(pergunta, index + 1, categoria));

                showItem(retorno_positivo);
            }

        } catch (err) {
            console.log(err);
        }


    });

    // Deletar questão pelo ID
    async function deleteQuestion(id) {
        try {
            const response = await qns.api.delete(`/questions/${id}`);

            if( response.status == 200) {
                var el = document.getElementById(id);
                el.remove(); // Remove a div inteira.
                alert('A questão '+id+' foi removida. =]');
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Edita questão pelo ID
    async function updateQuestion(id) {
        const question = d.getElementById(`q_PER_${id}`).value;
        const correct = d.getElementById(`q_COR_${id}`).value;
        const wrong_1 = d.getElementById(`q_WRO1_${id}`).value;
        const wrong_2 = d.getElementById(`q_WRO2_${id}`).value;
        const wrong_3 = d.getElementById(`q_WRO3_${id}`).value;
        const category = d.getElementById(`q_CAT_${id}`).value;
        
        try {
            const response = await qns.api.put(`/questions/${id}`, {
                question,
                correct,
                wrong_1,
                wrong_2,
                wrong_3,
                category,
            });

            if(response.status == 200) {
                alert('Pergunta editada com sucesso???? !!!111?www Ò_Ó');
                console.log(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }


    

    // ---------------- Funções auxiliares ------------------------
    
    //Funcao para verificar se os campos do cadastro estao preenchidos
    function validaCadastro() {
        var fields = ["categoria", "questao", "correct", "errada_1", "errada_2", "errada_3"]

        var i, l = fields.length;
        var fieldname;
        for (i = 0; i < l; i++) {
            fieldname = fields[i];
            if (document.forms["cadastra_pergunta"][fieldname].value === "") {
                alert("Nenhum dos campos pode ser deixado em branco ou estar vazio para concluir o cadastro. \nVerifique todos os campos!");
                return false;
            }
        }
        return true;
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

    //Limpar o formulário de pesquisa
    function LimparPesquisa() {
        document.getElementById("pesquisa").reset();
        hideItem(retorno_negativo);
        const limpa_respostas = document.getElementById("questoes");
        limpa_respostas.innerHTML = '';
    }

    //Simplifica a exibição de elementos da página
    function showItem(element) {
        element.style.display = 'block';
    }



    // Cria um item para a lista de resultados da pesquisa
    function createItem(pergunta, index, defaultOption) {
        const { _id, question, correct, wrong_1, wrong_2, wrong_3 } = pergunta;

        // Cria a div que vai conter os elementos
        let container = d.createElement('div');
        container.setAttribute('id', _id);

        let body = `
            <fieldset>
                <legend>Questão ${index}</legend>
                <form id="questao_${_id}">
                    <label>UID : 
                        <input type="text" id="q_UID_${_id}" value ="${_id}" style="width:unset" disabled>
                    </label>

                    <label for="q_CAT_${_id}">
                        <span>Categoria : </span>
                        <select id="q_CAT_${_id}">
                            <option value="Mundo">Mundo</option>
                            <option value="Arte">Arte e Entretenimento</option>
                            <option value="Sociedade">Sociedade</option>
                            <option value="Ciência">Ciencia e Tecnologia</option>
                            <option value="Esporte">Esporte e Lazer</option>
                            <option value="Variedades">Variedades</option>
                        </select>
                    </label>

                    <label for="q_PER_${_id}">
                        <span>Questão:</span>
                    </label>
                    <textarea id="q_PER_${_id}" rows="3" cols="50">${question}</textarea>

                    <label>
                        <span>Alternativa correta: </span>
                        <input type="text" id="q_COR_${_id}" value="${correct}" class="resp_correta">
                    </label>

                    <label>
                        <span>Alternativa incorreta 1: </span>
                        <input type="text" id="q_WRO1_${_id}" value="${wrong_1}" class="resp_incorreta">
                    </label>

                    <label>
                        <span>Alternativa incorreta 2: </span>
                        <input type="text" id="q_WRO2_${_id}" value="${wrong_2}" class="resp_incorreta">
                    </label>

                    <label>
                        <span>Alternativa incorreta 3: </span>
                        <input type="text" id="q_WRO3_${_id}" value="${wrong_3}" class="resp_incorreta">
                    </label>

                    <div class="controles">
                        <button class="btn edit-question-btn" type="button" data-id="${_id}">Editar</button>
                        <button class="btn delete-question-btn" type="button" data-id="${_id}">Eliminar</button>
                    </div>
                </form>
            </fieldset>
        `;

        /* Backup! =]
            <div class="controles">
                <button class="btn" type="button" onclick="validaEdicao(${index});">Editar</button>
                <button class="btn" type="button" onclick="eliminar(${index}, ${_id});">Eliminar</button>
            </div>  
        */

        container.innerHTML = body;

        d.getElementById("questoes").appendChild(container);

        // Seleciona a categoria correta para a pergunta
        const select = d.getElementById(`q_CAT_${_id}`);
        Array.from(select.options).forEach(option => {
            
            if( option.value == defaultOption)
                option.setAttribute('selected', 'selected')
        })
    }

})(window, document, window.qns = window.qns || {});
