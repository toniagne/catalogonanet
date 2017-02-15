/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...

var buscaClt;
var areaAtual = "all";
var filtroCity = [];
var pesq = "abc";
var abc = 1;
var clt = [];
var cltFiltro = [];
var segmento;
var segcl;
var site;
var email;
var venda;
var cliente;
var usuario;
var prodserv;
var endereco;
var cidade;
var bairro;
var estado;
var pais;
var foto;
var img;
var maxImg; 
var tam;
var thisCl;
var page;
var cityTodos = false;
var stdTodos = false;
var stdArea = false;
var busca = false;
var validaBusca = false;
var pesquisaTmp = "";


document.addEventListener('backbutton', onBack, false);

function onBack(){
    if(page !== "inicial"){
        goBack();
    }else{
        navigator.notification.confirm("Tem certeza que deseja sair?", function(buttonID){
            if(buttonID == 1){
                navigator.app.exitApp();
            }
        }, "Deseja sair do aplicativo?", ["Sim", "Não"]);
    }
}

$(function(){
    
    load();
    onDeviceReady();
    $( "div.box" ).on( "swipeleft", swipeleftHandler );
    $( "div#detalheCorpo" ).on( "swipeleft", proximo );
    $( "div#detalheCorpo" ).on( "swiperight", anterior );
    $( "div.box" ).on( "swiperight", swiperightHandler );
     $( "div#main" ).on( "swipeleft", abcleft );
    $( "div#main" ).on( "swiperight", abcright );
    
    
    
    function abcleft( event ){
        if(abc < 4){
            abc += 1;
            var novo = - ( (abc - 1 ) * 350 );
            $('div#letterTop').animate({ marginLeft: novo }, "slow" );
        }
    }
    
    function abcright( event ){
        if(abc > 1){
            abc = abc - 1;
            var novo = - ( (abc - 1 ) * 350 );
            $('div#letterTop').animate({ marginLeft: novo }, "slow" );
        }
    }
    
    function swiperightHandler( event ){
        if(img === 0){
            anterior();
        }else{
            var tmp = img-1;
            var tmpNext = '#img'+tmp;
            var tmpThis = '#img'+img;
            $(tmpThis).addClass('nActive');
            $(tmpNext).removeClass('nActive');
            img = img - 1;
            var novo = ((tam * img) - img)+"%";
            $('div#ponto').animate({ marginLeft: novo }, "slow" );
            
        }
    }
    
    function swipeleftHandler( event ){
        if(img == maxImg){
            proximo();
        }else{
            var tmp = img+1;
            var tmpNext = '#img'+tmp;
            var tmpThis = '#img'+img;
            $(tmpThis).addClass('nActive');
            $(tmpNext).removeClass('nActive');
            img += 1;
            var novo = ((tam * img) - img)+"%";
            $('div#ponto').animate({ marginLeft: novo }, "slow" );
        }
      }
});

function goBack(){
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    $.afui.loadContent('#main',false,true,"fade");
}

function onAmarelo(){
    var checkboxes = document.getElementsByName('area');
    var selected = [];
    var areas = [];
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            areas.push(checkboxes[i].value);
        }
    }
    $('#areaFiltro').hide('fast');
    $('#btnAreaOk').hide('fast');
    $('#btnAreaLimpa').hide('fast');
    $('#titleAreaCase').hide('fast');
    setArea(areas);
}

function proximo(){
    if(thisCl < (clt.length - 1)){
        thisCl += 1;
        var tmpID = clt[thisCl];
        detalheItem(thisCl);
        $.afui.loadContent('#detalhe',false,true,"fade");
        
    }
}

function amarelo(){
    pesq = "ama";
    load();
    var tmp = '<li onclick="onAreaSelect()" class="item item-checkbox checkbox-assertive">                             Todas                               <label class="checkbox">                               <input name="area" value="" type="checkbox">                              </label>                            </li>';
    for(var i = 0; i < segmento.length; i++){
        tmp+= '<li onclick="onAreaSelect()" class="item item-checkbox checkbox-assertive">                             '+segmento[i].nomesegmento+'                               <label class="checkbox">                               <input name="area" value="'+segmento[i].idsegmento+'" type="checkbox">                              </label>                            </li>';
        
    }
        document.getElementById('atuacao').innerHTML = tmp;
        document.getElementById('filters').innerHTML = '<button maxlength="30" id="btnAreaCase" onclick="activeArea()" style="width: 100%; text-align: center; font-size: 20px; height: 50px; background: #FFF970; border-radius: 0px;">Area de Atuação: <p style="font-size: 10px; color: #ccc;"> [Clique aqui para selecionar]</p></button>';
    setListAmarelo();
}

function onAreaSelect(){
    var checkboxes = document.getElementsByName('area');
    if(stdArea === false){        
        if(checkboxes[0].checked){
            for (var i=0; i<checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
            stdArea = true;
        }
    }else{
        checkboxes[0].checked = false;
        stdArea = false;
    }
}

function limparAreas(){
    var checkboxes = document.getElementsByName('area');
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxes[i].checked = false;
        }
    }
}

function activeArea(){
    $('#areaFiltro').show('fast');
    $('#titleAreaCase').show('fast');
    $('#btnAreaOk').show('fast');
    $('#btnAreaLimpa').show('fast');
}

function getSegClt(id){
    var retorno = [];
    for(var i = 0;i < segcl.length; i++){
        if(segcl[i].idcliente == id){
            retorno.push(segcl[i].idsegmento);
        }
    }
    
    return retorno;
}



function filtro(){
    page = "filtro";
    document.getElementById('menuCase').style.display = "none";
    document.getElementById('backButton').style.display = "";
    $.afui.loadContent('#folheto',false,true,"fade");
}
function anterior(){
    if(thisCl !== 0){
        thisCl = thisCl - 1;
        var tmpID = clt[thisCl];
        detalheItem(thisCl);
        $.afui.loadContent('#detalhe',false,true,"fade");
    }
}

