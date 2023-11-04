import About from "@/components/Pages/About";
import { getBase64 } from "@/lib/getBase64ImageUrl";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About",
  description: "About page containing contact information and a short bio.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about",
    title: "About | Furkan Cengiz",
    description: "About page containing contact information and a short bio.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default async function page() {
  const blurredImage = await getBase64("pics/furkan.png");
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
  console.log(githubTableData);
  return (
    <About blurredImage={blurredImage} githubTableData={githubTableData} />
  );
}
