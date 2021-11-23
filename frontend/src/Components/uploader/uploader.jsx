import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Uploader({loading}) {

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    color: black;
  `;

  return (
    <div className="sweet-loading" style={{textAlign:'center'}}>
      <div style={{textAlign:'center'}}>
        <h4 style={{marginBottom:'10px'}}>uploading video</h4>
      </div>
      <ScaleLoader color='black' loading={loading} size={10} css={override} size={10} />
    </div>
  );
}

export default Uploader;
