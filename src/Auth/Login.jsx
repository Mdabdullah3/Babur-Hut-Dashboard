import React, { useState } from "react";
import PrimaryButton from "../components/common/PrimaryButton";
import InputField from "../components/common/InputField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const handleLogin = () => {};
  return (
    <section>
      <div className="bg-primary text-white">
        <div className="lg:w-8/12 w-[95%] mx-auto h-screen flex items-center justify-center">
          <div className="">
            <div className="">
              <div className="">
                <h1 className="text-3xl font-bold pt-10">Sign In as a Admin</h1>
              </div>
              <form
                onClick={handleLogin}
                className="mt-4 bg-white text-black p-3 md:p-5 rounded-2xl "
              >
                <div>
                  <h1 className="text-xl font-semibold">
                    Sign In Admin Pannel at Babur Hut
                  </h1>
                  <div className="py-4 space-y-3">
                    <InputField
                      value={email}
                      onChange={setEmail}
                      required
                      placeholder={"Enter Email"}
                    />
                    <InputField
                      value={password}
                      onChange={setPassword}
                      type="password"
                      required
                      placeholder={"Enter Password"}
                    />
                  </div>
                  <PrimaryButton value="Login" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
