import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <main className="m-auto z-40 text-center">
      <h1 className="text-fs-600">{t("title")}</h1>
      <Link className="text-fs-300 underline" href="/">
        {t("link")}
      </Link>
    </main>
  );
}
