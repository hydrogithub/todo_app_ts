import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Search from "../../public/search.svg";
import { filtersReducer } from "../redux/FiltersSlice";
import { Formik, Form } from "formik";
import * as yup from "yup";

const Filter = () => {
  // const [searchTask, setSearchTask] = useState("");
  const dispatch = useDispatch();

  return (
    // <div className="form__field search_group">
    <Formik
      initialValues={{
        search: "",
      }}
      validationSchema={yup.object({
        search: yup.string().required("Chưa nhập task"),
      })}
      onSubmit={({ search }) => {
        console.log(search);

        dispatch(filtersReducer.actions.searchFilterChange(search));
      }}
    >
      {(formik) => (
        <Form className="form__field search_group">
          <div className="search">
            <label htmlFor="search">Tìm kiếm</label>
            <input
              type="text"
              name="search"
              id="search"
              value={formik.values.search}
              placeholder="Công việc cần tìm..."
              onChange={formik.handleChange}
            />
            {formik.errors.search ? (
              <div className="error">{formik.errors.search}</div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn">
            Tìm
          </button>
        </Form>
      )}
    </Formik>
    // </div>
  );
};

export default Filter;
