<?php
      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "dwf_local2";

      // Create connection
      mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
      $mysqli = new mysqli($servername, $username, $password, $dbname);

      // Check connection
      if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
      }
    //   else{
    //       echo "connection is OK!";
    //   }
?>
