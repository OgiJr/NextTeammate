import Image from "next/image";
import React from "react";

import preloader from "../../public/assets/images/preloader.svg";

const Preloader = () => {
  return (
    <div className="preloader">
      <Image src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
