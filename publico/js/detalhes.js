const cursos = [
  { id: 1, nome: "Excel Básico", descricao: "Aprenda a utilizar o Excel desde o zero, entendendo células, fórmulas e formatação.", cargaHoraria: "20h", instrutor: "Maria Silva", nivel: "Iniciante", preco: 200, vagas: 25 },
  { id: 2, nome: "Excel Avançado", descricao: "Explore fórmulas complexas, macros e automação no Excel.", cargaHoraria: "40h", instrutor: "João Souza", nivel: "Avançado", preco: 450, vagas: 15 },
  { id: 3, nome: "Excel Dashboards", descricao: "Construa dashboards dinâmicos e visuais para tomada de decisão.", cargaHoraria: "35h", instrutor: "Ana Costa", nivel: "Intermediário", preco: 500, vagas: 18 },
  { id: 4, nome: "Power BI Básico", descricao: "Introdução ao Power BI para criação de relatórios e visualizações interativas.", cargaHoraria: "25h", instrutor: "Carlos Pereira", nivel: "Iniciante", preco: 350, vagas: 20 },
  { id: 5, nome: "Power BI Avançado", descricao: "Modelagem de dados, DAX e dashboards complexos no Power BI.", cargaHoraria: "45h", instrutor: "Fernanda Lima", nivel: "Avançado", preco: 700, vagas: 12 },
  { id: 6, nome: "PowerPoint Profissional", descricao: "Crie apresentações impactantes com design moderno e recursos avançados.", cargaHoraria: "20h", instrutor: "Ricardo Gomes", nivel: "Intermediário", preco: 250, vagas: 30 },
  { id: 7, nome: "Word Produtivo", descricao: "Aprenda a formatar documentos, usar estilos, sumário automático e mala direta.", cargaHoraria: "15h", instrutor: "Patrícia Rocha", nivel: "Iniciante", preco: 180, vagas: 25 },
  { id: 8, nome: "Microsoft Teams Essencial", descricao: "Trabalhe de forma colaborativa com chat, reuniões e integração de arquivos.", cargaHoraria: "12h", instrutor: "Daniel Alves", nivel: "Iniciante", preco: 150, vagas: 40 },
  { id: 9, nome: "Outlook Produtividade", descricao: "Gerencie emails, agendas e tarefas com eficiência no Outlook.", cargaHoraria: "10h", instrutor: "Tatiana Nunes", nivel: "Iniciante", preco: 120, vagas: 50 },
  { id: 10, nome: "Access para Iniciantes", descricao: "Aprenda a criar e gerenciar bancos de dados relacionais com Microsoft Access.", cargaHoraria: "30h", instrutor: "Gustavo Fernandes", nivel: "Iniciante", preco: 300, vagas: 20 },
  { id: 11, nome: "Microsoft Project", descricao: "Planejamento, cronogramas e gestão de projetos com MS Project.", cargaHoraria: "40h", instrutor: "Juliana Cardoso", nivel: "Intermediário", preco: 600, vagas: 15 },
  { id: 12, nome: "OneNote Produtividade", descricao: "Organize anotações, ideias e reuniões usando o Microsoft OneNote.", cargaHoraria: "12h", instrutor: "Marcos Oliveira", nivel: "Iniciante", preco: 100, vagas: 40 },
  { id: 13, nome: "Excel para Análise de Dados", descricao: "Uso do Excel para estatísticas, análise preditiva e relatórios de BI.", cargaHoraria: "40h", instrutor: "Camila Duarte", nivel: "Avançado", preco: 550, vagas: 20 },
  { id: 14, nome: "SharePoint Essencial", descricao: "Gestão de documentos, bibliotecas e colaboração em equipe no SharePoint.", cargaHoraria: "20h", instrutor: "André Martins", nivel: "Intermediário", preco: 300, vagas: 25 },
  { id: 15, nome: "Pacote Office Completo", descricao: "Curso abrangente de Word, Excel, PowerPoint e Outlook do básico ao avançado.", cargaHoraria: "80h", instrutor: "Equipe Especializada", nivel: "Todos", preco: 1200, vagas: 30 }
];

function obterCursoPorId(id) {
  return cursos.find(curso => curso.id === id);
}

const params = new URLSearchParams(window.location.search);
const cursoId = parseInt(params.get("id"));
const curso = obterCursoPorId(cursoId);

const container = document.getElementById("curso-detalhes");

if (!curso) {
  container.innerHTML = "<p>Curso não encontrado.</p>";
} else {
  container.innerHTML = `
    <div class="detalhes-header">
      <h2>${curso.nome}</h2>
    </div>
    <p><strong>Descrição:</strong> ${curso.descricao}</p>
    <p><strong>Carga Horária:</strong> ${curso.cargaHoraria}</p>
    <p><strong>Instrutor:</strong> ${curso.instrutor}</p>
    <p><strong>Nível:</strong> ${curso.nivel}</p>
    <p><strong>Preço:</strong> <span class="preco-valor">R$ ${curso.preco}</span></p>
    <p><strong>Vagas disponíveis:</strong> ${curso.vagas}</p>

    <div class="d-flex align-items-center mb-4">
      <label for="quantidade" class="me-3">Quantidade:</label>
      <input type="number" id="quantidade" min="1" max="${curso.vagas}" value="1" class="form-control w-auto">
    </div>

    <p class="total-area"><strong>Valor Total:</strong> <span id="valorTotal" class="total-valor">R$ ${curso.preco}</span></p>
    
        <button id="btn-inscrever" class="btn btn-primary btn-lg mt-3 w-100">Inscrever-se Agora</button>
  `;

  const inputQtd = document.getElementById("quantidade");
  const spanTotal = document.getElementById("valorTotal");
  const btnInscrever = document.getElementById("btn-inscrever");

  inputQtd.addEventListener("input", () => {
    let qtd = parseInt(inputQtd.value) || 1;
    if (qtd > curso.vagas) qtd = curso.vagas;
    if (qtd < 1) qtd = 1;
    inputQtd.value = qtd;
    spanTotal.textContent = `R$ ${qtd * curso.preco}`;
  });
    
  btnInscrever.addEventListener("click", () => {
    const qtd = parseInt(inputQtd.value);
    const total = qtd * curso.preco;
    
    alert(`Inscrição confirmada para ${curso.nome}!
Total de vagas: ${qtd}
Valor a pagar: R$ ${total}
Você será redirecionado para o pagamento.`);
    
  });
}