function scrolled(){
    var top = document.getElementById('main').scrollTop;
    if(top >= 110){
        $('#bntLt').show("fast");
    }else{
        $('#bntLt').hide("fast");
    }
}

function Dscrolled(){
    var top = document.getElementById('detalhe').scrollTop;
    if(top >= 90){
        $('#bntLtDet').show("fast");
    }else{
        $('#bntLtDet').hide("fast");
    }
}

function load(){
    document.getElementById('corpo').innerHTML = '<div style="margin-bottom: 50%;"></div><img style=" display: block; margin-top: 100px; margin: auto;" src="img/load.gif" width="100" height="100">';
}

function checkConnection() {
    var networkState = navigator.connection.type;

    if(networkState != "none"){
        return true;
    }else{
        return false;
    }
    
}

function funcVen(){
    document.getElementById('contentComo').innerHTML = '<h1 style="text-align: center; color: #FFF;"> Ser um vendedor </h1>                   <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Você já viu que para ser um usuário do catalogonanet basta ter acesso a internet e acessar catalogonanet.com ou usar a App no seu smartphone.     </div> </div> <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Também viu que para ser um Anunciante basta ter um negócio e anunciar aqui com um pequeno custo anual de R$ 199,00*.     </div> </div> <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Agora imagine poder vender o catalogonanet e ganhar dinheiro com um negócio independente sem ter que investir fortunas pra isso.     </div> </div> <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Achou interessante? Basta ser um Anunciante que você já pode começar.     </div> </div>';
}

function funcAnu(){
    document.getElementById('contentComo').innerHTML = '<h1 style="text-align: center; color: #FFF;"> Ser um anunciante  </h1>                   <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Imagine você encontrando todas as empresas e profissionais que precisa aqui no catalogo e você mesmo não está anunciado com seu negócio.     </div> </div> <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Se você é empresário ou profissional anuncie seu negócio no mundo dos negócios. Com um investimento anual de apenas R$ 199,00* você também fará parte dessa fantástica ferramenta que, certamente, potencializará a chegada do seu cliente até você.     </div> </div> <div class="card">    <div style="font-size: 15px;" class="item item-text-wrap">		Cadastre-se. Publique seu negócio conosco através dos NetDoors do catalogonanet. Seja inteligente e use publicidade eficaz e de baixo investimento. É a nossa proposta pra você.     </div> </div>';
}

function funcUsu(){
    document.getElementById('contentComo').innerHTML = '<h1 style="text-align: center; color: #FFF;"> Ser um usuario </h1>                   <div class="card">                      <div style="font-size: 15px;" class="item item-text-wrap">                        Para ser um usuário do catalogonanet é simples. Basta ter acesso a internet e a necessidade de encontrar informações de alguma empresa ou profissional como telefone, endereço, produtos ou serviços, além de outros.                       </div>                        <div style="font-size: 15px;" class="item item-text-wrap">                        Pelo computador acesse www.catalogonanet.com e aproveite, com muita intuitividade, as ferramentas que o catalogo disponibiliza. Ou, se preferir, baixe os apps diretamente da Store do OS de seu smartphone e aproveite com igual intuitividade.                       </div>                    </div>                   <h3 style="text-align: center; color: #FFF;"> Pesquisa Alfabética  </h3>                    <div class="card">                      <div style="font-size: 15px;" class="item item-text-wrap">                        Usando essa ferramenta você poderá localizar as empresas ou profissionais de seu interesse através da barra de ferramentas superior disposta pelas letras do alfabeto. Basta clicar na letra que corresponde a inicial da empresa ou profissional de sua pesquisa que a Página de Resultados trará filtrado todos aqueles que se iniciam com a letra clicada. E você ainda poderá filtrar os resultados por Estado e Cidade.                       </div>                     </div>   <h3 style="text-align: center; color: #FFF;"> Paginas amarelas  </h3>                    <div class="card">                      <div style="font-size: 15px;" class="item item-text-wrap">                    Já com essa ferramenta, não se faz necessário saber o nome da empresa ou profissional que procura. Precisa apenas pesquisar pela Área de Atuação ou Profissão que a Página de Resultados trará filtrado todos aqueles que estarão cadastrados na área (ou áreas) que selecionar. Você também poderá filtrar os resultados por Estado e Cidade nessa ferramenta assim como na Pesquisa Alfabética.                        </div>     </div>                    <h3 style="text-align: center; color: #FFF;"> Busca Dinâmica  </h3>                    <div class="card">                      <div style="font-size: 15px;" class="item item-text-wrap">                        Essa última ferramenta poderá ser útil de várias formas. Se precisar de produtos ou serviços e a empresa ou profissional tiver associado suas Tags ao que pesquisa; se a empresa ou profissional tiver a palavra pesquisada escrita em seu nome, endereço, web site, e-mail ou apresentação; se precisar descobrir a empresa ou profissional pelo número de telefone, e-mail ou web site; enfim, qualquer “coisa” digitada nessa ferramenta será pesquisada em TODAS AS PARTES DO CATALOGO, trazendo, na Página de Resultados, todas as empresas e profissionais que possam estar ligados, de alguma forma, ao tema da pesquisa. E você poderá filtrar os resultados da pesquisa por Estado e Cidade assim como por Área de Atuação.                       </div>                     </div>';
}

function getFotoPrincipal(id){
    var len = foto.length;
    var retorno = foto[1];
    for(var i = 0; i < len; i++){
        if(foto[i].idcliente == id){
            if(foto[i].tipofoto == "masterimg"){
                retorno = foto[i];
                break;
            }else{
                retorno = "none";
            }
        }else{
                retorno = "none";
            }
    }
    return retorno;
}

function getVenda(id){
    var len = venda.length;
    var retorno = {
        statusvenda : "Pendente"
    };
    for(var i = 0; i < len; i++){
        if(venda[i].idcliente == id){
            retorno = venda[i];
            break;
        }
    }
    return retorno;
}

function letter(letra){
    load();
    setListLetter(letra);
}

