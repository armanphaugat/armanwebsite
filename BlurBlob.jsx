import React from "react";
import PropTypes from "prop-types";
function BlurBlob({position,size}){
    const { top = "0%", left = "0%" } = position;
  const { width = "100px", height = "100px" } = size;
    return(
        <div className="absolute" style={{
            top:top,
            left:left,
            width:width,
            height:height,
            transform:'translate(-50%,-50%)',
        }}>
            <div className="w-full h-full bg-purple-500 rounded-full opacity-20 blur-3xl animate-blob"></div>
        </div>
    )
}
BlurBlob.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
};
export default BlurBlob;