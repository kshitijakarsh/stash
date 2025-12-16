import SearchCard from "../stash_ui/SearchCard";

export default function WhyStash() {
  const staticStash = {
    0: [
      { id: "1", url: "github.com" },
      { id: "2", url: "docs.react.dev" },
    ],
    1: [{ id: "3", url: "vercel.com" }],
    2: [{ id: "4", url: "tailwindcss.com" }],
    3: [{ id: "5", url: "openai.com" }],
  } as const;

  return (
    <section className="w-full ">
      <div className="max-w-4xl w-full text-center font-slab flex flex-col justify-center px-4 mt-20 mx-auto">
        <h1 className="text-4xl leading-tight">
          Bookmarks are where links go to die
        </h1>

        <div className="max-w-3xl mx-auto">
          <p className="mt-2 text-base text-gray-600 font-sans">
            Stop treating your browser like a junk drawer.{" "}
            <span className="font-semibold">Stash</span> replaces the clutter
            with intelligent memory, so you never lose a good idea again
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl h-180 rounded-xl shadow-sm bg-linear-to-b from-[#D9D9D9]/40 to-[#737373]/10 mx-auto mt-20 p-10">
        <div className="grid grid-cols-2 gap-10 h-full">
          <div className="flex flex-col justify-between">
            <h2 className="text-3xl font-slab">Why Stash?</h2>

            <div className="flex flex-col gap-4">
              <div className="bg-linear-to-b from-white/20 to-white/40 rounded-2xl p-6 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Natural Search
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 max-w-md">
                    Forgot the title? Just describe what you're looking for.
                  </p>
                </div>
                <SearchCard />
              </div>

              <div className="bg-linear-to-b from-white/20 to-white/40 rounded-2xl p-6 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Read Later, Distraction Free
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 max-w-md">
                    Stash strips away ads and popups, saving a clean version of
                    the article
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className="bg-linear-to-b from-white/20 to-white/40 rounded-2xl h-96 p-6 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Intelligent Sorting
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 max-w-md">
                    Your links automatically organize themselves by context,
                    relevance, and usage.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="relative rounded-xl border p-3 bg-white/50 backdrop-blur-sm overflow-hidden"
                    >
                      <div className="flex flex-col gap-1">
                        {staticStash[i as 0 | 1 | 2 | 3]
                          .slice(0, 3)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="text-xs bg-neutral-100/90 px-2 py-1 rounded-sm truncate"
                            >
                              {item.url}
                            </div>
                          ))}
                      </div>

                      {staticStash[i as 0 | 1 | 2 | 3].length > 3 && (
                        <span className="absolute bottom-2 right-2 text-[10px] text-neutral-500">
                          +{staticStash[i as 0 | 1 | 2 | 3].length - 3} more
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-linear-to-b from-white/20 to-white/40 rounded-xl flex-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
