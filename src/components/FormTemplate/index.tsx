import { startCase, toNumber, toString } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { regexEmail, regexOnlyLetter } from "../../helpers/regex";

import { ProfileTemplate, TypeTab } from "../../types";
import "./FormAdd.scss";
import { useQuery } from "./../../hooks/useQuery";
interface FormAddProps {
  info?: ProfileTemplate;
  turnOffForm: () => void;
}
// grade là khối, class là lớp
const YEAR_FIRST = 1980;
const YEAR_LAST = 2005;
const empty = {
  first_name: "",
  last_name: "",
  address: "",
  class: "",
  date_of_birth: "",
  email: "",
  gender: "",
  id: "",
  grade: -1,
};
export const FormTemplate = (props: FormAddProps) => {
  const { turnOffForm } = props;

  const query = useQuery();
  const id = query.get("id") || "";
  const typeForm = query.get("status") || "";
  const { type: typeTab } = useParams<{ type: TypeTab }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const message = {
    pending: `${
      typeForm === "add" ? "Add" : "Edit"
    } ${typeTab} is pending 😙😙😙`,
    success: `${
      typeForm === "add" ? "Add" : "Edit"
    }  ${typeTab} resolved 👌👌👌`,
    error: "Some things went wrong 🤯🤯🤯",
  };
  const [chooseClassState, setClassState] = React.useState<string>("");
  const [chooseGradeState, setChooseGradeSate] = React.useState<string>("");

  // 10A1 -> 10

  const getGradeByClass = (Class: string) => {
    return Class.slice(0, 2);
  };

  console.log(errors);

  const onSubmit = (data: ProfileTemplate) => {
    const { date_of_birth } = data;
    if (
      new Date(date_of_birth).getFullYear() > YEAR_LAST ||
      new Date(date_of_birth).getFullYear() < YEAR_FIRST
    ) {
      toast("😢 Fields Date of Birth Invalid!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // add
    if (typeForm === "add") {
    }

    // edit
    else {
      Swal.fire({
        title: "Do you want to save the changes 🤔? ",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancle 🙄",
        confirmButtonText: "Save 😉",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //handle when on sumbit -> edit or add
        }
      });
    }
    turnOffForm();
  };

  const renderForm = () => {
    return (
      <React.Fragment>
        <div className="td-form-add__title">
          <span>{`${startCase(typeForm)} a ${startCase(typeTab)}`}</span>
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={turnOffForm}
          >
            <path
              d="M18.125 0.75H1.875C0.820312 0.75 0 1.60938 0 2.625V16.375C0 17.4297 0.820312 18.25 1.875 18.25H18.125C19.1406 18.25 20 17.4297 20 16.375V2.625C20 1.60938 19.1406 0.75 18.125 0.75ZM14.8438 12.1172C15.0391 12.3125 15.0391 12.625 14.8438 12.7812L13.2422 14.3828C13.0859 14.5781 12.7734 14.5781 12.5781 14.3828L10 11.7656L7.38281 14.3828C7.1875 14.5781 6.875 14.5781 6.71875 14.3828L5.11719 12.7812C4.92188 12.625 4.92188 12.3125 5.11719 12.1172L7.73438 9.5L5.11719 6.92188C4.92188 6.72656 4.92188 6.41406 5.11719 6.25781L6.71875 4.65625C6.875 4.46094 7.1875 4.46094 7.38281 4.65625L10 7.27344L12.5781 4.65625C12.7734 4.46094 13.0859 4.46094 13.2422 4.65625L14.8438 6.25781C15.0391 6.41406 15.0391 6.72656 14.8438 6.92188L12.2266 9.5L14.8438 12.1172Z"
              fill="#FF0202"
            />
          </svg>
        </div>
        <div className="td-form-add__body">
          <div className="container-fluid row  flex-wrap justify-content-between">
            <div className="td-form-add__body__form-input">
              <label htmlFor="first_name">First Name:</label>
              <input
                {...register("first_name", {
                  pattern: regexOnlyLetter,
                  required: true,
                  maxLength: 50,
                })}
                placeholder="example: Truong Thanh"
                className="form-control"
              />
              {errors.first_name && <span>Please enter firstname valid</span>}
            </div>
            <div className="td-form-add__body__form-input">
              <label htmlFor="last_name">Last Name:</label>
              <input
                {...register("last_name", {
                  pattern: regexOnlyLetter,
                  required: true,
                })}
                placeholder="example: Huy"
                className="form-control"
              />
              {errors.last_name && <span>Please enter lastname valid</span>}
            </div>
          </div>
          <div className="container-fluid row  flex-wrap justify-content-between mt-4">
            <div className="td-form-add__body__form-input">
              <label htmlFor="dob">Gender:</label>
              <select
                {...register("gender", {
                  pattern: regexOnlyLetter,
                  required: true,
                })}
                className="form-select form-control"
              >
                <option value="" selected>
                  Select gender
                </option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
              {errors.gender && <span>Please choose gender</span>}
            </div>
            <div className="td-form-add__body__form-input">
              <label htmlFor="date_of_birth">Date Of Birth:</label>
              <input
                {...register("date_of_birth", { required: true })}
                id="date_of_birth"
                placeholder="example: Huy"
                type="date"
                className="form-control"
              ></input>
              {errors.date_of_birth && <span>Please Choose Date Of Birth</span>}
            </div>
          </div>
          <div className="container-fluid row  flex-wrap justify-content-between mt-4">
            <div className="td-form-add__body__form-input">
              <label htmlFor="grade">Grade:</label>
              <select
                value={chooseGradeState}
                {...register("grade")}
                className="form-select form-control"
                onChange={(e) => {
                  setChooseGradeSate(e.target.value);
                }}
              >
                <option value="" selected>
                  {" "}
                  Select grade
                </option>
              </select>
              {errors.grade && <span>Please Choose Grade</span>}
            </div>
            <div className="td-form-add__body__form-input">
              <label htmlFor="class">Classes:</label>
              <select
                value={chooseClassState}
                {...register("class")}
                className="form-select form-control"
                onChange={(e) => {
                  setClassState(e.target.value);
                }}
              >
                <option value="" selected>
                  Select Select classes
                </option>
              </select>
              {errors.class && <span>Please choose Classes</span>}
            </div>
          </div>
          <div className="container-fluid row mt-4">
            <div className="form-input w-100">
              <label htmlFor="email">Email:</label>
              <input
                {...register("email", { pattern: regexEmail, required: true })}
                id="dob"
                placeholder="example: Huy@gmail.com"
                type="email"
                className="form-control"
              />
              {errors.email && <span>Please enter email valid</span>}
            </div>
          </div>
          <div className="container-fluid row mt-4">
            <div className="form-input w-100">
              <label htmlFor="dob">Address:</label>
              <input
                {...register("address", { required: true })}
                id="address"
                placeholder="example: Da Nang , Viet Nam"
                type="text"
                className="form-control"
              />
              {errors.address && <span>Please Enter Address</span>}
            </div>
          </div>
        </div>
        <div className="td-form-add__control d-flex justify-content-between mt-5">
          <input
            type="button"
            className="td-form-add__control__btn-back btn"
            onClick={turnOffForm}
            value="Back"
          />
          <input
            type="submit"
            className="td-form-add__control__btn-save btn"
            value="Save"
          />
        </div>
      </React.Fragment>
    );
  };
  return (
    <form className="td-form-add" onSubmit={handleSubmit(onSubmit)}>
      {renderForm()}
    </form>
  );
};