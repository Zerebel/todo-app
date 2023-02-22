import { useEffect, useRef, useState } from "react";

const Text = ({ text, className }) => <p className={`${className}`}>{text}</p>;
const Button = ({ text, className, onClick, tab }) => (
  <button
    className={`text-dark font-montserrat font-semibold ${className} text-sm ${
      tab === text
        ? "border-b-2 border-b-blue border-r-2 border-r-transparent border-l-2 border-l-transparent"
        : ""
    }`}
    onClick={() => onClick()}
  >
    {text}
  </button>
);

function App() {
  const [task, SetTask] = useState("");
  const [todos, SetTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("saved", JSON.stringify(todos));
    }
  }, [todos]);

  window.addEventListener("load", (e) => {
    const localdata = JSON.parse(localStorage.getItem("saved"));
    if (localdata) SetTodos(localdata);
  });

  const handle_add_button = () => {
    SetTask("");
    return SetTodos([
      ...todos,
      { id: todos.length++, todo: task, completed: false },
    ]);
  };

  const handleCheckedChange = (id) => {
    SetTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        return todo;
      })
    );
  };

  let visibleTodos = todos;
  if (selectedTab === "Active")
    visibleTodos = todos.filter((todo) => !todo.completed);
  if (selectedTab === "Completed")
    visibleTodos = todos.filter((todo) => todo.completed);

  const handleDelete = (id, all) => {
    // delete all if option is provided
    if (all)
      return SetTodos((prevtodos) =>
        prevtodos.filter((todo) => !todo.completed)
      );
    // else delete selected
    return SetTodos((prevtodos) => {
      // Filter out the todo item with the matching ID
      const newTodos = prevtodos.filter((todo) => todo.id != id);
      // Update the IDs of the remaining todo items
      for (let i = 0; i < newTodos.length; i++) {
        newTodos[i].id = i++;
      }

      return newTodos;
    });
  };
  // Render
  return (
    <div className="flex flex-col items-center">
      <main className="flex flex-col items-center px-2 md:px-0 w-fit gap-2">
        <article className="grid grid-cols-3 w-full md:w-fit gap-8 md:gap-16 lg:gap-24 items-end my-2 border-b-2 border-b-gray4">
          <div className="flex flex-col items-center">
            <Button
              text={"All"}
              className="w-fit px-4"
              tab={selectedTab}
              onClick={() => setSelectedTab("All")}
            />
          </div>
          <div className="flex flex-col gap-12 items-center">
            <Text
              text={"#todo"}
              className="font-raleway font-bold col-span-3 text-dark text-2xl md:text-3xl lg:text-4xl"
            />
            <Button
              text={"Active"}
              className="w-fit px-2"
              tab={selectedTab}
              onClick={() => setSelectedTab("Active")}
            />
          </div>
          <div className="flex flex-col items-start">
            <Button
              text={"Completed"}
              className="w-fit"
              tab={selectedTab}
              onClick={() => setSelectedTab("Completed")}
            />
          </div>
        </article>
        <article className="w-full h-8 gap-2 flex flex-col max-w-lg">
          {selectedTab != "Completed" && (
            <div className="flex gap-4">
              <input
                type="text"
                value={task}
                placeholder="add details"
                className="outline outline-1 rounded-xl w-full px-2 py-2 outline-gray2"
                onChange={(e) => SetTask(e.target.value)}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    return handle_add_button();
                  }
                }}
              />
              <Button
                text={"Add"}
                onClick={handle_add_button}
                className="shadow-C_shadow bg-blue rounded-xl px-8 font-semibold text-white text-sm"
              />
            </div>
          )}
          <ul className="mt-4 flex flex-col gap-6 font-montserrat text-dark text-lg font-medium">
            {visibleTodos.map((todo) => (
              <li key={todo.id} className="flex justify-between">
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    checked={todo.completed}
                    onChange={() => handleCheckedChange(todo.id)}
                  />
                  <span
                    className={`${
                      todo.completed ? "line-through" : ""
                    } flex-1 `}
                  >
                    {todo.todo}
                  </span>
                </div>
                {selectedTab === "Completed" && (
                  <button onClick={() => handleDelete(todo.id)}>
                    <span className="material-icons text-gray4">delete</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          {visibleTodos.length > 0
            ? selectedTab === "Completed" && (
                <div className="flex justify-end ">
                  <button
                    className="font-montserrat font-semibold rounded px-5 py-3 bg-Red_Salsa flex text-xs text-white justify-center gap-2"
                    onClick={() => handleDelete(null, 1)}
                  >
                    <span className="material-icons text-xs">delete</span>
                    <span>delete all</span>
                  </button>
                </div>
              )
            : selectedTab === "Completed" && <Text text={"0 Task Completed"} />} 
       </article>
      </main>
    </div>
  );
}

export default App;
