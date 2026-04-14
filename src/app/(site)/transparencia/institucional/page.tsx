import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FaBuilding, FaGlobe, FaClock, FaMapMarkerAlt, FaBriefcase, FaFontAwesomeFlag, FaUsers } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Dados Institucionais | Portal da Transparência",
    description: "Informações oficiais da estrutura organizacional, competências e contatos da Prefeitura Municipal de São Tomé – RN.",
};

async function getConfig(chave: string, padrao: string) {
    const config = await prisma.configuracao.findUnique({ where: { chave } });
    return config?.valor || padrao;
}

export default async function InstitucionalTransparencyPage() {
    const razaoSocial = await getConfig("municipio_nome", "Prefeitura Municipal de São Tomé");
    const cnpj = await getConfig("cnpj", "08.000.000/0001-00");
    const endereco = await getConfig("endereco_sede", "Praça Antônio Assunção, Centro, São Tomé/RN CEP: 59.400-000");
    const horario = await getConfig("horario_atendimento", "7:30 às 11:30 e 13:00 às 17:00");
    const email = await getConfig("contato_email", "gabinete@saotome.rn.gov.br");
    const telefone = await getConfig("contato_telefone", "(84) 3000-0000"); // Substituir pelo real quando disponível

    const dados = [
        { label: "Razão Social", value: razaoSocial, icon: FaBuilding },
        { label: "CNPJ", value: cnpj, icon: FaBriefcase },
        { label: "Sede Oficial", value: endereco, icon: FaMapMarkerAlt },
        { label: "CEP", value: "59400-000", icon: FaGlobe },
        { label: "Horário de Funcionamento", value: horario, icon: FaClock },
    ];

    // Fetch secretarias for the Competências e Estrutura section (PNTP compliance)
    const secretarias = await prisma.secretaria.findMany({
        where: { ativa: true },
        orderBy: { ordem: 'asc' }
    });

    return (
        <div className="min-h-screen bg-gray-50 font-['Montserrat',sans-serif]">
            <PageHeader
                title="Estrutura e Dados Institucionais"
                subtitle="Atendimento à PNTP: Informações cadastrais, estrutura organizacional, competências das secretarias e localização da sede."
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Transparência", href: "/transparencia" },
                    { label: "Dados Institucionais" }
                ]}
            />

            <div className="max-w-[1240px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Identificação Geral */}
                        <section className="bg-white rounded-[3rem] p-12 shadow-xl shadow-gray-200/40 border border-white">
                            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><FaBuilding size={20} /></span>
                                Identificação da Entidade
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {dados.map((d) => (
                                    <div key={d.label} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <span className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">{d.label}</span>
                                        <div className="flex items-center gap-3">
                                            <d.icon className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                                            <p className="text-gray-700 font-bold text-sm tracking-tight">{d.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Estrutura Organizacional e Competências */}
                        <section className="bg-white rounded-[3rem] p-12 shadow-xl shadow-gray-200/40 border border-white">
                            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-12 h-12 bg-[#01b0ef] text-white rounded-2xl flex items-center justify-center shadow-lg"><FaUsers size={20} /></span>
                                Organograma e Competências
                            </h2>
                            <p className="text-gray-600 font-medium mb-8">
                                Relação completa dos órgãos que compõem a administração municipal, incluindo suas atribuições (competências), responsáveis e contatos, em conformidade com as exigências da transparência pública.
                            </p>

                            <div className="space-y-6">
                                {secretarias.map(sec => (
                                    <details key={sec.id} className="group bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-lg uppercase tracking-tight">{sec.nome}</h3>
                                                {sec.secretario && <p className="text-[#01b0ef] text-xs font-black uppercase tracking-widest mt-1">Gestor(a): {sec.secretario}</p>}
                                            </div>
                                            <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-6 border-t border-gray-100 bg-white">
                                            <div className="mb-6">
                                                <span className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Atribuições / Competência</span>
                                                <p className="text-sm text-gray-600 leading-relaxed font-medium">{sec.descricao}</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {sec.endereco && (
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Endereço</span>
                                                        <span className="text-xs font-bold text-gray-700">{sec.endereco}</span>
                                                    </div>
                                                )}
                                                {sec.horarioFuncionamento && (
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Atendimento</span>
                                                        <span className="text-xs font-bold text-gray-700">{sec.horarioFuncionamento}</span>
                                                    </div>
                                                )}
                                                {sec.telefone && (
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Telefone</span>
                                                        <span className="text-xs font-bold text-gray-700">{sec.telefone}</span>
                                                    </div>
                                                )}
                                                {sec.email && (
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E-mail</span>
                                                        <span className="text-xs font-bold text-gray-700">{sec.email}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar / Localização e Contato */}
                    <div className="space-y-8">
                        <div className="bg-[#0088b9] rounded-[3rem] p-10 text-white shadow-xl sticky top-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Localização da Sede</h3>
                            <div className="aspect-video bg-white/10 rounded-3xl mb-8 flex items-center justify-center border border-white/20">
                                <span className="text-xs font-black uppercase tracking-widest opacity-50 italic">Mapa indisponível</span>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <FaMapMarkerAlt className="shrink-0 mt-1 text-blue-300" />
                                    <p className="text-sm font-medium leading-relaxed">
                                        Palácio Municipal<br />
                                        {endereco}
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#01b0ef] mb-2">Contato Oficial</p>
                                    <p className="text-sm font-bold">{email}</p>
                                    <p className="text-sm font-bold mt-1">{telefone}</p>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <a href="/a-prefeitura/prefeito" className="block text-center bg-white text-[#0088b9] text-xs font-black uppercase tracking-widest py-3 rounded-full hover:bg-gray-100 transition-colors">
                                        Ver Prefeito e Vice
                                    </a>
                                </div>
                            </div>
                        </div>

                        <section className="bg-white rounded-[3rem] p-8 shadow-xl shadow-gray-200/40 border border-white text-center">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg"><FaFontAwesomeFlag size={12} /></span>
                                Símbolos Municipais
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {["Brasão", "Bandeira", "Hino"].map((simbolo) => (
                                    <div key={simbolo} className="text-center group p-4 bg-gray-50 rounded-2xl">
                                        <h3 className="font-bold text-gray-700 text-xs tracking-widest">{simbolo}</h3>
                                        <a href="/a-prefeitura/historia" className="mt-2 block text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Ver</a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
