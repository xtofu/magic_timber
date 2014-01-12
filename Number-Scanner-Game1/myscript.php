<?php
   $link = mysql_connect("sql.mit.edu", "tsividis", "huremaclaurin11");
   mysql_select_db("urntest");
   $query = "SELECT * FROM TABLE";
   $result = mysql_query($query);
   while ($line = mysql_fetch_array($result))
   {
      foreach ($line as $value)
       {
         print "$value\n";
      }
   }
    mysql_close($link);
?>