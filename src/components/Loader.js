import BeatLoader
    from "react-spinners/BeatLoader";
import { useState } from "react";
// import { css } from "@emotion/react";

function Loader() {
    

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return ( <>
        <div style={{marginTop:"200px"}}>
            <div className="sweet-loading text-center">
              

                <BeatLoader

                    color='#36d7b7'
                    loading={loading}
                    cssOverride=''
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

        </div>
    </> );
}

export default Loader;