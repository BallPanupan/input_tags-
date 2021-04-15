<?php
    include("sql_connection.php");
    header('Content-Type: application/json');

    if(isset($_GET['skill'])){
        $skill = $_GET['skill'];
    }else{
        $skill = null;
    }

    $sql_listSkills = "SELECT * FROM dgd_term_taxonomy term_taxonomy
    inner join dgd_terms terms on terms.term_id = term_taxonomy_id
    where taxonomy='skill' and name like '%$skill%' limit 0,7";

    $result_listSkills = $mysqli->query($sql_listSkills);

    //list Json 
    $arr_list = array();
    foreach ($result_listSkills as $key => $value_listSkills) {
        //add list post
        array_push($arr_list,[
            'name' => $value_listSkills['name'],
            'term_id' => $value_listSkills['term_id'],
        ]);
        
    }

    echo json_encode($arr_list);


?>