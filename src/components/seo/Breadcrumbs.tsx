import Link from "next/link";
import { BreadcrumbSchema } from "./JsonLd";

interface Crumb {
  name: string;
  url: string;
}

/**
 * Visible breadcrumb nav + BreadcrumbList JSON-LD in one component.
 * The LAST item is rendered as plain text (current page).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={item.url} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-gray-300 truncate" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.url}
                    className="hover:text-violet-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
