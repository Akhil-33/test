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
      <div className="col-md-3 col-xs-12">
        <AddItem
          name={name}
          onChange={handleChange}
          onChange2={handleColumnFlag}
          onAdd={handleAdd}
          columnName={columnName}
        />
      </div>
      <div className="col-md-4 col-xs-12">
        <List1
          list1={listData1.list1}
          onRemove1={handleDeleteColumn1}
        />
      </div>
      <div className="col-md-4 col-xs-12">
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
  <div className="row">
    <div  className="col-md-12 col-sm-3 form-item">
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={onChange}
        placeholder="ENTER ITEM"
      />
    </div>
    <div className="col-md-12 col-sm-3  form-item">
      <select onChange={onChange2} value={columnName} className="form-control">
        <option>Choose Column</option>
        <option value="1">Column1</option>
        <option value="2">Colomn2</option>
      </select>
    </div>
    <div className="col-md-12 col-sm-3  form-item">
      <button type="button" onClick={onAdd} className="btn btn-secondary">      Add Item
    </button>
    </div>
    <div className="col-md-12 col-sm-3  form-item search">
      <input type="text" className="form-control" placeholder="SEARCH ITEM" />
    </div>
  </div>
);

const List1 = ({ list1, onRemove1 }) => (
  <div >
    <table className="table table-striped">
      <tbody>
        <tr><th colSpan="2"> Column1</th></tr>
        {list1.map((item) => (
          <Item1 key={item.id} item={item} onRemove1={onRemove1} />
        ))}

      </tbody>
    </table>
  </div>
);

const Item1 = ({ item, onRemove1 }) => (
  <tr>
    <td>{item.name}</td>
    <td className="align-right"><button type="button" onClick={() => onRemove1(item.id)}>x</button> </td>
  </tr>
);

const List2 = ({ list2, onRemove2 }) => (
  <div>
    <table className="table table-striped">
      <tbody>
        <tr><th colSpan="2"> Column2</th></tr>
        {list2.map((item) => (
          <Item2 key={item.id} item={item} onRemove2={onRemove2} />
        ))}
      </tbody>
    </table>
  </div>
);

const Item2 = ({ item, onRemove2 }) => (
  <tr>
    <td>{item.name}</td>
    <td className="align-right"><button type="button" onClick={() => onRemove2(item.id)}>x</button> </td>
  </tr>
);

export default App;
