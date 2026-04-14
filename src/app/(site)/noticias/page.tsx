"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaClock, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";

type Noticia = {
    id: string;
    titulo: string;
    slug: string;
    resumo: string;
    publicadoEm: string;
    imagem?: string;
    secretaria?: { nome: string };
};

function formatarData(dataStr: string) {
    if (!dataStr) return "";
    return new Date(dataStr).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "long", year: "numeric"
    });
}

const LIMIT = 12;

export default function NoticiasPage() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [buscaAtiva, setBuscaAtiva] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const totalPages = Math.ceil(total / LIMIT);

    const fetchNoticias = useCallback(async (currentPage: number, query: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                publicada: "true",
                limit: String(LIMIT),
                page: String(currentPage),
            });
            if (query) params.set("busca", query);

            const res = await fetch(`/api/noticias?${params}`);
            const data = await res.json();
            setNoticias(data.items || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Erro ao buscar notícias:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNoticias(page, buscaAtiva);
    }, [page, buscaAtiva, fetchNoticias]);

    function handleBuscar(e: React.FormEvent) {
        e.preventDefault();
        setPage(1);
        setBuscaAtiva(busca);
    }

    function handlePageChange(newPage: number) {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Paginação inteligente
    function getPaginationItems() {
        const items: (number | "...")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) items.push(i);
        } else {
            items.push(1);
            if (page > 3) items.push("...");
            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                items.push(i);
            }
            if (page < totalPages - 2) items.push("...");
            items.push(totalPages);
        }
        return items;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Notícias Municipais"
                subtitle={`Fique por dentro de tudo que acontece em São Tomé · ${total > 0 ? `${total} notícias` : ""}`}
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Notícias" }
                ]}
            />

            <div className="max-w-[1200px] mx-auto px-6 py-12">

                {/* Barra de busca */}
                <form onSubmit={handleBuscar} className="mb-10 flex gap-3 max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            id="busca-noticias"
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Buscar notícias..."
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01b0ef] focus:border-transparent shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#0088b9] hover:bg-[#01b0ef] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl transition-colors shadow-sm"
                    >
                        Buscar
                    </button>
                    {buscaAtiva && (
                        <button
                            type="button"
                            onClick={() => { setBusca(""); setBuscaAtiva(""); setPage(1); }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-black text-xs uppercase tracking-widest px-4 py-3.5 rounded-2xl transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </form>

                {/* Grid de notícias */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#01b0ef] border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-[#0088b9] font-black uppercase tracking-widest text-xs">Carregando notícias...</p>
                    </div>
                ) : noticias.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                        <span className="text-6xl mb-4 block">📭</span>
                        <h2 className="text-xl font-black text-[#0088b9] mb-2 uppercase">Nenhuma notícia encontrada</h2>
                        <p className="text-gray-500 text-sm">
                            {buscaAtiva ? `Nenhum resultado para "${buscaAtiva}".` : "Volte mais tarde para conferir as novidades."}
                        </p>
                    </div>
                ) : (
                    <>
                        {buscaAtiva && (
                            <p className="text-center text-sm text-gray-500 mb-6 font-medium">
                                {total} resultado{total !== 1 ? "s" : ""} para <strong>"{buscaAtiva}"</strong>
                            </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {noticias.map((n) => (
                                <article key={n.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 border border-white hover:border-blue-100 overflow-hidden flex flex-col group">
                                    <Link href={`/noticias/${n.slug}`} className="block overflow-hidden h-48 relative">
                                        {n.imagem ? (
                                            <img src={n.imagem} alt={n.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#01b0ef] to-[#0088b9] flex items-center justify-center">
                                                <span className="text-white/20 text-6xl font-black">📰</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#FDB913] text-[#0088b9] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                                                {n.secretaria?.nome || "Notícia"}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="p-7 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                                            <span className="w-6 h-[2px] bg-[#01b0ef]" />
                                            <FaClock className="text-[9px]" />
                                            <time dateTime={n.publicadoEm}>{formatarData(n.publicadoEm)}</time>
                                        </div>
                                        <h2 className="font-black text-[#0088b9] text-lg leading-tight mb-4 line-clamp-2 group-hover:text-[#01b0ef] transition-colors">
                                            <Link href={`/noticias/${n.slug}`}>{n.titulo}</Link>
                                        </h2>
                                        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 font-medium">{n.resumo}</p>
                                        <Link
                                            href={`/noticias/${n.slug}`}
                                            className="mt-6 flex items-center gap-2 text-[#01b0ef] font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all"
                                        >
                                            Ler notícia completa <span className="text-lg">→</span>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Paginação */}
                        {totalPages > 1 && (
                            <nav aria-label="Paginação de notícias" className="mt-14 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    aria-label="Página anterior"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-xs font-bold shadow-sm hover:bg-[#0088b9] hover:text-white hover:border-[#0088b9] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <FaChevronLeft /> Anterior
                                </button>

                                <div className="flex items-center gap-1.5">
                                    {getPaginationItems().map((item, i) =>
                                        item === "..." ? (
                                            <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                                        ) : (
                                            <button
                                                key={item}
                                                onClick={() => handlePageChange(item as number)}
                                                aria-label={`Página ${item}`}
                                                aria-current={page === item ? "page" : undefined}
                                                className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                                                    page === item
                                                        ? "bg-[#0088b9] text-white shadow-lg scale-110"
                                                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-[#0088b9] hover:text-[#0088b9]"
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    )}
                                </div>

                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    aria-label="Próxima página"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-xs font-bold shadow-sm hover:bg-[#0088b9] hover:text-white hover:border-[#0088b9] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Próximo <FaChevronRight />
                                </button>
                            </nav>
                        )}

                        {/* Info de paginação */}
                        {totalPages > 1 && (
                            <p className="text-center text-xs text-gray-400 font-medium mt-4">
                                Página {page} de {totalPages} · {total} notícias no total
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
