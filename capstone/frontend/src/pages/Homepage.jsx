import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState([]);

  async function onLoginClick() {
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/sign-in",
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });

      const authenticatedUser = response.data;
      localStorage.setItem(
        "authenticatedUser",
        JSON.stringify(authenticatedUser)
      );
      navigate("/todos");
    } catch (err) {
      console.log(err);
      const { data } = err.response;

      if (Array.isArray(data)) {
        return setErrors(data.map((err) => `${err.field} - ${err.message}`));
      }

      if ("error" in data) {
        setErrors([data.error]);
      }

      throw err;
    }
  }

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 8, width: 400 }}
      >
        <label>
          Email:&nbsp;
          <input type="email" ref={emailRef} />
        </label>

        <label>
          Password:&nbsp;
          <input type="password" ref={passwordRef} />
        </label>

        <button type="button" style={{ width: 200 }} onClick={onLoginClick}>
          Login
        </button>
        <ul>
          {errors.map((err) => (
            <li key={err} style={{ color: "red" }}>
              {err}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