function setImg(id){
    var tamanho = foto.length;
    var cont = 0;
    var inicial = true;
    var master = getFotoPrincipal(id);
    var html = '<img id="img0" width="100%" src="http://catalogonanet.com/cnn-engine/controllers/userfolder/'+master.pastafoto+'/'+master.nomefoto+'">'; 
    for(var i = 0; i < tamanho; i++){
        if(foto[i].idcliente == id){
            if(foto[i].tipofoto !== "masterimg"){
                cont += 1;
                html += '<img id="img'+cont+'" class="nActive" width="100%" src="http://catalogonanet.com/cnn-engine/controllers/userfolder/'+foto[i].pastafoto+'/'+foto[i].nomefoto+'">';
            }
        }   
    }
    
    img = 0;
    maxImg = cont;
    tam = 100 / (maxImg+1);
    document.getElementById('ponto').style.width = tam+"%";
    document.getElementById('ponto').style.marginLeft = '0px';
    return html;
}

function irTel(telefone){
    window.location.href = 'tel:'+telefone;
}

function irSite(){
    window.open("http://"+site);
}

function irGeo(geo){
    window.location.href = 'geo:0,0?q='+geo;
}

function irEmail(){
     window.location.href = 'mailto:'+email;
}

function getDetEnd(id){
    var tamanho = endereco.length;
    var retorno = [];
    for(var i = 0; i < tamanho; i++){
        if(endereco[i].idcliente == id){
            retorno.push(endereco[i]);
        }
    }
    return retorno;
}

function getEnd(id){
    var tamanho = endereco.length;
    var retorno = "";
    for(var i = 0; i < tamanho; i++){
        if(endereco[i].idcliente == id){
            retorno = endereco[i];
            break;
        }
    }
    
    return retorno;
}

function getBairro(id){
    var tamanho = bairro.length;
    var retorno = "";
    for(var i = 0; i < tamanho; i++){
        if(bairro[i].idbairro == id){
            retorno = bairro[i];
            break;
        }
    }
    
    return retorno;
}

function getCid(id){
    var tamanho = cidade.length;
    var retorno = "";
    for(var i = 0; i < tamanho; i++){
        if(cidade[i].idcidade == id){
            retorno = cidade[i];
            break;
        }
    }
    
    return retorno;
}

function getEst(id){
    var tamanho = estado.length;
    var retorno = "";
    for(var i = 0; i < tamanho; i++){
        if(estado[i].idestado == id){
            retorno = estado[i];
            break;
        }
    }
    
    return retorno;
}

function contem(x, y){
    var retorno = false;
    for(var i = 0; i < x.length; i++){
        if(x[i] == y){
            retorno = true;
            break;
        }
    }
    return retorno;
}

