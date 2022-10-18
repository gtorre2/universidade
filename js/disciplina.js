document.getElementById('formulario_disciplina').addEventListener('submit', cadastrarDisciplina);

function cadastrarDisciplina(e) {
    var nomeDisciplina = document.getElementById('disciplina').value;

    if (!nomeDisciplina) {
        alert("Por favor, informe a disciplina!");
        return false;
    }

    disciplina = {
        nome: nomeDisciplina,
    }

    if (localStorage.getItem('disciplina') == null) {
        var disciplinas = [];
        disciplinas.push(disciplina);
        localStorage.setItem('disciplina', JSON.stringify(disciplinas));
    } else {
        var disciplinas = JSON.parse(localStorage.getItem('disciplina'));
        disciplinas.push(disciplina);
        localStorage.setItem('disciplina', JSON.stringify(disciplinas));
    }

    document.getElementById('formulario_disciplina').reset();

    mostraDisciplina();

    e.preventDefault();
}

function apagarDisciplina(nome) {
    var disciplinas = JSON.parse(localStorage.getItem('disciplina'));

    for (var i = 0; i < disciplinas.length; i++) {
        if (disciplinas[i].nome == nome) {
            disciplinas.splice(i, 1);
        }
        localStorage.setItem('disciplina', JSON.stringify(disciplinas));
    }

    mostraDisciplina();
}

function mostraDisciplina() {
    var disciplinas = JSON.parse(localStorage.getItem('disciplina'));
    var disciplinasResultado = document.getElementById('resultados');

    disciplinasResultado.innerHTML = '';

    for (var i = 0; i < disciplinas.length; i++) {
        var nome = disciplinas[i].nome;

        disciplinasResultado.innerHTML += '<tr><td>' + nome +
            '</td><td><button class="btn btn-danger" onclick="apagarDisciplina(\'' + nome + '\')">Excluir</button></td>' +
            '</tr>';

    }
}