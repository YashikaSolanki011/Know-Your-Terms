import { useState } from "react";
import Button from "../../../components/common/Button";
import { agreementProcessAsync } from "../../../store/agreementSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

function Spinner({ loading }: { loading: boolean }) {
    return (
        <div className="flex justify-center items-center py-6 border bg-white border-gray-200">
            <div className="w-8 h-8 border-4 border-[#F6A507] border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
            {loading && <span className="ml-2 text-gray-600">Loading process details...</span>}
        </div>
    );
}

export default function AgreementProcess() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState<any>(false);
    const [query, setQuery] = useState("");

    const handleView = async () => {
        setLoading(true);

        try {
            if (!query) {
                toast.error("Query is required.");
                setLoading(false);
                return;
            }

            if (!user || !user.uid) {
                toast.error("You must be logged in to upload and summarize a document.");
                return;
            }
            const response: any = await dispatch(agreementProcessAsync({ uid: user.uid , processType: query})).unwrap();

            if (response?.statusCode === 200 || response?.success === true) {
                setShowDetails(response.data);
                toast.success(response.message || "Process fetched successfully!");
                setLoading(false);
            } else {
                toast.error(response?.message || "Failed to fetch process details");
                setLoading(false);
            }
        } catch (error) {
            toast.error("Error fetching process details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 pt-28">
        {/* Header */}
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-black flex items-center justify-center gap-2 tracking-tight">
            📑 Agreement / Contract Process
            </h1>
            <p className="text-gray-800 text-lg mt-2">
            Step-by-step process for drafting, reviewing, and executing agreements
            </p>
            <p className="text-sm text-gray-500 mt-1">
            Powered by <span className="font-semibold text-[#F6A507]">Know Your Terms</span>
            </p>
            <div className="mt-4 w-16 border-b-2 border-[#CDA047] mx-auto"></div>
        </header>

        {/* Search */}
        <div className="flex flex-col gap-1 mb-6 max-w-3xl mx-auto">
            <div className="flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agreement type..."
                className="border border-[#CDA047] rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-[#F6A507] outline-none bg-white text-black"
            />
            <Button
                onClick={handleView}
                loading={loading}
            >
                View Process
            </Button>
            </div>
            <div className="text-gray-500 italic text-sm mt-1 pl-1">
            Example: <span className="text-gray-600">Home Loan Agreement, Marriage Contract, Rental Agreement, Employment Contract</span>
            </div>
        </div>

        {/* Results */}
        {loading ? <Spinner loading={loading} /> : (
            showDetails && (
                <div className="border border-[#f3e9d2] rounded-2xl shadow-md bg-white max-h-[63vh] overflow-y-auto max-w-5xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="p-8 border-b border-[#f3e9d2] bg-[#fdf6ee]">
                        <h1 className="text-xl md:text-2xl font-bold text-black">
                            {query ? `${query} Process & Essentials` : 'Agreement Process & Essentials'}
                        </h1>
                    </div>
                    {/* Section Reusable - dynamic from showDetails */}
                    {/* Process Steps */}
                    {showDetails.processSteps && Array.isArray(showDetails.processSteps) && (
                        <section className="p-6 pb-4 border-b">
                            <h2 className="font-semibold text-xl text-black mb-3 flex items-center gap-2">
                                <span className="text-[#CDA047]">▌</span> Process Steps
                            </h2>
                            <ol className="list-decimal ml-6 space-y-1 text-gray-900">
                                {showDetails.processSteps.map((item: string, i: number) => <li key={i}>{item}</li>)}
                            </ol>
                        </section>
                    )}
                    {/* Required Documents */}
                    {showDetails.requiredDocuments && Array.isArray(showDetails.requiredDocuments) && (
                        <section className="p-6 pb-4 border-b">
                            <h2 className="font-semibold text-xl text-black mb-3 flex items-center gap-2">
                                <span className="text-[#CDA047]">▌</span> Required Documents
                            </h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-900">
                                {showDetails.requiredDocuments.map((item: string, i: number) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                    )}
                    {/* Create Agreement Online / creationLinks */}
                    {showDetails.creationLinks && Array.isArray(showDetails.creationLinks) && (
                        <section className="p-6 pb-4 border-b">
                            <h2 className="font-semibold text-xl text-black mb-3 flex items-center gap-2">
                                <span className="text-[#CDA047]">▌</span> Create Agreement Online
                            </h2>
                            <div className="flex flex-col gap-2">
                                {showDetails.creationLinks.map((link: any, i: number) => (
                                    link.url ? (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#F6A507] hover:underline font-medium"
                                        >
                                            {link.name || link.document}
                                        </a>
                                    ) : (
                                        <div key={i} className="text-gray-900">
                                            <span className="font-semibold">{link.document}:</span> {link.link}
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Price Information */}
                    {showDetails.priceInfo && Array.isArray(showDetails.priceInfo) && (
                        <section className="p-6 pb-4 border-b">
                            <h2 className="font-semibold text-xl text-black mb-3 flex items-center gap-2">
                                <span className="text-[#CDA047]">▌</span> Price Information
                            </h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-900">
                                {showDetails.priceInfo.map((item: any, i: number) => (
                                    typeof item === 'string' ? (
                                        <li key={i}>{item}</li>
                                    ) : (
                                        <li key={i}><span className="font-semibold">{item.document}:</span> {item.price}</li>
                                    )
                                ))}
                            </ul>
                        </section>
                    )}
                    {/* When You Need Expert Help */}
                    {showDetails.needExpert && (
                        <section className="p-6 pb-4 border-b last:border-0">
                            <h2 className="font-semibold text-xl text-black mb-3 flex items-center gap-2">
                                <span className="text-[#CDA047]">▌</span> When You Need Expert Help
                            </h2>
                            {Array.isArray(showDetails.needExpert) ? (
                                <ul className="list-disc ml-6 space-y-1 text-gray-900">
                                    {showDetails.needExpert.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                </ul>
                            ) : (
                                <div className="text-gray-900 whitespace-pre-line">{showDetails.needExpert}</div>
                            )}
                        </section>
                    )}

                    {/* Footer Branding (Web) */}
                    <footer className="mt-8 pb-4 border-gray-200 text-center text-xs text-gray-500">
                        Generated by <span className="font-semibold">Know Your Terms</span>
                    </footer>
                </div>
            )
        )}
        </div>
    );
}