function detalheItem(id){
    $('#sitelDet').addClass('telNone');
    $('#emailDet').addClass('telNone');
    page = "detalhe";
    document.getElementById('menuCase').style.display = "none";
    document.getElementById('backButton').style.display = "";
    $('#menuCase').removeClass('menuButton');
    thisCl = id;
    var tmpFFD = clt[id];
    var cl = cliente[tmpFFD];
    var end = getDetEnd(cl.idcliente);
    var endHtml = "";
    for(var i = 0; i < end.length; i++){
        var bai = getBairro(end[i].idbairro);
        var cid = getCid(end[i].idcidade);
        var est = getEst(cid.idestado);
        var endCom = end[i].logradouroendereco + ", " + end[i].numeroendereco + " - " + bai.nomebairro + "<br>&nbsp;&nbsp;" + bai.cep + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + cid.nomecidade + " - " + est.siglaestado;
        var finalEnd = "&nbsp;&nbsp;"+endCom;
        var endGo = end[i].logradouroendereco + ", " + end[i].numeroendereco + ", " + bai.nomebairro + " - " + est.siglaestado;
        endHtml += '<div onclick="irGeo(\''+endGo+'\')" style="padding: 10px;width: 100%;height: auto; border: solid 1px; margin-top: 10px; border-top: none; border-left: none; border-right: none;">                    <img style="float: left;" width="12px" height="20px" src="img/location-icon.png">                    <p >'+finalEnd+'</p>                </div>';
        
    }
    document.getElementById('detEnd').innerHTML =' &nbsp;&nbsp; ' +  endHtml;
    document.getElementById('detNome').innerHTML =' &nbsp;&nbsp; ' +  cl.nomefantasiacliente;
    document.getElementById('slider').innerHTML = setImg(cl.idcliente);
    if(cl.publicaremail == "1"){
        email = cl.emailcliente;
        $('#emailDet').removeClass('telNone');
        document.getElementById('detEmail').innerHTML = "&nbsp;&nbsp;"+cl.emailcliente;
    }
    
    var whatsapp = cl.whatsappcliente.split('.');
    
    var icon = [];    
    var fones = [];
    var tFones = 0;
    var telefone1 = "";
    var telefone2 = "";
    
    if(cl.telefonefixocliente !== ""){
        fones.push(cl.telefonefixocliente);
        tFones += 1;
        if(contem(whatsapp, "tel1wpp")){
            icon.push("http://www.iconsdb.com/icons/preview/soylent-red/whatsapp-xxl.png");
        }else{
            icon.push("http://www.clker.com/cliparts/7/o/f/n/A/s/monochrome-red-phone-icon-md.png");
        }
    }
   
    if(cl.celularcliente1 !== ""){
        fones.push(cl.celularcliente1);
        tFones += 1;
        if(contem(whatsapp, "tel2wpp")){
            icon.push("http://www.iconsdb.com/icons/preview/soylent-red/whatsapp-xxl.png");
        }else{
            icon.push("http://www.clker.com/cliparts/7/o/f/n/A/s/monochrome-red-phone-icon-md.png");
        }
    }
    
    
    if(cl.celularcliente2 !== ""){
        fones.push(cl.celularcliente2);
        tFones += 1;
        if(contem(whatsapp, "tel3wpp")){
            icon.push("http://www.iconsdb.com/icons/preview/soylent-red/whatsapp-xxl.png");
        }else{
            icon.push("http://www.clker.com/cliparts/7/o/f/n/A/s/monochrome-red-phone-icon-md.png");
        }
    }
    if(cl.telefonecliente4 !== ""){
        fones.push(cl.telefonecliente4);
        tFones += 1;
        if(contem(whatsapp, "tel4wpp")){
            icon.push("http://www.iconsdb.com/icons/preview/soylent-red/whatsapp-xxl.png");
        }else{
            icon.push("http://www.clker.com/cliparts/7/o/f/n/A/s/monochrome-red-phone-icon-md.png");
        }
    }
    
     
    
    if(tFones == 1){
        telefone1 = '<div onclick="irTel(\''+fones[0]+'\')" style="padding: 10px; margin-top: 10px; width: 100%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: 1px solid;"><img style="float: left;" style="" width="15px" height="15px" src="'+icon[0]+'">                    <p>&nbsp;&nbsp;&nbsp; '+fones[0]+'</p></div>';
    }else if(tFones == 2){
        telefone1 = '<div onclick="irTel(\''+fones[0]+'\')" style="float: left;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: 1px solid;"><img style="float: left;" style="" width="15px" height="15px" src="'+icon[0]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[0]+'</p></div>';
        telefone1 += '<div onclick="irTel(\''+fones[1]+'\')" style="float: right;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: none;"><img style="float: left;" width="15px" height="15px" src="'+icon[1]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[1]+'</p></div>';
    }else if(tFones == 3){
        telefone1 = '<div onclick="irTel(\''+fones[0]+'\')" style="float: left;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: 1px solid;"><img style="float: left;" style="" width="15px" height="15px" src="'+icon[0]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[0]+'</p></div>';
        telefone1 += '<div onclick="irTel(\''+fones[1]+'\')" style="float: right;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: none;"><img style="float: left;" width="15px" height="15px" src="'+icon[1]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[1]+'</p></div>'; 
        telefone2 = '<div  onclick="irTel(\''+fones[2]+'\')" style="float: left; padding: 10px; margin-top: 0px; width: 100%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: 1px solid;"><img style="float: left;" style="" width="15px" height="15px" src="'+icon[2]+'">                    <p>&nbsp;&nbsp;&nbsp; '+fones[2]+'</p></div>';
    }else if(tFones == 4){
        telefone1 = '<div onclick="irTel(\''+fones[0]+'\')" style="float: left;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: 1px solid;"><img style="float: left;" style="" width="15px" height="15px" src="'+icon[0]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[0]+'</p></div>';
        telefone1 += '<div onclick="irTel(\''+fones[1]+'\')" style="float: right;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: none;"><img style="float: left;" width="15px" height="15px" src="'+icon[1]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[1]+'</p></div>'; 
        telefone2 = '<div  onclick="irTel(\''+fones[2]+'\')" style="float: left;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: 1px solid;"><img style="float: left;" style="" width="15px" height="15px" src="'+icon[2]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[2]+'</p></div>';
        telefone2 += '<div  onclick="irTel(\''+fones[3]+'\')" style="float: right;padding: 10px; margin-top: 0px; width: 50%;height: auto; border: solid 1px; border-top: none; border-left: none; border-right: none;"><img style="float: left;" width="15px" height="15px" src="'+icon[3]+'">                    <p>&nbsp;&nbsp;&nbsp;'+fones[3]+'</p></div>';
        
    }
    
    
    
    
    document.getElementById('detCel').innerHTML = telefone1;    
    document.getElementById('detTel').innerHTML = telefone2;
    
    if(cl.urlsitecliente !== ""){
        site = cl.urlsitecliente;
        $('#sitelDet').removeClass('telNone');
        document.getElementById('detSite').innerHTML = ' &nbsp;&nbsp; ' + cl.urlsitecliente;
    }
    document.getElementById('detArea').innerHTML = '&nbsp;' + cl.apresentacaocliente;
    $.afui.loadContent('#detalhe',false,false,"left");
}

function alfabetica(){
    pesq = "abc";
    load();
    $.ajax({
        url: 'http://catalogonanet.com/api/alfabetica.php',
        type: 'POST',
        data: '',
        success:function(retorno){
            var obj = JSON.parse(retorno);
            cliente = obj.cliente;
            setList();
            setFiltro('alfabetico');
        },
        error:function(){
            alert("erro");
        }
    });
}

function onEstado(){
    var e = document.getElementById("estadosSelect");
    var id = e.options[e.selectedIndex].value;
    var tmp = '';
    for(var y = 0; y < cidade.length; y++){
        if(cidade[y].idestado == id || id == "all"){
            tmp += '<option value="'+cidade[y].idcidade+'">'+cidade[y].nomecidade+'</option>';
        }
    }
    
     document.getElementById('city').innerHTML = ' <select id="cidadesSelect" style="background: #FF000F; font-weight: bold; text-align: center; font-size: 15px;">    <option value="all">Cidades</option>  <option value="all">Todos</option>'+tmp+'</select>';
}

function setFiltro(menu){ 
    
        var std = '<li onclick="onStdSelect()" class="item item-checkbox checkbox-assertive">                               Todos                               <label class="checkbox">                               <input name="std" value="all" type="checkbox">                              </label>                            </li>';
        for(var x = 0; x < estado.length; x++){
            std += '<li onclick="onStdSelect()" class="item item-checkbox checkbox-assertive">                               '+estado[x].nomeestado+'                               <label class="checkbox">                               <input name="std" value="'+estado[x].idestado+'" type="checkbox">                              </label>                            </li>';
            
            
        }
        
        std += "";
        document.getElementById('std').innerHTML = std;
}

