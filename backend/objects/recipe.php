<?php
class Recipe{
 
    // database connection and table name
    private $conn;
    private $table_name = "recipe";
 
    // object properties
    private $id;
    private $title;
    private $description;
    private $imageurl;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    // read products
    function read(){
        // select all query
        $query = "SELECT
                    *
                FROM
                    " . $this->table_name . " ";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function checkTitle($title){
        $query = "SELECT * FROM recipe WHERE title = :title";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":title", $title);

        $stmt->execute();

        return $stmt;
    }

    function add($title, $description, $imageurl) {

        $query = "INSERT INTO recipe(id, title, description, imageurl) VALUES(:id, :title, :description, :imageurl)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(":id", null, PDO::PARAM_INT);
        $stmt->bindParam(":title", $title);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":imageurl", $imageurl);

            // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    
    function update($id, $title, $description, $imageurl){

        $query = "UPDATE recipe SET title = :title, description = :description, imageurl = :imageurl WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(":id", $id);
        $stmt->bindParam(":title", $title);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":imageurl", $imageurl);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }

    }
    
    function delete($id){

        $query = 'DELETE FROM recipe WHERE id = :id';

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(":id", $id);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}