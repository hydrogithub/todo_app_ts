import React, { ReactElement, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Todo } from "interface";
import { todoRemainingSelector } from "../redux/selectors";
import Filter from "./Filter";

import { todoReducer } from "../redux/TodoSlice";
import { filtersReducer } from "../redux/FiltersSlice";

const statusList = [
    { name: "ALL", display: "Tất cả" },
    { name: "Completed", display: "Đã hoàn thành" },
    { name: "Todo", display: "Chưa hoàn thành" },
];

function Layout(): ReactElement {
    const [filterStatus, setFilterStatus] = useState("ALL");
    const dispatch = useDispatch();

    const todoList = useSelector(todoRemainingSelector);

    const toggleTodo = (id: string) => {
        dispatch(todoReducer.actions.toggleTodoList(id));
    };

    return (
        <div className="container">
            <div className="main">
                <div className="top">
                    <h1>TODO APP DEMO</h1>
                    <div className="form__top">
                        <Filter />

                        <div className="form__field status_group">
                            <div>Lọc theo trạng thái</div>
                            <div className="status_content">
                                {statusList.map(item => (
                                    <div className="status" key={item.name}>
                                        <input
                                            type="radio"
                                            name="status"
                                            id={item.name}
                                            value={item.name}
                                            checked={item.name === filterStatus}
                                            onChange={e => {
                                                setFilterStatus(e.target.value);
                                                dispatch(
                                                    filtersReducer.actions.statusFilterChange(
                                                        e.target.value
                                                    )
                                                );
                                            }}
                                        />
                                        <label htmlFor={item.name}>
                                            {item.display}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="list__task">
                            {todoList.length === 0 ? (
                                <h3 className="text-center">
                                    Không có công việc nào !!!
                                </h3>
                            ) : (
                                todoList.map((item: Todo) => (
                                    <div className="task" key={item.id}>
                                        <div className="content">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                defaultChecked={item.completed}
                                                onClick={() =>
                                                    toggleTodo(item.id)
                                                }
                                            />
                                            <label
                                                className={
                                                    item.completed
                                                        ? "strike"
                                                        : ""
                                                }
                                                htmlFor={item.id}
                                            >
                                                {item.name}
                                            </label>
                                        </div>
                                        <div
                                            className={`priority priority--${item.priority}`}
                                        >
                                            {item.priority}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        addTodo: "",
                        selectPriority: "Medium",
                    }}
                    validationSchema={yup.object({
                        addTodo: yup
                            .string()
                            .min(2, "Ít nhất 2 ký tự")
                            .required("Chưa nhập task"),
                    })}
                    onSubmit={({ addTodo, selectPriority }, actions) => {
                        console.log(addTodo);

                        dispatch(
                            todoReducer.actions.addTodo({
                                id: uuidv4(),
                                name: addTodo,
                                completed: false,
                                priority: selectPriority,
                            })
                        );
                        actions.resetForm();
                    }}
                >
                    {formik => (
                        <Form>
                            <div className="bottom">
                                <div className="form__field search_group">
                                    <div className="search">
                                        <div>Thêm công việc</div>
                                        <input
                                            type="text"
                                            name="addTodo"
                                            id="addTodo"
                                            placeholder="Công việc muốn thêm..."
                                            value={formik.values.addTodo}
                                            onChange={formik.handleChange}
                                            // onChange={(e) => setNewTask(e.target.value)}
                                        />
                                        <select
                                            className={
                                                formik.values.selectPriority ===
                                                "High"
                                                    ? "select__priority priority--High"
                                                    : formik.values
                                                          .selectPriority ===
                                                      "Medium"
                                                    ? "select__priority priority--Medium"
                                                    : "select__priority priority--Low"
                                            }
                                            name="selectPriority"
                                            id="selectPriority"
                                            value={formik.values.selectPriority}
                                            onChange={formik.handleChange}
                                            // onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option value="High">High</option>
                                            <option value="Medium">
                                                Medium
                                            </option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn">
                                        Thêm
                                    </button>
                                </div>
                                {formik.errors.addTodo ? (
                                    <div className="error">
                                        {formik.errors.addTodo}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Layout;
