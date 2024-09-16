import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { authstatus } from "@/stores/auth";
import { useSelector } from "react-redux";
import { dateFormat } from "@/components/utils";
import OptionPopup from "@/components/OptionPopup";
import { Action } from "@/components/common/Icons";
import { usePopper } from "react-popper";
import {} from "@/slices/auth";
import { Table } from "@/components/Table/Table";
import Createtask from "@/components/Createtask";
import Success from "@/components/Popup/Success";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useViewTasksQuery,
} from "@/slices/apiSlice";
import { ConfirmModal } from "@/components/Popup/ConfirmModal";
import { Loader } from "@/components/Loader";

const IndexPage = () => {
  const { data: Tasks, error, isLoading } = useViewTasksQuery({});
  const router = useRouter();
  const authStateredux = useSelector(authstatus);
  let authState;
  if (typeof window !== "undefined") {
    authState = localStorage.getItem("token");
  }
  const [createtask, setCreateTask] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [updateDeleteModal, setUpdateDeleteModal] = useState(false);
  const [idForDeleteUpdate, setIdForDeleteUpdate] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          return <div>{row.original?.status}</div>;
        },
      },
      {
        header: "Created Date",
        accessorKey: "timestamp",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.timestamp
                ? dateFormat(row.original.timestamp)
                : "-"}
            </div>
          );
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        // cell: ({ row }) => {
        //   return <div>{row.original?.description}</div>;
        // },
      },
      {
        header: "Action",
        accessorKey: "id",
        disableSortBy: true,
        cell: ({ row }) => {
          const refElement = useRef();
          const popElement = useRef();
          const [showFilter, setShowFilter] = useState(false);

          const { styles, attributes } = usePopper(
            refElement.current,
            popElement.current,
            {
              placement: showFilter ? "left-start" : "auto",
              strategy: "fixed",
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    padding: 16,
                  },
                },
                {
                  name: "flip",
                  options: {
                    fallbackPlacements: [
                      "bottom-start",
                      "bottom-end",
                      "top-start",
                      "top-end",
                      "left-start",
                      "left-end",
                      "right-start",
                      "right-end",
                    ],
                  },
                },
              ],
            }
          );

          const deleteModal = () => {
            setIdForDeleteUpdate(row.original?._id);
            setShowFilter(false);
            setOpenDeleteModal(true);
          };
          const viewEdit = () => {
            setIdForDeleteUpdate(row.original?._id);
            setShowFilter(false);
            // setOpenDeleteModal(false);
          };
          const actions = [
            { text: "Delete", action: () => deleteModal() },
            { text: "Edit", action: () => viewEdit() },
          ];

          const Optionpopup = () => (
            <OptionPopup
              actions={actions}
              hideModal={() => setShowFilter(false)}
            />
          );

          return (
            <div className="">
              <button
                ref={refElement}
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              >
                <Action className="text-gray-o-480" />
              </button>
              <div
                ref={popElement}
                className="z-30 absolute"
                style={styles.popper}
                {...attributes.popper}
              >
                {showFilter && <Optionpopup />}
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const [
    createTaskMutation,
    { isLoading: createTaskLoaing, data: createdTaskData },
  ] = useCreateTaskMutation();
  const [
    updateTaskMutaion,
    { isLoading: updateTaskLoading, data: updateTaskData },
  ] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: deleteTaskLoading, data: DeleteTaskData }] =
    useDeleteTaskMutation();

  useEffect(() => {
    if (createdTaskData || updateTaskData) {
      setSuccessModal(true);
      setCreateTask(false);
    }
    setTimeout(() => {
      setSuccessModal(false);
    }, 1200);
  }, [Tasks, updateTaskData]);

  useEffect(() => {
    if (authState == "false" || authState == null) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (idForDeleteUpdate && !openDeleteModal) {
      setCreateTask(true);
      setUpdateDeleteModal(true);
    }
  }, [idForDeleteUpdate]);

  const handleLogout = () => {
    localStorage.setItem("auth", "false");
    router.push("/login");
  };
  const handleDelete = () => {
    deleteTask(idForDeleteUpdate);
    setOpenDeleteModal(false);
  };
  return (
    <div className="flex flex-col w-full bg-white h-screen right-20">
      {authState && (
        <div className="">
          {createtask && !openDeleteModal && (
            <Createtask
              hideModal={() => setCreateTask(false)}
              createtask={createTaskMutation}
              updateTaskMutaion={updateTaskMutaion}
              getById={idForDeleteUpdate}
              updateDeleteModal={updateDeleteModal}
            />
          )}
          {isLoading && <Loader isLoading={isLoading} />}

          {openDeleteModal && (
            <ConfirmModal
              hideModal={() => setOpenDeleteModal(false)}
              action={handleDelete}
              message={"Are you sure you want to Delete your Task ?"}
            />
          )}

          {successModal && (
            <Success
              message={`${
                idForDeleteUpdate
                  ? "Task Updated Successfully"
                  : "Task Created Successfully"
              }`}
              hideModal={() => setSuccessModal(false)}
            />
          )}

          <div className="flex flex-col items-end   mt-4 mr-10 ">
            <h1
              className="w-40 text-center py-3 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e5921d] cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </h1>
            <button
              className="text-white mt-4 mr-10 text-sm bg-primary-o-600 py-0 px-0 rounded-full"
              onClick={() => {
                setCreateTask(true), setUpdateDeleteModal(false);
              }}
            >
              {/* {buttonName} */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="99" fill="#2E94EA" />
                <path
                  d="M12.0002 19.9995H28.0002M20.0002 27.9995V11.9995"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            <Table data={Tasks} columns={columns} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
