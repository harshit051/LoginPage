import React from "react";

export default function Footer(){
  var getYear = new Date();
  var year = getYear.getFullYear();
  return(
    <footer>
    <p>
    Created with ❤️ by Harshit Srivastava.<br/>
    copyright @ {year}
    </p>
    </footer>
  );
}
