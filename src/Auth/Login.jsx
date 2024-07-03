import React, { useState } from "react";
import PrimaryButton from "../components/common/PrimaryButton";
import InputField from "../components/common/InputField";
import VerifyEmail from "./VerifyEmail";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const handleNextStep = () => setStep((prev) => prev + 1);
  return (
    <section>
      <div className="bg-primary text-white">
        <div className="lg:w-8/12 w-[95%] mx-auto h-screen flex items-center justify-center">
          <div className="">
            <div className="">
              <div className="">
                <h1 className="text-3xl font-bold pt-10">Sign In as a Admin</h1>
              </div>
              <div className="mt-4 bg-white text-black p-3 md:p-5 rounded-2xl ">
                {step === 1 && (
                  <div>
                    <h1 className="text-xl font-semibold">
                      Sign In Admin Pannel at Babur Hut
                    </h1>
                    <p className="text-gray-600 text-[14px]">
                      Sign up in 2 steps
                    </p>

                    <div className="py-4">
                      <InputField
                        value={email}
                        onChange={setEmail}
                        required
                        placeholder={"Enter Email"}
                      />
                    </div>
                    <PrimaryButton value="Get Code" onClick={handleNextStep} />
                  </div>
                )}
                {step === 2 && <VerifyEmail onNext={handleNextStep} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