function onStdSelect(){
    var checkboxes = document.getElementsByName('std');
    if(stdTodos === false){        
        if(checkboxes[0].checked){
            for (var i=0; i<checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
            stdTodos = true;
        }
    }else{
        checkboxes[0].checked = false;
        stdTodos = false;
    }
}

function sync(){
    $.ajax({
        url: 'http://catalogonanet.com/api/sync.php',
        type: 'POST',
        data: '',
        success:function(retorno){
            var obj = JSON.parse(retorno);
            venda = obj.venda;
            usuario = obj.usuario;
            prodserv = obj.prodserv;
            endereco = obj.endereco;
            cidade = obj.cidade;
            bairro = obj.bairro;
            estado = obj.estado;
            pais = obj.pais;
            foto = obj.foto;
            segmento = obj.cliente;
            segcl = obj.segcl;
            alfabetica();
        },
        error:function(){
            alert("erro");
        }
    });
}

function onDeviceReady(){
        sync();
}

function expirou(dt){
    var retorno;
    var d = new Date();
    var ano = d.getFullYear();
    var mes = d.getMonth()+1;
    var dia = d.getDate();
    var data = dt.split('-');
    if(parseInt(data[0]) > parseInt(ano)){
        retorno = true;
    }else if(parseInt(data[0]) == ano){
        if(parseInt(data[1]) > mes){
            retorno = true;
        }else if(parseInt(data[1]) == mes){
            if(parseInt(data[2]) >= dia){
                retorno = true;
            }else{
                retorno = false;
            }
        }else{
            retorno = false;
        }
    }else{
        retorno = false;
    }
    return retorno;
}


function subir(){
    $('div#main').animate({scrollTop:0}, 'slow');
}

function subirDet(){
    $('div#detalhe').animate({scrollTop:0}, 'slow');
}



//------------------------------------------------------------------------------------------------------------------

function setList(){
    filtroCity = "all";
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    page = "inicial";
    $('#menuCase').addClass('menuButton');
    $.afui.clearHistory();
    limpaABC();
    
     document.getElementById('filters').innerHTML = '<div id="letters"> <div id="letterTop"><button id="ABCA" style="margin-left: 10px;" class="btnLetter" onclick="letter(\'a\')">A</button><button id="ABCB" style="margin-left: 10px;" class="btnLetter" onclick="letter(\'b\')">B</button><button id="ABCC" style="margin-left: 10px;" class="btnLetter" onclick="letter(\'c\')">C</button><button style="margin-left: 10px;" class="btnLetter" id="ABCD" onclick="letter(\'d\')">D</button><button style="margin-left: 10px;" class="btnLetter" id="ABCE" onclick="letter(\'e\')">E</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'f\')" id="ABCF">F</button><button style="margin-left: 10px;" class="btnLetter" id="ABCG" onclick="letter(\'g\')">G</button><button style="margin-left: 10px;" class="btnLetter" id="ABCH" onclick="letter(\'h\')">H</button><button style="margin-left: 10px;" class="btnLetter" id="ABCI" onclick="letter(\'i\')">I</button><button style="margin-left: 10px;" class="btnLetter" id="ABCJ" onclick="letter(\'j\')">J</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'k\')" id="ABCK">K</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'l\')" id="ABCL">L</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'m\')" id="ABCM">M</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'n\')" id="ABCN">N</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'o\')" id="ABCO">O</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'p\')" id="ABCP">P</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'q\')" id="ABCQ">Q</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'r\')" id="ABCR">R</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'s\')" id="ABCS">S</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'t\')" id="ABCT">T</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'u\')" id="ABCU">U</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'v\')" id="ABCV">V</button>        <button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'w\')" id="ABCW">W</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'x\')" id="ABCX">X</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'y\')" id="ABCY">Y</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'z\')" id="ABCZ">Z</button></div>                    </div>';
    abc = 1;
    document.getElementById('bntLt').innerHTML = '<img width="30px" height="30px" src="img/up.png" />';
    document.getElementById('bntLt').style.backgroundColor = "red";
    var novo = - ( (abc - 1 ) * 350 );
    document.getElementById('letterTop').marginLeft = novo;
    var tamanho = cliente.length;
    var html = "";
    var tmpClt = [];
    var nb = 0;
    
    for(var i = 0; i < tamanho; i++){
        var ven = getVenda(cliente[i].idcliente);
        var cel = getPrimeiroNumero(i);
        var tmpFoto = getFotoPrincipal(cliente[i].idcliente);
        var foto = 'http://catalogonanet.com/cnn-engine/controllers/userfolder/'+tmpFoto.pastafoto+'/'+tmpFoto.nomefoto;
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            tmpClt.push(i);
            html += '<a onclick="detalheItem('+nb+')" id="itemList" class="item item-thumbnail-left" >                      <img class=".niceImage" width="100px" height="50px" src="'+foto+'">                      <h2 style="color: #ff0000;font-weight: bold;">'+cliente[i].nomefantasiacliente+'</h2>                      <p>'+cliente[i].apresentacaocliente+'</p><p style="font-weight: bold;">'+cel+'</p></a>';
            nb += 1;
        }
    }
    clt = tmpClt;
    document.getElementById('corpo').innerHTML = html;
}

function contemArray(array1, array2){
    var retorno = false;
    for(var i = 0; i < array1.length; i++){
        for(var x = 0; x < array2.length; x++){
            if(array1[i] == array2[x]){
                retorno = true;
                break;
            }
        }
    }
    
    return retorno;
}

