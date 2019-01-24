obterParticipantesFazenda((erro, participantes) => {

    if (erro) {
        console.log(erro);
        return;
    }
    
    var participantesOrdenados = ordenarParticipantes(participantes.data);
    var porcentNegative = "";
    
    for (var i in participantes.data) {
        
        var total = parseInt(participantesOrdenados[i].positive) + parseInt(participantesOrdenados[i].negative);
        
        porcentPositive = montarPorcentagem(participantesOrdenados[i].positive, total);
        porcentNegative = montarPorcentagem(participantesOrdenados[i].negative, total);

        montarView(participantesOrdenados[i], i, porcentPositive, porcentNegative);

    }

});


function obterParticipantesFazenda(cb) {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'fazenda.json');

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {

            if (xhr.status == 200) {

                cb(null, JSON.parse(xhr.responseText));

            } else {
                console.log(xhr.responseText);
                cb('Não foi possível obter as negociações', null);
            }
        }
    };

    xhr.send();

}

function montarView(participante, i, porcentPositive, porcentNegative) {

    var div = document.getElementById('conteudo');
    
    return div.innerHTML += `
    <div class="col-12 tooltip">
        <img class="col-4 img-circle img-borda" src="${participante.picture}"
        title="${participante.name}" alt="${participante.name}">
        <span class="ranking">${parseInt(i) + 1}</span>
        <div class="descricao">
            <h2>${participante.name}</h2>
            <p>${participante.description}</p>
        </div>
        <div class="tooltiptext">
            <table>
              <tr>
                  <th class="gostam">Gostam</th>
                  <th class="nao-gostam">Não Gostam</th>
                </tr>
                <tr>
                  <td>${porcentPositive}</td> 
                  <td>${porcentNegative}</td>
                </tr>
            </table>
        </div>
    </div>`;

}

    function ordenarParticipantes(participantes){
        return participantes.sort(function(a,b){
            if(a.positive == b.positive)
                return 0;
            if(a.positive > b.positive)
                return -1;
            if(a.positive < b.positive)
                return 1;
        });
    }

    function montarPorcentagem(participantes, total) {
        
        var total = parseInt(total);
        var votos = parseInt(participantes);

        var resultado = total - votos;
        resultado = resultado / total;
        resultado = 100 - (resultado * 100);

        if (!resultado){
            return "<span>Sem votos</span>";
        }
        resultado = Math.round(resultado);
        return resultado.toString() + "%";
    }