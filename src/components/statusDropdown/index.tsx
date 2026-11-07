import { useEffect, useRef, useState } from "react";
import { IOptVal } from "../../types/libraryPage/libMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { KitsuDetails } from "../../types/detailsPage/detailMain";
import useLibraryStore from "../../store/libraryStore";

const StatusDropdown = ({
  name,
  options,
  animanga,
}: {
  name: string;
  options: string[];
  animanga: KitsuDetails;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const updateStatus = useLibraryStore((state) => state.updateAniMangaStatus);
  const libStore = useLibraryStore((state) => state.library);

  const existingItem = libStore.find((item) => item?.id === animanga?.data?.id);

  const currentStatus = existingItem?.status;

  const newOptions = options.map(
    (opt, index): IOptVal => ({
      option: opt,
      id: index + 1,
    }),
  );

  useEffect(() => {
    if (!open) return;
    const handle = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [open]);

  return (
    <div className="relative w-full sm:ml-5 sm:w-48" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className={`flex min-h-11 cursor-pointer items-center justify-between rounded-md border border-transparent bg-ink px-4 py-2 text-[15px] font-semibold text-paper transition-all hover:bg-accent ${
          open ? "rounded-b-none border-b-transparent shadow-sm" : ""
        }`}
      >
        <span className="truncate">{currentStatus || name}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 flex w-full flex-col overflow-hidden rounded-b-md bg-ink shadow-lg">
          {newOptions
            .filter((opt) => opt.option !== currentStatus)
            .map(({ option, id }) => {
              const isSelected = currentStatus === option;

              return (
                <div
                  key={id}
                  onClick={() => {
                    setOpen(false);
                    updateStatus(animanga, option);
                  }}
                  className={`flex cursor-pointer items-center select-none px-4 py-3 text-[15px] transition-colors sm:py-2 ${
                    isSelected
                      ? "bg-accent font-bold text-white"
                      : "font-semibold text-paper hover:bg-accent"
                  }`}
                >
                  {option}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
