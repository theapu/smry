import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { headers } from "next/headers";
import ArrowTabs from "@/components/arrow-tabs";
import { ArticleContent } from "@/components/article-content";
import { ArticleLength } from "@/components/article-length";
import Loading from "./loading";
import { ResponsiveDrawer } from "@/components/responsiveDrawer";
import SummaryForm from "@/components/summary-form";
import ErrorBoundary from "@/components/error";

export const dynamic = "force-dynamic";

type Article = {
  title: string;
  byline: null | string;
  dir: null | string;
  lang: null | string;
  content: string;
  textContent: string;
  length: number;
  siteName: null | string;
};

export type ResponseItem = {
  source: string;
  article?: Article;
  status?: string; // Assuming 'status' is optional and a string
  error?: string;
  cacheURL: string;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const headersList = headers();
  const ip = headersList.get("x-real-ip") || "default_ip";

  // error is here, searchParams are empty in production

  const url = searchParams?.url as string;

  if (!url) {
    // Handle the case where URL is not provided or not a string
    console.error(
      "URL parameter is missing or invalid",
      url,
      searchParams["url"],
      searchParams
    );
  }

  // if the url contains "orlandosentinel.com" then we should return nothing and let the user know that the orlando sentinel article is not available

  if (url?.includes("orlandosentinel.com")) {
    return (
      <div className="mt-20">
        Sorry, articles from the orlando sentinel are not available
      </div>
    );
  }

  const sources = ["smry", "archive", "wayback", "jina.ai"];


  return (
    <div className="mt-20">

      <div className="px-4 py-8 md:py-12 mt-20">
        <div className="mx-auto space-y-10 max-w-prose">
          <main className="prose">
            {url ? (
              <>
                <div className="flex items-center justify-between bg-[#FBF8FB] p-2 rounded-lg shadow-sm mb-4 border-zinc-100 border">
                  <h2 className="ml-4 mt-0 mb-0 text-sm font-semibold text-gray-600">
                    Get AI-powered key points
                  </h2>
                  <ResponsiveDrawer>
                    <Suspense
                      key={"summary"}
                      fallback={
                        <Skeleton
                          className="h-32 rounded-lg animate-pulse bg-zinc-200"
                          style={{ width: "100%" }}
                        />
                      }
                    >
                      <div className="remove-all">
                        <SummaryForm urlProp={url} ipProp={ip} />
                      </div>
                    </Suspense>
                  </ResponsiveDrawer>
                </div>
                <ArrowTabs
                  sources={sources}
                  lengthDirect={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from direct source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"direct"} fallback={null}>
                        <ArticleLength url={url} source={"direct"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  lengthWayback={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from wayback source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"wayback"} fallback={null}>
                        <ArticleLength url={url} source={"wayback"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  lengthJina={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from jina.ai source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"jina.ai"} fallback={null}>
                        <ArticleLength url={url} source={"jina.ai"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  lengthArchive={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from archive source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"archive"} fallback={null}>
                        <ArticleLength url={url} source={"archive"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  innerHTMLDirect={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from direct source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"direct"} fallback={<Loading />}>
                        <ArticleContent url={url} source={"direct"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  innerHTMLWayback={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from wayback source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"wayback"} fallback={<Loading />}>
                        <ArticleContent url={url} source={"wayback"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  innerHTMLGoogle={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from jina.ai source, refresh the page
                          to try again
                        </div>
                      }
                    >
                      <Suspense key={"jina.ai"} fallback={<Loading />}>
                        <ArticleContent url={url} source={"jina.ai"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                  innerHTMLArchive={
                    <ErrorBoundary
                      fallback={
                        <div>
                          Could not fetch from archive.is source, refresh the
                          page to try again
                        </div>
                      }
                    >
                      <Suspense key={"archive.is"} fallback={<Loading />}>
                        <ArticleContent url={url} source={"archive"} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              </>
            ) : (
              <Skeleton />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
