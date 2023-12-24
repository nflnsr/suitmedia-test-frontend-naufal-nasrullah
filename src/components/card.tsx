import { Idea } from "@/types/ideas";
import { useEffect, useState } from "react";
import { CardSkeleton } from "@/components/card-skeleton";

type CardProps = {
  ideas: Idea[];
  isLoading: boolean;
  isError: boolean;
};

export function Card({ ideas, isLoading, isError }: CardProps) {
  const [modifiedIdeas, setModifiedIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const convertDate = async () => {
      const newIdeas = await ideas?.map((idea: Idea) => {
        return {
          ...idea,
          published_at: new Date(idea.published_at).toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          ),
        };
      });
      setModifiedIdeas(newIdeas);
    };
    convertDate();
  }, [ideas]);

  return (
    <>
      <div
        id="card-idea"
        className="mt-10 grid w-full gap-6 sm:grid-cols-3 lg:grid-cols-5 min-[400px]:px-0 px-2 min-[400px]:grid-cols-2 lg:grid-rows-2"
      >
        {isLoading && <CardSkeleton />}
        {isError && !isLoading && modifiedIdeas === undefined && (
          <p className="col-span-3 col-start-2 mt-4 text-center text-xl">
            Something went wrong in server, try again later!
          </p>
        )}
        {modifiedIdeas?.map((idea: Idea) => (
          <div
            key={idea.id}
            className="relative rounded-lg shadow-xl ring-1 ring-gray-100"
          >
            <img
              src={idea?.medium_image?.[0]?.url}
              alt="content image"
              className="h-40 w-full rounded-t-[inherit]"
              loading="lazy"
            />
            <div className="p-5">
              <p>{idea?.published_at}</p>
              <p className="line-clamp-3 text-lg font-medium">{idea?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
