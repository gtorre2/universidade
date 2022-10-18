document.getElementById('formulario_curso').addEventListener('submit', cadastrarCurso);

function cadastrarCurso(e) {
    var nome = document.getElementById('nome').value;
    var semestre = document.getElementById('semestre').value;
    var professor = document.getElementById('professor').value;
    var aluno = document.getElementById('aluno').value;

    curso = {
        nome: nome,
        semestre: semestre,
        professor: professor,
        aluno: aluno
    }

    if (localStorage.getItem('curso') == null) {
        var cursos = [];
        cursos.push(curso);
        localStorage.setItem('curso', JSON.stringify(cursos));
    } else {
        var cursos = JSON.parse(localStorage.getItem('curso'));
        cursos.push(curso);
        localStorage.setItem('curso', JSON.stringify(cursos));
    }

    document.getElementById('formulario_curso').reset();

    mostraCurso();
 
    e.preventDefault();
}

function apagarCurso(nome) {
    var cursos = JSON.parse(localStorage.getItem('curso'));

    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].nome == nome) {
            cursos.splice(i, 1);
        }
        localStorage.setItem('curso', JSON.stringify(cursos));
    }

    mostraCurso();
}

function mostraCurso() {
    var cursos = JSON.parse(localStorage.getItem('curso'));
    var cursosResultado = document.getElementById('resultados_cursos');

    cursosResultado.innerHTML = '';

    for (var i = 0; i < cursos.length; i++) {
        var nome = cursos[i].nome;
        var semestre = cursos[i].semestre;
        var professor = cursos[i].professor;

        cursosResultado.innerHTML += '<tr><td>' + nome +
                                '</td><td>' + semestre +
                                '</td><td>' + professor +
                                '</td><td><button class="btn btn-danger" onclick="apagarCurso(\'' + nome + '\')">Excluir</button></td>' +
                                '</tr>';

    }

}

function recuperarProfesores() {
    var professores = JSON.parse(localStorage.getItem('professor'));
    var cursosResultado = document.getElementById('combo_professor');

    for (var i = 0; i < professores.length; i++) {
        var nome = professores[i].nome;

        cursosResultado.innerHTML += '<select class="form-control" id="professor" name="professor">' +
                                    '<option value="" disabled selected>' + 'Selecione' + ' </option>' + 
                                    '<option value = ' +  nome + '>' + nome + '</option>' +
                                    '</select>';
    }

}

function recuperarAlunos(e) {
    var alunos = JSON.parse(localStorage.getItem('aluno'));
    var alunosResultado = document.getElementById('combo_aluno');

    for (var i = 0; i < alunos.length; i++) {
        var nome = alunos[i].nome;

        alunosResultado.innerHTML += '<select class="form-control" id="aluno" name="aluno">' +
                                    '<option value="" disabled selected>' + 'Selecione' + ' </option>' + 
                                    '<option value = ' +  nome + '>' + nome + '</option>' +
                                    '</select>';
    }

    e.preventDefault();
}