function setArea(idArea){
    areaAtual = idArea;
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    page = "inicial";
    $('#menuCase').addClass('menuButton');
    $.afui.clearHistory();
    document.getElementById('bntLt').innerHTML = '<img width="30px" height="30px" src="img/up.png" />';
    setFiltros();
    var tamanho = cltFiltro.length;
    var html = "";
    var tmpClt = [];
    var nb = 0;
    for(var i = 0; i < tamanho; i++){
        var idCl = cltFiltro[i];
        var ven = getVenda(cliente[idCl].idcliente);
        var tmpFoto = getFotoPrincipal(cliente[idCl].idcliente);
        var foto = 'http://catalogonanet.com/cnn-engine/controllers/userfolder/'+tmpFoto.pastafoto+'/'+tmpFoto.nomefoto;
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            var cel = getPrimeiroNumero(idCl);
            var tmpseg = getSegClt(cliente[idCl].idcliente);
            if(contemArray(idArea, tmpseg ) || idArea == "all"){
                tmpClt.push(idCl);
                html += '<a style="background: #FFF970;" onclick="detalheItem('+nb+')" id="itemList" class="item item-thumbnail-left" >                      <img class=".niceImage" width="100px" height="50px" src="'+foto+'">                      <h2 style="color: #ff0000;font-weight: bold;">'+cliente[idCl].nomefantasiacliente+'</h2>                      <p>'+cliente[idCl].apresentacaocliente+'</p><p style="font-weight: bold;">'+cel+'</p></a>';
                nb += 1;
            }           
        }
    }
    clt = tmpClt;
    document.getElementById('corpo').innerHTML = html;
}

function setListAmarelo(){
    areaAtual = "all";
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    page = "inicial";
    $('#menuCase').addClass('menuButton');
    $.afui.clearHistory();
    setFiltros();
    document.getElementById('bntLt').innerHTML = '<img width="30px" height="30px" src="img/up.png" />';
    var tamanho = cltFiltro.length;
    var html = "";
    var tmpClt = [];
    var nb = 0;
    for(var i = 0; i < tamanho; i++){
        var idCl = cltFiltro[i];
        var ven = getVenda(cliente[idCl].idcliente);
        var tmpFoto = getFotoPrincipal(cliente[idCl].idcliente);
        var cel = getPrimeiroNumero(idCl);
        var foto = 'http://catalogonanet.com/cnn-engine/controllers/userfolder/'+tmpFoto.pastafoto+'/'+tmpFoto.nomefoto;
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            tmpClt.push(idCl);
            html += '<a style="background: #FFF970;" onclick="detalheItem('+nb+')" id="itemList" class="item item-thumbnail-left" >                      <img class=".niceImage" width="100px" height="50px" src="'+foto+'">                      <h2 style="color: #ff0000;font-weight: bold;">'+cliente[idCl].nomefantasiacliente+'</h2>                      <p>'+cliente[idCl].apresentacaocliente+'</p><p style="font-weight: bold;">'+cel+'</p></a>';   
            nb += 1;
        }
    }
    clt = tmpClt;
    document.getElementById('corpo').innerHTML = html;
}

function setListLetter(letra){
    limpaABC();
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    page = "inicial";
    $('#menuCase').addClass('menuButton');
    $.afui.clearHistory();
    if(letra == "all"){
        document.getElementById('bntLt').innerHTML = '<img width="30px" height="30px" src="img/up.png" />';
        document.getElementById('bntLt').style.backgroundColor = "red";
    }else{
        var elemento = "ABC"+letra.toUpperCase();
        document.getElementById(elemento).style.backgroundColor = "#ccc";
        document.getElementById(elemento).style.color = "red";
        //$(elemento).addClass('ABCativo');
        document.getElementById('bntLt').innerHTML = letra.toUpperCase();
        document.getElementById('bntLt').style.backgroundColor = "#FFF";
    }
    var novo = - ( (abc - 1 ) * 350 );
    document.getElementById('letterTop').marginLeft = novo;
    setFiltros();
    var tamanho = cltFiltro.length;
    var html = "";
    var tmpClt = [];
    var nb = 0;
    for(var i = 0; i < tamanho; i++){
        var idCl = cltFiltro[i];
        var ven = getVenda(cliente[idCl].idcliente);
        var tmpFoto = getFotoPrincipal(cliente[idCl].idcliente);
        var foto = 'http://catalogonanet.com/cnn-engine/controllers/userfolder/'+tmpFoto.pastafoto+'/'+tmpFoto.nomefoto;
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            var cel = getPrimeiroNumero(idCl);           
            var tmpAnun = cliente[idCl].nomefantasiacliente;
            if(tmpAnun.charAt(0).toUpperCase() == letra.toUpperCase() || letra == "all"){
                tmpClt.push(idCl);
                html += '<a onclick="detalheItem('+nb+')" id="itemList" class="item item-thumbnail-left" >                      <img class=".niceImage" width="100px" height="50px" src="'+foto+'">                      <h2 style="color: #ff0000;font-weight: bold;">'+cliente[idCl].nomefantasiacliente+'</h2>                      <p>'+cliente[idCl].apresentacaocliente+'</p><p style="font-weight: bold;">'+cel+'</p></a>'; 
                nb += 1;
            }           
        }
    }
    clt = tmpClt;
    document.getElementById('corpo').innerHTML = html;
}

