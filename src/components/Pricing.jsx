import React, { Fragment, useContext, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { Container } from "./NavBar";
import "../Styles/Pricing.css";

function Pricing() {
  // Using the useContext hook to access the 'toggle' state from the 'Container' component
  const { toggle } = useContext(Container);

  // State variables to manage the toggles and pricing information for Basic, Standard, and Premium plans
  const [toggleBasic, setToggleBasic] = useState(true);
  const [toggleStandard, setToggleStandard] = useState(true);
  const [togglePremium, setTogglePremium] = useState(true);

  const [basicCost, setBasicCost] = useState("7.99");
  const [standartCost, setStandardCost] = useState("12.99");
  const [premiumCost, setPremiumCost] = useState("18.99");

  return (
    <Fragment>
      {/* Main pricing section */}
      <div className="background-Color-Main">
        {/* Container for Basic plan */}
        <div className="Pricing-container">
          <div className={toggle ? "Pricing-option1" : "light-Theme1"}>
            <h2>Basic</h2>
            <div className="Price">
              <h3>{basicCost}$</h3>
              <h4 id="MonthlyYearly">{toggleBasic ? "/Monthly" : "/Yearly"}</h4>
            </div>
            {/* Features of the Basic plan */}
            <span>
              <FcCheckmark fontSize={25} id="checkmark" />
              Unlimited films and TV programmes
            </span>
            <span>
              <FcCheckmark fontSize={25} id="checkmark" />
              Watch on mobile phones and tablets
            </span>
            <span>
              <FcCheckmark fontSize={25} id="checkmark" />
              Cancel at any time
            </span>
            <span>
              <FcCheckmark fontSize={25} id="checkmark" />
              First month completely free
            </span>
            {/* Buy now button */}
            <button id="button1">Buy now</button>
            {/* Yearly toggle switch */}
            <div
              className="Pricing-yearly-darktheme"
              onClick={() => {
                setToggleBasic(!toggleBasic);
                if (toggleBasic) {
                  setBasicCost("60");
                } else {
                  setBasicCost("7.99");
                }
              }}
            >
              <div
                className={
                  toggleBasic
                    ? "Pricing-monthly-darktheme"
                    : "Pricing-monthly-light"
                }
              ></div>
            </div>
          </div>
        </div>

        {/* Container for Standard plan */}
        <div className="Pricing-container">
          <div className={toggle ? "Pricing-option2" : "light-Theme2"}>
            {/* ... (similar structure as Basic plan) */}
          </div>
        </div>

        {/* Container for Premium plan */}
        <div className="Pricing-container">
          <div className={toggle ? "Pricing-option3" : "light-Theme3"}>
            {/* ... (similar structure as Basic and Standard plans) */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Pricing;
