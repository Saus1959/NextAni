import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";

const SearchHeader = ({
  onChange,
  val,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  val: string;
}) => {
  return (
    <div className="md:flex md:justify-end md:items-center md:px-10">
      <label className="flex mx-5 mt-5 md:mx-0 h-11 w-90% shrink-0 items-center gap-2.5 sm:w-64 lg:w-75 rounded-md border-[1.5px] border-ink bg-card px-3.5 text-muted focus-within:border-accent">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4 shrink-0" />
        <input
          onChange={onChange}
          value={val}
          type="search"
          placeholder="Search your anime"
          className="w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted sm:text-sm"
        />
      </label>
    </div>
  );
};

export default SearchHeader;
