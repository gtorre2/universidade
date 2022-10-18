document.getElementById('formulario_aluno').addEventListener('submit', cadastraAluno);

function cadastraAluno(e){
 var nome = document.getElementById('nome').value;
 var nota = document.getElementById('nota').value;
 var data_nascimento = document.getElementById('data_nascimento').value;
 var matricula = document.getElementById('matricula').value;

if(!nome && !nota && data_nascimento && matricula){
    alert("Por favor, preencha os campos em branco!");
    return false;
}

 aluno = {
     nome: nome,
     nota: nota,
     data_nascimento: data_nascimento,
     matricula: matricula
    }

  if(localStorage.getItem('aluno') == null){
     var alunos = [];
     alunos.push(aluno);
     localStorage.setItem('aluno', JSON.stringify(alunos));
 } else {
     var alunos = JSON.parse(localStorage.getItem('aluno'));
     alunos.push(aluno);
     localStorage.setItem('aluno', JSON.stringify(alunos));
 }

 document.getElementById('formulario').reset();

 mostraAluno();

 e.preventDefault();
}

function apagarAluno(nome){
    var alunos = JSON.parse(localStorage.getItem('aluno'));

    for(var i = 0; i < alunos.length; i++){
        if(alunos[i].nome == nome){
            alunos.splice(i, 1);
        }
    localStorage.setItem('aluno', JSON.stringify(alunos));
    }
    mostraAluno();
}

function mostraAluno(){
    var alunos = JSON.parse(localStorage.getItem('aluno'));
    var alunosResultado = document.getElementById('resultados_alunos');

    alunosResultado.innerHTML = '';

    for(var i = 0; i < alunos.length; i++){
        var nome  = alunos[i].nome;
        var nota   = alunos[i].nota;
        var data_nascimento = alunos[i].data_nascimento;
        var matricula = alunos[i].matricula;
        
        alunosResultado.innerHTML += '<tr><td>' + nome +
                                '</td><td>' + nota +
                                '</td><td>' + data_nascimento +
                                '</td><td>' + matricula + 
                                '</td><td><button class="btn btn-danger" onclick="apagarAluno(\'' + nome + '\')">Excluir</button></td>' +
                                '</tr>';

    }
}