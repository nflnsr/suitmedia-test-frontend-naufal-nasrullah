import "@/styles/post-list.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams } from "react-router-dom";
import { useGetIdeas } from "@/features/ideas/useGetIdeas";
import { Card } from "@/components/card";
import ArrowSvg from "@/assets/icon/arrow.svg";
import DoubleArrowSvg from "@/assets/icon/double-arrow.svg";

export function PostList() {
  const [searchParams, setSearchParams] = useSearchParams({
    totalItems: "10",
    sortBy: "-published_at",
    page: "1",
  });

  const totalItems = parseInt(searchParams.get("totalItems") || "10");
  const sortBy = searchParams.get("sortBy") || "-published_at";
  const page = parseInt(searchParams.get("page") || "1");

  const sizeOptions = [
    { value: 10, text: 10 },
    { value: 20, text: 20 },
    { value: 50, text: 50 },
  ];

  const sortOptions = [
    { value: "-published_at", text: "latest" },
    { value: "published_at", text: "oldest" },
  ];

  const {
    data: ideas,
    isLoading,
    isError,
  } = useGetIdeas({
    queryKey: ["ideas", String(totalItems), sortBy, String(page)],
    params: {
      "page[number]": page,
      "page[size]": totalItems,
      "append[]": ["medium_image", "small_image"],
      sort: sortBy,
    },
  });

  const handleSelectedSizeChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("totalItems", value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handleSelectedSortChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("sortBy", value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handleSelectedPageChange = (value: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(value));
      return prev;
    });
  };

  const maxPaginationButtons = 5;
  const jumpPaginationDoubleArrow = 5;
  const jumpPaginationSingelArrow = 1;

  const calculatePaginationRange = () => {
    const totalPages = Math.ceil(ideas?.meta.total / totalItems);
    const halfMaxButtons = Math.floor(maxPaginationButtons / 2);

    let start = Math.max(1, page - halfMaxButtons);
    const end = Math.min(totalPages, start + maxPaginationButtons - 1);

    if (end - start + 1 < maxPaginationButtons) {
      start = Math.max(1, end - maxPaginationButtons + 1);
    }

    return { start, end };
  };

  return (
    <>
      <section
        id="post-list"
        className="mx-auto mt-8 max-w-screen-xl justify-between px-5"
      >
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
          <div className="flex justify-center items-center">
            <p className="inline-block">Showing 1 - {totalItems} of &nbsp;</p>
            {isLoading ? (
              <div className="inline-block mt-1.5 animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-gray-900"></div>
            ) : (
              <p className="inline-block">
                {ideas?.meta.total.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-4 max-[350px]:flex-col">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <label htmlFor="show-per-page" className="pb-1">
                Showing per page:
              </label>
              <select
                id="show-per-page"
                className="h-10 w-36 rounded-2xl px-4 ring-2 ring-gray-200"
                value={totalItems}
                onChange={(e) => handleSelectedSizeChange(e.target.value)}
              >
                {sizeOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <label htmlFor="sort-by" className="pb-1">
                Sort by:
              </label>
              <select
                id="sort-by"
                className="h-10 w-40 rounded-2xl px-4 ring-2 ring-gray-200"
                value={sortBy}
                onChange={(e) => handleSelectedSortChange(e.target.value)}
              >
                {sortOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Card ideas={ideas?.data} isLoading={isLoading} isError={isError} />

        <div className="my-20 flex justify-center">
          {!isError && !isLoading && (
            <div className="flex">
              <button
                className="disabled:opacity-35"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("page", String(page - jumpPaginationDoubleArrow));
                    return prev;
                  });
                }}
                disabled={page <= 5}
              >
                <img src={DoubleArrowSvg} alt="" className="-rotate-90" />
              </button>
              <button
                className="disabled:opacity-35"
                onClick={() => {
                  if (page > 1) {
                    handleSelectedPageChange(page - 1);
                  }
                }}
                disabled={page <= 1}
              >
                <img src={ArrowSvg} alt="" className="rotate-180" />
              </button>
              {Array.from(
                {
                  length:
                    calculatePaginationRange().end -
                    calculatePaginationRange().start +
                    1,
                },
                (_, index) => (
                  <div key={index} className="inline px-0.5">
                    <button
                      onClick={() =>
                        handleSelectedPageChange(
                          calculatePaginationRange().start + index,
                        )
                      }
                      className={`h-8 w-8 rounded-md ${
                        page === calculatePaginationRange().start + index &&
                        "bg-orange-500 text-white disabled:cursor-default"
                      }`}
                      disabled={
                        page === calculatePaginationRange().start + index
                      }
                    >
                      {calculatePaginationRange().start + index}
                    </button>
                  </div>
                ),
              )}
              <button
                className="disabled:opacity-35"
                onClick={() => {
                  if (page < Math.ceil(ideas?.meta.total / totalItems)) {
                    handleSelectedPageChange(page + jumpPaginationSingelArrow);
                  }
                }}
                disabled={page >= Math.ceil(ideas?.meta.total / totalItems)}
              >
                <img src={ArrowSvg} alt="" className="" />
              </button>
              <button
                className="disabled:opacity-35"
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("page", String(page + jumpPaginationDoubleArrow));
                    return prev;
                  });
                }}
                disabled={
                  page + jumpPaginationDoubleArrow >
                  Math.ceil(ideas?.meta.total / totalItems)
                }
              >
                <img src={DoubleArrowSvg} alt="" className="rotate-90" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
