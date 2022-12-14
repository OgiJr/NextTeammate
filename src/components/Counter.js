import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import React from "react";

const Counter = ({ end, decimals }) => {
  return (
    <CountUp end={end ? end : 100} duration={1} decimals={decimals ? decimals : 0}>
      {({ countUpRef, start }) => (
        <ReactVisibilitySensor onChange={start} delayedCall>
          <b data-from="0" data-to={end} ref={countUpRef}>
            count
          </b>
        </ReactVisibilitySensor>
      )}
    </CountUp>
  );
};

export default Counter;
