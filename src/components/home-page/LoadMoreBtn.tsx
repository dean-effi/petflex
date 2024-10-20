import Spinner from "../Spinner";

export default function LoadMoreBtn({
  isFetchingNextPage,
  onBtnClick,
}: {
  isFetchingNextPage: boolean;
  onBtnClick: () => void;
}) {
  return (
    <div className="grid justify-center">
      {isFetchingNextPage ? (
        <div className="my-6 flex min-w-20 justify-center rounded-lg border-2 border-violet-800 px-2 py-1 text-xl text-violet-800">
          <Spinner width={26} />
        </div>
      ) : (
        <button
          onClick={onBtnClick}
          className="my-6 rounded-lg border-2 border-violet-800 px-2 py-1 text-xl font-bold text-violet-800 transition-all hover:bg-violet-800 hover:text-stone-50 active:bg-violet-500"
        >
          load more...
        </button>
      )}
    </div>
  );
}
