import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';

const initialList1 = [];
const initialList2 = [];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM1':
      return {
        ...state,
        list1: state.list1.concat({
          name: action.name,
          id: action.id,
        }),
      };
    case 'ADD_ITEM2':
      return {
        ...state,
        list2: state.list2.concat({
          name: action.name,
          id: action.id,
        }),
      };
    case 'REMOVE_ITEM1':
      return {
        ...state,
        list1: state.list1.filter((item) => item.id !== action.id),
      };
    case 'REMOVE_ITEM2':
      return {
        ...state,
        list2: state.list2.filter((item) => item.id !== action.id),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [listData1, dispatchListData] = React.useReducer(
    listReducer,
    {
      list1: initialList1,
      isShowList: true,
    }
  );
  const [listData2, dispatchListData2] = React.useReducer(
    listReducer,
    {
      list2: initialList2,
      isShowList: true,
    }
  );

  const [name, setName] = React.useState('');
  const [columnName, setColumnName] = React.useState(0);

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleColumnFlag(event) {
    setColumnName(event.target.value);
  }

  function handleAdd() {
    if (columnName === '1')
      dispatchListData({ type: 'ADD_ITEM1', name, id: uuidv4() });
    if (columnName === '2')
      dispatchListData2({ type: 'ADD_ITEM2', name, id: uuidv4() });

    setName('');
  }

  function handleDeleteColumn1(id) {
    dispatchListData({ type: 'REMOVE_ITEM1', id });
  }
  function handleDeleteColumn2(id) {
    dispatchListData2({ type: 'REMOVE_ITEM2', id });
  }
  if (!listData2.isShowList) {
    return null;
  }
  return (
    <div className="row">
      <div className="column">
      <AddItem
        name={name}
        onChange={handleChange}
        onChange2={handleColumnFlag}
        onAdd={handleAdd}
        columnName={columnName}
      />
      </div>
      <div className="column">
        <p>Column1</p>
      <List1
        list1={listData1.list1}
        onRemove1={handleDeleteColumn1}
      />
      </div>
      <div className="column">
      <p>Column2</p>
      <List2
        list2={listData2.list2}
        onRemove2={handleDeleteColumn2}
      />
      </div>
    </div>
  );
};

const AddItem = ({
  name,
  onChange,
  onChange2,
  onAdd,
  columnName,
}) => (
  <div>
    <input
      type="text"
      value={name}
      onChange={onChange}
      placeholder="ENTER ITEM"
    />
    <br />
    <select onChange={onChange2} value={columnName}>
      <option>Choose Column</option>
      <option value="1">Column1</option>
      <option value="2">Colomn2</option>
    </select>
    <br />
    <button type="button" onClick={onAdd}>
      Add Item
    </button>
    <br />
    <input type="text" placeholder="SEARCH ITEM" />
  </div>
);

const List1 = ({ list1, onRemove1 }) => (
  <div >
    <ul
      style={{
        border: '1px solid black',
        width: '100px',
        height: '100px',
      }}
    >
      {list1.map((item) => (
        <Item1 key={item.id} item={item} onRemove1={onRemove1} />
      ))}
    </ul>
  </div>
);

const Item1 = ({ item, onRemove1 }) => (
  <li>
    <span>{item.name}</span>
    <button type="button" onClick={() => onRemove1(item.id)}>
      Remove
    </button>
  </li>
);

const List2 = ({ list2, onRemove2 }) => (
  <div>
    <ul
      style={{
        border: '1px solid black',
        width: '100px',
        height: '100px',
      }}
    >
      {list2.map((item) => (
        <Item2 key={item.id} item={item} onRemove2={onRemove2} />
      ))}
    </ul>
  </div>
);

const Item2 = ({ item, onRemove2 }) => (
  <li>
    <span>{item.name}</span>
    <button type="button" onClick={() => onRemove2(item.id)}>
      Remove
    </button>
  </li>
);

export default App;
