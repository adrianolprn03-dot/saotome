import type { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
    console.log("ðŸŒ± Iniciando seed do banco de dados...");

    // --- UsuÃ¡rio Admin ---
    const senhaHash = await bcrypt.hash("Admin123!", 12);
    const admin = await prisma.usuario.upsert({
        where: { email: "admin@saotome.rn.gov.br" },
        update: {},
        create: { nome: "Administrador do Sistema", email: "admin@saotome.rn.gov.br", senha: senhaHash, perfil: "admin" },
    });
    console.log("âœ… Admin criado:", admin.email);

    // --- UsuÃ¡rios de teste ---
    const comunicacaoHash = await bcrypt.hash("Comunicacao123!", 12);
    await prisma.usuario.upsert({
        where: { email: "comunicacao@saotome.rn.gov.br" },
        update: {},
        create: { nome: "Assessoria de ComunicaÃ§Ã£o", email: "comunicacao@saotome.rn.gov.br", senha: comunicacaoHash, perfil: "comunicacao" },
    });

    // --- Secretarias ---
    const secretariasDados = [
        { 
            nome: "Controladoria Municipal", 
            slug: "controladoria-municipal", 
            descricao: "ConferÃªncia e acompanhamento das demonstraÃ§Ãµes contÃ¡beis, produÃ§Ã£o e emissÃ£o de notificaÃ§Ãµes Ã s unidades da administraÃ§Ã£o apontando incorreÃ§Ãµes em processos contÃ¡beis, licitatÃ³rios, convÃªnios e ajustes, alÃ©m de fiscalizar o cumprimento de resoluÃ§Ãµes dos Tribunais de Contas.", 
            secretario: "Francisco Adriano Bezerra da Silva", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 1 
        },
        { 
            nome: "Secretaria Municipal de AdministraÃ§Ã£o Geral e Planejamento", 
            slug: "administracao-geral-planejamento", 
            descricao: "ExecuÃ§Ã£o das polÃ­ticas de AdministraÃ§Ã£o de Recursos Humanos e dos bens patrimoniais do MunicÃ­pio, coordenaÃ§Ã£o e controle de processos de licitaÃ§Ã£o, assessoria ao Prefeito na supervisÃ£o de Ã³rgÃ£os municipais e planejamento orÃ§amentÃ¡rio.", 
            secretario: "Sidcley Gomes da Silva", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 2 
        },
        { 
            nome: "Secretaria Municipal de Agricultura, Recursos HÃ­dricos e Meio Ambiente", 
            slug: "agricultura-meio-ambiente", 
            descricao: "PromoÃ§Ã£o do desenvolvimento agrÃ­cola, apoio tÃ©cnico e infraestrutura para produÃ§Ã£o e pesquisa, fiscalizaÃ§Ã£o do uso de defensivos agrÃ­colas, controle da produÃ§Ã£o agropastoril e execuÃ§Ã£o da polÃ­tica ambiental e de recursos hÃ­dricos.", 
            secretario: "Nelio Mendes Lucena", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua JosÃ© Ferreira Sobrinho, 100, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 3 
        },
        { 
            nome: "Secretaria Municipal de AssistÃªncia Social", 
            slug: "assistencia-social", 
            descricao: "ImplementaÃ§Ã£o e execuÃ§Ã£o de polÃ­ticas pÃºblicas de inclusÃ£o e promoÃ§Ã£o social, gestÃ£o de serviÃ§os e programas previstos na lei orgÃ¢nica da assistÃªncia social e coordenaÃ§Ã£o de programas de habitaÃ§Ã£o popular e seguranÃ§a alimentar.", 
            secretario: "Francisca Aparecida de FranÃ§a Gomes", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98695-7255", 
            endereco: "Rua JosÃ© Varela, 001, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 4 
        },
        { 
            nome: "Secretaria Municipal de EducaÃ§Ã£o e Cultura", 
            slug: "educacao-cultura", 
            descricao: "FormulaÃ§Ã£o da polÃ­tica educacional do municÃ­pio, organizaÃ§Ã£o e controle do processo de ensino nas escolas municipais, gestÃ£o de recursos financeiros da educaÃ§Ã£o e promoÃ§Ã£o de atividades culturais e artÃ­sticas.", 
            secretario: "Ana Dark Pereira da Silva", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98604-5406", 
            endereco: "Rua Geraldo Pegado, 006, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 5 
        },
        { 
            nome: "Secretaria Municipal de FinanÃ§as", 
            slug: "financas", 
            descricao: "Controle da execuÃ§Ã£o orÃ§amentÃ¡ria de despesas e receitas, escrituraÃ§Ã£o contÃ¡bil, preparaÃ§Ã£o de balancetes e balanÃ§os gerais, alÃ©m da movimentaÃ§Ã£o de numerÃ¡rio e outros valores vinculados Ã  Fazenda Municipal.", 
            secretario: "Fernando Luiz de Lima Gomes", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 6 
        },
        { 
            nome: "Secretaria Municipal de Obras e ServiÃ§os Urbanos", 
            slug: "obras-servicos-urbanos", 
            descricao: "ManutenÃ§Ã£o de espaÃ§os pÃºblicos (limpeza, varriÃ§Ã£o e coleta de lixo), execuÃ§Ã£o de obras viÃ¡rias e pavimentaÃ§Ã£o, manutenÃ§Ã£o de prÃ©dios municipais e gestÃ£o da iluminaÃ§Ã£o pÃºblica e cemitÃ©rios.", 
            secretario: "Julio Carlos Ferreira de Oliveira", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 7 
        },
        { 
            nome: "Secretaria Municipal de SaÃºde", 
            slug: "saude", 
            descricao: "ExecuÃ§Ã£o de vigilÃ¢ncia epidemiolÃ³gica e sanitÃ¡ria, promoÃ§Ã£o e recuperaÃ§Ã£o do sistema municipal de saÃºde conforme as diretrizes do SUS, gestÃ£o de laboratÃ³rios de saÃºde pÃºblica e fiscalizaÃ§Ã£o de serviÃ§os privados de saÃºde.", 
            secretario: "Nivaldo Alves da Silva", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98705-7241", 
            endereco: "Rua JosÃ© Varela, 001, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 8 
        },
        { 
            nome: "Secretaria Municipal de Transportes", 
            slug: "transportes", 
            descricao: "GestÃ£o e manutenÃ§Ã£o da frota de veÃ­culos oficiais do municÃ­pio, controle de abastecimento e acompanhamento das subcoordenadorias de transporte e manutenÃ§Ã£o rodoviÃ¡ria.", 
            secretario: "Paulo Francisco da Silva", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 9 
        },
        { 
            nome: "Secretaria Municipal de TributaÃ§Ã£o", 
            slug: "tributacao", 
            descricao: "ExecuÃ§Ã£o da polÃ­tica tributÃ¡ria municipal, fiscalizaÃ§Ã£o e arrecadaÃ§Ã£o de impostos e taxas, inscription e cobranÃ§a da dÃ­vida ativa e orientaÃ§Ã£o tributÃ¡ria aos contribuintes.", 
            secretario: "Ernesto Luis Gomes de Almeida", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 10 
        },
        { 
            nome: "Procuradoria Municipal", 
            slug: "procuradoria-municipal", 
            descricao: "RepresentaÃ§Ã£o jurÃ­dica do MunicÃ­pio em juÃ­zo ou extrajudicialmente, consultoria e assessoramento jurÃ­dico Ã s unidades administrativas da prefeitura.", 
            secretario: "Fabiola Cunha Souza de Oliveira", 
            email: "ouvidoria@saotome.rn.gov.br", 
            telefone: "(84) 98717-7756", 
            endereco: "Rua SÃ£o Francisco, 275, Centro, São Tomé/RN, CEP: 59.235-000",
            horarioFuncionamento: "Segunda a Sexta-feira, das 7h Ã s 13h",
            ordem: 11 
        },
    ];

    for (const s of secretariasDados) {
        await prisma.secretaria.upsert({ 
            where: { slug: s.slug }, 
            update: {
                nome: s.nome,
                descricao: s.descricao,
                secretario: s.secretario,
                email: s.email,
                telefone: s.telefone,
                endereco: s.endereco,
                horarioFuncionamento: s.horarioFuncionamento,
                ordem: s.ordem
            }, 
            create: s 
        });
    }
    console.log("âœ… Secretarias oficiais criadas");

    // --- NotÃ­cias de exemplo ---
    const noticiasDados = [
        { titulo: "Prefeitura entrega obras de pavimentaÃ§Ã£o no bairro Centro", resumo: "Obras de pavimentaÃ§Ã£o asfÃ¡ltica foram concluÃ­das, beneficiando centenas de famÃ­lias.", conteudo: "<p>A Prefeitura Municipal de São Tomé entregou as obras de pavimentaÃ§Ã£o asfÃ¡ltica no bairro Centro, beneficiando centenas de famÃ­lias que agora contam com vias pavimentadas e acessÃ­veis em qualquer perÃ­odo do ano.</p><p>O investimento foi realizado com recursos do municÃ­pio em parceria com o Governo do Estado do Rio Grande do Norte, totalizando mais de R$ 1,2 milhÃ£o aplicados em infraestrutura urbana.</p>", publicada: true, destaque: true, publicadoEm: new Date("2024-03-08") },
        { titulo: "Campanha de vacinaÃ§Ã£o atinge meta de cobertura", resumo: "A Secretaria de SaÃºde anuncia que a campanha de vacinaÃ§Ã£o alcanÃ§ou 98% da populaÃ§Ã£o-alvo.", conteudo: "<p>A Secretaria Municipal de SaÃºde anuncia com satisfaÃ§Ã£o que a campanha municipal de vacinaÃ§Ã£o alcanÃ§ou 98% da populaÃ§Ã£o-alvo, superando a meta nacional estabelecida pelo MinistÃ©rio da SaÃºde.</p>", publicada: true, destaque: false, publicadoEm: new Date("2024-03-07") },
        { titulo: "InÃ­cio das matrÃ­culas escolares 2024/2025", resumo: "As matrÃ­culas para o ano letivo comeÃ§am na prÃ³xima semana. Confira os documentos necessÃ¡rios.", conteudo: "<p>A Secretaria Municipal de EducaÃ§Ã£o informa que as matrÃ­culas para o ano letivo 2024/2025 terÃ£o inÃ­cio na prÃ³xima segunda-feira, em todas as escolas da rede municipal.</p>", publicada: true, destaque: false, publicadoEm: new Date("2024-03-06") },
    ];

    for (const n of noticiasDados) {
        const slug = n.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        await prisma.noticia.upsert({ where: { slug }, update: {}, create: { ...n, slug } });
    }
    console.log("âœ… NotÃ­cias de exemplo criadas");

    // --- Receitas de exemplo ---
    const receitasDados = [
        { descricao: "IPTU", categoria: "impostos", valor: 85000, mes: 1, ano: 2024 },
        { descricao: "ISS", categoria: "impostos", valor: 42000, mes: 1, ano: 2024 },
        { descricao: "FPM â€“ Fundo de ParticipaÃ§Ã£o dos MunicÃ­pios", categoria: "transferencias", valor: 620000, mes: 1, ano: 2024 },
        { descricao: "Cota-parte ICMS", categoria: "transferencias", valor: 190000, mes: 1, ano: 2024 },
        { descricao: "IPTU", categoria: "impostos", valor: 91000, mes: 2, ano: 2024 },
        { descricao: "FPM â€“ Fundo de ParticipaÃ§Ã£o dos MunicÃ­pios", categoria: "transferencias", valor: 645000, mes: 2, ano: 2024 },
        { descricao: "ISS", categoria: "impostos", valor: 38000, mes: 2, ano: 2024 },
        { descricao: "Taxas de ServiÃ§os Municipais", categoria: "receitas-proprias", valor: 18000, mes: 1, ano: 2024 },
        { descricao: "Multas e Juros", categoria: "receitas-proprias", valor: 7500, mes: 2, ano: 2024 },
    ];
    await prisma.receita.createMany({ data: receitasDados });
    console.log("âœ… Receitas de exemplo criadas");

    // --- LicitaÃ§Ãµes de exemplo ---
    const licitacoesDados = [
        { numero: "001/2024", ano: 2024, modalidade: "pregao", objeto: "AquisiÃ§Ã£o de Medicamentos para Rede Municipal de SaÃºde", valor: 250000, status: "concluida", secretaria: "SaÃºde", dataAbertura: new Date("2024-02-15") },
        { numero: "002/2024", ano: 2024, modalidade: "concorrencia", objeto: "ContrataÃ§Ã£o de Empresa para ManutenÃ§Ã£o de Vias Urbanas", valor: 1800000, status: "aberta", secretaria: "Obras", dataAbertura: new Date("2024-03-01") },
        { numero: "003/2024", ano: 2024, modalidade: "pregao", objeto: "Fornecimento de Material de EscritÃ³rio para Secretarias", valor: 45000, status: "em-andamento", secretaria: "AdministraÃ§Ã£o", dataAbertura: new Date("2024-02-20") },
    ];
    await prisma.licitacao.createMany({ data: licitacoesDados });
    console.log("âœ… LicitaÃ§Ãµes de exemplo criadas");

    // --- Servidores de exemplo ---
    const servidoresDados = [
        { nome: "Maria da Silva Santos", cargo: "Professora Municipal", vinculo: "efetivo", secretaria: "EducaÃ§Ã£o", salarioBase: 2400, totalBruto: 3100, totalLiquido: 2650, ativo: true, mes: 3, ano: 2024 },
        { nome: "JoÃ£o Carlos Pereira", cargo: "Agente de SaÃºde", vinculo: "efetivo", secretaria: "SaÃºde", salarioBase: 1800, totalBruto: 2200, totalLiquido: 1950, ativo: true, mes: 3, ano: 2024 },
        { nome: "Dr. Carlos Eduardo Lima", cargo: "MÃ©dico ClÃ­nico Geral", vinculo: "contratado", secretaria: "SaÃºde", salarioBase: 8500, totalBruto: 9200, totalLiquido: 7800, ativo: true, mes: 3, ano: 2024 },
    ];
    await prisma.servidor.createMany({ data: servidoresDados });
    console.log("âœ… Servidores de exemplo criados");

    // --- Obras de exemplo ---
    const obrasDados = [
        { titulo: "ConstruÃ§Ã£o da Nova Creche Municipal", descricao: "Obras para uma creche proinfÃ¢ncia que atenderÃ¡ 120 crianÃ§as em tempo integral.", local: "Bairro Novo Horizonte", valor: 1450000, status: "em-andamento", dataInicio: new Date("2024-01-10"), previsaoTermino: new Date("2024-11-30"), percentual: 35, empresa: "Construtora Progresso LTDA" },
        { titulo: "Reforma Centro de ConvenÃ§Ãµes", descricao: "ReestruturaÃ§Ã£o e reforma do centro cultural.", local: "Centro", valor: 650000, status: "concluida", dataInicio: new Date("2023-04-15"), previsaoTermino: new Date("2023-12-10"), percentual: 100, empresa: "Construtora Progresso LTDA" },
        { titulo: "PavimentaÃ§Ã£o do Bairro Bela Vista", descricao: "PavimentaÃ§Ã£o asfÃ¡ltica e drenagem pluvial das ruas.", local: "Bairro Bela Vista", valor: 820000, status: "licitacao", dataInicio: null, previsaoTermino: null, percentual: 0, empresa: null },
    ];
    await prisma.obra.createMany({ data: obrasDados });
    console.log("âœ… Obras de exemplo criadas");

    // --- FAQ de exemplo ---
    const faqDados = [
        { pergunta: "Como faÃ§o para solicitar o reparo da iluminaÃ§Ã£o pÃºblica?", resposta: "VocÃª pode abrir um chamado direto na Secretaria de Obras presencialmente ou acessar o Ã­cone de 'Ouvidoria' no portal preenchendo o formulÃ¡rio de SolicitaÃ§Ã£o de ServiÃ§o.", categoria: "ServiÃ§os Urbanos", ordem: 1 },
        { pergunta: "Qual o prazo legal para resposta de um pedido de informaÃ§Ã£o via e-SIC?", resposta: "O prazo legal, segundo a Lei de Acesso Ã  InformaÃ§Ã£o (LAI), Ã© de 20 (vinte) dias, podendo ser prorrogado por mais 10 (dez) dias, mediante justificativa expressa.", categoria: "TransparÃªncia", ordem: 2 },
        { pergunta: "Onde consigo emitir o DAM (Documento de ArrecadaÃ§Ã£o Municipal) do meu IPTU?", resposta: "O IPTU pode ser emitido na aba 'ServiÃ§os Online > Portal do Contribuinte' usando o nÃºmero de inscriÃ§Ã£o do imÃ³vel ou o CPF do proprietÃ¡rio.", categoria: "Tributos", ordem: 3 },
    ];
    await prisma.fAQ.createMany({ data: faqDados });
    console.log("âœ… FAQs criadas");

    // --- GlossÃ¡rio de exemplo ---
    const glossarioDados = [
        { termo: "Empenho", definicao: "O primeiro estÃ¡gio da despesa pÃºblica. Ã‰ a reserva de dotaÃ§Ã£o orÃ§amentÃ¡ria para um fim especÃ­fico, criando uma obrigaÃ§Ã£o de pagamento pendente de cumprimento de condiÃ§Ã£o." },
        { termo: "LiquidaÃ§Ã£o", definicao: "O segundo estÃ¡gio da despesa. Consiste na verificaÃ§Ã£o do direito adquirido pelo credor tendo por base os tÃ­tulos e documentos comprobatÃ³rios do respectivo crÃ©dito (ex: nota fiscal de um serviÃ§o entregue)." },
        { termo: "RREO", definicao: "RelatÃ³rio Resumido de ExecuÃ§Ã£o OrÃ§amentÃ¡ria. Publicado bimestralmente, mostra o andamento da execuÃ§Ã£o do orÃ§amento, a arrecadaÃ§Ã£o de receitas e as despesas realizadas." },
        { termo: "PregÃ£o", definicao: "Modalidade de licitaÃ§Ã£o obrigatÃ³ria para a aquisiÃ§Ã£o de bens e serviÃ§os comuns, caracterizada pela agilidade e pelo oferecimento de lances de forma decrescente." },
    ];
    await prisma.glossario.createMany({ data: glossarioDados });
    console.log("âœ… GlossÃ¡rio criado");

    // --- Unidades de Atendimento (Mapeamento) ---
    const unidadesDados = [
        { nome: "Hospital Municipal Maternidade Nossa Senhora", tipo: "saude", descricao: "Atendimento de urgÃªncia, emergÃªncia, maternidade e especialidades bÃ¡sicas.", endereco: "Av. Principal, s/n - Centro", telefone: "(84) 3000-1111", horario: "24 horas", ativa: true },
        { nome: "CRAS - Centro de ReferÃªncia de AssistÃªncia Social", tipo: "social", descricao: "Porta de entrada dos serviÃ§os sociais, cadastro Ãºnico (CadÃšnico) e Bolsa FamÃ­lia.", endereco: "Rua do EstÃ¡dio, 10 - Bairro das Flores", telefone: "(84) 3000-2222", horario: "08h Ã s 14h", ativa: true },
        { nome: "Escola Municipal Professora Maria das GraÃ§as", tipo: "educacao", descricao: "Ensino fundamental incompleto e educaÃ§Ã£o infantil.", endereco: "Av. do Contorno, 55 - Bairro Bela Vista", telefone: "(84) 3000-3333", horario: "07h Ã s 17h", ativa: true },
    ];
    await prisma.unidadeAtendimento.createMany({ data: unidadesDados });
    console.log("âœ… Unidades de Atendimento criadas");

    // --- Conselhos Municipais ---
    const conselhoSaude = await prisma.conselho.create({
        data: {
            nome: "Conselho Municipal de SaÃºde (CMS)",
            sigla: "CMS",
            tipo: "saude",
            descricao: "Ã“rgÃ£o colegiado destinado a atuar na formulaÃ§Ã£o de estratÃ©gias e no controle da execuÃ§Ã£o da polÃ­tica de saÃºde do municÃ­pio, composto por usuÃ¡rios, trabalhadores e gestores.",
            composicao: "50% representantes dos usuÃ¡rios, 25% trabalhadores da saÃºde, 25% representantes do governo e prestadores.",
            presidente: "Maria Helena Castro",
            email: "cms@saotome.rn.gov.br",
            ativo: true,
            atas: {
                create: [
                    { titulo: "Ata da 1Âª ReuniÃ£o OrdinÃ¡ria 2024", dataReuniao: new Date("2024-01-20"), arquivo: "#" },
                    { titulo: "Ata da 2Âª ReuniÃ£o OrdinÃ¡ria 2024", dataReuniao: new Date("2024-02-15"), arquivo: "#" }
                ]
            }
        }
    });

    await prisma.conselho.create({
        data: {
            nome: "Conselho de Acompanhamento e Controle Social do FUNDEB",
            sigla: "CACS-FUNDEB",
            tipo: "fundeb",
            descricao: "Acompanhar e controlar a distribuiÃ§Ã£o, a transferÃªncia e a aplicaÃ§Ã£o dos recursos do Fundo.",
            composicao: "Representantes dos professores, diretores, pais de alunos, e do poder executivo.",
            presidente: "Prof. Marcos VinÃ­cius Dias",
            email: "fundeb@saotome.rn.gov.br",
            ativo: true
        }
    });
    console.log("âœ… Conselhos Municipais criados");

    // --- Emendas Parlamentares de exemplo ---
    const emendasDados: Prisma.EmendaParlamentarCreateInput[] = [
        {
            codigoEmenda: "202412340001",
            anoEmenda: 2024,
            autorNome: "Deputado Federal JoÃ£o Silva",
            tipoEmenda: "Individual",
            objeto: "AquisiÃ§Ã£o de equipamentos hospitalares para o Hospital Municipal.",
            valorPrevisto: 500000,
            valorEmpenhado: 500000,
            valorLiquidado: 450000,
            valorPago: 450000,
            situacaoExecucao: "Em ExecuÃ§Ã£o",
            funcaoGoverno: "SaÃºde",
            urlFonteOficial: "https://www.portaltransparencia.gov.br",
            fonteDado: "Transferegov"
        },
        {
            codigoEmenda: "202456780002",
            anoEmenda: 2024,
            autorNome: "Senadora Maria Oliveira",
            tipoEmenda: "Bancada",
            objeto: "PavimentaÃ§Ã£o asfÃ¡ltica de vias urbanas no Bairro Novo Horizonte.",
            valorPrevisto: 1200000,
            valorEmpenhado: 1200000,
            valorLiquidado: 0,
            valorPago: 0,
            situacaoExecucao: "ConvÃªnio Celebrado",
            funcaoGoverno: "Urbanismo",
            urlFonteOficial: "https://www.portaltransparencia.gov.br",
            fonteDado: "Transferegov"
        },
        {
            codigoEmenda: "202499990003",
            anoEmenda: 2024,
            autorNome: "Deputado Estadual Ricardo Santos",
            tipoEmenda: "TransferÃªncia Especial",
            objeto: "Recursos para custeio da rede municipal de ensino.",
            valorPrevisto: 300000,
            valorEmpenhado: 300000,
            valorLiquidado: 300000,
            valorPago: 300000,
            situacaoExecucao: "Pago",
            funcaoGoverno: "EducaÃ§Ã£o",
            urlFonteOficial: "https://www.portaltransparencia.gov.br",
            fonteDado: "Transferegov"
        },
        // Emendas PIX (TransferÃªncias Especiais)
        {
            codigoEmenda: "2024PIX0001",
            anoEmenda: 2024,
            autorNome: "Deputado Federal AndrÃ© Costa",
            tipoEmenda: "TransferÃªncia Especial",
            objeto: "Apoio Ã  infraestrutura turÃ­stica local.",
            valorPrevisto: 250000,
            valorEmpenhado: 250000,
            valorLiquidado: 250000,
            valorPago: 250000,
            situacaoExecucao: "Finalizado",
            funcaoGoverno: "Turismo",
            urlFonteOficial: "https://www.portaltransparencia.gov.br",
            fonteDado: "TransferÃªncia Especial (PIX)"
        }
    ];

    for (const e of emendasDados) {
        await prisma.emendaParlamentar.upsert({
            where: { codigoEmenda: e.codigoEmenda },
            update: {},
            create: e
        });
    }
    console.log("âœ… Emendas Parlamentares de exemplo criadas");

    // --- LegislaÃ§Ã£o OrÃ§amentÃ¡ria (LOA, LDO, PPA) ---
    const orcamentoDocs = [
        { tipo: "LOA", categoria: "Lei", numero: "560/2024", ano: 2024, ementa: "Estima a receita e fixa a despesa do MunicÃ­pio de São Tomé para o exercÃ­cio financeiro de 2024.", arquivo: "https://saotome.rn.gov.br/transparencia/loa-2024.pdf" },
        { tipo: "LOA", categoria: "Quadros de Detalhamento", numero: "560/2024-QDD", ano: 2024, ementa: "Quadros de Detalhamento de Despesa (QDD) do exercÃ­cio de 2024.", arquivo: "https://saotome.rn.gov.br/transparencia/qdd-2024.pdf" },
        { tipo: "LDO", categoria: "Lei", numero: "555/2023", ano: 2024, ementa: "DispÃµe sobre as diretrizes para a elaboraÃ§Ã£o e execuÃ§Ã£o da Lei OrÃ§amentÃ¡ria de 2024.", arquivo: "https://saotome.rn.gov.br/transparencia/ldo-2024.pdf" },
        { tipo: "LDO", categoria: "Anexo de Metas Fiscais", numero: "555/2023-AMF", ano: 2024, ementa: "Anexo de Metas Fiscais para o exercÃ­cio de 2024.", arquivo: "https://saotome.rn.gov.br/transparencia/amf-2024.pdf" },
        { tipo: "PPA", categoria: "Lei", numero: "500/2021", ano: 2024, ementa: "Plano Plurianual do MunicÃ­pio de São Tomé para o perÃ­odo de 2022-2025.", arquivo: "https://saotome.rn.gov.br/transparencia/ppa-2022-2025.pdf" },
        { tipo: "PPA", categoria: "Anexo de Programas", numero: "500/2021-ANX", ano: 2024, ementa: "Anexo de Programas e Metas do PPA 2022-2025.", arquivo: "https://saotome.rn.gov.br/transparencia/ppa-anexos.pdf" },
        // Documentos de 2023 para histÃ³rico
        { tipo: "LOA", categoria: "Lei", numero: "540/2022", ano: 2023, ementa: "Estima a receita e fixa a despesa para o exercÃ­cio de 2023.", arquivo: "https://saotome.rn.gov.br/transparencia/loa-2023.pdf" },
        { tipo: "LDO", categoria: "Lei", numero: "535/2022", ano: 2023, ementa: "Diretrizes OrÃ§amentÃ¡rias para 2023.", arquivo: "https://saotome.rn.gov.br/transparencia/ldo-2023.pdf" },
    ];

    for (const doc of orcamentoDocs) {
        await prisma.legislacao.create({ data: doc });
    }
    console.log("âœ… LegislaÃ§Ã£o OrÃ§amentÃ¡ria criada");

    // --- ConfiguraÃ§Ãµes do MunicÃ­pio ---
    const configuracoesDados = [
        { chave: "municipio_nome", valor: "São Tomé", descricao: "Nome oficial do municÃ­pio", grupo: "geral" },
        { chave: "municipio_uf", valor: "RN", descricao: "Estado", grupo: "geral" },
        { chave: "municipio_ibge", valor: "2406601", descricao: "CÃ³digo IBGE", grupo: "geral" },
        { chave: "municipio_populacao", valor: "4.463", descricao: "PopulaÃ§Ã£o estimada (Censo 2022)", grupo: "geral" },
        { chave: "municipio_area", valor: "120,4 kmÂ²", descricao: "Ãrea territorial", grupo: "geral" },
        { chave: "municipio_fundacao", valor: "1958", descricao: "Ano de fundaÃ§Ã£o/emancipaÃ§Ã£o", grupo: "geral" },
        { chave: "municipio_cnpj", valor: "08.159.204/0001-38", descricao: "CNPJ da Prefeitura", grupo: "geral" },
        { chave: "prefeitura_endereco", valor: "Rua SÃ£o Francisco, 275 - Centro", descricao: "EndereÃ§o da sede", grupo: "geral" },
        { chave: "prefeitura_telefone", valor: "(84) 98717-7756", descricao: "Telefone de contato", grupo: "geral" },
        { chave: "prefeitura_email", valor: "ouvidoria@saotome.rn.gov.br", descricao: "E-mail oficial", grupo: "geral" },
        { chave: "prefeitura_horario", valor: "Segunda a Sexta: 07h00 Ã s 13h00", descricao: "HorÃ¡rio de atendimento", grupo: "geral" },
    ];

    for (const c of configuracoesDados) {
        await prisma.configuracao.upsert({
            where: { chave: c.chave },
            update: { valor: c.valor },
            create: c
        });
    }
    console.log("âœ… ConfiguraÃ§Ãµes do MunicÃ­pio criadas");

    console.log("\nðŸŽ‰ Seed concluÃ­do com sucesso!");
    console.log("\nðŸ“‹ Credenciais de acesso ao painel:");
    console.log("   E-mail: admin@saotome.rn.gov.br");
    console.log("   Senha:  Admin123!");
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
