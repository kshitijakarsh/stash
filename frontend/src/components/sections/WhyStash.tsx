import MultiplayerCard from "../stash_ui/MultiplayerCard";
import SearchCard from "../stash_ui/SearchCard";
import StashCard from "../stash_ui/StashCard";

export default function WhyStash() {
  return (
    <section className="w-full">
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

          <div className="flex flex-col gap-6 h-full">
            {/* Top card */}
            <div className="relative bg-linear-to-b from-white/20 to-white/40 rounded-2xl p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Intelligent Sorting
                </h2>
                <p className="mt-1 text-sm text-neutral-600 max-w-md">
                  Your links automatically organize themselves by context,
                  relevance, and usage.
                </p>
              </div>

              <StashCard />
            </div>

            {/* Bottom card */}
            <div className="relative bg-linear-to-b from-white/20 to-white/40 rounded-xl p-6 flex flex-col flex-1">
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Built for Multiplayer.
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Don't just share. Stash together. Collaborative bookmarking
                  that keeps your team on the same page.
                </p>
              </div>

              {/* Anchor */}
              <div className="flex justify-end">
                <MultiplayerCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
