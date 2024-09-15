import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { RightDrawer } from "../RightDrawer";
import { Radio } from "../Radio";
import * as Yup from "yup";
import { useTaskByIdQuery } from "@/slices/apiSlice";

const Createtask = ({
  hideModal,
  createtask,
  getById,
  updateDeleteModal,
  updateTaskMutaion,
}: any) => {
  const ValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title should not exceed 50 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(100, "Description should not exceed 100 characters"),
    status: Yup.string().required("Status is required"),
  });

  const { data: getByIdd } = useTaskByIdQuery(
    {
      id: getById,
    },
    {
      skip: !getById,
    }
  );

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const initial = {
    title: "",
    description: "",
    status: "Pending",
  };
  return (
    <>
      <RightDrawer
        header={`${updateDeleteModal ? "Update Task" : "Create New Task"}`}
        hideModal={hideModal}
      >
        <div className="flex flex-col ">
          <Formik
            initialValues={getByIdd && updateDeleteModal ? getByIdd : initial}
            onSubmit={(values, actions): any => {
              const payLoad = {
                taskId: getById,
                taskData: {
                  title: values.title,
                  description: values.description,
                  status: values.status,
                },
              };
              if (!getByIdd && !updateDeleteModal)
                createtask(values).then(() => {
                  hideModal(true);
                });
              else {
                updateTaskMutaion(payLoad);
              }
            }}
            enableReinitialize
            validationSchema={ValidationSchema}
          >
            {({ values, errors, touched, setFieldValue, validateForm }) => (
              <Form>
                <div className="relative flex flex-col overflow-y-scroll formHeight580 p-6">
                  <div className="flex gap-2">
                    {console.log(getByIdd, values, "values")}
                    <div className="grid grid-cols-1 w-full mb-4">
                      <div>
                        <div className="block text-sm font-medium text-pvPrimaryText mb-1 text-left cursor-default">
                          Title
                        </div>

                        <div className="mr-3 mb-3">
                          <Field
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            className="w-full h-10 shadow p-0 rounded border flex items-center mb-4 border-gray-300 px-3 py-0 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-2.5"
                            style={{ paddingLeft: "10px" }}
                          />
                          {errors.title && touched.title && (
                            <div className="text-red-500 text-xs">
                              {errors.title}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="block text-sm font-medium text-pvPrimaryText mb-1 text-left cursor-default">
                          Description
                        </div>

                        <div className="mr-3 mb-3">
                          <Field
                            type="text"
                            placeholder="Enter Description"
                            name="description"
                            className="w-full h-10 shadow p-0 rounded border flex items-center mb-4 border-gray-300 px-3 py-0 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-2.5"
                            style={{ paddingLeft: "10px" }}
                          />
                          {errors.description && touched.description && (
                            <div className="text-red-500 text-xs">
                              {errors.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-medium flex gap-1 mb-2">
                          Task Status
                          <div className="flex items-center ml-1">
                            <Radio
                              checked={values?.status === "Pending"}
                              name={"Pending"}
                              onChange={(event) => {
                                setFieldValue("status", "Pending");
                              }}
                            />
                            <label>Pending</label>
                          </div>
                          <div className="flex items-center ml-2">
                            <Radio
                              checked={values?.status === "Completed"}
                              name={"Completed"}
                              onChange={(event) => {
                                setFieldValue("status", "Completed");
                              }}
                            />
                            <label>Completed</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex absolute bg-white bottom-0 w-full items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="md:px-12 sm:px-2 py-2 mb-1 mr-2 text-sm transition-all duration-150 ease-linear drop-shadow-sm shadow-sm-light shadow-pvShadowPrimary/20 bg-gray-200 text-pvPrimaryText font-medium rounded-md outline-none focus:outline-none"
                    type="button"
                    onClick={() => hideModal(true)}
                  >
                    Cancel
                  </button>

                  <button
                    className="md:px-12 sm:px-8 py-2 mb-1 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-blue-500 focus:outline-none"
                    type="submit"
                  >
                    {updateDeleteModal ? "Update Task" : "Create Task"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </RightDrawer>
    </>
  );
};

export default Createtask;
