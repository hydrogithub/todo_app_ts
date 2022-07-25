import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Search from "../../public/search.svg";
import { filtersReducer } from "../redux/FiltersSlice";

const Filter = () => {
  const [searchTask, setSearchTask] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="form__field search_group">
      <div className="search">
        <label htmlFor="search">Tìm kiếm</label>
        <input
          type="text"
          name="search"
          id="search"
          value={searchTask}
          placeholder="Công việc cần tìm..."
          onChange={(e) => {
            setSearchTask(e.target.value);
            dispatch(filtersReducer.actions.searchFilterChange(e.target.value));
          }}
        />
      </div>
      <div className="btn">
        <Image src={Search} alt="searchbtn" />
      </div>
    </div>
  );
};

export default Filter;
