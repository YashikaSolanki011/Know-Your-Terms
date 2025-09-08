import React, { useState } from "react";
// Minimal circular spinner component
function Spinner({ loading, detailLoading }: { loading: boolean; detailLoading: boolean }) {
    return (
        <div className="flex justify-center items-center py-6">
            <div className="w-8 h-8 border-4 border-[#F6A507] border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
            {loading && <span className="ml-2 text-gray-600">Fetching Case Details...</span>}
            {detailLoading && <span className="ml-2 text-gray-600">Fetching Case Summary...</span>}
        </div>
    );
}

function stripBoldTags(text: string) {
  return text.replace(/<\/?b>/g, "");
}

import CaseDetail from "./CaseDetail";
import { caseSummaryAsync, searchCaseAsync } from "../../../store/caseSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { toast } from "react-toastify";
import Button from "../../../components/common/Button";

const CasesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCase, setSelectedCase] = useState<any | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setSelectedCase(null); // Hide detail on new search
        if (!query || query.trim() === "") {
            setLoading(false);
            toast.error("Please enter a search query.");
            return;
        }
        try {
            const response: any = await dispatch(searchCaseAsync(query)).unwrap();

            if (response?.statusCode === 200 || response?.success === true) {
                setResults(response.data);
                setLoading(false);
                toast.success(response.message || "Search completed successfully!");
            } else {
                toast.error(response?.message || "Failed to fetch search results");
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error fetching search results.");
        }
        setLoading(false);
    };

    const handleCaseSummary = async (tid: string) => {
        setDetailLoading(true);
        try {
            if (!tid) {
                toast.error("Invalid case ID.");
                setDetailLoading(false);
                return;
            }
            const response: any = await dispatch(caseSummaryAsync(tid)).unwrap();
            if (response?.statusCode === 200 || response?.success === true) {
                setSelectedCase(response.data);
                toast.success(response.message || "Case summary fetched successfully!");
                setDetailLoading(false);
            } else {
                toast.error(response?.message || "Failed to fetch case summary");
                setDetailLoading(false);
            }
        } catch (error) {
            toast.error("Error fetching case summary.");
        } finally {
            setDetailLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-6 pt-24">
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-black flex items-center justify-center gap-2 tracking-tight">
                    ⚖️ Case Explorer
                </h1>
                <p className="text-gray-800 text-lg mt-2">
                    Search and review landmark Indian legal cases with ease
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Powered by <span className="font-semibold text-[#F6A507]">IndianKanoon.org</span>
                </p>
                <div className="mt-4 w-16 border-b-2 border-[#CDA047] mx-auto"></div>
            </header>


            {/* Search Box */}
            <div className="flex gap-3 w-full max-w-3xl px-4 mb-6">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by case title, citation, or keywords..."
                    className="flex-1 border border-[#CDA047] rounded-lg px-4 py-3 shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-[#F6A507] bg-white"
                />
                <Button type="submit" size="lg"
                    onClick={handleSearch}
                    loading={loading}
                >
                    Search
                </Button>
            </div>

            {/* Results or Detail below search bar */}
            {loading || detailLoading ? (
                <div className="w-full max-w-6xl px-4">
                    <div className="bg-white border border-[#f3e9d2] rounded-xl shadow-sm p-4">
                        <Spinner loading={loading} detailLoading={detailLoading} />
                    </div>
                </div>
            ) : selectedCase ? (
                detailLoading ? (
                    ""
                ) : (
                    <div className="w-full max-w-6xl px-4">
                        <CaseDetail caseItem={selectedCase} />
                    </div>
                )
            ) : (
            <section className="w-full  max-w-6xl px-4">
                <div className="bg-white border border-[#f3e9d2] rounded-xl shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-black mb-3">Case Results</h2>
                    {results.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">No results yet. Try searching above.</div>
                    ) : (
                    <ul className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                        {results.map((caseItem) => (
                        <li
                            key={caseItem.tid}
                            className="border border-[#f3e9d2] p-4 rounded-lg hover:shadow-md transition bg-white"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="font-semibold text-black">{stripBoldTags(caseItem.title)}</h3>
                                <p className="text-sm text-gray-700 mt-1">
                                {caseItem.docsource} • {caseItem.publishdate}
                                </p>
                                <p className="text-sm text-gray-500">{caseItem.citation}</p>
                            </div>
                            <Button type="submit"
                                onClick={() => { handleCaseSummary(caseItem.tid)}}
                                variant="primary"
                                disabled={detailLoading}
                            >
                                View Summary 
                            </Button>
                            {/* <Button type="submit" size="lg"
                                onClick={() => { handleCaseSummary(caseItem.tid)}}
                                loading={detailLoading}
                            >
                                View Summary
                            </Button> */}
                            </div>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </section>
            )}
        </div>
    );
};

export default CasesList;
