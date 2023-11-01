import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FramerMotion() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        setIsActive(false);
        // Nakon što animacija završi, preusmerite se na narednu stranicu
        window.location.href = "/RegistrationForm";
      }, 1000); // Promenite vreme na ono koje vama odgovara
      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

  return (
    <motion.div
      className="box"
      onClick={() => setIsActive(!isActive)}
      animate={{
        rotate: isActive ? [0, 90, 180, 270] : [270, 180, 90, 0],
        borderRadius: isActive ? [0, 20, 50] : [50, 20, 0],
      }}
    ></motion.div>
  );
}

export default FramerMotion;
