import GitHubTable from "./GitHubTable";

export default async function GithubContributionTable() {
  const githubTableDataResponse = await fetch(
    "https://github-contributions.vercel.app/api/v1/4furki4",
    {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["github-contributions"],
      },
    }
  );
  const githubTableData: GithubContributionResponse =
    await githubTableDataResponse.json();
  return <GitHubTable githubTableData={githubTableData} />;
}