function setABC(){
    pesq = "abc";
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    page = "inicial";
    $('#menuCase').addClass('menuButton');
    $.afui.clearHistory();
    limpaABC();
     document.getElementById('filters').innerHTML = '<div id="letters"> <div id="letterTop"><button id="ABCA" style="margin-left: 10px;" class="btnLetter" onclick="letter(\'a\')">A</button><button id="ABCB" style="margin-left: 10px;" class="btnLetter" onclick="letter(\'b\')">B</button><button id="ABCC" style="margin-left: 10px;" class="btnLetter" onclick="letter(\'c\')">C</button><button style="margin-left: 10px;" class="btnLetter" id="ABCD" onclick="letter(\'d\')">D</button><button style="margin-left: 10px;" class="btnLetter" id="ABCE" onclick="letter(\'e\')">E</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'f\')" id="ABCF">F</button><button style="margin-left: 10px;" class="btnLetter" id="ABCG" onclick="letter(\'g\')">G</button><button style="margin-left: 10px;" class="btnLetter" id="ABCH" onclick="letter(\'h\')">H</button><button style="margin-left: 10px;" class="btnLetter" id="ABCI" onclick="letter(\'i\')">I</button><button style="margin-left: 10px;" class="btnLetter" id="ABCJ" onclick="letter(\'j\')">J</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'k\')" id="ABCK">K</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'l\')" id="ABCL">L</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'m\')" id="ABCM">M</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'n\')" id="ABCN">N</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'o\')" id="ABCO">O</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'p\')" id="ABCP">P</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'q\')" id="ABCQ">Q</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'r\')" id="ABCR">R</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'s\')" id="ABCS">S</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'t\')" id="ABCT">T</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'u\')" id="ABCU">U</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'v\')" id="ABCV">V</button>        <button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'w\')" id="ABCW">W</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'x\')" id="ABCX">X</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'y\')" id="ABCY">Y</button><button style="margin-left: 10px;" class="btnLetter" onclick="letter(\'z\')" id="ABCZ">Z</button></div>                    </div>';
    abc = 1;
    document.getElementById('bntLt').innerHTML = '<img width="30px" height="30px" src="img/up.png" />';
    document.getElementById('bntLt').style.backgroundColor = "red";
    var novo = - ( (abc - 1 ) * 350 );
    document.getElementById('letterTop').marginLeft = novo;
    setFiltros();
    var tamanho = cltFiltro.length;
    var html = "";
    var tmpClt = [];
    var nb = 0;
    for(var i = 0; i < tamanho; i++){
        var idCl = cltFiltro[i];
        var ven = getVenda(cliente[idCl].idcliente);
        var tmpFoto = getFotoPrincipal(cliente[idCl].idcliente);
        var cel = getPrimeiroNumero(idCl);
        var foto = 'http://catalogonanet.com/cnn-engine/controllers/userfolder/'+tmpFoto.pastafoto+'/'+tmpFoto.nomefoto;
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            tmpClt.push(idCl);
            html += '<a onclick="detalheItem('+nb+')" id="itemList" class="item item-thumbnail-left" >                      <img class=".niceImage" width="100px" height="50px" src="'+foto+'">                      <h2 style="color: #ff0000;font-weight: bold;">'+cliente[idCl].nomefantasiacliente+'</h2>                      <p>'+cliente[idCl].apresentacaocliente+'</p><p style="font-weight: bold;">'+cel+'</p></a>';
            nb += 1;
        }
    }
    clt = tmpClt;
    document.getElementById('corpo').innerHTML = html;
}

function getCltOriginal(){
    var tmpClt = [];
    for(var i = 0; i < cliente.length;i++){
        var ven = getVenda(cliente[i].idcliente);
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            tmpClt.push(i);
        }
    }
    clt = tmpClt;
}

function setFiltros(){
    getCltOriginal();
    if(filtroCity !== ""){
        var city = filtroCity;
        var tamanho = cliente.length;
        var html = "";
        var tmpClt = [];
        var nb = 0;
        for(var i = 0; i < tamanho; i++){
            var end = getEnd(cliente[i].idcliente);
            var ven = getVenda(cliente[i].idcliente);
            if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
                if(city == "all" || contem(city, end.idcidade)){
                    tmpClt.push(i);
                    nb += 1;
                }
            }
        }
        cltFiltro = tmpClt;
    }else{
        cltFiltro = clt;
    }
    
}

function listFilters(){
    if(pesq == "abc"){
        $.afui.loadContent('#main',false,true,"fade");
        page = "inicial";
        load();
        setListLetter('all');
        
        
    }else if(pesq == "ama"){
        $.afui.loadContent('#main',false,true,"fade");
        page = "inicial";
        load();
        setArea(areaAtual);
    }else if(pesq == "din"){
        $.afui.loadContent('#main',false,true,"fade");
        page = "inicial";
        load();
        setBusca();
    }
}

function resetFilters(){
    filtroCity = "all";
    document.getElementById('buttonCity').innerHTML = "";
    document.getElementById('city').innerHTML = "";
    document.getElementById('btnEstCase').innerHTML = 'Estados: [ clique para selecionar ]';
    setFiltros();
    setFiltro();
    listFilters();
}

function getPrimeiroNumero(x){
        var tel = "";
        if(cliente[x].telefonefixocliente !== ""){
            tel = cliente[x].telefonefixocliente;
        }else if(cliente[x].celularcliente1 !== ""){
            tel = cliente[x].celularcliente1;
        }else if(cliente[x].celularcliente2 !== ""){
            tel = cliente[x].celularcliente2;
        }else if(cliente[x].telefonecliente4 !== ""){
            tel = cliente[x].telefonecliente4;
        }
        
        return tel;
}

function limpaABC(){
    $('.btnLetter').css( "color", "#FFF" );
    $('.btnLetter').css( "background", "red" );
}

function setCity(){
    var ct = '<li onclick="onCitySelect()" class="item item-checkbox checkbox-assertive">                              Todas                               <label class="checkbox">                               <input name="ct" value="" type="checkbox">                              </label>                            </li>';
    var checkboxes = document.getElementsByName('std');
    var selected = [];
    var stds = "";
    if(checkboxes[0].checked){
        stds = "Todoss";
        for(var y = 0; y < cidade.length; y++){
                var esta = getEst(cidade[y].idestado);
                ct += '<li onclick="onCitySelect()" class="item item-checkbox checkbox-assertive">                               '+cidade[y].nomecidade+' - '+ esta.siglaestado +'                               <label class="checkbox">                               <input name="ct" value="'+cidade[y].idcidade+'" type="checkbox">                              </label>                            </li>';
        }
    }else{
        for (var i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var est = getEst(checkboxes[i].value);
                stds += est.siglaestado + "/";
                for(var x = 0; x < cidade.length; x++){
                    if(cidade[x].idestado == checkboxes[i].value){
                        ct += '<li onclick="onCitySelect()" class="item item-checkbox checkbox-assertive">                               '+cidade[x].nomecidade+' - '+ est.siglaestado +'                               <label class="checkbox">                               <input name="ct" value="'+cidade[x].idcidade+'" type="checkbox">                              </label>                            </li>';
                    }
                }
            }
        }
    }
    var tamo = stds.length - 1;
    document.getElementById('btnEstCase').innerHTML = "Estados: "+stds.substring(0, tamo);
    document.getElementById('city').innerHTML = ct;
    document.getElementById('buttonCity').innerHTML = '<button maxlength="30" id="btnCtCase" onclick="activeCt()" style="width: 100%; text-align: center; font-size: 20px; height: 50px; background: red; border-radius: 0px;">Selecionar Cidades</button>';
    $('#estadoFiltro').hide("fast");
    $('#btnEstOk').hide("fast");
    $('#titleFiltroEst').hide("fast");
    
    
}

