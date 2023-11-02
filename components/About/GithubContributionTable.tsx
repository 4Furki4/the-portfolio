import { useSearchParams } from "next/navigation";
import React from "react";

export default function GithubContributionTable({
  githubTableData,
}: {
  githubTableData: GithubContributionResponse;
}) {
  const params = useSearchParams();
  const yearFrom = params.get("from");
  const yearTo = params.get("to");
  return (
    <section>
      <h2 className="text-3xl font-bold">Github Contribution Table</h2>
      <div className="max-w-full overflow-y-hidden overflow-x-auto">
        <table className="max-w-max border-separate border-spacing-[3px] overflow-hidden relative">
          <thead>
            {/* todo: render month names based on selected option */}
            <tr className="h-[13px]"></tr>{" "}
          </thead>
        </table>
      </div>
    </section>
  );
}
