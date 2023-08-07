import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { default as awsConfig } from "./aws-exports";
import { Amplify, DataStore, DataStoreRuntimeContext, ModelBuilder } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { createTodo } from "./graphql/mutations";

Amplify.Logger.LOG_LEVEL = "DEBUG";

Amplify.configure(awsConfig);

const { Todo } = DataStoreRuntimeContext.create({
  Todo: ModelBuilder.instance()
    .field("id", "ID")
    .field("name", "String")
    .field("name2", 'AWSDate')
    .field("cosa", 'Boolean')
    .syncQuery("listTodos", listTodos)
    .mutations({
      INSERT: { fieldName: 'createTodoOld', document: createTodo}
    })
});

const todo = new Todo({
  name: '',
  cosa: false,
  name2: ''
});

Todo.copyOf(todo, d => {
  d.name = '';
  
  // @ts-expect-error
  d.id = 'asdasdasd';

  // @ts-expect-error
  d.name2 = false;
  
  // @ts-expect-error
  d.cosa = 'true';
  
  d.name = '';
  d.name2 = 'asdasdasd';
  d.cosa = true;
});

function App() {
  useEffect(() => {
    DataStore.start();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onQuery}>QUERY</button>
        <button onClick={onAdd}>ADD</button>
      </header>
    </div>
  );
}

async function onQuery() {

}

async function onAdd() {

}

export default App;
