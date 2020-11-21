import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";

export default function App() {
  const values = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "six" },
    { name: "seven" },
    { name: "eight" },
    { name: "nine" },
    { name: "ten" },
  ];

  const [myState, setMyState] = React.useState(values);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (source.index !== destination.index) {
      let copyArray = [...myState];
      let temp = myState[source.index];
      copyArray.splice(source.index, 1);
      copyArray.splice(destination.index, 0, temp);
      setMyState(copyArray);
    }
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[{ title: "Numbers", field: "name" }]}
        data={myState}
        title=""
        components={{
          Body: (props) => (
            <div style={{ overflow: "unset" }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"random"}>
                  {(provided) => (
                    <div className={"level2div"} ref={provided.innerRef}>
                      <MTableBody {...props} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          ),
          Row: (props) => (
            <Draggable
              draggableId={props.data.tableData.id.toString()}
              index={props.data.tableData.id}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <MTableBodyRow {...props} />
                </div>
              )}
            </Draggable>
          ),
        }}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// import React from "react";
// import ReactDOM from "react-dom";
// import { DragDropContext } from "react-beautiful-dnd";
// import initialData from "./initial-data";
// import "@atlaskit/css-reset";
// import Column from "./column";

// //See the bottom of the component for code changes starting from importing react dnd;

// class App extends React.Component {
//   state = initialData;
//   onDragEnd = (result) => {
//     //TODO: reorder our column
//   };

//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         {this.state.columnOrder.map((columnId) => {
//           const column = this.state.columns[columnId];
//           const tasks = column.taskIds.map(
//             (taskId) => this.state.tasks[taskId]
//           );
//           return <Column key={column.id} column={column} tasks={tasks} />;
//         })}
//       </DragDropContext>
//     );
//   }
// }
