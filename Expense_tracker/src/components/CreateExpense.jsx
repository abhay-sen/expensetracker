import React, { useEffect, useState } from "react";
import supabase from "../config/supabase";

function CreateExpense(){

    const [test,setTest]=useState([]);
    
    useEffect(() => {
        getData()
    },[])
    async function getData() {
      const { data: testing,error} = await supabase
        .from("testing")
        .select("*");
        setTest(testing)
        
    }
    
    return (<div>
        <h1>{JSON.stringify(test)}</h1>
    </div>)
}
export default CreateExpense;