<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/recipe.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();
    
    // initialize object
    $recipe = new Recipe($db);
    
    // query products
    $stmt = $recipe->read();
    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if($num>0){
    
        // products array
        $recipes_arr=array();
        $recipes_arr["recipes"]=array();
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
    
            $recipe_item=array(
                "id" => $id,
                "title" => $title,
                "description" => html_entity_decode($description),
                "imageurl" => $imageurl
            );
    
            array_push($recipes_arr["recipes"], $recipe_item);
        }
    
        echo json_encode($recipes_arr);
    }
    
    else{
        echo json_encode(
            array("message" => "No recipes found.")
        );
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $database = new Database();
    $db = $database->getConnection();

    $recipe = new Recipe($db);

    $data = json_decode(file_get_contents("php://input"));

    //check rcord if title exists
    $res = $recipe->checkTitle($data->title);
    $num = $res->rowCount();

    if($num > 0){
        echo json_encode(
            array("success" => false,
                  "message" => "Recipe title already exists!"
            )
        );
    } else {
        $stmt = $recipe->add($data->title, $data->description, $data->image);
            echo json_encode(
                array("success" => $stmt,
                      "message" => $stmt ? "Recipe successfully added!" : "ERROR, recipe not added!"
                )
            );
    }
}    
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $database = new Database();
    $db = $database->getConnection();

    $recipe = new Recipe($db);

    $data = json_decode(file_get_contents("php://input"));

    $id = $data->recipeId;
    $title = $data->title;
    $description = $data->description;
    $imageurl = $data->image;

    $res = $recipe->update($id, $title,$description, $imageurl);

    if ($res){
        echo json_encode(
            array("success" => $res,
                  "message" => $res ? "Successfully updated recipe!" : "ERROR, failed to update recipe!"
            )
        );
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){

    $database = new Database();
    $db = $database->getConnection();

    $recipe = new Recipe($db);

    $data = json_decode(file_get_contents("php://input"));


    $id = $data->recipeId;
    $res = $recipe->delete($id, $title,$description, $imageurl);
}

?>