function onCitySelect(){
    var checkboxes = document.getElementsByName('ct');
    if(cityTodos === false){        
        if(checkboxes[0].checked){
            for (var i=0; i<checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
            cityTodos = true;
        }
    }else{
        checkboxes[0].checked = false;
        cityTodos = false;
    }
}

function activeEst(){
     $('#estadoFiltro').show("fast");
    $('#btnEstOk').show("fast");
    $('#titleFiltroEst').show("fast");
}

function activeCt(){
    $('#cidadeFiltro').show("fast");
    $('#btnCityOk').show("fast");
    $('#titleFiltroCity').show("fast");
}

function setAll(){
    var checkboxes = document.getElementsByName('ct');
    var selected = [];
    var cts = [];
    var tmpCts = "";
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            for(var x = 0; x < cidade.length; x++){
                if(cidade[x].idcidade == checkboxes[i].value){
                    tmpCts += cidade[x].nomecidade + "/";
                    cts.push(checkboxes[i].value);
                }
            }
        }
    }
    var tamo = tmpCts.length - 1;
    document.getElementById('btnCtCase').innerHTML = "Cidades: "+tmpCts.substring(0, tamo);
    $('#cidadeFiltro').hide("fast");
    $('#btnCityOk').hide("fast");
    $('#titleFiltroCity').hide("fast");
    filtroCity = cts;
}

function pesqKey(e){
     if (e.keyCode == 13) {
         load();
         pesquisaClick();
         document.getElementById("#corpo").focus();
     }
}

function pesquisaClick(){
    pesquisaTmp = document.getElementById('buscaQuery');
    var query = pesquisaTmp.textContent || el.innerText;
    document.getElementById('buscaQuery').value = "";
    var data = {
        busca : query
    };
     $.ajax({
        url: 'http://catalogonanet.com/api/busca.php',
        type: 'POST',
        data: data,
        success:function(retorno){
            var obj = JSON.parse(retorno);
            buscaClt = obj.busca; 
            setBusca();
        },
        error:function(){
            alert("erro");
        }
    });
}

function getCliente(id){
    var retorno = "";
    for(var i = 0; i < cliente.length; i++){
        if(cliente[i].idcliente == id){
            retorno = i;
            break;
        }
    }
    return retorno;
}

function setBusca(){
    pesq = "din";
    document.getElementById('filters').innerHTML = '';
    areaAtual = "all";
    document.getElementById('backButton').style.display = "none";
    document.getElementById('menuCase').style.display = "";
    page = "inicial";
    $('#menuCase').addClass('menuButton');
    $.afui.clearHistory();
    setBuscaFiltros();
    document.getElementById('bntLt').innerHTML = '<img width="30px" height="30px" src="img/up.png" />';
    var tamanho = cltFiltro.length;
    var html = "";
    var tmpClt = [];
    var nb = 0;
    for(var i = 0; i < tamanho; i++){
        var idCl = cltFiltro[i];
        var ven = getVenda(cliente[idCl].idcliente);
        var tmpFoto = getFotoPrincipal(cliente[idCl].idcliente);
        var cel = getPrimeiroNumero(idCl);
        var foto = 'http://catalogonanet.com/cnn-engine/controllers/userfolder/'+tmpFoto.pastafoto+'/'+tmpFoto.nomefoto;
        if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
            tmpClt.push(idCl);
            html += '<a style="background: #FFF;" onclick="detalheItem('+nb+')" id="itemList" class="item item-thumbnail-left" >                      <img class=".niceImage" width="100px" height="50px" src="'+foto+'">                      <h2 style="color: #ff0000;font-weight: bold;">'+cliente[idCl].nomefantasiacliente+'</h2>                      <p>'+cliente[idCl].apresentacaocliente+'</p><p style="font-weight: bold;">'+cel+'</p></a>';   
            nb += 1;
        }
    }
    clt = tmpClt;
    if(html === ""){
        document.getElementById('corpo').innerHTML = '<p style="margin-left: 10px;font-size: 30px; color: red;">Sem resultados para "'+pesquisaTmp+'"';
        pesquisaTmp = "";
    }else{
        document.getElementById('corpo').innerHTML = html;
    }
}

function setBuscaFiltros(){
    getCltOriginal();
    if(filtroCity !== ""){
        var city = filtroCity;
        var tamanho = buscaClt.length;
        var html = "";
        var tmpClt = [];
        var nb = 0;
        for(var i = 0; i < tamanho; i++){
            var idCl = getCliente(buscaClt[i].idcliente);
            var end = getEnd(cliente[idCl].idcliente);
            var ven = getVenda(cliente[idCl].idcliente);
            if(ven.statusvenda == "Aprovada" && expirou(ven.dtexpiracao)){
                if(city == "all" || contem(city, end.idcidade)){
                    tmpClt.push(idCl);
                    nb += 1;
                }
            }
        }
        cltFiltro = tmpClt;
    }else{
        var tam = buscaClt.length;
        var tmClt = [];
        var nsb = 0;
        for(var d = 0; d < tam; d++){
            var iCl = getCliente(buscaClt[d].idcliente);
            var vn = getVenda(cliente[iCl].idcliente);
            if(vn.statusvenda == "Aprovada" && expirou(vn.dtexpiracao)){
                    tmClt.push(iCl);
                    nsb += 1;
            }
        }
        cltFiltro = tmClt;
    }
    
}

function bntBuscar(){
    pesquisaClick();
}