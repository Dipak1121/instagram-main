import React, { useState } from "react";
import TokenContex from "./TokenContex";



const TokenProvider = (props)=>{
    
    const [token, setToken] = useState("");
    const [name, setName] = useState("");

    return(
        <TokenContex.Provider value={
            {
                token: token,
                setToken: setToken,
                name: name,
                setName: setName
            }
        } >
            {props.children}
        </TokenContex.Provider>
    )
}

export default TokenProvider;