
export default function CaseSummary({ caseItem }: { caseItem: any }) {
  let dummySummary: any = caseItem || {};
  if (!caseItem) {
    return <div>Loading...</div>;
  }

  // Defensive: ensure all fields are arrays for .map, fallback to [] or string as needed
  const issues = Array.isArray(dummySummary.issues)
    ? dummySummary.issues
    : dummySummary.issues
      ? typeof dummySummary.issues === 'string'
        ? [dummySummary.issues]
        : []
      : [];

  const argumentsPetitioner = dummySummary.arguments && Array.isArray(dummySummary.arguments.petitioner)
    ? dummySummary.arguments.petitioner
    : dummySummary.arguments && dummySummary.arguments.petitioner
      ? typeof dummySummary.arguments.petitioner === 'string'
        ? [dummySummary.arguments.petitioner]
        : []
      : [];

  const argumentsRespondent = dummySummary.arguments && Array.isArray(dummySummary.arguments.respondent)
    ? dummySummary.arguments.respondent
    : dummySummary.arguments && dummySummary.arguments.respondent
      ? typeof dummySummary.arguments.respondent === 'string'
        ? [dummySummary.arguments.respondent]
        : []
      : [];

  const principles = Array.isArray(dummySummary.principles)
    ? dummySummary.principles
    : dummySummary.principles
      ? typeof dummySummary.principles === 'string'
        ? [dummySummary.principles]
        : []
      : [];

  return (
    <div className="mt-6 max-w-6xl mx-auto px-4">
      <div className="border border-[#f3e9d2] rounded-xl shadow-sm bg-white overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-[#f3e9d2] bg-[#fdf6ee]">
          <h1 className="text-xl md:text-2xl font-bold text-black">
            {dummySummary.caseTitle || 'Case Title'}
          </h1>
          <p className="text-sm text-gray-800 mt-1">
            {dummySummary.court || ''} <span className="mx-1 text-[#CDA047]">•</span> <span className="text-gray-500">{dummySummary.citation || ''}</span>
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 max-h-[65vh] overflow-y-auto space-y-8 bg-white">
          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Parties</h2>
            <p className="text-gray-900">
              <span className="font-semibold text-[#F6A507]">Case Between:</span> {dummySummary.parties?.petitioner || (typeof dummySummary.parties === 'string' ? dummySummary.parties : '')}
            </p>
            {/* <p className="text-gray-900">
              <span className="font-semibold text-[#F6A507]">Respondent:</span> {dummySummary.parties?.respondent || 'N/A'}
            </p> */}
          </section>

          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Facts</h2>
            <p className="text-gray-900 leading-relaxed">{dummySummary.facts || ''}</p>
          </section>

          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Issues</h2>
            <ul className="list-disc ml-6 text-gray-900 leading-relaxed">
              {(typeof dummySummary.issues === "string"
                ? dummySummary.issues.split('\n')
                : issues
              ).map((issue: string, i: number) => (
                <li key={i}>
                  {issue.replace(/^\d+\.\s*/, "")}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Arguments</h2>

            <h3 className="font-medium mt-2 text-gray-900">Petitioner</h3>
            <ul className="list-disc ml-6 text-gray-900 leading-relaxed">
              {argumentsPetitioner.map((arg: string, i: number) => (
                <li key={i}>{arg}</li>
              ))}
            </ul>

            <h3 className="font-medium mt-2 text-gray-900">Respondent</h3>
            <ul className="list-disc ml-6 text-gray-900 leading-relaxed">
              {argumentsRespondent.map((arg: string, i: number) => (
                <li key={i}>{arg}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Reasoning</h2>
            <p className="text-gray-900 leading-relaxed">
              {dummySummary.reasoning || ''}
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Decision</h2>
            <p className="text-gray-900 leading-relaxed">{dummySummary.decision || ''}</p>
          </section>

          <section>
            <h2 className="font-semibold text-black text-lg mb-2">Legal Principles</h2>
            <ul className="list-disc ml-6 text-gray-900 leading-relaxed">
              {(typeof dummySummary.principles === "string"
                ? dummySummary.principles.split('\n')
                : principles
              ).map((p: string, i: number) => {
                // Extract bolded part between ** and the rest
                const match = p.match(/\*\*(.*?)\*\*\:?\s*(.*)/);
                if (match) {
                  return (
                    <li key={i}>
                      <span className="font-bold">{match[1]}</span>
                      {match[2] ? `: ${match[2]}` : ""}
                    </li>
                  );
                }
                return <li key={i}>{p}</li>;
              })}
            </ul>
          </section>

          {/* Footer Branding (Web) */}
          <footer className="pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              Generated by <span className="font-semibold">Know Your Terms</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
