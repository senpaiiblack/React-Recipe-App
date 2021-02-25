import React, { useState } from "react";
import 'antd/dist/antd.css';
import "./App.css";
import { Button, Input , Card } from 'antd';

function App() {
  const [itemsArray, setItemsArray] = useState([]);
  const [recipe, setRecipe] = useState();
  const [description, setDescription] = useState();
  const [editIndex, setEditIndex] = useState();
  const [searchValue, setSearchValue] = useState();
  const [searched, setSearched] = useState();

  const addItem = () => {
    const filter = itemsArray.filter((item) => item.id === recipe);
    if (filter.length > 0) return alert('Already exist');
    const data = {
      id: recipe,
      recipe: recipe,
      description: description
    }
    setItemsArray(itemsArray.concat(data));
  };

  const deleteItem = (id) => {
    setItemsArray(itemsArray.filter((item) => item.id !== id))
  };

  const editItem = () => {
    const temp = { id: itemsArray[editIndex].id, recipe: itemsArray[editIndex].recipe, description: description }
    const filter = itemsArray.filter((item) => item.id !== itemsArray[editIndex].id);
    setItemsArray(filter.concat(temp));
  };

  const searchItem = () => {
    setSearched(itemsArray.filter((item) => {if (searchValue == null) {
      return item
    }
  else if (item.recipe.toLowerCase().includes(searchValue.toLowerCase())) {
    return item
  } }
     ));
  };

  const sortlistt = () => {
    const temp =[...itemsArray]
    const sorted = temp.sort(function(a,b){

      var nameA = a.recipe.toUpperCase();
      var nameB = b.recipe.toUpperCase();
      if(nameA<nameB){
        return-1;
      }
      if(nameA>nameB){
        return 1;
      }
      return 0;
    });
    setItemsArray(sorted);
  };

  const sortlist1 = () => {
    const temp =[...itemsArray]
    const sorted = temp.sort(function(a,b){

      var nameA = a.recipe.toUpperCase();
      var nameB = b.recipe.toUpperCase();
      if(nameA<nameB){
        return 1;
      }
      if(nameA>nameB){
        return -1;
      }
      return 0;
    });
    setItemsArray(sorted);
  };
  

  return (
    <div className="container">
      <Card title="Search">
        <div className="item-row">
          <Input className="inputt" placeholder="Search" type="text" name="search" onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        
        <div className="item-row">
          <Button onClick={searchItem}>Search</Button>
        </div>
        <div className="item-row">
          <div>Search Results:</div><br></br>
          <div className="item-row">
            {searched && <div>Recipe Name: <p>{searched[0]?.recipe}</p></div>}
            {searched && <div>Recipe Description:<p> {searched[0]?.description}</p></div>}
          </div>
        </div>
      </Card>
      <Card title="Add Recipe">
        <div className="item-row">
          <label>Recipe Name</label>
          <Input className="inputt" type="text"   name="recipe" onChange={(e) => setRecipe(e.target.value)} />
        </div>
        <div className="item-row">
          <label>Description</label>
          <Input className="inputt" type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="item-row">
        </div>
        <div className="item-row">
          <Button onClick={addItem}>Add Recipe</Button>
        </div>
      </Card>
      <Card title="View"  className="view-section" >
      <Button className="btnsort"  onClick={sortlistt}>Sort Acs</Button>
      <Button className="btnsort1"  onClick={sortlist1}>Sort Des</Button>
        {itemsArray?.map((item, index) => <div className="row" key={index}>
          <div>Recipe Name: {item.recipe}</div>
          <div>Recipe Description: {item.description}</div>
          <div>
            <div className="action" onClick={() => setEditIndex(index)}><Button type="primary" className="editbtnn">Edit</Button></div>
            <div className="action" onClick={() => deleteItem(item.id)}><Button type="primary" danger>Delete</Button></div>
          </div>
        </div>)}
      </Card>
      <Card title="Edit" className="edit-section">
        <h1> {itemsArray[editIndex]?.recipe}</h1>
        {editIndex >= 0 ? <>
          <div className="item-row">
            <label>Description:</label>
            <Input className="inputt" type="text" name="description" placeholder={itemsArray[editIndex]?.description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="item-row">
          </div>
          <div className="item-row">
            <Button onClick={editItem}>Edit Recipe </Button>
          </div>
        </> : <div>Click edit on any item</div>}

      </Card>
    </div>
  );
}

export default App;
