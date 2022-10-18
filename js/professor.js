document.getElementById('formulario').addEventListener('submit', cadastraProfessor);

function cadastraProfessor(e) {
    var nome = document.getElementById('nome').value;
    var salario = document.getElementById('salario').value;
    var dataNascimento = document.getElementById('dataNascimento').value;

    if (!nome && !salario && dataNascimento) {
        alert("Por favor, preencha os campos em branco!");
        return false;
    }

    professor = {
        nome: nome,
        salario: salario,
        dataNascimento: dataNascimento,
    }

    console.log(professor);

    if (localStorage.getItem('professor') == null) {
        var professores = [];
        professores.push(professor);
        localStorage.setItem('professor', JSON.stringify(professores));
    } else {
        var professores = JSON.parse(localStorage.getItem('professor'));
        professores.push(professor);
        localStorage.setItem('professor', JSON.stringify(professores));
    }

    document.getElementById('formulario').reset();

    mostraProfessor();

    e.preventDefault();
}

function apagarProfessor(nome) {
    var professores = JSON.parse(localStorage.getItem('professor'));

    for (var i = 0; i < professores.length; i++) {
        if (professores[i].nome == nome) {
            professores.splice(i, 1);
        }
        localStorage.setItem('professor', JSON.stringify(professores));
    }
    mostraProfessor();
}

function mostraProfessor() {
    var professores = JSON.parse(localStorage.getItem('professor'));
    var professoresResultado = document.getElementById('resultados_professores');

    professoresResultado.innerHTML = '';

    for (var i = 0; i < professores.length; i++) {
        var nome = professores[i].nome;
        var salario = professores[i].salario;
        var dataNascimento = professores[i].dataNascimento;
     
        professoresResultado.innerHTML += '<tr><td>' + nome +
            '</td><td>' + salario +
            '</td><td>' + dataNascimento +
            '</td><td><button class="btn btn-danger" onclick="apagarProfessor(\'' + nome + '\')">Excluir</button></td>' +
            '</tr>';

    }
}